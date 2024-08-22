package com.javalab.board.security.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ErrorController {
    private static final Logger log = LogManager.getLogger(ErrorController.class);

    public ErrorController() {
    }

    @GetMapping("/access-denied")
    public String accessDenied(RedirectAttributes redirectAttributes) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Access denied for username: " + username);

        // Add a flash attribute for the error message
        redirectAttributes.addFlashAttribute("error", "해당 페이지에 접근 권한이 없습니다. 회원가입을 해주세요.");

        // Redirect to the signup page
        return "redirect:/signup";
    }
}