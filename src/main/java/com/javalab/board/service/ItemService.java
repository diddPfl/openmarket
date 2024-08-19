package com.javalab.board.service;

import com.javalab.board.dto.ItemDto;

import java.util.List;

public interface ItemService {
    List<ItemDto> findAll();
    ItemDto findById(long itemId);
}