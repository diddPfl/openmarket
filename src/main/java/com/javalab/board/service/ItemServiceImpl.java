package com.javalab.board.service;

import com.javalab.board.dto.*;
import com.javalab.board.repository.ItemRepository;
import com.javalab.board.vo.BrandDto;
import com.javalab.board.vo.Item;
import com.javalab.board.vo.ItemImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private static final Logger logger = LoggerFactory.getLogger(ItemServiceImpl.class);

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<ItemListDto> findAll() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(this::convertToListDto).collect(Collectors.toList());
    }

    @Override
    public ItemResponseDto findById(long itemId) {
        Item item = itemRepository.findById(itemId);
        return item != null ? convertToResponseDto(item) : null;
    }

    @Override
    @Transactional
    public ItemResponseDto save(ItemCreateDto itemCreateDto) {
        Item item = convertToEntity(itemCreateDto);
        String categoryName = itemRepository.findCategoryNameById(itemCreateDto.getCategoryId());
        item.setCategoryName(categoryName);
        itemRepository.insert(item);
        logger.info("Item saved: {}", item);
        return convertToResponseDto(item);
    }

    @Override
    @Transactional
    public List<ItemImageDto> saveItemImages(long itemId, List<ItemImageDto> imageDtos) {
        List<ItemImage> images = imageDtos.stream()
                .map(dto -> new ItemImage(dto.getUuid(), itemId, dto.getFileName(), dto.getRepimg()))
                .collect(Collectors.toList());

        for (ItemImage image : images) {
            itemRepository.insertItemImage(image);
        }

        logger.info("Images saved for itemId: {}", itemId);
        return imageDtos;
    }

    @Override
    @Transactional
    public ItemResponseDto updateItem(long itemId, ItemUpdateDto itemUpdateDto) {
        Item item = itemRepository.findById(itemId);
        if (item == null) {
            logger.error("Item not found for ID: {}", itemId);
            return null; // Or throw an exception
        }

        // Update properties from itemUpdateDto to item
        item.setCategoryId(itemUpdateDto.getCategoryId());
        item.setGubunSubCode(itemUpdateDto.getGubunSubCode());
        item.setItemName(itemUpdateDto.getItemName());
        item.setItemDetail(itemUpdateDto.getItemDetail());
        item.setPrice(itemUpdateDto.getPrice());
        item.setStockNumber(itemUpdateDto.getStockNumber());
        item.setItemSellStatus(itemUpdateDto.getItemSellStatus());
        item.setBrand(itemUpdateDto.getBrand());

        // Update item
        itemRepository.updateItem(item);
        logger.info("Item updated: {}", item);

        // Update images
        if (itemUpdateDto.getImages() != null) {
            saveItemImages(itemId, itemUpdateDto.getImages());
        }

        return convertToResponseDto(item);
    }

    @Override
    public List<ItemTagDto> getRelatedItems(long itemId) {
        Item item = itemRepository.findById(itemId);
        if (item == null) {
            return Collections.emptyList();
        }
        List<ItemTagDto> relatedItems = itemRepository.findRelatedItemTags(item.getBrand(), item.getCategoryId(), itemId);

        // Set fullName for images
        for (ItemTagDto relatedItem : relatedItems) {
            if (relatedItem.getImages() != null) {
                for (ItemImageDto image : relatedItem.getImages()) {
                    image.setFullName(image.getUuid() + "_" + image.getFileName());
                }
            }
        }

        return relatedItems;
    }

    @Override
    @Transactional
    public void disableItem(long itemId) {
        itemRepository.disableItem(itemId);
        logger.info("Item disabled: {}", itemId);
    }

    private ItemListDto convertToListDto(Item item) {
        return new ItemListDto(
                item.getItemId(),
                item.getItemName(),
                item.getCategoryId(),
                item.getCategoryName(),
                item.getPrice(),
                item.getRegdate(),
                item.getItemSellStatus(),
                item.getIsDisabled(),
                item.getImages() != null ? item.getImages().stream().map(this::convertImageToDto).collect(Collectors.toList()) : null
        );
    }

    private Item convertToEntity(ItemCreateDto dto) {
        Item item = new Item();
        item.setItemName(dto.getItemName());
        item.setItemDetail(dto.getItemDetail());
        item.setCategoryId(dto.getCategoryId());
        item.setPrice(dto.getPrice());
        item.setItemSellStatus(dto.getItemSellStatus());
        item.setGubunSubCode(dto.getGubunSubCode());
        item.setBrand(dto.getBrand());
        item.setStockNumber(dto.getStockNumber());
        item.setRegdate(LocalDate.now());
        item.setIsDisabled(0); // Default value

        if (item.getGubunSubCode() == null) {
            item.setGubunSubCode(generateDefaultGubunSubCode());
        }

        return item;
    }

    private ItemResponseDto convertToResponseDto(Item item) {
        return new ItemResponseDto(
                item.getItemId(),
                item.getCategoryId(),
                item.getCategoryName(),
                item.getGubunSubCode(),
                item.getItemName(),
                item.getItemDetail(),
                item.getPrice(),
                item.getRegdate(),
                item.getImages() != null ? item.getImages().stream().map(this::convertImageToDto).collect(Collectors.toList()) : null,
                item.getBrand(),
                item.getStockNumber(),
                item.getItemSellStatus().toString(),
                item.getIsDisabled()
        );
    }

    private ItemImageDto convertImageToDto(ItemImage image) {
        return new ItemImageDto(image.getUuid(), image.getFileName(), image.getItemId(), image.getRepimg());
    }

    private String generateDefaultGubunSubCode() {
        return "DEFAULT_" + System.currentTimeMillis();
    }

    @Override
    public List<String> getAllBrands() {
        return itemRepository.findAllBrands();
    }

    @Override
    @Transactional
    public boolean deleteBrandAndRelatedItems(String brandName) {
        if (itemRepository.findBrandByName(brandName) != null) {
            itemRepository.deleteItemsByBrand(brandName);
            logger.info("Deleted brand and related items for brand: {}", brandName);
            return true;
        }
        logger.warn("Brand not found: {}", brandName);
        return false;
    }

    @Override
    public BrandDto getBrandByName(String brandName) {
        String brand = itemRepository.findBrandByName(brandName);
        if (brand != null) {
            return new BrandDto(brand);
        }
        return null;
    }

    @Override
    public List<ItemListDto> searchItems(String term) {
        List<Item> items = itemRepository.searchItems(term);
        return items.stream().map(this::convertToListDto).collect(Collectors.toList());
    }
}