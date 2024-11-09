import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h4>CÔNG TY CỔ PHẦN TẬP ĐOÀN THƯƠNG MẠI BẮC HÀ
        </h4>
        <p>Địa chỉ: TT19 A26, khu đô thị Văn Quán, Hà Đông, Hà Nội</p>
        <p>Điện thoại: <a href="tel:+842433547545">+84 24 33547545</a></p>
        <p>Email: <a href="mailto:ducphong@bachagroup.com.vn">ducphong@bachagroup.com.vn</a></p>
        <p>
          <a 
            href="https://maps.app.goo.gl/sbtWTGPJrKyFEdSt5" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Xem bản đồ trên Google Maps
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
