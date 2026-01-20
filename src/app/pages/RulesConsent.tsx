import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { part1Questions, part2Questions } from '../data/questions';
import { AlertCircle, CheckCircle2, Briefcase, Users, Search, TrendingUp, DollarSign, FolderKanban, FileCheck, Gamepad2, Shield, Trophy } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';

// 색상 상수
const COLORS = {
  navy: '#1E3A5F',
  navyDark: '#152A45',
  gold: '#C9A227',
  goldLight: '#E8D48A',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
};

export const RulesConsent = () => {
  const navigate = useNavigate();
  const { setConsented, setStartTime, selectedRoles, setSelectedRoles, setUserInfo, userInfo, initializeExamQuestions } = useExam();
  const [agreed, setAgreed] = useState(false);
  const [userName, setUserName] = useState(userInfo?.name || '');
  const [userEmail, setUserEmail] = useState(userInfo?.email || '');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canStart = agreed && selectedRoles.length > 0 && userName.trim() && isValidEmail(userEmail);

  const handleStart = () => {
    if (!canStart) return;
    setUserInfo({ name: userName.trim(), email: userEmail.trim() });
    initializeExamQuestions(part1Questions, part2Questions);
    setConsented(true);
    setStartTime(Date.now());
    navigate('/part1');
  };

  // 단일 선택으로 변경
  const selectRole = (roleId: string) => {
    setSelectedRoles([roleId]);
  };

  // 새 직무 10개 (Part3 JSON 기준)
  const availableRoles = [
    { id: 'data-marketer', label: '데이터/퍼포먼스 마케터', icon: Search },
    { id: 'hr-manager', label: 'HR/인사담당자', icon: Users },
    { id: 'game-programmer', label: '게임 프로그래머', icon: Gamepad2 },
    { id: 'media-planner', label: '미디어 플래너', icon: TrendingUp },
    { id: 'sales-finance', label: '영업 (금융)', icon: DollarSign },
    { id: 'security-researcher', label: '보안 연구원', icon: Shield },
    { id: 'content-planner', label: '콘텐츠 기획', icon: Briefcase },
    { id: 'business-planning', label: '경영기획', icon: FolderKanban },
    { id: 'food-rnd', label: '식품 R&D', icon: FileCheck },
    { id: 'event-planner', label: '행사/상품 기획', icon: Trophy }
  ];

  const rules = [
    {
      icon: AlertCircle,
      title: '개인정보 입력 금지',
      description: '시험 중 개인정보, 이름, 주소 또는 식별 가능한 데이터를 입력하지 마세요.',
      isWarning: true
    },
    {
      icon: AlertCircle,
      title: '기밀정보 사용 금지',
      description: '기밀 업무 정보, 독점 데이터 또는 영업 비밀을 답변에 사용하지 마세요.',
      isWarning: true
    },
    {
      icon: AlertCircle,
      title: '외부 복사/붙여넣기 금지',
      description: '외부 소스에서 텍스트를 복사할 수 없습니다. 모든 답변은 본인의 작성물이어야 합니다.',
      isWarning: true
    },
    {
      icon: CheckCircle2,
      title: 'Part 3 AI 어시스턴트',
      description: 'Part 3에는 제한된 상호작용(과제당 3회 메시지)이 가능한 시뮬레이션 AI 어시스턴트가 포함됩니다.',
      isWarning: false
    },
    {
      icon: CheckCircle2,
      title: '시간 제한',
      description: '각 파트에는 시간 제한이 있습니다. 완료 후 이전 파트로 돌아갈 수 없습니다.',
      isWarning: false
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg border-2 p-10" style={{ borderColor: COLORS.border }}>
          {/* Essential Badge - Medium */}
          <div className="flex justify-center mb-8">
            <EssentialBadge size="medium" showLabel={true} showDescription={false} />
          </div>

          <h1 className="text-2xl mb-8 font-bold text-center" style={{ color: COLORS.navy }}>
            시험 규칙 및 동의
          </h1>

          <p className="mb-10 leading-relaxed" style={{ color: COLORS.textMuted }}>
            시험을 시작하기 전에 다음 규칙을 검토하고 동의해 주세요:
          </p>

          <div className="space-y-6 mb-10">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: rule.isWarning ? COLORS.error : COLORS.navy
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 font-bold" style={{ color: COLORS.navy }}>{rule.title}</div>
                    <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>{rule.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg p-5 mb-10 border" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
            <p className="text-sm font-medium leading-relaxed" style={{ color: COLORS.navy }}>
              <strong>중요:</strong> 본 시험은 시연 목적으로만 설계되었습니다.
              개인 식별 정보(PII) 수집이나 민감한 데이터 보안을 위한 용도가 아닙니다.
            </p>
          </div>

          {/* 응시자 정보 입력 섹션 */}
          <div className="border-t pt-8 mb-8" style={{ borderColor: COLORS.border }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.navy }}>
              응시자 정보
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.textMuted }}>
              FGI 참가자 식별을 위해 이름과 이메일을 입력해주세요.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  이름 <span style={{ color: COLORS.error }}>*</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{
                    borderColor: userName.trim() ? COLORS.border : COLORS.error,
                    backgroundColor: 'white',
                    color: COLORS.navy
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  이메일 <span style={{ color: COLORS.error }}>*</span>
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  style={{
                    borderColor: isValidEmail(userEmail) ? COLORS.border : COLORS.error,
                    backgroundColor: 'white',
                    color: COLORS.navy
                  }}
                />
                {userEmail && !isValidEmail(userEmail) && (
                  <p className="mt-2 text-sm" style={{ color: COLORS.error }}>
                    올바른 이메일 형식을 입력해주세요.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 직무 선택 섹션 */}
          <div className="border-t pt-8 mb-8" style={{ borderColor: COLORS.border }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.navy }}>
              직무 선택
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.textMuted }}>
              Part 3 시험은 선택한 직무의 시나리오로 출제됩니다. 1개를 선택해주세요.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableRoles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRoles.includes(role.id);
                return (
                  <label
                    key={role.id}
                    className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                    style={{
                      borderColor: isSelected ? COLORS.navy : COLORS.border,
                      backgroundColor: isSelected ? COLORS.goldMuted : 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name="jobRole"
                      checked={isSelected}
                      onChange={() => selectRole(role.id)}
                      className="w-5 h-5 focus:ring-2"
                      style={{ accentColor: COLORS.navy }}
                    />
                    <Icon className="w-5 h-5" style={{ color: isSelected ? COLORS.navy : COLORS.textMuted }} />
                    <span className="font-medium" style={{ color: COLORS.navy }}>
                      {role.label}
                    </span>
                  </label>
                );
              })}
            </div>

            {selectedRoles.length === 0 && (
              <p className="mt-4 text-sm font-medium" style={{ color: COLORS.error }}>
                직무를 선택해주세요.
              </p>
            )}
          </div>

          <div className="border-t pt-8 mb-10" style={{ borderColor: COLORS.border }}>
            <label className="flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded focus:ring-2"
                style={{ accentColor: COLORS.navy }}
              />
              <span className="text-sm leading-relaxed" style={{ color: COLORS.navy }}>
                시험 규칙을 읽고 이해했습니다. 개인정보, 기밀정보 입력 또는 외부 소스에서 콘텐츠를 복사하지 않는 것에 동의합니다.
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-4 bg-white border-2 rounded-lg transition-colors font-medium"
              style={{ color: COLORS.navy, borderColor: COLORS.border }}
            >
              취소
            </button>
            <button
              onClick={handleStart}
              disabled={!canStart}
              className="flex-1 px-6 py-4 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
              style={{ backgroundColor: COLORS.navy }}
            >
              시험 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
