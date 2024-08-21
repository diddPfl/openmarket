package com.javalab.board.controller;

import com.javalab.board.service.LoginService;
import com.javalab.board.vo.Member;
import com.javalab.board.vo.Role; // Import the Role enum
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

        @GetMapping({"/login", "/member/login"})
        public String login(@RequestParam(value = "error", required = false) String error, Model model) {
            if (error != null) {
                model.addAttribute("error", "Invalid email or password");
            }
            return "login";
        }


//    @PostMapping("/member/login")
//    public String login(@ModelAttribute("member") Member member,
//                        HttpSession session,
//                        RedirectAttributes redirectAttributes) {
//        Member loginMember = loginService.login(member);
//        if (loginMember != null) {
//            session.setAttribute("member", loginMember);
//            log.info("Session saved user.");
//            log.info("Logged in user role: {}", loginMember.getRole());
//
//            // Use Role enum for comparison
//            if (Role.ADMIN.equals(loginMember.getRole())) {
//                return "redirect:/board/admin";
//            } else {
//                return "redirect:/mypage";
//            }
//        } else {
//            redirectAttributes.addFlashAttribute("error", "Check your ID and password.");
//            redirectAttributes.addFlashAttribute("member", member);
//            return "redirect:/member/login";
//        }
//    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/member/login";
    }
}
