package com.javalab.board.controller;

import com.javalab.board.service.MemberService;
import com.javalab.board.service.OrderService;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    private final MemberService memberService;
    private final OrderService orderService;
//    private final ProductService productService;

    @Autowired
    public MyPageController(MemberService memberService, OrderService orderService
//            ,ProductService productService
    ) {
        this.memberService = memberService;
        this.orderService = orderService;
        //this.productService = productService;
    }

    @GetMapping
    public String myPage(Model model, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Member member = memberService.getMemberByEmail(authentication.getName());
            if (member != null) {
                model.addAttribute("name", member.getName());
                model.addAttribute("orderStatus", orderService.getOrderStatusCounts(member.getMemberId()));
                //model.addAttribute("likedProducts", productService.getLikedProducts(member.getMemberId()));
            }
        } else {
            model.addAttribute("name", "Guest");
        }
        return "mypage";
    }
}