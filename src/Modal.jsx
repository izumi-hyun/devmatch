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
        const response = await axios.post('http://devmatch.ddns.net:2000/auth/doLogin', {
          email: formData.email,
          password: formData.password
        }, { withCredentials: true });
        
        onLoginSuccess(response.data.user);
        closeModal();
      } else {
        await axios.post('http://devmatch.ddns.net:2000/auth/doSignup', {
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
      setErrorMessage(
        error.response?.data?.error || '요청 처리 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      {/* 모달 코드 생략 */}
    </div>
  );
}

export default Modal;
