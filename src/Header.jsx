import React from 'react';
import axios from 'axios';

function Header({ openModal, user, onLogout }) {
  const handleLogout = async () => {
    try {
      await axios.post('http://devmatch.ddns.net:2000/auth/doLogout', {}, { withCredentials: true });
      onLogout();
    } catch (error) {
      console.error('로그아웃 오류:', error.response?.data || error.message);
    }
  };

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
          {user ? (
            <>
              <span className="username">{user.username}</span>
              <button className="btn btn-outline" onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => openModal('login')}>로그인</button>
              <button className="btn btn-primary" onClick={() => openModal('signup')}>회원가입</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
