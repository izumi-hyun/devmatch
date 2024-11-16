import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectGrid() {
  const projects = [
    { title: '교내 해커톤 팀원 모집', description: 'AI 기반 학습 플랫폼 개발 프로젝트입니다.', tags: ['프론트엔드', 'React', '디자인'] },
    { title: '졸업 작품 팀원 구함', description: 'IoT 기반 스마트홈 시스템 개발', tags: ['백엔드', 'Node.js', 'Python'] },
    { title: '공모전 디자이너 구합니다', description: '환경 보호 앱 UI/UX 디자인', tags: ['디자인', 'Figma', 'UI/UX'] },
    { title: '스터디할 사람 구합니다', description: '자격증,토익 등', tags: ['컴활1급','토익스터디','ncs스터디'] }
  ];

  return (
    <section className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </section>
  );
}

export default ProjectGrid;
