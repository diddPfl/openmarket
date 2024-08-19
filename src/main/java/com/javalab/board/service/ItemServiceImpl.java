package com.javalab.board.service;

import com.javalab.board.dto.ItemDto;
import com.javalab.board.dto.ItemImageDto;
import com.javalab.board.repository.ItemRepository;
import com.javalab.board.service.ItemService;
import com.javalab.board.vo.Item;
import com.javalab.board.vo.ItemImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<ItemDto> findAll() {
        List<Item> items = itemRepository.findAll();
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public ItemDto findById(long itemId) {
        Item item = itemRepository.findById(itemId);
        return item != null ? convertToDto(item) : null;
    }

    private ItemDto convertToDto(Item item) {
        return new ItemDto(
                item.getItemId(),
                item.getItemName(),
                item.getItemDetail(),
                item.getCategoryName(),
                item.getPrice(),
                item.getRegdate(),
                item.getImages() != null ? item.getImages().stream().map(this::convertImageToDto).collect(Collectors.toList()) : null
        );
    }

    private ItemImageDto convertImageToDto(ItemImage image) {
        return new ItemImageDto(image.getUuid(), image.getFileName(), image.getItemId());
    }
}