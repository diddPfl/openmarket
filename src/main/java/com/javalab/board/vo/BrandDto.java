package com.javalab.board.vo;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
	private Long memberId;
	private String email;
	private String name;
	private String address;
	private boolean del;
	private String role;
	private boolean social;
	private LocalDateTime approvedAt;
	private LocalDateTime regdate;
}