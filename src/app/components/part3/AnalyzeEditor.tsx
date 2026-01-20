/**
 * Part 3-B: AI 활용 판단력
 * AI 사용 불가, 순수 응시자 역량 평가
 */

import { useState, useEffect } from 'react';
import { FileText, CheckCircle, AlertTriangle, Target } from 'lucide-react';
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

interface AnalyzeEditorProps {
  task: Part3Task;
  onSave: (content: string) => void;
  initialContent?: string;
}

export function AnalyzeEditor({ task, onSave, initialContent = '' }: AnalyzeEditorProps) {
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

  // instruction에서 업무 목록 추출
  const extractTaskList = () => {
    const match = task.instruction.match(/\[.*?업무.*?\]([\s\S]*?)(?=\[작성|$)/);
    if (match) {
      return match[1]
        .split('\n')
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => line.trim());
    }
    return [];
  };

  const taskList = extractTaskList();

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* LEFT: 시나리오 & 업무 목록 */}
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
              <h4 className="text-sm font-bold mb-2" style={{ color: COLORS.navy }}>주어진 조건</h4>
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

        {/* 업무 목록 */}
        {taskList.length > 0 && (
          <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h3 className="font-bold" style={{ color: COLORS.navy }}>업무 목록</h3>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {taskList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
                  <span className="text-sm" style={{ color: COLORS.navy }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI 사용 불가 안내 */}
        <div className="rounded-lg border-2 p-5" style={{ backgroundColor: '#FEF2F2', borderColor: COLORS.error }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" style={{ color: COLORS.error }} />
            <h3 className="font-bold" style={{ color: COLORS.error }}>AI 사용 불가</h3>
          </div>
          <p className="text-sm" style={{ color: COLORS.navy }}>
            이 문항은 응시자의 순수 판단력을 평가합니다. AI 도움 없이 직접 분석하여 답변해주세요.
          </p>
        </div>

        {/* 요구사항 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: COLORS.success }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>작성 요령</h3>
          </div>
          <div className="space-y-2">
            {task.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: COLORS.surface }}>
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `2px solid ${COLORS.success}` }}>
                  <span className="text-xs" style={{ color: COLORS.success }}>{idx + 1}</span>
                </div>
                <span className="text-sm" style={{ color: COLORS.navy }}>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: 답변 작성 */}
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="mb-4">
          <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>{task.title}</h2>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
            각 업무에 대해 AI 활용 적합성을 판단하고, 이유와 방법을 설명하세요.
          </p>
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
            placeholder={`[업무별 분석 예시]

1. 업무명: 광고 성과 데이터 정리
   - AI 활용 적합도: 상
   - 이유: 정형화된 데이터 처리 업무로 AI가 효율적으로 수행 가능
   - 활용 방법: "아래 CSV 데이터를 채널별로 분류하고, 전주 대비 변화율을 계산해줘"
   - 주의사항: 원본 데이터 검증 필수, 이상치 확인 필요

2. 업무명: 경영진 보고 미팅
   - AI 활용 적합도: 하
   - 이유: 대면 소통, 즉석 Q&A 대응이 필요한 업무
   - 활용 방법: 사전 자료 준비에만 활용 가능
   - 주의사항: 실시간 의사결정은 사람이 직접 수행

...`}
            className="flex-1 p-4 text-sm leading-relaxed font-mono resize-none focus:outline-none"
            style={{ minHeight: '500px', color: COLORS.navy }}
          />
        </div>
      </div>
    </div>
  );
}
