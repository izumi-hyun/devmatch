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

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // useEffect를 사용해 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://devmatch.ddns.net:2000/auth/checkSession', { withCredentials: true });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('로그인 상태 확인 오류:', error);
      }
    };
    checkLoginStatus();
  }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때 한 번만 실행되게 함

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    closeModal();
  };

  const handleLogout = () => {
    setUser(null);
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
