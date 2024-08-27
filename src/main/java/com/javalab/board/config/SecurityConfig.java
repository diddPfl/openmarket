package com.javalab.board.config;

import com.javalab.board.handler.AuthFailureHandler;
import com.javalab.board.security.JwtService;
import com.javalab.board.security.MemberService;
import com.javalab.board.security.handler.CustomSocialLoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MemberService memberService;
    private final AuthFailureHandler authFailureHandler;
    private final AccessDeniedHandler accessDeniedHandler;
    private final PasswordEncoder passwordEncoder;
    private final CustomSocialLoginSuccessHandler customSocialLoginSuccessHandler;
    private final JwtService jwtService;

    @Autowired
    public SecurityConfig(
            MemberService memberService,
            AuthFailureHandler authFailureHandler,
            AccessDeniedHandler accessDeniedHandler,
            PasswordEncoder passwordEncoder,
            CustomSocialLoginSuccessHandler customSocialLoginSuccessHandler,
            JwtService jwtService) {
        this.memberService = memberService;
        this.authFailureHandler = authFailureHandler;
        this.accessDeniedHandler = accessDeniedHandler;
        this.passwordEncoder = passwordEncoder;
        this.customSocialLoginSuccessHandler = customSocialLoginSuccessHandler;
        this.jwtService = jwtService;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
        return auth.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                //.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .httpBasic(b -> b.disable())
                .formLogin(f -> f.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // .addFilterBefore(new TokenCheckFilter(jwtService, memberService), UsernamePasswordAuthenticationFilter.class)
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/login", "/api/signup", "/api/members").permitAll()
                        .requestMatchers("/", "/css/**", "/js/**", "/images/**", "/fonts/**", "/ckeditor2/**", "/vendor/**").permitAll()
                        .requestMatchers("/view/**", "/emp/**", "/board/**").permitAll()
                        .requestMatchers("/", "/{path:[^\\.]*}").permitAll()
                        .requestMatchers("/items/**", "/item/read/**", "/review/**").permitAll()
                        .requestMatchers("/api/category/**", "/api/categoryitems/**", "/api/notices/**", "/api/search","/api/admin/**","/api/order-statistics/**").permitAll()
                        .requestMatchers("/mypage/**", "/mypage/cart/**", "/mypage/reviews", "/order/**").permitAll()
                        .requestMatchers("/mypage/cart/payment/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/member/modify").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/item/register/**", "/item/modify/**", "/item/remove/**").hasRole("ADMIN")
                        .requestMatchers("/cart/**", "/cartItem/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers( "/admin/item/insert").hasRole("ADMIN")
                        .requestMatchers("/api/track/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/items/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/items/**").permitAll()
                        .requestMatchers("/api/mypage").authenticated()
                        .requestMatchers("/api/cart/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(
                                "/", "/css/**", "/js/**", "/images/**", "/fonts/**", "/ckeditor2/**", "/vendor/**",
                                "/**/*.ico", "/**/*.html", "/**/*.png", "/**/*.jpg", "/**/*.gif", "/**/*.svg", "/**/*.json",
                                "/path/to/**" // Add this line to cover your fallback image path
                        ).permitAll()
                        .requestMatchers("/api/mypage/deliverylist/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )
                .rememberMe(rememberMe -> rememberMe
                        .userDetailsService(memberService)
                        .alwaysRemember(false)
                        .tokenValiditySeconds(43200)
                        .rememberMeParameter("remember-me")
                )
//                .exceptionHandling(exception -> exception
//                        .authenticationEntryPoint((request, response, authException) -> {
//                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//                        })
//                        .accessDeniedHandler(accessDeniedHandler)
//                )
                .oauth2Login(oauth2Login -> oauth2Login
                        .loginPage("/login")
                        .successHandler(customSocialLoginSuccessHandler)
                );
        return http.build();
    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setAllowCredentials(true);
//        configuration.setExposedHeaders(Arrays.asList("Authorization"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}


