package com.javalab.board.repository;

import com.javalab.board.dto.ItemTagDto;
import com.javalab.board.vo.Item;
import com.javalab.board.vo.ItemImage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemRepository {
    List<Item> findAll();
    Item findById(@Param("itemId") Long itemId);
    void insert(Item item);
    void insertItemImage(ItemImage itemImage);
    void disableItem(long itemId);
    String findCategoryNameById(long categoryId);
    List<String> findAllBrands();
    String findBrandByName(String brandName);
    void deleteItemsByBrand(String brandName);
    List<Item> searchItems(@Param("term") String term);
    List<ItemImage> findImagesByItemId(long itemId);
    List<ItemTagDto> findRelatedItemTags(String brand, long categoryId, long excludeItemId);
}
