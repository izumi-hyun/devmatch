import React, { useState } from 'react';
import Header from './Header.jsx';
import HeroSection from './HeroSection.jsx';
import SearchSection from './SearchSection.jsx';
import ProjectGrid from './ProjectGrid.jsx';
import Modal from './Modal.jsx';
import './index.css'

function App() {
  const [modalType, setModalType] = useState(null); // 로그인 or 회원가입 모달 상태 관리

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div>
      <Header openModal={openModal} />
      <HeroSection />
      <SearchSection />
      <ProjectGrid />
      {modalType && <Modal modalType={modalType} closeModal={closeModal} />}
    </div>
  );
}

export default App;
