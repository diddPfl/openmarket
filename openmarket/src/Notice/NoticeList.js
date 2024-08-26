import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNotices } from './NoticeService';
import './NoticeList.css';

const NoticeList = () => {
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="customer-service-page">
      <h1 className="title">공지사항</h1>
      <hr className="underline" />
      {notices.length === 0 ? (
        <p>공지사항이 없습니다.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header table-title">제목</th>
              <th className="table-header registration-date">등록일자</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice.noticeNo}>
                <td className="table-cell">
                  <Link to={`/notices/${notice.noticeNo}`} className="notice-title">
                    {notice.title}
                  </Link>
                </td>
                <td className="table-cell registration-date">
                  {notice.regdate ? new Date(notice.regdate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NoticeList;