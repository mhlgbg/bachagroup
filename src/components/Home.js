import React, { useEffect, useState } from 'react';
import './Home.css'; // Import CSS tùy chỉnh cho trang Home
import { Link } from 'react-router-dom';
import axios from '../api/api';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    axios.get('/categories/671a6da492f44555b0b5f943/articles')
      .then(response => {
        const { articles } = response.data;
        setArticles(articles);
        setVisibleArticles(articles.slice(0, 4));
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  useEffect(() => {
    if (articles.length > 4) {
      const interval = setInterval(() => {
        const nextIndex = (startIndex + 4) % articles.length;
        const newVisibleArticles = articles.slice(nextIndex, nextIndex + 4);

        if (newVisibleArticles.length < 4) {
          const additionalArticles = articles.slice(0, 4 - newVisibleArticles.length);
          setVisibleArticles([...newVisibleArticles, ...additionalArticles]);
        } else {
          setVisibleArticles(newVisibleArticles);
        }

        setStartIndex(nextIndex);
      }, 5000);

      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setVisibleArticles(articles);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [articles, startIndex]);

  return (
    <div className="h-home-container">
      <div className="h-first-row">
        <div className="h-column-left">
          <h2>CÔNG TY CỔ PHẦN TẬP ĐOÀN THƯƠNG MẠI BẮC HÀ</h2>
          <div className="h-buttons-row">
            <Link to="/article-detail/gioi-thieu" className="h-btn h-btn-about">Về BAK Group</Link>
            <Link to="/contact" className="h-btn h-btn-register">Đăng ký sử dụng dịch vụ</Link>
          </div>
        </div>
        <div className="h-column-right">
          <img
            src="/images/bak1.jpg"
            alt="BachaGroup"
            className="h-representative-image"
          />
        </div>
      </div>

      <div className="h-second-row">
        <div className="h-second-column h-column-left">
          <img
            src="/images/bak2.jpg"
            alt="Mission Image"
            className="h-mission-image"
          />
        </div>
        <div className="h-second-column h-column-right">
          <h3>Sứ mệnh của BAK</h3>
          <p>Vì một Việt Nam Thịnh Vượng</p>
          <ul className="h-mission-list">
            <li>Tổ chức sự kiện</li>
            <li>Tổ chức hội chợ, triển lãm</li>
            <li>Truyền thông quảng cáo</li>
          </ul>
          <Link to="/category/dich-vu" className="h-btn h-btn-services">Tìm hiểu các dịch vụ</Link>
        </div>
      </div>

      <div className="h-services-container">
        <h2>Các dịch vụ của Bắc Hà</h2>
        <div className="h-articles-grid">
          {visibleArticles.map(article => (
            <div className="h-article-card" key={article._id}>
              <h3 className="h-article-title">{article.title}</h3>
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/${article.thumbnailImage}`}
                alt={article.title}
                className="h-article-image"
              />
              <p className="h-article-summary">{article.summary}</p>
              <Link to={`/article-detail/${article.key}`} className="h-article-link">Chi tiết</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
