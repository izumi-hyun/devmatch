import React, { useState } from 'react';
import Header from './Header.jsx';
import HeroSection from './HeroSection.jsx';
import SearchSection from './SearchSection.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import Modal from './Modal.jsx';
import './index.css';

function App() {
  const [modalType, setModalType] = useState(null); // 로그인 or 회원가입 모달 상태 관리
  const [user, setUser] = useState(null); // 로그인된 사용자 상태 관리

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // 로그인 성공 시 사용자 상태 업데이트
    closeModal(); // 모달 닫기
  };

  const handleLogout = () => {
    setUser(null); // 로그아웃 시 사용자 상태 초기화
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
