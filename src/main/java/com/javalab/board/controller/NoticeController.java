package com.javalab.board.controller;

import com.javalab.board.service.NoticeService;
import com.javalab.board.vo.Notice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@Slf4j
public class NoticeController {

	private final NoticeService noticeService;

	@Autowired
	public NoticeController(NoticeService noticeService) {
		this.noticeService = noticeService;
	}

	@GetMapping
	public ResponseEntity<List<Notice>> listNotices() {
		try {
			List<Notice> notices = noticeService.getAllNotices();
			return ResponseEntity.ok(notices);
		} catch (Exception e) {
			log.error("공지사항 목록 조회 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/{noticeNo}")
	public ResponseEntity<Notice> viewNotice(@PathVariable("noticeNo") Long noticeNo) {
		try {
			Notice notice = noticeService.getNoticeById(noticeNo);
			if (notice == null) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(notice);
		} catch (Exception e) {
			log.error("공지사항 조회 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping
	public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
		try {
			Notice createdNotice = noticeService.createNotice(notice);
			return ResponseEntity.status(HttpStatus.CREATED).body(createdNotice);
		} catch (Exception e) {
			log.error("공지사항 생성 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/{noticeNo}")
	public ResponseEntity<Notice> updateNotice(@PathVariable("noticeNo") Long noticeNo, @RequestBody Notice notice) {
		try {
			notice.setNoticeNo(noticeNo);
			Notice updatedNotice = noticeService.updateNotice(notice);
			return ResponseEntity.ok(updatedNotice);
		} catch (Exception e) {
			log.error("공지사항 수정 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping("/{noticeNo}")
	public ResponseEntity<Void> deleteNotice(@PathVariable("noticeNo") Long noticeNo) {
		try {
			noticeService.deleteNotice(noticeNo);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("공지사항 삭제 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}