import { createClient } from '@supabase/supabase-js'
import "./page.css";

const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>당신이 원하는 팀을 찾아보세요</h1>
        <p>프론트엔드, 백엔드, 디자인 ,스터디 등을 통해 다양한 분야의 학생들과 함께 성장하세요</p>
      </section>
      <section>ProjectGrid</section>
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
    </div>
  );
}
