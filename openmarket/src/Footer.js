import React from 'react';
import './Footer.css'; // CSS 파일을 임포트합니다.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-footer-section">
          <h4><i className="fas fa-phone"></i> 고객센터: 02-1234-5678</h4>
          <div className="company-info">
            <p>서울특별시 예시구 예시동 123-45</p>
            <p>사업자번호: 123-45-67890</p>
          </div>
        </div>
        <div className="p-footer-section">
          <h4>파트너 지원</h4>
          <ul>
            <li><a href="/faq">입점상담</a></li>
            <li><a href="/faq">광고신청</a></li>
          </ul>
        </div>
        <div className="footer-section social-media-section">
          <h4>소셜 미디어</h4>
          <ul className="social-media">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;