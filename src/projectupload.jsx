import React, { useState } from 'react';
import axios from 'axios';

function ProjectForm({ closeModal }) {
  const [formData, setFormData] = useState({
    project_name: '',
    description: '',
    required_developers: 0,
    required_designers: 0,
    required_planners: 0,
    stack_ids: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'stack_ids' ? value.split(',').map(Number) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://devmatch.ddns.net:2000/projectUpload', formData, {
        withCredentials: true,
      });
      alert('프로젝트 업로드 성공!');
      closeModal();
    } catch (error) {
      console.error('프로젝트 업로드 실패:', error.response?.data || error.message);
      alert('프로젝트 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <label>
        프로젝트 이름:
        <input type="text" name="project_name" value={formData.project_name} onChange={handleChange} required />
      </label>
      <label>
        설명:
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
      </label>
      <label>
        개발자 필요 인원:
        <input type="number" name="required_developers" value={formData.required_developers} onChange={handleChange} min="0" required />
      </label>
      <label>
        디자이너 필요 인원:
        <input type="number" name="required_designers" value={formData.required_designers} onChange={handleChange} min="0" required />
      </label>
      <label>
        기획자 필요 인원:
        <input type="number" name="required_planners" value={formData.required_planners} onChange={handleChange} min="0" required />
      </label>
      <label>
        기술 스택 ID (쉼표로 구분):
        <input type="text" name="stack_ids" value={formData.stack_ids} onChange={handleChange} placeholder="예: 1,2,3" required />
      </label>
      <button type="submit">프로젝트 업로드</button>
      <button type="button" onClick={closeModal}>취소</button>
    </form>
  );
}

export default ProjectForm;
