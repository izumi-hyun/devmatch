import React, { useState } from 'react';
import axios from 'axios';

function Modal({ modalType, closeModal, onLoginSuccess }) {
  const isLogin = modalType === 'login';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: '',
    university: '',
    grade: '',
    profile_info: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 로그인 요청
        const response = await axios.post('http://devmatch.ddns.net:2000/auth/doLogin', {
          email: formData.email,
          password: formData.password
        });
        console.log('로그인 성공')
        onLoginSuccess(response.data.user);
        
        closeModal();
      } else {
        // 회원가입 요청
        const response = await axios.post('http://devmatch.ddns.net:2000/auth/doSignup', {
          username: formData.name,
          password: formData.password,
          email: formData.email,
          role: formData.role,
          university: formData.university,
          grade: formData.grade,
          profile_info: formData.profile_info
        });
        alert('회원가입 성공! 로그인 해주세요.');
        closeModal();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.error || '요청 처리 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="form-group" onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={formData.password} onChange={handleChange} required />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="role">주요 역할</label>
                <select id="role" value={formData.role} onChange={handleChange} required>
                  <option value="">역할을 선택하세요</option>
                  <option value="Developer">개발자</option>
                  <option value="Designer">디자이너</option>
                  <option value="Planner">기획자</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="university">대학교</label>
                <input type="text" id="university" value={formData.university} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="grade">학년</label>
                <select id="grade" value={formData.grade} onChange={handleChange} required>
                  <option value="">학년을 선택하세요</option>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="Graduate">대학원생</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profile_info">프로필 정보</label>
                <textarea id="profile_info" value={formData.profile_info} onChange={handleChange}></textarea>
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
