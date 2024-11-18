import React, { useState } from 'react';
import axios from 'axios';

function SearchSection() {
  const [searchTitle, setSearchTitle] = useState(''); // 제목으로 검색할 검색어 상태 관리
  const [filteredProjects, setFilteredProjects] = useState([]); // 필터링된 프로젝트들
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTitle) {
      setStatus('검색어를 입력해주세요.');
      return;
    }

    setLoading(true); // 검색 시작 시 로딩 상태로 설정
    setStatus(''); // 이전 메시지 초기화
    setFilteredProjects([]); // 로딩 시작 시 이전 프로젝트 결과 초기화

    try {
      // 검색어를 사용하여 서버에서 제목에 맞는 프로젝트 검색
      const response = await axios.get(`http://devmatch.ddns.net:2000/project/projectSearch?title=${searchTitle}`);
      
      // 응답 데이터 로그 추가
      console.log('응답 데이터:', response.data);

      if (response.data && response.data.length > 0) {
        setFilteredProjects(response.data); // 필터링된 프로젝트 목록 업데이트
        setStatus('');
      } else {
        setFilteredProjects([]); // 검색 결과가 없을 경우 빈 배열로 설정
        setStatus('검색된 프로젝트가 없습니다.');
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setStatus('검색 실패');
    } finally {
      setLoading(false); // 검색이 완료된 후 로딩 상태 해제
    }
  };

  return (
    <div>
      {/* 검색 바 */}
      <div className="search-bar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="프로젝트나 기술 스택을 검색해보세요"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)} // 검색어 입력 시 상태 업데이트
        />
        <button className="btn btn-primary" onClick={handleSearch}>검색</button>
      </div>

      {/* 로딩 상태 메시지 */}
      {loading && <p>검색 중...</p>}

      {/* 검색 상태 메시지 */}
      {!loading && status && <p>{status}</p>}

      {/* 검색된 프로젝트 목록 */}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={index} className="project-item">
              <h4>{project.project_name}</h4>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.stack_id && project.stack_id.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          !loading //&& <p>검색된 프로젝트가 없습니다.</p> // 로딩 중이 아닐 때만 표시
        )}
      </div>
    </div>
  );
}

export default SearchSection;
