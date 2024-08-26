import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNoticeById } from './NoticeService';
import './NoticeView.css';

const NoticeView = () => {
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noticeNo } = useParams();

  const fetchNotice = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNoticeById(noticeNo);
      setNotice(data);
    } catch (error) {
      console.error('공지사항을 불러오는 데 실패했습니다:', error);
      setError('공지사항을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [noticeNo]);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="notice-view">
      <h1>{notice.title}</h1>
      <hr className="view-underline" />
      <p className="notice-meta">{new Date(notice.regdate).toLocaleDateString()}</p>
      <div className="notice-content">{notice.content}</div>
      <div className="notice-actions">
        <Link to="/notices" className="back-link">목록으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default NoticeView;