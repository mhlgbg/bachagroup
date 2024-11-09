import React, { useState } from 'react';
import axios from '../api/api';
import ReCAPTCHA from 'react-google-recaptcha'; // Thư viện reCAPTCHA
import './Contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', address: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false); // Khóa submit trong vòng 1 phút

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Lưu mã token khi CAPTCHA được xác nhận
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA verification');
      return;
    }

    try {
      const response = await axios.post('/contacts', { ...formData, captchaToken });
      alert('Your message has been sent!');
      setFormData({ name: '', email: '', phone: '', company: '', address: '', message: '' }); // Reset form
      setCaptchaToken(''); // Reset CAPTCHA
      setSubmitDisabled(true); // Khóa submit
      setTimeout(() => setSubmitDisabled(false), 60000); // Mở khóa sau 1 phút
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
<div className="contact-container">

      <p>Vui lòng để lại thông tin dịch vụ bạn quan tâm hoặc ý kiến.
      Chúng tôi sẽ liên lạc và trả lời sớm nhất.</p>
      <p>
        Bằng cách nhấp vào "Gửi tin nhắn", tôi thừa nhận và hiểu rằng thông tin cá nhân của tôi có thể
        được thu thập và sử dụng như được mô tả trong Chính sách quyền riêng tư của Bak, bao gồm gửi cho tôi
        thông tin liên lạc về các sản phẩm, dịch vụ và sự kiện của Bak.
      </p>
      <p><strong>Liên hệ:</strong> +84 24 33547545</p>
      <p><strong>Địa chỉ:</strong> TT19 A26, khu đô thị Văn Quán, Hà Đông, Hà Nội</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input type="text" name="company" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" className="form-control" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" className="form-control" onChange={handleChange} required />
        </div>

        {/* CAPTCHA */}
        <ReCAPTCHA
          sitekey="6Lc402sqAAAAAPWoGiRFWzPDaMJ0oe3aTxhnK8om" // Thay bằng mã site key của bạn
          onChange={handleCaptchaChange}
        />

        <button type="submit" className="btn btn-primary" disabled={submitDisabled}>Send</button>
      </form>
    </div>
  );
};

export default Contact;
