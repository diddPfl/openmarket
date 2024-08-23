import React, { useState, useEffect } from 'react';
import { adminApi } from './api';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    adminApi.fetchMembers().then(setMembers).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map(member => (
          <li key={member.memberId}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;