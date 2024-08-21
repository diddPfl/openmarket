package com.javalab.board.service;

import com.javalab.board.repository.MemberRepository;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Member login(Member member) {
        Member foundMember = memberRepository.findByEmail(member.getEmail());
        if (foundMember != null && passwordEncoder.matches(member.getPassword(), foundMember.getPassword())) {
            return foundMember;
        }
        return null;
    }
}