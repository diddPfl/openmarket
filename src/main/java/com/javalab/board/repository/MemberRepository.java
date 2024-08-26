package com.javalab.board.repository;

import com.javalab.board.vo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberRepository {
    int save(Member member);
    Member findById(Long memberId);
    Member findByEmail(String email);
    int update(Member member);
    int updatePasswordAndSocial(@Param("email") String email, @Param("password") String password);
    List<Member> findAll();
    long getMemberCount();
}