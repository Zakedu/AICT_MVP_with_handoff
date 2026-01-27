/**
 * Results 페이지 - 네이비 + 골드 테마
 */

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { Download, Award, TrendingUp, CheckCircle2, Target, Lightbulb, Share2, FileText, AlertCircle, Loader2, Key, X, QrCode } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { part1Questions, part2Questions } from '../data/questions';
import { getJobTasks, getJobInfo } from '../data/part3-data';
import { EssentialBadge } from '../components/EssentialBadge';
import { gradeAllPart3Tasks } from '../services/part3-grading';
import { IndicatorType } from '../data/questions/types';
import { JobCode, Part3ScoringResult } from '../data/types/part3';
import {
  calculatePart1Scores,
  calculatePart2Scores,
  calculatePart3Scores,
  calculateTotalScores,
  normalizeScores,
  toRadarChartData,
  calculateTotalPoints,
  isPassed,
} from '../services/scoring';
import {
  downloadCertificatePDF,
  generateCertificateId,
  calculateExpiryDate,
  CertificateData,
} from '../services/certificateGenerator';
import { CertificateQRCode } from '../components/CertificateQRCode';
import { useAuth } from '../context/AuthContext';

// 색상 상수
const COLORS = {
  navy: '#1E3A5F',
  navyDark: '#152A45',
  navyLight: '#2D4A6F',
  gold: '#C9A227',
  goldLight: '#E8D48A',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
};

// 데모 모드 데이터
const DEMO_MODE = true; // 데모용 (나중에 false로 변경)

const DEMO_SCORES = {
  part1Correct: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q8', 'q9', 'q10', 'q11', 'q12'], // 12개 중 11개 정답
  part2Correct: ['dragdrop', 'ordering', 'highlight'], // 4개 중 3개 정답
  part3Results: [
    { taskId: 'task1', score: 18, maxScore: 20, feedback: '프롬프트가 명확하고 구조적입니다.' },
    { taskId: 'task2', score: 16, maxScore: 20, feedback: '개인정보 보호 관점이 잘 반영되었습니다.' },
    { taskId: 'task3', score: 14, maxScore: 20, feedback: '결과 검증 부분을 보완하면 좋겠습니다.' },
  ],
};

// 루브릭 기반 피드백 데이터
const RUBRIC_FEEDBACK: Record<string, { level: 'excellent' | 'good' | 'needs_improvement'; description: string; rubric: string[] }> = {
  defining: {
    level: 'excellent',
    description: 'AI 개념과 용어를 정확하게 이해하고 있습니다.',
    rubric: [
      '✓ LLM, 토큰, 환각 등 핵심 용어 이해',
      '✓ AI 모델의 작동 원리 파악',
      '✓ AI 기술의 한계와 가능성 인식',
    ],
  },
  prompting: {
    level: 'good',
    description: '프롬프트 설계 능력이 양호하나 일부 개선이 필요합니다.',
    rubric: [
      '✓ 역할-맥락-지시 구조 사용',
      '△ 제약 조건 명시 부족',
      '✓ 출력 형식 지정 능력',
    ],
  },
  protecting: {
    level: 'excellent',
    description: '개인정보 보호 및 보안 의식이 우수합니다.',
    rubric: [
      '✓ 민감 정보 마스킹 실천',
      '✓ 데이터 유출 위험 인식',
      '✓ 보안 가이드라인 준수',
    ],
  },
  refining: {
    level: 'needs_improvement',
    description: 'AI 출력 검증 역량 강화가 필요합니다.',
    rubric: [
      '△ 사실 확인 절차 미흡',
      '✗ 교차 검증 부족',
      '△ 출처 확인 습관화 필요',
    ],
  },
  acumen: {
    level: 'good',
    description: '윤리적 판단력이 양호합니다.',
    rubric: [
      '✓ 저작권 인식',
      '✓ AI 편향 가능성 이해',
      '△ 책임 소재 판단 개선 필요',
    ],
  },
  integrating: {
    level: 'good',
    description: '업무 통합 능력이 양호합니다.',
    rubric: [
      '✓ AI 도구 활용 시나리오 이해',
      '△ 워크플로우 최적화 여지 있음',
      '✓ 협업 도구와의 연계 가능',
    ],
  },
};

// 직무별 피드백 데이터
const JOB_FEEDBACK: Record<string, { strengths: string[]; improvements: string[]; recommendation: string }> = {
  HR: {
    strengths: [
      '채용 공고 작성 시 AI 활용 능력 우수',
      '면접 질문 생성에 적절한 프롬프트 사용',
      '개인정보 보호 의식이 높음',
    ],
    improvements: [
      '지원자 평가 시 AI 편향 검토 필요',
      '채용 데이터 분석 시 교차 검증 강화',
    ],
    recommendation: 'HR 업무에서 AI를 효과적으로 활용할 준비가 되어 있습니다. 채용 결정 시 AI 결과물에 대한 비판적 검토를 강화하면 더욱 좋겠습니다.',
  },
  MKT: {
    strengths: [
      '마케팅 콘텐츠 생성 능력 우수',
      '타겟 오디언스 맞춤 프롬프트 설계',
      'A/B 테스트 시나리오 구성 능력',
    ],
    improvements: [
      '저작권 관련 검토 강화 필요',
      '브랜드 톤앤매너 일관성 유지',
    ],
    recommendation: '마케팅 영역에서 AI 활용도가 높습니다. 생성된 콘텐츠의 저작권 및 브랜드 가이드라인 준수 여부를 꼼꼼히 확인하세요.',
  },
  SALES: {
    strengths: [
      '고객 응대 스크립트 작성 능력',
      '제안서 초안 생성 활용',
      '고객 데이터 분석 이해',
    ],
    improvements: [
      '고객 정보 보안 의식 강화',
      '계약 관련 법적 검토 필요',
    ],
    recommendation: '영업 업무에 AI를 잘 활용할 수 있습니다. 고객 정보 취급 시 보안에 더욱 주의를 기울이세요.',
  },
  DEV: {
    strengths: [
      '코드 생성 및 리뷰 활용 우수',
      '기술 문서 작성 능력',
      '버그 분석 시나리오 이해',
    ],
    improvements: [
      '생성된 코드의 보안 취약점 검토',
      '라이선스 호환성 확인 필요',
    ],
    recommendation: '개발 업무에서 AI를 효과적으로 활용할 준비가 되어 있습니다. 생성된 코드의 보안 및 라이선스 검토를 습관화하세요.',
  },
  ADMIN: {
    strengths: [
      '문서 작성 및 요약 능력',
      '일정 관리 자동화 이해',
      '회의록 정리 활용',
    ],
    improvements: [
      '기밀 문서 취급 시 주의 필요',
      '정확성 검증 습관화',
    ],
    recommendation: '사무행정 업무에 AI를 잘 활용할 수 있습니다. 기밀 정보 취급 시 AI 도구 사용에 주의하세요.',
  },
};

export const Results = () => {
  const navigate = useNavigate();
  const { answers, selectedRoles, examQuestions, userInfo } = useExam();
  const { user } = useAuth();

  const [showApiModal, setShowApiModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aict_api_key') || '');
  const [isGrading, setIsGrading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState({ completed: 0, total: 0 });
  const [part3Results, setPart3Results] = useState<Part3ScoringResult[]>(() => {
    try {
      const saved = localStorage.getItem('aict_part3_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [apiError, setApiError] = useState('');

  const selectedJobCode = selectedRoles[0] as JobCode;
  const part3Tasks = getJobTasks(selectedJobCode);
  const jobInfo = getJobInfo(selectedJobCode);

  const part1Qs = examQuestions.part1.length > 0 ? examQuestions.part1 : part1Questions;
  const part2Qs = examQuestions.part2.length > 0 ? examQuestions.part2 : part2Questions;

  useEffect(() => {
    if (part3Results.length > 0) {
      localStorage.setItem('aict_part3_results', JSON.stringify(part3Results));
    }
  }, [part3Results]);

  const part1CorrectIds = useMemo(() => {
    if (DEMO_MODE) {
      return DEMO_SCORES.part1Correct;
    }
    return part1Qs
      .filter(q => {
        const answer = answers.find(a => a.partId === 1 && a.questionId === q.id);
        return q.options.find(opt => opt.id === answer?.answer)?.correct;
      })
      .map(q => q.id);
  }, [part1Qs, answers]);

  const part2CorrectTypes = useMemo(() => {
    if (DEMO_MODE) {
      return DEMO_SCORES.part2Correct;
    }
    return part2Qs
      .filter(q => {
        const answer = answers.find(a => a.partId === 2 && a.questionId === q.id);
        if (q.type === 'dragdrop' || q.type === 'ordering') {
          return JSON.stringify(answer?.answer) === JSON.stringify(q.correctOrder);
        }
        if (q.type === 'highlight') {
          const correctIssues = q.issues?.filter(i => i.isCorrect).map(i => i.id) || [];
          const userSelected = Array.isArray(answer?.answer) ? answer.answer : [];
          return JSON.stringify([...correctIssues].sort()) === JSON.stringify([...userSelected].sort());
        }
        if (q.type === 'rewrite') {
          const answerText = typeof answer?.answer === 'string' ? answer.answer : '';
          const wordCount = answerText.trim().split(/\s+/).filter(Boolean).length;
          return wordCount >= (q.minWords || 50);
        }
        return false;
      })
      .map(q => q.type);
  }, [part2Qs, answers]);

  const part1Scores = useMemo(() => calculatePart1Scores(part1CorrectIds), [part1CorrectIds]);
  const part2Scores = useMemo(() => calculatePart2Scores(part2CorrectTypes), [part2CorrectTypes]);

  const part3Scores = useMemo(() => {
    if (DEMO_MODE) {
      // 데모용 Part 3 점수 (합격 수준)
      return { defining: 10, prompting: 12, protecting: 10, refining: 8, acumen: 10, integrating: 10 };
    }
    if (part3Results.length > 0) {
      return calculatePart3Scores(part3Results);
    }
    return { defining: 8, prompting: 8, protecting: 8, refining: 8, acumen: 8, integrating: 8 };
  }, [part3Results]);

  const totalScores = useMemo(() => calculateTotalScores(part1Scores, part2Scores, part3Scores), [part1Scores, part2Scores, part3Scores]);
  const normalizedScores = useMemo(() => normalizeScores(totalScores), [totalScores]);
  const totalPoints = useMemo(() => calculateTotalPoints(totalScores), [totalScores]);
  const passed = isPassed(totalPoints);
  const radarData = useMemo(() => toRadarChartData(normalizedScores), [normalizedScores]);

  const part1TotalPoints = calculateTotalPoints(part1Scores);
  const part2TotalPoints = calculateTotalPoints(part2Scores);
  const part3TotalPoints = calculateTotalPoints(part3Scores);

  // 인증서 데이터 생성/복원
  useEffect(() => {
    if (passed) {
      // 기존 인증서 확인
      const savedCert = localStorage.getItem('aict_certificate');
      if (savedCert) {
        setCertificate(JSON.parse(savedCert));
      } else {
        // 새 인증서 생성
        const examDate = new Date().toISOString().split('T')[0];
        const newCert: CertificateData = {
          certificateId: generateCertificateId(),
          name: user?.name || userInfo?.name || '응시자',
          score: totalPoints,
          jobRole: jobInfo?.jobTitle || selectedJobCode || '미지정',
          examDate,
          expiryDate: calculateExpiryDate(new Date()),
          competencies: normalizedScores,
        };
        setCertificate(newCert);
        localStorage.setItem('aict_certificate', JSON.stringify(newCert));

        // 응시 이력 저장
        const history = JSON.parse(localStorage.getItem('aict_exam_history') || '[]');
        history.unshift({
          date: examDate,
          jobRole: jobInfo?.jobTitle || selectedJobCode,
          score: totalPoints,
          passed: true,
        });
        localStorage.setItem('aict_exam_history', JSON.stringify(history.slice(0, 10)));
      }
    }
  }, [passed, totalPoints, normalizedScores, user, userInfo, jobInfo, selectedJobCode]);

  // PDF 다운로드
  const handleDownloadPDF = async () => {
    if (certificate) {
      await downloadCertificatePDF(certificate);
    }
  };

  // LinkedIn 공유 (Mock)
  const handleLinkedInShare = () => {
    alert('LinkedIn 연동은 준비 중입니다. 인증서 PDF를 다운로드하여 직접 공유해주세요.');
  };

  const handleGrading = async () => {
    if (!apiKey) {
      setApiError('API 키를 입력해주세요.');
      return;
    }
    setApiError('');
    setIsGrading(true);
    setGradingProgress({ completed: 0, total: part3Tasks.length });
    localStorage.setItem('aict_api_key', apiKey);

    const part3Answers: Record<string, { content: string; chatMessages?: unknown[] }> = {};
    part3Tasks.forEach(task => {
      const answer = answers.find(a => a.partId === 3 && a.questionId === task.id);
      if (answer?.answer) {
        try {
          const parsed = typeof answer.answer === 'string' ? JSON.parse(answer.answer) : answer.answer;
          part3Answers[task.id] = parsed;
        } catch {
          part3Answers[task.id] = { content: String(answer.answer) };
        }
      }
    });

    if (Object.keys(part3Answers).length === 0) {
      setApiError('채점할 답안이 없습니다.');
      setIsGrading(false);
      return;
    }

    try {
      const results = await gradeAllPart3Tasks(selectedJobCode, part3Answers, apiKey, (completed, total) => setGradingProgress({ completed, total }));
      setPart3Results(results);
      setShowApiModal(false);
    } catch {
      setApiError('채점 중 오류가 발생했습니다. API 키를 확인해주세요.');
    } finally {
      setIsGrading(false);
    }
  };

  const getTaskResult = (taskId: string): Part3ScoringResult | undefined => {
    return part3Results.find(r => r.taskId === taskId);
  };

  const indicatorInfo: Record<IndicatorType, { nameKo: string; description: string }> = {
    defining: { nameKo: 'AI 개념 이해', description: 'AI 기술과 용어 이해' },
    prompting: { nameKo: '프롬프트 설계', description: '효과적인 지시 작성' },
    protecting: { nameKo: '데이터 보호', description: '개인정보/보안 관리' },
    refining: { nameKo: '결과 검증', description: 'AI 출력 감수·개선' },
    acumen: { nameKo: '윤리적 판단', description: '저작권/책임 의식' },
    integrating: { nameKo: '업무 통합', description: '실무 프로세스 통합' }
  };

  const improvements = useMemo(() => {
    const sortedIndicators = (Object.keys(normalizedScores) as IndicatorType[])
      .map(key => ({ key, score: normalizedScores[key] }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);

    const templates: Record<IndicatorType, { title: string; action: string }> = {
      defining: { title: 'AI 개념 이해 강화', action: 'LLM, 토큰, 환각 등 핵심 AI 용어 학습' },
      prompting: { title: '프롬프트 구조화 연습', action: '역할→맥락→지시→제약→출력 순서로 프롬프트 작성' },
      protecting: { title: '개인정보 보호 강화', action: 'AI 입력 전 개인정보 마스킹 연습' },
      refining: { title: 'AI 출력 검증 역량 향상', action: 'AI 응답의 사실 확인 및 교차 검증' },
      acumen: { title: '윤리적 판단력 향상', action: '인용 시 출처 명시 및 라이선스 확인' },
      integrating: { title: '업무 통합 능력 개선', action: 'AI 도구를 실무 워크플로우에 적용' }
    };

    return sortedIndicators.map(({ key, score }) => ({
      ...templates[key],
      issue: `${indicatorInfo[key].nameKo} 역량 ${score}%`
    }));
  }, [normalizedScores]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* API Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 border" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5" style={{ color: COLORS.gold }} />
                <h3 className="text-lg font-bold" style={{ color: COLORS.navy }}>Claude API 채점</h3>
              </div>
              <button onClick={() => setShowApiModal(false)} className="p-2 hover:bg-gray-100 rounded" disabled={isGrading}>
                <X className="w-5 h-5" style={{ color: COLORS.textMuted }} />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-..."
                disabled={isGrading}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: COLORS.border, '--tw-ring-color': COLORS.gold } as React.CSSProperties}
              />
            </div>

            {apiError && <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#FEE2E2', color: COLORS.error }}>{apiError}</div>}

            {isGrading && (
              <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: COLORS.goldMuted }}>
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: COLORS.gold }} />
                  <span className="text-sm font-medium" style={{ color: COLORS.navy }}>채점 중... ({gradingProgress.completed}/{gradingProgress.total})</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ backgroundColor: COLORS.border }}>
                  <div className="h-2 rounded-full" style={{ width: `${gradingProgress.total > 0 ? (gradingProgress.completed / gradingProgress.total) * 100 : 0}%`, backgroundColor: COLORS.gold }} />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setShowApiModal(false)} disabled={isGrading} className="flex-1 px-4 py-3 border rounded-lg font-medium" style={{ borderColor: COLORS.border, color: COLORS.navy }}>취소</button>
              <button onClick={handleGrading} disabled={isGrading || !apiKey} className="flex-1 px-4 py-3 text-white rounded-lg font-medium disabled:opacity-50" style={{ backgroundColor: COLORS.navy }}>
                {isGrading ? '채점 중...' : '채점 시작'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grading Status Banner */}
        {part3Results.length === 0 && part3Tasks.length > 0 && (
          <div className="mb-8 p-4 rounded-lg flex items-center justify-between" style={{ backgroundColor: COLORS.goldMuted, border: `1px solid ${COLORS.gold}` }}>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" style={{ color: COLORS.gold }} />
              <div>
                <p className="font-medium" style={{ color: COLORS.navy }}>Part 3 채점이 완료되지 않았습니다</p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>현재 예상 점수가 표시됩니다.</p>
              </div>
            </div>
            <button onClick={() => setShowApiModal(true)} className="px-4 py-2 text-white rounded-lg font-medium" style={{ backgroundColor: COLORS.navy }}>AI 채점</button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-lg p-10 mb-8 border text-center" style={{ borderColor: COLORS.border }}>
          <div className="flex justify-center mb-6">
            <EssentialBadge size="large" showLabel={true} showDescription={false} />
          </div>
          <h1 className="text-3xl mb-2 font-bold" style={{ color: COLORS.navy }}>
            {passed ? '인증 완료' : '시험 완료'}
          </h1>
          <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>AI 역량 인증 시험 결과</p>
          {jobInfo && <span className="inline-block px-3 py-1 rounded text-sm" style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}>직무: {jobInfo.jobTitle}</span>}
        </div>

        {/* Score Summary */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {/* Total Score */}
          <div className="bg-white rounded-lg p-8 border text-center" style={{ borderColor: COLORS.border, borderLeft: `4px solid ${COLORS.gold}` }}>
            <div className="text-sm mb-2 font-medium" style={{ color: COLORS.textMuted }}>총점</div>
            <div className="text-6xl font-bold mb-2" style={{ color: COLORS.navy }}>{totalPoints}</div>
            <div className="text-sm mb-4" style={{ color: COLORS.textMuted }}>/100</div>
            <div className={`inline-block px-4 py-2 rounded text-sm font-bold ${passed ? 'text-white' : ''}`} style={{ backgroundColor: passed ? COLORS.success : COLORS.border, color: passed ? 'white' : COLORS.textMuted }}>
              {passed ? 'PASS' : 'REVIEW'}
            </div>
          </div>

          {/* Part Scores */}
          {[
            { label: 'Part 1', subtitle: 'AI 리터러시', score: part1TotalPoints, max: 24, correct: part1CorrectIds.length, total: part1Qs.length },
            { label: 'Part 2', subtitle: '프롬프트', score: part2TotalPoints, max: 16, correct: part2CorrectTypes.length, total: part2Qs.length },
            { label: 'Part 3', subtitle: '직무 시나리오', score: part3TotalPoints, max: 60, note: part3Results.length > 0 ? 'AI 채점됨' : '예상' }
          ].map((part, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border" style={{ borderColor: COLORS.border }}>
              <div className="text-xs font-semibold mb-1" style={{ color: COLORS.gold }}>{part.label}</div>
              <div className="text-xs mb-3" style={{ color: COLORS.textMuted }}>{part.subtitle}</div>
              <div className="text-3xl font-bold mb-2" style={{ color: COLORS.navy }}>
                {part.score}<span className="text-lg" style={{ color: COLORS.textMuted }}>/{part.max}</span>
              </div>
              <div className="w-full rounded-full h-2 mb-2" style={{ backgroundColor: COLORS.border }}>
                <div className="h-2 rounded-full" style={{ width: `${Math.min(100, (part.score / part.max) * 100)}%`, backgroundColor: COLORS.navy }} />
              </div>
              <div className="text-xs" style={{ color: COLORS.textMuted }}>
                {part.correct !== undefined ? `${part.correct}/${part.total} 정답` : part.note}
              </div>
            </div>
          ))}
        </div>

        {/* Competencies Analysis */}
        <div className="bg-white rounded-lg p-8 border mb-8" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5" style={{ color: COLORS.gold }} />
            <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>6가지 역량 분석</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="space-y-4">
              {(Object.keys(indicatorInfo) as IndicatorType[]).map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: COLORS.navy }}>{indicatorInfo[key].nameKo}</span>
                    <span className="text-sm font-bold" style={{ color: COLORS.gold }}>{normalizedScores[key]}%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: COLORS.border }}>
                    <div className="h-2 rounded-full" style={{ width: `${normalizedScores[key]}%`, backgroundColor: COLORS.navy }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Radar Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke={COLORS.border} />
                  <PolarAngleAxis dataKey="label" tick={{ fontSize: 11, fill: COLORS.navy }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: COLORS.textMuted }} stroke={COLORS.border} />
                  <Radar name="점수" dataKey="value" stroke={COLORS.navy} fill={COLORS.navy} fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Rubric-based Feedback */}
        {DEMO_MODE && (
          <div className="bg-white rounded-lg p-8 border mb-8" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>루브릭 기반 역량 평가</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(Object.keys(RUBRIC_FEEDBACK) as IndicatorType[]).map((key) => {
                const feedback = RUBRIC_FEEDBACK[key];
                const levelColors = {
                  excellent: { bg: '#ECFDF5', border: COLORS.success, text: COLORS.success, label: '우수' },
                  good: { bg: '#FEF9C3', border: '#CA8A04', text: '#CA8A04', label: '양호' },
                  needs_improvement: { bg: '#FEE2E2', border: COLORS.error, text: COLORS.error, label: '보완 필요' },
                };
                const levelStyle = levelColors[feedback.level];

                return (
                  <div key={key} className="p-4 rounded-lg border" style={{ backgroundColor: levelStyle.bg, borderColor: levelStyle.border }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold" style={{ color: COLORS.navy }}>{indicatorInfo[key].nameKo}</span>
                      <span className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: levelStyle.border, color: 'white' }}>
                        {levelStyle.label}
                      </span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: COLORS.textMuted }}>{feedback.description}</p>
                    <div className="space-y-1">
                      {feedback.rubric.map((item, idx) => (
                        <p key={idx} className="text-xs" style={{ color: COLORS.navy }}>{item}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Job-specific Feedback */}
        {DEMO_MODE && (
          <div className="bg-white rounded-lg p-8 border mb-8" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>직무 대비 피드백</h2>
              {jobInfo && <span className="text-sm px-3 py-1 rounded" style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}>{jobInfo.jobTitle}</span>}
            </div>

            {(() => {
              const jobFeedback = JOB_FEEDBACK[selectedJobCode] || JOB_FEEDBACK['HR'];
              return (
                <div className="space-y-6">
                  {/* Strengths */}
                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: COLORS.success }}>
                      <CheckCircle2 className="w-4 h-4" />
                      강점
                    </h3>
                    <div className="space-y-2">
                      {jobFeedback.strengths.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg flex items-start gap-3" style={{ backgroundColor: '#ECFDF5' }}>
                          <span className="text-sm" style={{ color: COLORS.navy }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: '#CA8A04' }}>
                      <AlertCircle className="w-4 h-4" />
                      개선 영역
                    </h3>
                    <div className="space-y-2">
                      {jobFeedback.improvements.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg flex items-start gap-3" style={{ backgroundColor: '#FEF9C3' }}>
                          <span className="text-sm" style={{ color: COLORS.navy }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.goldMuted, border: `1px solid ${COLORS.gold}` }}>
                    <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: COLORS.navy }}>
                      <Target className="w-4 h-4" style={{ color: COLORS.gold }} />
                      종합 의견
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.navy }}>{jobFeedback.recommendation}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Improvements */}
        <div className="bg-white rounded-lg p-8 border mb-8" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5" style={{ color: COLORS.gold }} />
            <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>개선 영역</h2>
          </div>

          <div className="space-y-3">
            {improvements.map((item, index) => (
              <div key={index} className="p-4 rounded-lg" style={{ backgroundColor: COLORS.goldMuted }}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ backgroundColor: COLORS.gold }}>{index + 1}</div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: COLORS.navy }}>{item.title}</h3>
                    <p className="text-sm mb-1" style={{ color: COLORS.textMuted }}>{item.issue}</p>
                    <p className="text-sm" style={{ color: COLORS.navy }}>{item.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate */}
        {passed && certificate && (
          <div className="rounded-lg p-8 mb-8" style={{ backgroundColor: COLORS.navy }}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h2 className="text-lg font-bold text-white">인증서</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.navy }}>
                  <Award className="w-8 h-8" style={{ color: COLORS.gold }} />
                </div>
                <div className="text-xl font-bold mb-1" style={{ color: COLORS.navy }}>AICT Essential</div>
                <div className="text-sm mb-2" style={{ color: COLORS.textMuted }}>AI 역량 인증</div>
                <div className="text-xs mb-1" style={{ color: COLORS.textMuted }}>{certificate.name}</div>
                <div className="text-xs mb-4" style={{ color: COLORS.textMuted }}>
                  인증번호: {certificate.certificateId}
                </div>
                <div className="inline-block px-4 py-2 rounded text-sm font-bold text-white" style={{ backgroundColor: COLORS.success }}>
                  {totalPoints}/100 PASS
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm" style={{ color: COLORS.goldLight }}>인증을 공유하세요</p>
                <button
                  onClick={handleLinkedInShare}
                  className="w-full px-4 py-3 bg-white rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ color: COLORS.navy }}
                >
                  <Share2 className="w-4 h-4" /> LinkedIn 공유
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 border"
                  style={{ borderColor: COLORS.goldLight, color: COLORS.goldLight }}
                >
                  <Download className="w-4 h-4" /> PDF 다운로드
                </button>
                <button
                  onClick={() => setShowQRModal(true)}
                  className="w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 border"
                  style={{ borderColor: COLORS.goldLight, color: COLORS.goldLight }}
                >
                  <QrCode className="w-4 h-4" /> QR코드 보기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          {passed && certificate && (
            <button
              onClick={handleDownloadPDF}
              className="flex-1 px-6 py-4 bg-white border rounded-lg font-medium flex items-center justify-center gap-2"
              style={{ borderColor: COLORS.border, color: COLORS.navy }}
            >
              <Download className="w-5 h-5" /> 인증서 다운로드
            </button>
          )}
          <button
            onClick={() => user ? navigate('/dashboard') : navigate('/')}
            className="flex-1 px-6 py-4 text-white rounded-lg font-semibold"
            style={{ backgroundColor: COLORS.navy }}
          >
            {user ? '마이페이지로' : '홈으로'}
          </button>
        </div>

        {/* QR Modal */}
        {showQRModal && certificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <h3 className="font-bold text-center mb-4" style={{ color: COLORS.navy }}>인증서 QR코드</h3>
              <div className="flex justify-center mb-4">
                <CertificateQRCode certificateId={certificate.certificateId} size={200} />
              </div>
              <p className="text-xs text-center mb-4" style={{ color: COLORS.textMuted }}>
                인증번호: {certificate.certificateId}<br />
                유효기간: {certificate.examDate} ~ {certificate.expiryDate}
              </p>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-3 rounded-lg font-medium text-white"
                style={{ backgroundColor: COLORS.navy }}
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {passed && (
          <div className="mt-8 p-6 rounded-lg border" style={{ backgroundColor: '#ECFDF5', borderColor: COLORS.success }}>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6" style={{ color: COLORS.success }} />
              <div>
                <p className="font-bold mb-1" style={{ color: COLORS.navy }}>인증을 축하합니다!</p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>AI 도구를 안전하고 효과적으로 사용할 수 있는 역량이 검증되었습니다.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
