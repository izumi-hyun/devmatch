import React from 'react';

function Header({ openModal }) {
  return (
    <header>
      <div className="header-content">
        <div className="logo">DevMatch</div>
        <nav className="nav-menu">
          <a href="#" className="btn">프로젝트 찾기</a>
          <a href="#" className="btn">팀원 찾기</a>
          <a href="#" className="btn">커뮤니티</a>
        </nav>
        <div className="auth-buttons">
          <button className="btn btn-outline" onClick={() => openModal('login')}>로그인</button>
          <button className="btn btn-primary" onClick={() => openModal('signup')}>회원가입</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
