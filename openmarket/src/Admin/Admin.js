import React from 'react';
import ItemList from './ItemList';
import MemberList from './MemberList';
import BrandList from './BrandList';

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ItemList />
      <MemberList />
      <BrandList />
    </div>
  );
};

export default Admin;