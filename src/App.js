import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import HeroSection from './HeroSection.jsx';
import SearchSection from './SearchSection.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import Modal from './Modal.jsx';
import './index.css';

function App() {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // 사용자 정보를 localStorage에 저장
    localStorage.setItem('user', JSON.stringify(userData));
    closeModal();
  };

  const handleLogout = () => {
    setUser(null);
    // localStorage에서 사용자 정보 제거
    localStorage.removeItem('user');
  };

  return (
    <div>
      <Header openModal={openModal} user={user} onLogout={handleLogout} />
      <HeroSection />
      <SearchSection />
      <ProjectGrid />
      {modalType && (
        <Modal
          modalType={modalType}
          closeModal={closeModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default App;