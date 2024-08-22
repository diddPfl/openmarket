import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNoticeById, deleteNotice } from './NoticeService';
import './NoticeView.css';

const NoticeView = () => {
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { noticeNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotice();
  }, [noticeNo]);

  const fetchNotice = async () => {
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
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        await deleteNotice(noticeNo);
        navigate('/notices');
      } catch (error) {
        console.error('공지사항 삭제에 실패했습니다:', error);
        alert('공지사항 삭제에 실패했습니다. 나중에 다시 시도해 주세요.');
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!notice) return <div>공지사항을 찾을 수 없습니다.</div>;

  return (
    <div className="notice-view">
      <h1>{notice.title}</h1>
      <p>등록일: {new Date(notice.regdate).toLocaleDateString()}</p>
      <div className="notice-content">{notice.content}</div>
      <div className="notice-actions">
        <Link to={`/notices/${noticeNo}/edit`} className="edit-link">수정</Link>
        <button onClick={handleDelete} className="delete-button">삭제</button>
        <Link to="/notices" className="back-link">목록으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default NoticeView;