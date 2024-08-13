package com.javalab.board.service;

import com.javalab.board.repository.ItemRepository;
import com.javalab.board.vo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item findById(long itemId) {
        return itemRepository.findById(itemId);
    }

    @Override
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

}
