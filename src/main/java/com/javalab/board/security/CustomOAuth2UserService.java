package com.javalab.board.security;

import com.javalab.board.repository.MemberRepository;
import com.javalab.board.security.dto.MemberSecurityDTO;
import com.javalab.board.vo.Member;
import com.javalab.board.vo.Role; // Import the Role enum
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger log = LogManager.getLogger(CustomOAuth2UserService.class);
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomOAuth2UserService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String clientName = userRequest.getClientRegistration().getClientName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = clientName.equals("kakao") ? getKakaoEmail(attributes) : "";
        String name = clientName.equals("kakao") ? getKakaoUserName(attributes) : "";

        return generateSecurityDTO(email, name, attributes);
    }

    private MemberSecurityDTO generateSecurityDTO(String email, String name, Map<String, Object> attributes) {
        Member member = memberRepository.findByEmail(email);

        if (member == null) {
            member = Member.builder()
                    .email(email)
                    .name(name)
                    .social(true)
                    .password(passwordEncoder.encode("default_password")) // Consider using a more secure default password strategy
                    .role(Role.CUSTOMER) // Use the Role enum
                    .del(false)
                    .build();
            memberRepository.save(member);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + member.getRole().name())); // Convert Role enum to string

        MemberSecurityDTO memberSecurityDTO = new MemberSecurityDTO(
                member.getMemberId(),
                member.getEmail(),
                member.getPassword(),
                member.getRole().name(), // Convert Role enum to string
                authorities,
                member.getDel(),
                member.getSocial()
        );
        memberSecurityDTO.setProps(attributes);

        return memberSecurityDTO;
    }

    private String getKakaoEmail(Map<String, Object> paramMap) {
        LinkedHashMap<?, ?> accountMap = (LinkedHashMap<?, ?>) paramMap.get("kakao_account");
        return (String) accountMap.get("email");
    }

    private String getKakaoUserName(Map<String, Object> paramMap) {
        LinkedHashMap<?, ?> kakaoAccount = (LinkedHashMap<?, ?>) paramMap.get("kakao_account");
        LinkedHashMap<?, ?> profile = (LinkedHashMap<?, ?>) kakaoAccount.get("profile");
        return (String) profile.get("nickname");
    }
}
