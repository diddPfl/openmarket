package com.javalab.board.service;

import com.javalab.board.repository.MemberRepository;
import com.javalab.board.vo.Member;
import com.javalab.board.vo.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /*@Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new User(member.getEmail(), member.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + member.getRole().name())));
    }*/

    @Override
    @Transactional
    public Member createMember(Member member) {
        member.setDefaults();
        memberRepository.save(member);
        return member;
    }

    @Override
    public Optional<Member> getMemberById(Long memberId) {
        return Optional.ofNullable(memberRepository.findById(memberId));
    }

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public Member updateMember(Member member) {
        memberRepository.update(member);
        return member;
    }
    @Override
    public List<MemberDto> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public long getMemberCount() {
        return memberRepository.getMemberCount();
    }

    private MemberDto convertToDto(Member member) {
        MemberDto dto = new MemberDto();
        dto.setMemberId(member.getMemberId());
        dto.setEmail(member.getEmail());
        dto.setName(member.getName());
        dto.setAddress(member.getAddress());
        dto.setDel(member.getDel());
        dto.setRole(member.getRole().name());
        dto.setSocial(member.getSocial());
        dto.setApprovedAt(member.getApprovedAt());
        dto.setRegdate(member.getRegdate());
        return dto;
    }
}