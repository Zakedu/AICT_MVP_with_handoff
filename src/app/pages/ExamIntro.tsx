/**
 * 시험 소개 페이지
 * Essential, Expert, Exclusive 레벨별 시험 소개
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen, MessageSquare, FileText, Clock, Users, Award,
  Lightbulb, Shield, Scale, Workflow, CircleCheck, Sparkles,
  ArrowRight, Lock, Zap, Building2, Globe, Target, Brain,
  TrendingUp, Briefcase, GraduationCap, ChevronRight
} from 'lucide-react';

const COLORS = {
  navy: '#1E3A5F',
  gold: '#C9A227',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
  purple: '#7C3AED',
  orange: '#EA580C',
};

type ExamLevel = 'essential' | 'expert' | 'exclusive';

const levelConfig = {
  essential: {
    name: 'Essential',
    nameKr: '에센셜',
    color: COLORS.gold,
    bgColor: COLORS.goldMuted,
    icon: GraduationCap,
    tagline: 'AI 활용의 기초 역량',
    description: '비전공자, 직장인, 취준생 등 모든 사람을 위한 AI 활용 기초 역량 인증',
    available: true,
  },
  expert: {
    name: 'Expert',
    nameKr: '엑스퍼트',
    color: COLORS.purple,
    bgColor: '#F3E8FF',
    icon: Briefcase,
    tagline: '직군별 전문 AI 활용',
    description: '직군별 심화 시나리오와 실무 중심의 AI 협업 역량 인증',
    available: false,
  },
  exclusive: {
    name: 'Exclusive',
    nameKr: '익스클루시브',
    color: COLORS.orange,
    bgColor: '#FFF7ED',
    icon: Building2,
    tagline: '기업 맞춤형 인증',
    description: '기업 특화 시나리오와 조직 역량 진단을 위한 맞춤형 인증',
    available: false,
  },
};

// Essential 시험 상세 정보
const essentialDetails = {
  overview: {
    duration: '75분',
    questions: '19문항',
    passScore: '60점',
    price: '49,000원',
    validity: '2년',
  },
  parts: [
    {
      number: 1,
      icon: BookOpen,
      title: 'AI 리터러시',
      titleEn: 'AI Literacy',
      time: '15분',
      questions: '10문항',
      description: 'AI 핵심 개념과 용어에 대한 이해도를 평가합니다. LLM, 프롬프트, 토큰, 파인튜닝 등 AI 활용에 필수적인 개념들을 다룹니다.',
      type: '객관식 4지선다',
      skills: ['AI 기본 개념', 'LLM 작동 원리', 'AI 도구 이해'],
    },
    {
      number: 2,
      icon: MessageSquare,
      title: '프롬프트 문해력',
      titleEn: 'Prompt Literacy',
      time: '20분',
      questions: '5문항',
      description: '프롬프트를 분석하고 개선하는 실전 능력을 평가합니다. 드래그앤드롭, 하이라이트, 리라이트 등 다양한 문제 유형을 포함합니다.',
      type: '드래그앤드롭, 하이라이트, 리라이트',
      skills: ['프롬프트 분석', '프롬프트 개선', '구조화된 프롬프트 작성'],
    },
    {
      number: 3,
      icon: FileText,
      title: '직무 시나리오',
      titleEn: 'Job Scenario',
      time: '40분',
      questions: '4문항',
      description: '실제 업무 시나리오에서 AI와 협업하여 문제를 해결합니다. 시험 내 제공되는 AI 채팅을 활용하여 실무 과제를 수행합니다.',
      type: '프롬프트 작성, AI 협업, 결과물 평가',
      skills: ['문제 정의', 'AI 협업', '결과 검증', '비즈니스 판단'],
    },
  ],
  competencies: [
    { icon: Lightbulb, name: 'Defining', nameKr: '문제 정의', description: 'AI에게 맡길 문제와 범위를 명확히 정의' },
    { icon: MessageSquare, name: 'Prompting', nameKr: '프롬프트 설계', description: '원하는 결과를 위한 구조화된 프롬프트 작성' },
    { icon: CircleCheck, name: 'Refining', nameKr: '결과 검증', description: 'AI 결과물을 평가하고 반복적으로 개선' },
    { icon: Shield, name: 'Protecting', nameKr: '데이터 보호', description: '보안, 윤리, 환각 리스크 인지 및 방지' },
    { icon: Scale, name: 'Acumen', nameKr: '비즈니스 판단', description: 'AI를 비즈니스 맥락에서 효과적으로 활용' },
    { icon: Workflow, name: 'Integrating', nameKr: '업무 통합', description: 'AI를 기존 업무 프로세스에 자연스럽게 통합' },
  ],
  jobCategories: [
    '마케팅', '영업', 'HR/인사', '기획/PM', '개발', '데이터분석',
    '디자인', '재무/회계', '법무', '고객서비스', '운영', '연구개발', '교육', '기타'
  ],
};

// Expert 시험 정보
const expertDetails = {
  overview: {
    duration: '120분',
    questions: '25문항+',
    passScore: '70점',
    price: 'TBD',
  },
  features: [
    {
      icon: Target,
      title: '직군별 심화 시나리오',
      description: '마케팅, 개발, 기획 등 직군별 실무 중심의 심화 시나리오 제공',
    },
    {
      icon: Brain,
      title: '복합 AI 도구 활용',
      description: '텍스트, 이미지, 코드 등 멀티모달 AI 도구의 통합 활용 역량 평가',
    },
    {
      icon: TrendingUp,
      title: '프로젝트 기반 평가',
      description: '단일 과제가 아닌 연속된 프로젝트 흐름에서의 AI 협업 능력 측정',
    },
    {
      icon: Users,
      title: '협업 시나리오',
      description: 'AI를 활용한 팀 협업 및 커뮤니케이션 상황에서의 의사결정 평가',
    },
  ],
  prerequisites: ['Essential 인증 보유', '해당 직군 1년 이상 경력 권장'],
};

// Exclusive 시험 정보
const exclusiveDetails = {
  features: [
    {
      icon: Building2,
      title: '기업 맞춤형 시나리오',
      description: '기업의 산업, 문화, 업무 프로세스를 반영한 맞춤형 시험 문항 개발',
    },
    {
      icon: Globe,
      title: '조직 역량 진단',
      description: '개인별 결과를 종합한 조직 단위 AI 역량 현황 리포트 제공',
    },
    {
      icon: Zap,
      title: '교육 연계',
      description: '진단 결과 기반 맞춤형 AI 교육 프로그램 설계 및 제공',
    },
    {
      icon: Award,
      title: '기업 인증 뱃지',
      description: '조직 전체 AI 역량 수준을 증명하는 기업 인증 뱃지 발급',
    },
  ],
  benefits: [
    '채용 시 AI 역량 검증 도구로 활용',
    '임직원 역량 개발 KPI 설정',
    '교육 ROI 측정 및 개선점 도출',
    'AI 도입 전략 수립 기초 데이터',
  ],
};

export const ExamIntro = () => {
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState<ExamLevel>('essential');

  const currentLevel = levelConfig[activeLevel];
  const LevelIcon = currentLevel.icon;

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold" style={{ color: COLORS.navy }}>
            AICT
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/exam-intro" className="text-sm font-medium" style={{ color: COLORS.gold }}>
              시험 소개
            </Link>
            <Link to="/schedule" className="text-sm" style={{ color: COLORS.textMuted }}>
              시험 일정
            </Link>
            <Link to="/dashboard" className="text-sm" style={{ color: COLORS.textMuted }}>
              마이페이지
            </Link>
          </nav>
        </div>
      </header>

      {/* Level Tabs */}
      <div className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {(Object.keys(levelConfig) as ExamLevel[]).map((level) => {
              const config = levelConfig[level];
              const Icon = config.icon;
              const isActive = activeLevel === level;

              return (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 transition-all
                    ${isActive ? 'font-medium' : 'opacity-70 hover:opacity-100'}
                  `}
                  style={{
                    borderColor: isActive ? config.color : 'transparent',
                    color: isActive ? config.color : COLORS.textMuted,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{config.name}</span>
                  {!config.available && (
                    <Lock className="w-3.5 h-3.5 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Level Hero */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ backgroundColor: currentLevel.bgColor }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: currentLevel.color }}
                >
                  <LevelIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: COLORS.navy }}>
                    AICT {currentLevel.name}
                  </h1>
                  <p className="text-sm" style={{ color: COLORS.textMuted }}>
                    {currentLevel.nameKr} · {currentLevel.tagline}
                  </p>
                </div>
              </div>
              <p className="text-lg max-w-2xl" style={{ color: COLORS.navy }}>
                {currentLevel.description}
              </p>
            </div>

            {currentLevel.available ? (
              <button
                onClick={() => navigate('/schedule')}
                className="px-6 py-3 rounded-lg font-medium text-white flex items-center gap-2"
                style={{ backgroundColor: currentLevel.color }}
              >
                시험 신청하기
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-right">
                <span
                  className="px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2"
                  style={{ backgroundColor: 'white', color: COLORS.textMuted }}
                >
                  <Lock className="w-4 h-4" />
                  준비 중
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Essential Content */}
        {activeLevel === 'essential' && (
          <div className="space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: '시험 시간', value: essentialDetails.overview.duration, icon: Clock },
                { label: '문항 수', value: essentialDetails.overview.questions, icon: FileText },
                { label: '합격 기준', value: essentialDetails.overview.passScore, icon: Award },
                { label: '응시료', value: essentialDetails.overview.price, icon: Sparkles },
                { label: '유효 기간', value: essentialDetails.overview.validity, icon: CircleCheck },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border p-4"
                    style={{ borderColor: COLORS.border }}
                  >
                    <Icon className="w-5 h-5 mb-2" style={{ color: COLORS.gold }} />
                    <p className="text-xl font-bold" style={{ color: COLORS.navy }}>{stat.value}</p>
                    <p className="text-sm" style={{ color: COLORS.textMuted }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Exam Parts */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.navy }}>시험 구성</h2>
              <div className="space-y-4">
                {essentialDetails.parts.map((part) => {
                  const Icon = part.icon;
                  return (
                    <div
                      key={part.number}
                      className="bg-white rounded-xl border overflow-hidden"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div className="flex">
                        {/* Left - Part Info */}
                        <div
                          className="w-32 p-4 flex flex-col items-center justify-center"
                          style={{ backgroundColor: part.number === 3 ? COLORS.goldMuted : COLORS.surface }}
                        >
                          <Icon className="w-8 h-8 mb-2" style={{ color: COLORS.navy }} />
                          <span className="text-sm font-bold" style={{ color: COLORS.navy }}>Part {part.number}</span>
                          <span className="text-xs" style={{ color: COLORS.textMuted }}>{part.time}</span>
                        </div>

                        {/* Right - Details */}
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg" style={{ color: COLORS.navy }}>{part.title}</h3>
                              <p className="text-sm" style={{ color: COLORS.textMuted }}>{part.titleEn}</p>
                            </div>
                            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: COLORS.surface, color: COLORS.navy }}>
                              {part.questions}
                            </span>
                          </div>
                          <p className="text-sm mb-3" style={{ color: COLORS.textMuted }}>{part.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {part.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded"
                                style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs mt-3" style={{ color: COLORS.textMuted }}>
                            문제 유형: {part.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 6 Competencies */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.navy }}>6가지 측정 역량</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {essentialDetails.competencies.map((comp, index) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border p-4"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: COLORS.goldMuted }}
                      >
                        <Icon className="w-5 h-5" style={{ color: COLORS.gold }} />
                      </div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold" style={{ color: COLORS.navy }}>{comp.name}</span>
                        <span className="text-sm" style={{ color: COLORS.textMuted }}>{comp.nameKr}</span>
                      </div>
                      <p className="text-sm" style={{ color: COLORS.textMuted }}>{comp.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Job Categories */}
            <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.navy }}>직군별 시나리오</h2>
              <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>
                Part 3에서는 본인의 직군에 맞는 시나리오를 선택하여 응시합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {essentialDetails.jobCategories.map((job, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: COLORS.surface, color: COLORS.navy }}
                  >
                    {job}
                  </span>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: COLORS.navy }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">지금 바로 AI 역량을 증명하세요</h2>
              <p className="text-white/70 mb-6">
                AICT Essential로 AI 활용 역량의 기초를 다지고, 공식 인증서를 취득하세요.
              </p>
              <button
                onClick={() => navigate('/schedule')}
                className="px-8 py-3 rounded-lg font-medium text-white inline-flex items-center gap-2"
                style={{ backgroundColor: COLORS.gold }}
              >
                시험 일정 보기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Expert Content */}
        {activeLevel === 'expert' && (
          <div className="space-y-8">
            {/* Coming Soon Banner */}
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: 'white', border: `2px dashed ${COLORS.purple}` }}
            >
              <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.purple }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.navy }}>
                AICT Expert 준비 중
              </h2>
              <p className="text-lg mb-2" style={{ color: COLORS.purple }}>2025년 6월 공개</p>
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                직군별 전문 AI 활용 역량을 인증하는 Expert 레벨이 곧 출시됩니다.
              </p>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: '예상 시험 시간', value: expertDetails.overview.duration },
                { label: '예상 문항 수', value: expertDetails.overview.questions },
                { label: '예상 합격 기준', value: expertDetails.overview.passScore },
                { label: '응시료', value: expertDetails.overview.price },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border p-4 text-center"
                  style={{ borderColor: COLORS.border }}
                >
                  <p className="text-xl font-bold" style={{ color: COLORS.navy }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: COLORS.textMuted }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.navy }}>Expert 특징</h2>
              <div className="grid grid-cols-2 gap-4">
                {expertDetails.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border p-5"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: '#F3E8FF' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: COLORS.purple }} />
                      </div>
                      <h3 className="font-bold mb-2" style={{ color: COLORS.navy }}>{feature.title}</h3>
                      <p className="text-sm" style={{ color: COLORS.textMuted }}>{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Prerequisites */}
            <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.navy }}>응시 자격</h2>
              <ul className="space-y-2">
                {expertDetails.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm" style={{ color: COLORS.textMuted }}>
                    <ChevronRight className="w-4 h-4" style={{ color: COLORS.purple }} />
                    {prereq}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* Exclusive Content */}
        {activeLevel === 'exclusive' && (
          <div className="space-y-8">
            {/* Coming Soon Banner */}
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: 'white', border: `2px dashed ${COLORS.orange}` }}
            >
              <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: COLORS.orange }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.navy }}>
                AICT Exclusive 준비 중
              </h2>
              <p className="text-lg mb-2" style={{ color: COLORS.orange }}>2025년 6월 공개</p>
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                기업 맞춤형 AI 역량 진단 및 인증 프로그램이 곧 출시됩니다.
              </p>
            </div>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold mb-4" style={{ color: COLORS.navy }}>Exclusive 특징</h2>
              <div className="grid grid-cols-2 gap-4">
                {exclusiveDetails.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border p-5"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                        style={{ backgroundColor: '#FFF7ED' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: COLORS.orange }} />
                      </div>
                      <h3 className="font-bold mb-2" style={{ color: COLORS.navy }}>{feature.title}</h3>
                      <p className="text-sm" style={{ color: COLORS.textMuted }}>{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: COLORS.navy }}>기업 도입 효과</h2>
              <ul className="grid grid-cols-2 gap-3">
                {exclusiveDetails.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm" style={{ color: COLORS.textMuted }}>
                    <ChevronRight className="w-4 h-4" style={{ color: COLORS.orange }} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact CTA */}
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: '#FFF7ED' }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.navy }}>
                기업 도입 문의
              </h2>
              <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>
                우리 조직에 맞는 AI 역량 진단 프로그램에 관심이 있으시다면 문의해 주세요.
              </p>
              <button
                className="px-6 py-3 rounded-lg font-medium text-white"
                style={{ backgroundColor: COLORS.orange }}
              >
                도입 문의하기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
