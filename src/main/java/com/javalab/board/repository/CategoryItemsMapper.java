package com.javalab.board.repository;

import com.javalab.board.vo.Item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryItemsMapper {
    List<Item> selectItemsByGubunSubCode(@Param("gubunSubCode") String gubunSubCode);
    List<Item> selectItemsByCategoryId(@Param("categoryId") Long categoryId);
}
