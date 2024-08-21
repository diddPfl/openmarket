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
import org.springframework.stereotype.Component;

@Component
public class CustomSocialLoginSuccessHandler implements AuthenticationSuccessHandler {
    private static final Logger log = LogManager.getLogger(CustomSocialLoginSuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Social Login Success");

        MemberSecurityDTO memberSecurityDTO = (MemberSecurityDTO) authentication.getPrincipal();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        if (memberSecurityDTO.isSocial() && memberSecurityDTO.getPassword().equals("1111")) {
            response.getWriter().write("{\"success\":true,\"redirect\":\"/member/modify?from=social\"}");
        } else {
            response.getWriter().write("{\"success\":true,\"redirect\":\"/\"}");
        }
    }
}
