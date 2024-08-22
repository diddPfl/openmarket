package com.javalab.board.service;

import com.javalab.board.repository.MemberRepository;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

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
}