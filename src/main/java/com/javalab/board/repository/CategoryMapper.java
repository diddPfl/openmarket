package com.javalab.board.repository;

import com.javalab.board.vo.CategoryFormDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryMapper {
    List<CategoryFormDTO> selectCategories(@Param("parentId") Long parentId);
}