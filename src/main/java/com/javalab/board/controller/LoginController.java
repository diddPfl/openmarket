package com.javalab.board.controller;

import com.javalab.board.security.JwtService;
import com.javalab.board.service.LoginService;
import com.javalab.board.vo.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {

    //    private static final Logger log = LoggerFactory.getLogger(LoginController.class);
//
    @Autowired
    private LoginService loginService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Member member) {
//        log.info("Login attempt received. Email: '{}', Password length: {}",
//                member.getEmail(),
//                (member.getPassword() != null ? member.getPassword().length() : 0));
//
//        if (member.getEmail() == null || member.getEmail().isEmpty()) {
//            log.warn("Login attempt with empty email");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email cannot be empty");
//        }
//
//        Member loginMember = loginService.login(member);
//        if (loginMember != null) {
//            log.info("User logged in successfully. Role: {}", loginMember.getRole());
//            loginMember.setPassword(null);
//            return ResponseEntity.ok(loginMember);
//        } else {
//            log.info("Login failed for email: '{}'", member.getEmail());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }

//    }

    @Autowired
    private JwtService jwtService;

    // SecurityConfig에서 정의한 AuthenticationManager를 주입받음
    @Autowired
    AuthenticationManager authenticationManager;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<?> getToken(@RequestBody Member member) {

        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        member.getEmail(),
                        member.getPassword());

        Authentication auth = authenticationManager.authenticate(creds);

        // Generate token
        String jwts = jwtService.getToken(auth.getName());

        log.info("User logged in successfully. jwts: {}", jwts);

        // 인증된 사용자 정보 가져오기
        Member loginMember = loginService.login(member);
        if (loginMember != null) {
            log.info("User logged in successfully. Username: {}", loginMember.getName());

            // 패스워드 정보는 클라이언트로 전달하지 않음
            loginMember.setPassword(null);

            // JWT 토큰을 헤더에 포함시키고 사용자 정보를 응답 본문으로 반환
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                    .body(loginMember);  // 사용자 정보 JSON으로 반환
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
