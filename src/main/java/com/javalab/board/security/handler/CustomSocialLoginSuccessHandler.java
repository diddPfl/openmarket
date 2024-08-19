//package com.javalab.board.security.handler;
//
//
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//
//import java.io.IOException;
//
///**
// * 소셜 로그인 성공 후처리 담당 클래스
// */
//@Log4j2
//@RequiredArgsConstructor
//public class CustomSocialLoginSuccessHandler implements AuthenticationSuccessHandler {
//    // 비밀번호 인코딩 객체 의존성 주입
//    private final PasswordEncoder passwordEncoder;
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication)
//            throws IOException, ServletException {
//
//        //log.info("CustomLoginSuccessHandler authentication : " + authentication);
//        //log.info("CustomLoginSuccessHandler authentication.getPrincipal() : " + authentication.getPrincipal());
//
//
//
//    }
//}
