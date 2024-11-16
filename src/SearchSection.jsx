import React from 'react';

function SearchSection() {
  return (
    <section className="search-section">
      <div className="search-bar">
        <input type="text" className="search-input" placeholder="프로젝트나 기술 스택을 검색해보세요" />
        <button className="btn btn-primary">검색</button>
      </div>
      <div className="filter-tags">
        <span className="tag">프론트엔드</span>
        <span className="tag">백엔드</span>
        <span className="tag">디자인</span>
        <span className="tag">UI/UX</span>
        <span className="tag">React</span>
        <span className="tag">Node.js</span>
      </div>
    </section>
  );
}

export default SearchSection;
