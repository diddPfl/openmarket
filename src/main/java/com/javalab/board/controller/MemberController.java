package com.javalab.board.controller;

import com.javalab.board.vo.Member;
import com.javalab.board.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Controller
@RequestMapping("/member")
@Slf4j
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/create")
    public String createMemberForm(Model model) {
        log.info("Accessing the member creation form.");
        model.addAttribute("member", new Member());
        return "createmember";
    }

    @PostMapping("/create")
    public String createMember(@ModelAttribute Member member, Model model) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberService.createMember(member);
        return "redirect:/member/login";
    }

    @GetMapping("/{memberId}")
    public String getMember(@PathVariable("memberId") Long memberId, Model model) {
        Optional<Member> memberOpt = memberService.getMemberById(memberId);
        if (memberOpt.isPresent()) {
            model.addAttribute("member", memberOpt.get());
            return "mypage";
        } else {
            log.error("Member not found with ID: {}", memberId);
            return "redirect:/member/login";
        }
    }
}