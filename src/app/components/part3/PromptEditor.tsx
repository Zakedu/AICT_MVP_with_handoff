/**
 * Part 3-A: 프롬프트 작성 기술
 * AI 테스트 3회 가능
 */

import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Zap, Send, Loader2 } from 'lucide-react';
import { Part3Task } from '../../data/types/part3';
import { chatWithClaude } from '../../services/part3-grading';

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
};

interface PromptEditorProps {
  task: Part3Task;
  onSave: (content: string) => void;
  initialContent?: string;
  apiKey?: string;
}

export function PromptEditor({ task, onSave, initialContent = '', apiKey }: PromptEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [aiTestCount, setAiTestCount] = useState(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const maxAiTests = task.aiMessagesLimit; // 3회
  const remainingTests = maxAiTests - aiTestCount;
  const lineCount = content.split('\n').length;
  const meetsMinLines = lineCount >= task.minLines;

  // 자동 저장
  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) onSave(content);
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, onSave]);

  // AI 테스트 실행
  const handleAiTest = async () => {
    if (remainingTests <= 0 || !content.trim() || !apiKey) return;

    setIsLoading(true);
    setAiTestCount(prev => prev + 1);

    try {
      const response = await chatWithClaude(
        task,
        [{ role: 'user', content: content, timestamp: Date.now() }],
        apiKey
      );
      setAiResponse(response);
    } catch (error) {
      setAiResponse('테스트 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* LEFT: 시나리오 & 요구사항 */}
      <div className="space-y-4 overflow-y-auto">
        {/* 시나리오 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" style={{ color: COLORS.navy }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>시나리오</h3>
          </div>
          <p className="text-sm leading-relaxed mb-4 whitespace-pre-wrap" style={{ color: COLORS.navy }}>
            {task.scenarioDesc}
          </p>

          {task.context && task.context.length > 0 && (
            <div className="rounded-lg p-4 mt-4" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
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

        {/* 요구사항 체크리스트 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: COLORS.success }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>요구사항 체크리스트</h3>
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

        {/* AI 테스트 결과 */}
        {aiResponse && (
          <div className="rounded-lg border-2 p-5" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5" style={{ color: COLORS.gold }} />
              <h3 className="font-bold" style={{ color: COLORS.navy }}>AI 테스트 결과</h3>
            </div>
            <div className="bg-white rounded-lg p-4 text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto" style={{ color: COLORS.navy }}>
              {aiResponse}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: 프롬프트 작성 */}
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold" style={{ color: COLORS.navy }}>{task.title}</h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: remainingTests > 0 ? COLORS.goldMuted : COLORS.surface,
                color: remainingTests > 0 ? COLORS.navy : COLORS.textMuted,
              }}
            >
              AI 테스트: {remainingTests}/{maxAiTests}
            </span>
          </div>
        </div>

        {/* 지시사항 */}
        <div className="rounded-lg p-4 mb-4 border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: COLORS.navy }}>{task.instruction}</p>
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
            placeholder="여기에 프롬프트를 작성하세요..."
            className="flex-1 p-4 text-sm leading-relaxed font-mono resize-none focus:outline-none"
            style={{ minHeight: '400px', color: COLORS.navy }}
          />

          {/* AI 테스트 버튼 */}
          <div className="border-t-2 px-4 py-3 flex items-center justify-between" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              프롬프트 테스트로 AI 응답을 미리 확인할 수 있습니다 (선택)
            </p>
            <button
              onClick={handleAiTest}
              disabled={remainingTests <= 0 || !content.trim() || isLoading || !apiKey}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: remainingTests > 0 && content.trim() && !isLoading && apiKey ? COLORS.navy : COLORS.border,
                color: remainingTests > 0 && content.trim() && !isLoading && apiKey ? 'white' : COLORS.textMuted,
                cursor: remainingTests > 0 && content.trim() && !isLoading && apiKey ? 'pointer' : 'not-allowed',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  테스트 중...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  프롬프트 테스트 ({remainingTests}회 남음)
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
