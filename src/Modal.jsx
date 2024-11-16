import React, { useState } from 'react';

function Modal({ modalType, closeModal }) {
  const isLogin = modalType === 'login';

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        <form className="form-group">
          {isLogin ? (
            <>
              <div className="form-group">
                <label htmlFor="loginEmail">이메일</label>
                <input type="email" id="loginEmail" required />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">비밀번호</label>
                <input type="password" id="loginPassword" required />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="signupName">이름</label>
                <input type="text" id="signupName" required />
              </div>
              <div className="form-group">
                <label htmlFor="signupEmail">이메일</label>
                <input type="email" id="signupEmail" required />
              </div>
              <div className="form-group">
                <label htmlFor="signupRole">주요 역할</label>
                <select id="signupRole" required>
                  <option value="">역할을 선택하세요</option>
                  <option value="frontend">프론트엔드</option>
                  <option value="backend">백엔드</option>
                  <option value="design">디자인</option>
                  <option value="pm">기획/PM</option>
                </select>
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
