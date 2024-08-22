package com.javalab.board.service;

import com.javalab.board.repository.LoginMapperInterface;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class LoginServiceImpl implements LoginService {

    private static final Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);

    private final LoginMapperInterface loginMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginServiceImpl(LoginMapperInterface loginMapper, PasswordEncoder passwordEncoder) {
        this.loginMapper = loginMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Member login(Member member) {
        log.info("Attempting to find member with email: '{}'", member.getEmail());
        Member foundMember = loginMapper.findByEmail(member.getEmail());
        if (foundMember != null) {
            log.info("Member found, verifying password");
            if (passwordEncoder.matches(member.getPassword(), foundMember.getPassword())) {
                log.info("Password verified successfully");
                return foundMember;
            } else {
                log.info("Password verification failed");
            }
        } else {
            log.info("No member found with email: '{}'", member.getEmail());
        }
        return null;
    }
}