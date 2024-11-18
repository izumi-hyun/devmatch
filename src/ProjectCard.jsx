import React, { useState } from 'react';
import axios from 'axios';

function ProjectCard({ project }) {
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼을 보여줄지 말지 상태 관리

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setStatus('역할을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://your-api-endpoint/applyToProject', {
        id: 1, // 예시: 사용자 ID
        project_id: project.id,
        role: role, // 사용자가 선택한 역할
        status: 'applied', // 기본적으로 'applied'로 설정
      });

      if (response.status === 201) {
        setStatus('지원 완료');
      }
    } catch (error) {
      console.error('지원 중 오류 발생:', error);
      setStatus('지원 실패');
    }
  };

  const handleApplyClick = () => {
    setIsFormVisible(true); // "지원하기" 클릭 시 폼을 보이게 함
  };

  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tag-list">
        {project.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>

      {/* 지원하기 버튼 */}
      <button className="btn btn-primary" onClick={handleApplyClick}>
        지원하기
      </button>

      {/* 폼이 보여질 때만 렌더링 */}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">지원 역할</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">역할을 선택하세요</option>
              <option value="Developer">개발자</option>
              <option value="Designer">디자이너</option>
              <option value="Planner">기획자</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">지원하기</button>
        </form>
      )}

      {status && <p>{status}</p>} {/* 상태 메시지 표시 */}
    </div>
  );
}

export default ProjectCard;
