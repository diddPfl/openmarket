import React from 'react';
import ItemList from './ItemList';
import MemberList from './MemberList';
import BrandList from './BrandList';
import NoticeList from './NoticeList';

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ItemList />
      <MemberList />
      <BrandList />
      <NoticeList />
    </div>
  );
};

export default Admin;