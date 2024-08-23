package com.javalab.board.service;

import com.javalab.board.repository.NoticeMapper;
import com.javalab.board.vo.Notice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class NoticeServiceImpl implements NoticeService {

	private final NoticeMapper noticeMapper;

	@Autowired
	public NoticeServiceImpl(NoticeMapper noticeMapper) {
		this.noticeMapper = noticeMapper;
	}

	@Override
	public List<Notice> getAllNotices() {
		return noticeMapper.getAllNotices();
	}

	@Override
	public Notice getNoticeById(Long noticeNo) {
		return noticeMapper.getNoticeById(noticeNo);
	}

	@Override
	@Transactional
	public Notice createNotice(Notice notice) {
		log.info("공지사항 생성 시도: {}", notice);
		try {
			int result = noticeMapper.insertNotice(notice);
			log.info("INSERT 쿼리 실행 결과: {}", result);
			if (result == 0) {
				log.error("공지사항 생성 실패: 영향받은 행 없음");
				throw new RuntimeException("공지사항 생성에 실패했습니다.");
			}
			log.info("공지사항 생성 성공: {}", notice);
			return notice;
		} catch (Exception e) {
			log.error("공지사항 생성 중 예외 발생", e);
			throw new RuntimeException("공지사항 생성 중 오류가 발생했습니다.", e);
		}
	}

	@Override
	public Notice updateNotice(Notice notice) {
		noticeMapper.updateNotice(notice);
		return noticeMapper.getNoticeById(notice.getNoticeNo());
	}

	@Override
	public void deleteNotice(Long noticeNo) {
		noticeMapper.deleteNotice(noticeNo);
	}
}