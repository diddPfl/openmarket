package com.javalab.board.service;

import com.javalab.board.vo.Item;

import java.util.List;

public interface ItemService {
    Item findById(long itemId);
    List<Item> findAll();
}
