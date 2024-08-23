import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoticeById, createNotice, updateNotice } from '../Notice/NoticeService';
import './NoticeForm.css';

const NoticeForm = () => {
  const [notice, setNotice] = useState({ title: '', content: '', memberId: '1' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { noticeNo } = useParams();
  const navigate = useNavigate();

  const fetchNotice = useCallback(async () => {
    if (!noticeNo) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getNoticeById(noticeNo);
      setNotice(data);
    } catch (error) {
      setError('공지사항을 불러오는 데 실패했습니다.');
      console.error('공지사항을 불러오는 데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  }, [noticeNo]);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (notice.title.trim() === '' || notice.content.trim() === '') {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (noticeNo) {
        await updateNotice(noticeNo, notice);
        alert('공지사항이 성공적으로 수정되었습니다.');
      } else {
        await createNotice(notice);
        alert('새 공지사항이 성공적으로 생성되었습니다.');
      }
      navigate('/admin/notices');
    } catch (error) {
      setError(`공지사항을 ${noticeNo ? '수정' : '생성'}하는 데 실패했습니다. 다시 시도해 주세요.`);
      console.error('공지사항 저장에 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;

  return (
    <div className="notice-form-container">
      <h2>{noticeNo ? '공지사항 수정' : '새 공지사항 작성'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={notice.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={notice.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? '처리 중...' : (noticeNo ? '수정' : '작성')}
          </button>
          <button type="button" onClick={() => navigate('/admin/notices')} disabled={loading}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;