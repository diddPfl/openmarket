package com.javalab.board.controller;

import com.javalab.board.vo.Member;
import com.javalab.board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@Slf4j
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> createMember(@RequestBody Member member) {
        try {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
            member.setRole("CUSTOMER");
            Member createdMember = memberService.createMember(member);
            return new ResponseEntity<>(createdMember, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating member: ", e);
            return new ResponseEntity<>("Failed to create account. Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMember(@PathVariable("memberId") Long memberId) {
        Optional<Member> memberOpt = memberService.getMemberById(memberId);
        if (memberOpt.isPresent()) {
            return new ResponseEntity<>(memberOpt.get(), HttpStatus.OK);
        } else {
            log.error("Member not found with ID: {}", memberId);
            return new ResponseEntity<>("Member not found", HttpStatus.NOT_FOUND);
        }
    }
}