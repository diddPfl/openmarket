package com.javalab.board.service;

import com.javalab.board.vo.Member;
import com.javalab.board.vo.MemberDto;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Member createMember(Member member);
    Optional<Member> getMemberById(Long memberId);
    Member getMemberByEmail(String email);
    Member updateMember(Member member);
    List<MemberDto> getAllMembers();
    long getMemberCount();
}