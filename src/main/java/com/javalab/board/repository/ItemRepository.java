package com.javalab.board.repository;

import com.javalab.board.vo.Item;
import com.javalab.board.vo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ItemRepository {
    // 모든 아이템 조회
    List<Item> findAll();

    // ID로 상품조회
    Item findById(long id);
}
