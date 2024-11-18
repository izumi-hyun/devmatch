import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

function ProjectGrid() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://devmatch.ddns.net:2000/project/projectList');
        // 서버에서 받은 데이터를 상태로 설정
        console.log(response);
        const projectData = response.data.map(project => ({
          title: project.project_name,
          description: project.description,
          tags: project.tech_stacks // 기술 스택은 배열 형태로 전달
        }));
        setProjects(projectData);
      } catch (error) {
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProjects();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <section className="project-grid">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))
      ) : (
        <p>프로젝트를 불러오는 중...</p>
      )}
    </section>
  );
}

export default ProjectGrid;
