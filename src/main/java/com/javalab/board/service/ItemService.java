package com.javalab.board.service;

import com.javalab.board.dto.*;
import com.javalab.board.vo.BrandDto;

import java.util.List;

public interface ItemService {
    List<ItemListDto> findAll();
    ItemResponseDto findById(long itemId);
    ItemResponseDto save(ItemCreateDto itemCreateDto);
    List<ItemImageDto> saveItemImages(long itemId, List<ItemImageDto> images);
    void disableItem(long itemId);
    List<String> getAllBrands();
    ItemResponseDto updateItem(long itemId, ItemUpdateDto itemUpdateDto);
    boolean deleteBrandAndRelatedItems(String brandName);
    BrandDto getBrandByName(String brandName);
    List<ItemListDto> searchItems(String term);
    List<ItemTagDto> getRelatedItems(long itemId);
    long getItemCount();
    long getBrandCount();
}