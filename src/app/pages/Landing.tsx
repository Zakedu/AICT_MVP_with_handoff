import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Clock, FileText, Settings, ChevronRight, User, LogIn } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';
import { useAuth } from '../context/AuthContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const parts = [
    {
      number: 1,
      title: 'AI 리터러시 & 윤리',
      icon: BookOpen,
      time: '15분',
      questions: '8문항',
      description: 'AI 기초 개념, 리스크, 윤리적 사용에 대한 객관식 문제'
    },
    {
      number: 2,
      title: '프롬프트 리터러시',
      icon: MessageSquare,
      time: '20분',
      questions: '4문항',
      description: '프롬프트 비교, 구성, 개선 실습 과제'
    },
    {
      number: 3,
      title: '직무 시나리오 시뮬레이션',
      icon: FileText,
      time: '40분',
      questions: '6개 과제',
      description: '제약 조건 하에서 실무 AI 활용 과제 수행'
    }
  ];

  const competencies = [
    'AI 개념 정의 (Defining)',
    '프롬프트 설계 (Prompting)',
    '데이터 보호 (Protecting)',
    '결과 검증 (Refining)',
    '윤리 판단 (Acumen)',
    '업무 적용 (Integrating)'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Top Navigation */}
      <nav className="bg-white border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <EssentialBadge size="small" showLabel={false} />
            <span className="font-bold" style={{ color: '#1E3A5F' }}>AICT Essential</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: '#1E3A5F' }}
                >
                  <User className="w-4 h-4" />
                  {user.name}님
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-sm"
                  style={{ color: '#64748B' }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium"
                  style={{ color: '#64748B' }}
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white"
                  style={{ backgroundColor: '#1E3A5F' }}
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <EssentialBadge size="large" showLabel={true} showDescription={true} />
          </div>

          <h1 className="text-4xl mb-4 font-bold" style={{ color: '#1E3A5F' }}>
            AI 역량 인증 시험
          </h1>
          <p className="text-lg mb-8" style={{ color: '#64748B' }}>
            비전문가를 위한 안전하고 효과적인 AI 활용 역량 검증
          </p>

          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: '#C9A227' }} />
              <span className="font-medium" style={{ color: '#1E3A5F' }}>총 75분</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: '#C9A227' }} />
              <span className="font-medium" style={{ color: '#1E3A5F' }}>18개 문항</span>
            </div>
          </div>
        </div>

        {/* Parts Overview */}
        <div className="space-y-4 mb-16">
          {parts.map((part) => {
            const Icon = part.icon;
            return (
              <div
                key={part.number}
                className="bg-white rounded-lg border p-6 transition-all hover:shadow-md"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#1E3A5F' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: '#C9A227' }}
                      >
                        Part {part.number}
                      </span>
                      <span className="text-xs" style={{ color: '#64748B' }}>
                        {part.time} · {part.questions}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: '#1E3A5F' }}>{part.title}</h3>
                    <p className="text-sm" style={{ color: '#64748B' }}>{part.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Competencies */}
        <div
          className="rounded-lg p-8 mb-16"
          style={{ backgroundColor: '#1E3A5F' }}
        >
          <h2 className="text-lg font-bold text-white mb-6">검증되는 6가지 역량</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {competencies.map((comp, index) => (
              <div
                key={index}
                className="px-4 py-3 rounded text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#E8D48A'
                }}
              >
                {comp}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate('/practice')}
            className="px-8 py-4 bg-white border rounded-lg transition-all font-medium hover:shadow-md"
            style={{ borderColor: '#E5E7EB', color: '#1E3A5F' }}
          >
            무료 체험
          </button>
          <button
            onClick={() => navigate(isAuthenticated ? '/env-check' : '/login')}
            className="px-8 py-4 text-white rounded-lg transition-all font-semibold hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1E3A5F' }}
          >
            {isAuthenticated ? '시험 응시' : '로그인 후 응시'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-lg border p-6 mb-8" style={{ borderColor: '#E5E7EB' }}>
          <h3 className="font-bold mb-4" style={{ color: '#1E3A5F' }}>응시 안내</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p style={{ color: '#64748B' }}>응시료</p>
              <p className="font-bold" style={{ color: '#1E3A5F' }}>49,000원</p>
            </div>
            <div>
              <p style={{ color: '#64748B' }}>소요시간</p>
              <p className="font-bold" style={{ color: '#1E3A5F' }}>총 100분</p>
            </div>
            <div>
              <p style={{ color: '#64748B' }}>합격기준</p>
              <p className="font-bold" style={{ color: '#1E3A5F' }}>70점 이상</p>
            </div>
            <div>
              <p style={{ color: '#64748B' }}>유효기간</p>
              <p className="font-bold" style={{ color: '#1E3A5F' }}>1년</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm mb-8" style={{ color: '#94A3B8' }}>
          본 시험은 MVP 시뮬레이션입니다. 데이터는 저장되거나 전송되지 않습니다.
        </p>

        {/* Admin Link */}
        <div className="text-center">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: '#64748B' }}
          >
            <Settings className="w-4 h-4" />
            문항 관리
          </button>
        </div>
      </div>
    </div>
  );
};
