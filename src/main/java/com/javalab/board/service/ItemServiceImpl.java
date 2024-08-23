package com.javalab.board.service;

import com.javalab.board.dto.ItemCreateDto;
import com.javalab.board.dto.ItemImageDto;
import com.javalab.board.dto.ItemListDto;
import com.javalab.board.dto.ItemResponseDto;
import com.javalab.board.repository.ItemRepository;
import com.javalab.board.service.ItemService;
import com.javalab.board.vo.Item;
import com.javalab.board.vo.ItemImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

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
        return convertToResponseDto(item);
    }

    @Override
    @Transactional
    public List<ItemImageDto> saveItemImages(long itemId, List<ItemImageDto> imageDtos) {
        List<ItemImage> images = imageDtos.stream()
                .map(dto -> new ItemImage(dto.getUuid(), itemId, dto.getFileName()))
                .collect(Collectors.toList());

        for (ItemImage image : images) {
            itemRepository.insertItemImage(image);
        }

        return imageDtos;
    }

    @Override
    @Transactional
    public void disableItem(long itemId) {
        itemRepository.disableItem(itemId);
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
                item.getIsDisabled(), // 변환
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
                item.getIsDisabled() // 변환
        );
    }

    private ItemImageDto convertImageToDto(ItemImage image) {
        return new ItemImageDto(image.getUuid(), image.getFileName(), image.getItemId());
    }

    private String generateDefaultGubunSubCode() {
        return "DEFAULT_" + System.currentTimeMillis();
    }
}
