package com.javalab.board.service;

import com.javalab.board.dto.ItemCreateDto;
import com.javalab.board.dto.ItemImageDto;
import com.javalab.board.dto.ItemListDto;
import com.javalab.board.dto.ItemResponseDto;
import com.javalab.board.vo.BrandDto;

import java.util.List;

public interface ItemService {
    List<ItemListDto> findAll();
    ItemResponseDto findById(long itemId);
    ItemResponseDto save(ItemCreateDto itemCreateDto);
    List<ItemImageDto> saveItemImages(long itemId, List<ItemImageDto> images);
    List<String> getAllBrands();
    boolean deleteBrandAndRelatedItems(String brandName);
    BrandDto getBrandByName(String brandName);

}