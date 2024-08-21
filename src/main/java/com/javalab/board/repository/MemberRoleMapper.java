package com.javalab.board.repository;

import com.javalab.board.vo.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberRoleMapper {

    // 회원 ID로 역할 정보 조회
    List<Role> getRolesByMemberId(Long memberId);

    // 회원-역할 관계 삽입
    int insertMemberRole(Role memberRole);

    // 회원-역할 관계 삭제
    int deleteMemberRole(Role memberRole);
}
