/**
 * Part 3-D: 결과물 품질 판단
 * AI 생성 결과물을 검토하고 피드백 제공
 */

import { useState, useEffect } from 'react';
import { FileText, CheckCircle, AlertTriangle, Eye, HelpCircle } from 'lucide-react';
import { Part3Task } from '../../data/types/part3';

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

interface EvaluationEditorProps {
  task: Part3Task;
  onSave: (content: string) => void;
  initialContent?: string;
}

export function EvaluationEditor({ task, onSave, initialContent = '' }: EvaluationEditorProps) {
  const [content, setContent] = useState(initialContent);

  const lineCount = content.split('\n').length;
  const meetsMinLines = lineCount >= task.minLines;

  // 자동 저장
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) onSave(content);
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, onSave]);

  // instruction에서 AI 결과물 추출
  const extractAiResult = () => {
    const match = task.instruction.match(/\[AI.*?(?:답변|결과물|제안서)\]([\s\S]*?)(?=\[검토|$)/i);
    if (match) {
      return match[1].trim();
    }
    // 대안: AI가 생성한 부분 추출
    const altMatch = task.instruction.match(/"([\s\S]*?)"/);
    if (altMatch) {
      return altMatch[1].trim();
    }
    return null;
  };

  // instruction에서 검토 질문 추출
  const extractQuestions = () => {
    const match = task.instruction.match(/\[검토 질문\]([\s\S]*?)$/);
    if (match) {
      return match[1]
        .split('\n')
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => line.trim());
    }
    return [];
  };

  const aiResult = extractAiResult();
  const reviewQuestions = extractQuestions();

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* LEFT: 시나리오 & AI 결과물 */}
      <div className="space-y-4 overflow-y-auto">
        {/* 시나리오 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" style={{ color: COLORS.navy }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>시나리오</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: COLORS.navy }}>
            {task.scenarioDesc}
          </p>

          {task.context && task.context.length > 0 && (
            <div className="rounded-lg p-4 mt-4" style={{ backgroundColor: COLORS.goldMuted }}>
              <h4 className="text-sm font-bold mb-2" style={{ color: COLORS.navy }}>상황</h4>
              <ul className="space-y-1.5">
                {task.context.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: COLORS.navy }}>
                    <span style={{ color: COLORS.gold }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* AI 생성 결과물 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.error }}>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5" style={{ color: COLORS.error }} />
            <h3 className="font-bold" style={{ color: COLORS.error }}>AI 생성 결과물 (검토 대상)</h3>
          </div>
          <div className="rounded-lg p-4 max-h-[400px] overflow-y-auto" style={{ backgroundColor: '#FEF2F2' }}>
            <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed" style={{ color: COLORS.navy }}>
              {aiResult || task.instruction}
            </pre>
          </div>
          <p className="text-xs mt-2" style={{ color: COLORS.error }}>
            * 이 결과물은 주니어 담당자가 AI에게 요청해서 받은 것입니다.
          </p>
        </div>

        {/* AI 사용 불가 안내 */}
        <div className="rounded-lg border-2 p-5" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" style={{ color: COLORS.gold }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>AI 사용 불가</h3>
          </div>
          <p className="text-sm" style={{ color: COLORS.navy }}>
            이 문항은 응시자의 검토/평가 역량을 측정합니다. AI 도움 없이 직접 문제점을 발견하고 개선 방향을 제시하세요.
          </p>
        </div>

        {/* 검토 질문 */}
        {reviewQuestions.length > 0 && (
          <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h3 className="font-bold" style={{ color: COLORS.navy }}>검토 질문</h3>
            </div>
            <div className="space-y-2">
              {reviewQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: COLORS.goldMuted }}>
                  <span className="text-sm" style={{ color: COLORS.navy }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: 평가 작성 */}
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="mb-4">
          <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>{task.title}</h2>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
            위 AI 결과물의 문제점을 분석하고 개선 방향을 제시하세요.
          </p>
        </div>

        {/* 요구사항 */}
        <div className="rounded-lg border-2 p-4 mb-4" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.success }}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4" style={{ color: COLORS.success }} />
            <h4 className="text-sm font-bold" style={{ color: COLORS.navy }}>답변에 포함해야 할 내용</h4>
          </div>
          <ul className="space-y-1 text-sm" style={{ color: COLORS.navy }}>
            {task.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span style={{ color: COLORS.success }}>•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* 에디터 */}
        <div className="flex-1 flex flex-col bg-white rounded-lg border-2 overflow-hidden" style={{ borderColor: COLORS.border }}>
          {/* 상태 바 */}
          <div className="border-b-2 px-4 py-3 flex items-center justify-between" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
            <div className="flex items-center gap-4 text-xs" style={{ color: COLORS.textMuted }}>
              <span style={{ color: meetsMinLines ? COLORS.success : COLORS.textMuted, fontWeight: meetsMinLines ? 500 : 400 }}>
                줄 수: {lineCount} / {task.minLines}+
                {meetsMinLines && ' ✓'}
              </span>
              <span>글자 수: {content.length}</span>
            </div>
            {!meetsMinLines && (
              <span className="text-xs" style={{ color: COLORS.gold }}>
                최소 {task.minLines}줄 이상 작성하세요
              </span>
            )}
          </div>

          {/* 텍스트 영역 */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`[검토 답변 예시]

## 1. AI 결과물의 문제점

### 문제점 1: 근거 데이터 부재
- 설명: "15% 감소"와 같은 수치가 제시되었으나 출처나 근거가 없음
- 위험: 검증되지 않은 수치를 경영진에게 보고하면 신뢰도 저하

### 문제점 2: 원인 분석의 논리 비약
- 설명: "크리에이티브 피로도"가 원인이라고 주장했으나 실제 빈도수 데이터 없이 추정
- 위험: 잘못된 원인 분석으로 틀린 의사결정 유도 가능

...

## 2. 개선을 위한 추가 프롬프트

다음과 같이 수정된 프롬프트를 사용해야 합니다:
"아래 실제 데이터를 기반으로 성과 하락 원인을 분석해줘.
[첨부: 실제 캠페인 데이터]
- 주장마다 데이터 근거를 명시할 것
- 확인되지 않은 가정은 '가정'임을 표시할 것"

## 3. 경영진 보고 가능 여부

❌ 그대로 사용 불가
- 이유: ...
- 보완 필요 사항: ...`}
            className="flex-1 p-4 text-sm leading-relaxed font-mono resize-none focus:outline-none"
            style={{ minHeight: '450px', color: COLORS.navy }}
          />
        </div>
      </div>
    </div>
  );
}
