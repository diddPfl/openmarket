package com.javalab.board.vo;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
	private Long noticeNo;
	private Long memberId;
	private String title;
	private String content;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDateTime regdate;
}