import React, { useState, useEffect } from 'react';

function Header({ openModal, user, onLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 사용자가 로그인했는지 확인
    if (user && user.username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

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
          {isLoggedIn ? (
            <>
              <span className="username">{user.username}</span>
              <button className="btn btn-outline" onClick={onLogout}>로그아웃</button>
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
