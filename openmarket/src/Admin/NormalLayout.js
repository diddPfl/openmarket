import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const NormalLayout = ({ children }) => {
  return (
    <div className="normal-layout">
      <Header />
      <main className="normal-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default NormalLayout;