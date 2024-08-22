package com.javalab.board.repository;

import com.javalab.board.vo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapperInterface {
   @Select("SELECT * FROM member WHERE email = #{email}")
   Member findByEmail(String email);
}