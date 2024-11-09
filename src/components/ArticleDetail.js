import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { useParams } from 'react-router-dom';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { key } = useParams(); // Lấy key từ URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/articles/article/${key}/contents`);
        setArticle(response.data);
        document.title = response.data.title; // Đặt tiêu đề của trang web là tiêu đề bài viết
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [key]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="article-detail-container">
      {/* Tiêu đề bài viết */}
      <h1 className="article-title">{article.title}</h1>

      {/* Hàng chứa ảnh và summary */}
      <div className="article-header">
        <div className="article-image">
          <img src={`${process.env.REACT_APP_API_BASE_URL}/${article.thumbnailImage}`} alt={article.title} />
        </div>
        <div className="article-summary">
          <p>{article.summary}</p>
        </div>
      </div>

      {/* Danh sách các nội dung của bài viết */}
      <div className="article-contents">
        {article.contents.map((content) => {
          if (content.contentType === 'text') {
            return <p key={content._id} className="article-text">{content.contentValue}</p>;
          } else if (content.contentType === 'html') {
            return (
              <div
                key={content._id}
                className="article-html"
                dangerouslySetInnerHTML={{ __html: content.contentValue }}
              ></div>
            );
          } else if (content.contentType === 'video') {
            const videoId = content.contentValue.split('v=')[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return (
              <div key={content._id} className="article-video">
                <iframe
                  width="560"
                  height="315"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ArticleDetail;
