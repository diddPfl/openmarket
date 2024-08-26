package com.javalab.board.service;

import com.javalab.board.vo.Notice;

import java.util.List;

public interface NoticeService {
	List<Notice> getAllNotices();
	Notice getNoticeById(Long noticeNo);
	Notice createNotice(Notice notice);
	Notice updateNotice(Notice notice);
	void deleteNotice(Long noticeNo);
	long getNoticeCount();
}