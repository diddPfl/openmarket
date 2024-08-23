import axios from 'axios';

const BASE_URL = '/api/notices';

export const getAllNotices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('공지사항 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getNoticeById = async (noticeNo) => {
  try {
    const response = await axios.get(`${BASE_URL}/${noticeNo}`);
    return response.data;
  } catch (error) {
    console.error(`공지사항 ${noticeNo} 조회 중 오류 발생:`, error);
    throw error;
  }
};

export const createNotice = async (notice) => {
  try {
    const response = await axios.post(BASE_URL, notice);
    return response.data;
  } catch (error) {
    console.error('공지사항 생성 중 오류 발생:', error);
    throw error;
  }
};

export const updateNotice = async (noticeNo, notice) => {
  try {
    const response = await axios.put(`${BASE_URL}/${noticeNo}`, notice);
    return response.data;
  } catch (error) {
    console.error(`공지사항 ${noticeNo} 수정 중 오류 발생:`, error);
    throw error;
  }
};

export const deleteNotice = async (noticeNo) => {
  try {
    await axios.delete(`${BASE_URL}/${noticeNo}`);
  } catch (error) {
    console.error(`공지사항 ${noticeNo} 삭제 중 오류 발생:`, error);
    throw error;
  }
};