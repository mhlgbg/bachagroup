import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import About from './components/About';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail'; // Import ArticleDetail component
import CategoryArticles from './components/CategoryArticles';


import './App.css'; // Import file CSS chung

function App() {
  return (
    <Router>
      <NavigationBar />
      
      {/* Bao bọc các trang con bằng div có màu nền chung */}
      <div className="page-background">
        <div className="content-container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/article-detail/:key" element={<ArticleDetail />} />
            <Route path="/category/:key" element={<CategoryArticles />} /> {/* Route đến trang category */}

          </Routes>
        </div>
      </div>
      <Footer /> {/* Footer nằm ở cuối trang */}

    </Router>
  );
}

export default App;
