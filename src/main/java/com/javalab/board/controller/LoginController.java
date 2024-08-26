package com.javalab.board.controller;

import com.javalab.board.security.JwtService;
import com.javalab.board.security.dto.MemberSecurityDTO;
import com.javalab.board.service.LoginService;
import com.javalab.board.vo.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtService jwtService;

    // SecurityConfig에서 정의한 AuthenticationManager를 주입받음
    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody Member member) {
        try {
            UsernamePasswordAuthenticationToken creds =
                    new UsernamePasswordAuthenticationToken(
                            member.getEmail(),
                            member.getPassword());
            // 사용자가 입력한 자격증명(아이디/비번)으로 인증을 시도하고 인증 성공시 Authentication 객체 반환
            Authentication auth = authenticationManager.authenticate(creds);

            // Generate token
            String jwts = jwtService.getToken(auth.getName());

            log.info("User logged in successfully. jwts: {}", jwts);

            // 인증된 사용자 정보를 MemberSecurityDTO로 가져옴
            MemberSecurityDTO memberSecurity = (MemberSecurityDTO) auth.getPrincipal();

            // 사용자 정보를 응답으로 반환하거나 필요한 정보를 포함
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                    .body(Map.of(
                            "email", memberSecurity.getEmail(),
                            "name", memberSecurity.getName(),
                            "roles", memberSecurity.getAuthorities()
                    ));
        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for user: {}", member.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception e) {
            log.error("Authentication failed for user: {}", member.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication");
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
