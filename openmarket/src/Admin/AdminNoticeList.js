import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNotices, deleteNotice } from '../Notice/NoticeService';
import './AdminCommon.css';

const AdminNoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllNotices();
      setNotices(data);
    } catch (error) {
      console.error('공지사항을 불러오는 데 실패했습니다:', error);
      setError('공지사항을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (noticeNo) => {
    if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
      try {
        await deleteNotice(noticeNo);
        fetchNotices(); // 목록 새로고침
      } catch (error) {
        console.error('공지사항 삭제에 실패했습니다:', error);
        alert('공지사항 삭제에 실패했습니다. 나중에 다시 시도해 주세요.');
      }
    }
  };

  if (isLoading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <h1>공지사항 관리</h1>
      <Link to="/admin/notices/new" className="admin-button">새 공지사항 작성</Link>
      {notices.length === 0 ? (
        <p>공지사항이 없습니다.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>등록일자</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.noticeNo}>
                <td>{notice.title}</td>
                <td>{notice.regdate ? new Date(notice.regdate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <Link to={`/admin/notices/${notice.noticeNo}/edit`} className="admin-button">수정</Link>
                  <button onClick={() => handleDelete(notice.noticeNo)} className="admin-button">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNoticeList;