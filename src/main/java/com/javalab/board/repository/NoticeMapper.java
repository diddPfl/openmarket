package com.javalab.board.repository;

import com.javalab.board.vo.Notice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {

    List<Notice> getAllNotices();

    Notice getNoticeById(@Param("noticeNo") Long noticeNo);

    int insertNotice(Notice notice);

    int updateNotice(Notice notice);

    int deleteNotice(@Param("noticeNo") Long noticeNo);

    List<Notice> getNoticesByMemberId(@Param("memberId") Long memberId);

    List<Notice> searchNoticesByTitle(@Param("title") String title);

    List<Notice> getNoticesWithPaging(@Param("offset") int offset, @Param("limit") int limit);

    long getNoticeCount();

}