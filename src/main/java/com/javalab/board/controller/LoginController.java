package com.javalab.board.controller;

import com.javalab.board.service.LoginService;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member member) {
        log.info("Login attempt received. Email: '{}', Password length: {}",
                member.getEmail(),
                (member.getPassword() != null ? member.getPassword().length() : 0));

        if (member.getEmail() == null || member.getEmail().isEmpty()) {
            log.warn("Login attempt with empty email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email cannot be empty");
        }

        Member loginMember = loginService.login(member);
        if (loginMember != null) {
            log.info("User logged in successfully. Role: {}", loginMember.getRole());
            loginMember.setPassword(null);
            return ResponseEntity.ok(loginMember);
        } else {
            log.info("Login failed for email: '{}'", member.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("Logged out successfully");
    }
}
