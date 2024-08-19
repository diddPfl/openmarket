package com.javalab.board.repository;

import com.javalab.board.vo.Item;
import com.javalab.board.vo.ItemImage;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemRepository {
    List<Item> findAll();
    Item findById(long id);
    void insert(Item item);
    void insertItemImage(ItemImage itemImage);
    String findCategoryNameById(long categoryId);
}