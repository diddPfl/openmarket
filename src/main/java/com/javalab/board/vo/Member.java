package com.javalab.board.vo;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    private Long memberId;
    private LocalDateTime regdate;
    private String address;
    private Boolean del;
    private String email;
    private String name;
    private String password;
    private Role role;
    private Boolean social;
    private LocalDateTime approvedAt;

    public void setDefaults() {
        if (this.regdate == null) {
            this.regdate = LocalDateTime.now();
        }
        if (this.role == null) {
            this.role = Role.CUSTOMER;
        }
        if (this.del == null) {
            this.del = false;
        }
        if (this.social == null) {
            this.social = false;
        }
    }

    public String getRoleName() {
        return this.role != null ? this.role.name() : null;
    }

    public String getRoleDisplayName() {
        return this.role != null ? this.role.getDisplayName() : null;
    }

    public void setRole(String roleName) {
        try {
            this.role = Role.valueOf(roleName.toUpperCase());
        } catch (IllegalArgumentException e) {
            this.role = Role.fromDisplayName(roleName);
        }
    }
}