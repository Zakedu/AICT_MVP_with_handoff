import { useNavigate } from 'react-router-dom';
import { BookOpen, MessageSquare, Clock, FileText, Settings, ChevronRight } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';

export const Landing = () => {
  const navigate = useNavigate();

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
      <div className="max-w-4xl mx-auto px-6 py-20">
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
            연습 문제
          </button>
          <button
            onClick={() => navigate('/rules')}
            className="px-8 py-4 text-white rounded-lg transition-all font-semibold hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1E3A5F' }}
          >
            시험 시작
            <ChevronRight className="w-5 h-5" />
          </button>
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
