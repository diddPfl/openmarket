package com.javalab.board.security.handler;

import com.javalab.board.security.dto.MemberSecurityDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class CustomSocialLoginSuccessHandler implements AuthenticationSuccessHandler {
    private static final Logger log = LogManager.getLogger(CustomSocialLoginSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        MemberSecurityDTO memberSecurityDTO = (MemberSecurityDTO) authentication.getPrincipal();

        if (memberSecurityDTO.isSocial() && memberSecurityDTO.getPassword().equals("1111")) {
            log.info("CustomLoginSuccessHandler: Social login success, redirecting to modify password page.");
            response.sendRedirect("/member/modify?from=social");
        } else {
            log.info("CustomLoginSuccessHandler: Normal login success.");
            response.sendRedirect("/");
        }
    }
}