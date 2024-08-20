package com.javalab.board.config;

import com.javalab.board.handler.AuthFailureHandler;
import com.javalab.board.security.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MemberService memberService;
    private final AuthFailureHandler authFailureHandler;
    private final AuthenticationSuccessHandler customSocialLoginSuccessHandler;
    private final AccessDeniedHandler accessDeniedHandler;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SecurityConfig(
            MemberService memberService,
            AuthFailureHandler authFailureHandler,
            AccessDeniedHandler accessDeniedHandler,
            PasswordEncoder passwordEncoder,
            @Qualifier("customSocialLoginSuccessHandler")
            AuthenticationSuccessHandler customSocialLoginSuccessHandler) {

        this.memberService = memberService;
        this.authFailureHandler = authFailureHandler;
        this.accessDeniedHandler = accessDeniedHandler;
        this.passwordEncoder = passwordEncoder;
        this.customSocialLoginSuccessHandler = customSocialLoginSuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);

        http
                .formLogin(formLogin -> formLogin
                        .loginPage("/member/login")
                        .loginProcessingUrl("/member/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler(customSocialLoginSuccessHandler)
                        .failureHandler(authFailureHandler)
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/member/logout"))
                        .logoutSuccessUrl("/member/login")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/mypage/cart", "/mypage/cart/**").permitAll()
                        .requestMatchers("/","/api/**").permitAll()
                        .requestMatchers("/mypage/**").permitAll()
                        .requestMatchers("/mypage/reviews").permitAll()
                        .requestMatchers("/order/**").permitAll()
                        .requestMatchers("/", "/css/**", "/js/**", "/images/**", "/fonts/**", "/ckeditor2/**", "/vendor/**").permitAll()
                        .requestMatchers("/view/**", "/emp/**").permitAll()
                        //.requestMatchers("/member/login", "/member/join/**", "/login").permitAll()
                        .requestMatchers("/member/login", "/login").permitAll()
                        .requestMatchers("/member/create").permitAll()  // Allow unauthenticated access to the member creation page
                        .requestMatchers("/member/modify").hasRole("USER")
                        .requestMatchers("/board/**").permitAll()
                        .requestMatchers("/item/view/**", "/item/list/**", "/item/read/**").permitAll()
                        .requestMatchers("/mypage").permitAll()
                        .requestMatchers("/item/register/**", "/item/modify/**", "/item/remove/**").hasRole("ADMIN")
                        .requestMatchers("/cart/**", "cartItem/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/track/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                ) // 아이디 기억 관련 설정
                .rememberMe(rememberMe -> rememberMe
                        .userDetailsService(memberService)  // Set UserDetailsService for remember-me
                        .alwaysRemember(false)
                        .tokenValiditySeconds(43200)
                        .rememberMeParameter("remember-me")
                ) // 권한 없는 페이지 요청 처리
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/member/login")
                        .successHandler(customSocialLoginSuccessHandler)
                );

        http.authenticationManager(auth.build());
        return http.build();
    }

}
