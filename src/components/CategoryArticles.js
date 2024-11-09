import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { useParams, Link } from 'react-router-dom';
import './CategoryArticles.css';

const CategoryArticles = () => {
    const { key } = useParams(); // Lấy key từ URL
    const [articles, setArticles] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const articlesPerPage = 12;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Gọi API để lấy danh sách bài viết cho phân loại với phân trang
                const response = await axios.get(`/categories/cat/${key}/articles`, {
                    params: {
                        page: currentPage,
                        limit: articlesPerPage,
                        sort: '-releaseDate'
                    }
                });

                // Cập nhật dữ liệu bài viết và phân loại
                setArticles(response.data.articles);
                setCategoryName(response.data.categoryName);
                setTotalPages(response.data.totalPages);

                // Đặt tiêu đề trang là tên phân loại
                document.title = response.data.categoryName;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [key, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="category-articles-container">
            <h1 className="category-title">{categoryName}</h1>
            <div className="articles-list">
                {articles.map((article) => (
                    <div key={article._id} className="article-item">
                        <div className="article-image">
                            <img src={`${process.env.REACT_APP_API_BASE_URL}/${article.thumbnailImage}`} alt={article.title} />
                        </div>
                        <div className="article-details">
                            <Link to={`/article-detail/${article.key}`} className="article-title-link">
                                <h2>{article.title}</h2>
                            </Link>
                            <p className="article-date">Ngày đăng: {new Date(article.releaseDate).toLocaleDateString()}</p>
                            <p className="article-summary">{article.summary}</p>
                            {/* Bọc nút trong một div để căn giữa */}
                            <div className="article-button-container">
                                <Link to={`/article-detail/${article.key}`} className="article-detail-button">
                                    Chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hiển thị phân trang */}
            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryArticles;
