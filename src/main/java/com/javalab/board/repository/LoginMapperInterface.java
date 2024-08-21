package com.javalab.board.repository;

import com.javalab.board.vo.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapperInterface {
   Member findByEmail(String email);
}