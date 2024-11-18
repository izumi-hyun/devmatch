import React, { useState } from 'react';
import axios from 'axios';

function Modal({ modalType, closeModal, onLoginSuccess }) {
  const isLogin = modalType === 'login';
  const isTeamFinder = modalType === 'teamFinder';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: '',
    university: '',
    grade: '',
    profile_info: '',
    projectName: '',
    description: '',
    required_developers: 0,
    required_designers: 0,
    required_planners: 0,
    stackIds: []  // 기술 스택 선택을 위한 상태 추가
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleStackChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      stackIds: selectedOptions
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
        console.log('로그인 성공');
        onLoginSuccess(response.data.user);
        closeModal();
      } else if (isTeamFinder) {
        // 팀원 찾기 폼에서 기술 스택을 포함한 데이터를 서버로 전송
        await axios.post('http://devmatch.ddns.net:2000/project/projectUpload', {
          project_name: formData.projectName,
          description: formData.description,
          required_developers: formData.required_developers,
          required_designers: formData.required_designers,
          required_planners: formData.required_planners,
          stack_ids: formData.stackIds  // 선택된 기술 스택 IDs
        });
			alert('팀원 찾기 요청이 성공적으로 제출되었습니다.');
			closeModal();
      } else {
        await axios.post('http://devmatch.ddns.net:2000/auth/doSignup', {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role,
          university: formData.university,
          grade: formData.grade,
          profile_info: formData.profile_info,
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
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{isLogin ? '로그인' : isTeamFinder ? '팀원 찾기' : '회원가입'}</h2>
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
          ) : isTeamFinder ? (
            <>
              <div className="form-group">
                <label htmlFor="projectName">프로젝트 명</label>
                <input type="text" id="projectName" value={formData.projectName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">대회 설명</label>
                <textarea id="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="required_developers">필요한 개발자 수</label>
                <input type="number" id="required_developers" value={formData.required_developers} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="required_designers">필요한 디자이너 수</label>
                <input type="number" id="required_designers" value={formData.required_designers} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="required_planners">필요한 기획자 수</label>
                <input type="number" id="required_planners" value={formData.required_planners} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="stackIds">기술 스택 선택</label>
                <select id="stackIds" value={formData.stackIds} onChange={handleStackChange} multiple required>
                  <option value="1">React</option>
                  <option value="2">Node.js</option>
                  <option value="3">Python</option>
                  <option value="4">Figma</option>
                  <option value="5">UI/UX</option>
                </select>
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
            {isLogin ? '로그인' : isTeamFinder ? '팀원 찾기' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
