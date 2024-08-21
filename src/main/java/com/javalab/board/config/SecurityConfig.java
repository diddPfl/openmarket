package com.javalab.board.config;

import com.javalab.board.handler.AuthFailureHandler;
import com.javalab.board.security.MemberService;
import com.javalab.board.security.handler.CustomSocialLoginSuccessHandler;
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
    private final AccessDeniedHandler accessDeniedHandler;
    private final PasswordEncoder passwordEncoder;
    private final CustomSocialLoginSuccessHandler customSocialLoginSuccessHandler;

    @Autowired
    public SecurityConfig(
            MemberService memberService,
            AuthFailureHandler authFailureHandler,
            AccessDeniedHandler accessDeniedHandler,
            PasswordEncoder passwordEncoder,
            CustomSocialLoginSuccessHandler customSocialLoginSuccessHandler) {
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
                .csrf(csrf -> csrf.disable())  // Disable CSRF for API requests
                .formLogin(formLogin -> formLogin
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .usernameParameter("email")
                        .passwordParameter("password")
                        .successHandler(customSocialLoginSuccessHandler)  // Use custom success handler
                        .failureHandler(authFailureHandler)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/members", "/api/login", "/api/logout", "/login", "/signup").permitAll()
                        .requestMatchers("/", "/css/**", "/js/**", "/images/**", "/fonts/**", "/ckeditor2/**", "/vendor/**").permitAll()
                        .requestMatchers("/view/**", "/emp/**").permitAll()
                        .requestMatchers("/", "/{path:[^\\.]*}").permitAll()
                        .requestMatchers("/board/**").permitAll()
                        .requestMatchers("/item/view/**", "/item/list/**", "/item/read/**").permitAll()
                        .requestMatchers("/mypage/**", "/mypage/cart/**", "/mypage/reviews", "/order/**").permitAll()
                        .requestMatchers("/member/modify").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/item/register/**", "/item/modify/**", "/item/remove/**").hasRole("ADMIN")
                        .requestMatchers("/cart/**", "/cartItem/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/track/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .rememberMe(rememberMe -> rememberMe
                        .userDetailsService(memberService)
                        .alwaysRemember(false)
                        .tokenValiditySeconds(43200)
                        .rememberMeParameter("remember-me")
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(accessDeniedHandler)
                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/login")
                        .successHandler(customSocialLoginSuccessHandler)  // Use custom success handler
                );

        http.authenticationManager(auth.build());
        return http.build();
    }
}
