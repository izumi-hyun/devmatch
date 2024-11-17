import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Briefcase, Mail, Phone, Camera, Code, Palette, LineChart, FileText } from 'lucide-react';

const MyPage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    skills: [],
    introduction: ''
  });

  const [profileImage, setProfileImage] = useState(null);

  const roles = [
    { id: 'developer', title: '개발자', icon: Code },
    { id: 'designer', title: '디자이너', icon: Palette },
    { id: 'planner', title: '기획자', icon: FileText },
    { id: 'analyst', title: '데이터분석가', icon: LineChart }
  ];

  const skillsByRole = {
    developer: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'Spring'],
    designer: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX'],
    planner: ['서비스 기획', '프로젝트 관리', '사용자 리서치', '데이터 분석'],
    analyst: ['Python', 'R', 'SQL', 'Tableau', 'Power BI']
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRoleChange = (role) => {
    setProfileData(prev => ({
      ...prev,
      role,
      skills: [] // 역할이 변경되면 스킬 초기화
    }));
  };

  const handleSkillToggle = (skill) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profileData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">마이 페이지</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 프로필 이미지 섹션 */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-6 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700">
                    <Camera className="w-5 h-5 text-white" />
                    <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
              </div>

              {/* 기본 정보 섹션 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">이름</label>
                  <div className="mt-1 relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="pl-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">이메일</label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="pl-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              {/* 직무 선택 섹션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직무 선택</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roles.map(({ id, title, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleRoleChange(id)}
                      className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                        profileData.role === id
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 스킬 선택 섹션 */}
              {profileData.role && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">보유 스킬</label>
                  <div className="flex flex-wrap gap-2">
                    {skillsByRole[profileData.role].map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          profileData.skills.includes(skill)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 경력 입력 섹션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">경력</label>
                <div className="mt-1 relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                    className="pl-10 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="경력을 입력하세요 (예: 3년)"
                  />
                </div>
              </div>

              {/* 자기소개 섹션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">자기소개</label>
                <textarea
                  value={profileData.introduction}
                  onChange={(e) => setProfileData({...profileData, introduction: e.target.value})}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="자기소개를 입력하세요"
                />
              </div>

              {/* 저장 버튼 */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                프로필 저장
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyPage;
