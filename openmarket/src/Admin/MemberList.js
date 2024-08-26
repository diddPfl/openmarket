import React, { useState, useEffect } from 'react';
import { adminApi } from './api';
import './AdminCommon.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.fetchMembers();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to fetch members. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading members...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <h2>회원 관리</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>회원 ID</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.memberId}>
              <td>{member.memberId}</td>
              <td>{member.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;