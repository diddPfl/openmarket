package com.javalab.board.security.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class MemberSecurityDTO extends User implements OAuth2User {

    private Long memberId;
    private String email;
    private String name;
    private boolean del;
    private boolean social;
    private String role;
    private Map<String, Object> props;

    public MemberSecurityDTO(Long memberId,
                             String username,
                             String password,
                             String role,
                             Collection<? extends GrantedAuthority> authorities,
                             boolean del,
                             boolean social,
                             String name) {
        super(username, password, authorities);
        this.memberId = memberId;
        this.email = username;
        this.name = name;
        this.role = role;
        this.del = del;
        this.social = social;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public boolean isDel() {
        return del;
    }

    public boolean isSocial() {
        return social;
    }

    public String getRole() {
        return role;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.props;
    }

    public void setProps(Map<String, Object> props) {
        this.props = props;
    }

    @Override
    public String toString() {
        return "MemberSecurityDTO{" +
                "memberId=" + memberId +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", del=" + del +
                ", social=" + social +
                ", role='" + role + '\'' +
                ", props=" + props +
                '}';
    }
}