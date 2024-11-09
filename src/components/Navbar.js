import React, { useEffect, useState } from 'react';
import axios from '../api/api'; // Điều chỉnh đường dẫn nếu cần
import { Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = () => {
  const [menuItems, setMenuItems] = useState([]); // Khởi tạo dưới dạng mảng rỗng

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/configurations/menu');
        
        // Parse configValue nếu response.data có configValue
        if (response.data && response.data.configValue) {
          const parsedMenuItems = JSON.parse(response.data.configValue);
          setMenuItems(parsedMenuItems);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="custom-navbar-container">
      <Navbar bg="custom" expand="lg" className="custom-navbar">
        <Navbar.Brand href="/">
          <img
            src="/images/logo.png" // Thay bằng đường dẫn đến logo của bạn
            alt="BachaGroup Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {menuItems.map((item, index) => (
              <Nav.Link key={index} href={item.link}>
                {item.title}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
