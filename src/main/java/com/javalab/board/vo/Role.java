package com.javalab.board.vo;

public enum Role {
    CUSTOMER("고객"),
    ADMIN("관리자"),
    SELLER("판매자"),
    APPROVED_SELLER("판매승인");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Role fromDisplayName(String displayName) {
        for (Role role : values()) {
            if (role.getDisplayName().equals(displayName)) {
                return role;
            }
        }
        throw new IllegalArgumentException("No enum constant " + Role.class.getCanonicalName() + " with display name " + displayName);
    }
}