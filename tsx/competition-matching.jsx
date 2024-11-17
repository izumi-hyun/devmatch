import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Users, Trophy, School } from 'lucide-react';

const CompetitionMatching = () => {
  // 사용자 정보
  const userUniversity = "연세대학교 미래캠퍼스";

  // 샘플 경진대회 데이터
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      title: "2024 헬스케어 데이터 경진대회",
      organizer: "한국보건의료정보원",
      prize: "대상 150만원",
      deadline: "2024.11.30",
      requiredRoles: ["데이터분석가", "프로그래머", "기획자"],
      description: "공공기관 보건의료 데이터 및 헬스케어 데이터를 활용한 인공지능 모델 개발 및 아이디어 제안",
      currentTeam: [
        { role: "데이터분석가", name: "김철수", university: "연세대 미래캠퍼스" },
        { role: "프로그래머", name: null, university: null },
        { role: "기획자", name: null, university: null }
      ],
      likes: 0,
      isLiked: false
    },
    {
      id: 2,
      title: "제2회 메타버스 공모전",
      organizer: "카카오",
      prize: "총 상금 3,000만원",
      deadline: "2024.12.15",
      requiredRoles: ["프로그래머", "3D모델러", "기획자"],
      description: "메타버스 플랫폼 기획 및 프로토타입 개발",
      currentTeam: [
        { role: "프로그래머", name: null, university: null },
        { role: "3D모델러", name: "박지윤", university: "홍익대" },
        { role: "기획자", name: "이영희", university: "연세대" }
      ],
      likes: 0,
      isLiked: false
    }
  ]);

  const [userRole, setUserRole] = useState('프로그래머');
  const roles = ['데이터분석가', '프로그래머', '3D모델러', '기획자'];

  // 좋아요 토글 함수
  const toggleLike = (competitionId) => {
    setCompetitions(competitions.map(comp => {
      if (comp.id === competitionId) {
        return {
          ...comp,
          likes: comp.isLiked ? comp.likes - 1 : comp.likes + 1,
          isLiked: !comp.isLiked
        };
      }
      return comp;
    }));
  };

  // 팀 참여 가능 여부 확인
  const canJoinTeam = (team, role) => {
    const memberWithRole = team.find(member => member.role === role);
    return memberWithRole && memberWithRole.name === null;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">경진대회 팀원 매칭</h1>
        
        {/* 사용자 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4 flex items-center">
          <School className="w-5 h-5 mr-2" />
          <span className="font-medium">{userUniversity}</span>
        </div>
        
        {/* 내 역할 선택 */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">내 역할</h2>
          <div className="flex gap-2 flex-wrap">
            {roles.map(role => (
              <Button
                key={role}
                variant={userRole === role ? "default" : "outline"}
                onClick={() => setUserRole(role)}
                className="rounded-full"
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* 경진대회 카드 목록 */}
      <div className="space-y-4">
        {competitions.map(competition => (
          <Card key={competition.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{competition.title}</span>
                <Badge variant="secondary">
                  <Trophy className="w-4 h-4 mr-1" />
                  {competition.prize}
                </Badge>
              </CardTitle>
              <div className="text-sm text-gray-500">
                주최: {competition.organizer}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm">{competition.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">마감: {competition.deadline}</span>
                </div>
              </div>
              
              {/* 현재 팀 구성 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  현재 팀 구성
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {competition.currentTeam.map((member, index) => (
                    <div key={index} className="flex items-center justify-between border rounded p-2">
                      <Badge variant="outline">{member.role}</Badge>
                      {member.name ? (
                        <span className="text-sm">{member.name} ({member.university})</span>
                      ) : (
                        <span className="text-sm text-gray-400">모집중</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant={competition.isLiked ? "default" : "outline"}
                onClick={() => toggleLike(competition.id)}
                className="flex items-center gap-2"
              >
                <Heart className={competition.isLiked ? "fill-current" : ""} size={16} />
                {competition.likes} 관심
              </Button>
              
              <Button
                variant="default"
                disabled={!canJoinTeam(competition.currentTeam, userRole)}
              >
                {canJoinTeam(competition.currentTeam, userRole) ? 
                  "팀 참여하기" : "해당 역할 모집완료"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitionMatching;
