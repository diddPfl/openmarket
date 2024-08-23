package com.javalab.board.controller;

import com.javalab.board.service.MemberService;
import com.javalab.board.service.OrderService;
import com.javalab.board.vo.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    private static final Logger logger = LoggerFactory.getLogger(MyPageController.class);

    private final MemberService memberService;
    private final OrderService orderService;

    @Autowired
    public MyPageController(MemberService memberService, OrderService orderService) {
        this.memberService = memberService;
        this.orderService = orderService;
    }

    @GetMapping
    public String myPage(Model model, Authentication authentication) {
        logger.info("MyPage accessed");
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("User authenticated: {}", authentication.getName());
            try {
                Member member = memberService.getMemberByEmail(authentication.getName());
                if (member != null) {
                    logger.info("Member found: {}", member.getName());
                    model.addAttribute("name", member.getName());
                    model.addAttribute("orderStatus", orderService.getOrderStatusCounts(member.getMemberId()));
                    return "mypage";
                } else {
                    logger.warn("Member not found for email: {}", authentication.getName());
                }
            } catch (Exception e) {
                logger.error("Error retrieving member information", e);
            }
        } else {
            logger.info("User not authenticated");
        }
        return "redirect:/login";
    }

    @GetMapping("/cart")
    public String cart(Model model, Authentication authentication) {
        logger.info("Cart page accessed");
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("User authenticated: {}", authentication.getName());
            try {
                Member member = memberService.getMemberByEmail(authentication.getName());
                if (member != null) {
                    logger.info("Member found: {}", member.getName());
                    model.addAttribute("name", member.getName());
                    return "cart";
                } else {
                    logger.warn("Member not found for email: {}", authentication.getName());
                }
            } catch (Exception e) {
                logger.error("Error retrieving member information", e);
            }
        } else {
            logger.info("User not authenticated");
        }
        return "redirect:/login";
    }

    @GetMapping("/orders")
    public String orders(Model model, Authentication authentication) {
        logger.info("Orders page accessed");
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("User authenticated: {}", authentication.getName());
            try {
                Member member = memberService.getMemberByEmail(authentication.getName());
                if (member != null) {
                    logger.info("Member found: {}", member.getName());
                    model.addAttribute("name", member.getName());
                    model.addAttribute("orders", orderService.getOrdersByMemberId(member.getMemberId()));
                    return "orders";
                } else {
                    logger.warn("Member not found for email: {}", authentication.getName());
                }
            } catch (Exception e) {
                logger.error("Error retrieving member information", e);
            }
        } else {
            logger.info("User not authenticated");
        }
        return "redirect:/login";
    }

    @GetMapping("/profile")
    public String profile(Model model, Authentication authentication) {
        logger.info("Profile page accessed");
        if (authentication != null && authentication.isAuthenticated()) {
            logger.info("User authenticated: {}", authentication.getName());
            try {
                Member member = memberService.getMemberByEmail(authentication.getName());
                if (member != null) {
                    logger.info("Member found: {}", member.getName());
                    model.addAttribute("member", member);
                    return "profile";
                } else {
                    logger.warn("Member not found for email: {}", authentication.getName());
                }
            } catch (Exception e) {
                logger.error("Error retrieving member information", e);
            }
        } else {
            logger.info("User not authenticated");
        }
        return "redirect:/login";
    }
}