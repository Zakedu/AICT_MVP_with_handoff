/**
 * Part 3: 직무 시나리오 시뮬레이션
 * 선택한 직무의 4개 문항(A/B/C/D) 순차 응시
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { ExamShell } from '../components/ExamShell';
import { getJobTasks, getJobInfo } from '../data/part3-data';
import { Part3Task, Part3TaskType, JobCode, ChatMessage } from '../data/types/part3';

// 컴포넌트 import
import { PromptEditor } from '../components/part3/PromptEditor';
import { AnalyzeEditor } from '../components/part3/AnalyzeEditor';
import { ChatInterface } from '../components/part3/ChatInterface';
import { EvaluationEditor } from '../components/part3/EvaluationEditor';

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

// 문항 유형별 배지 - 네이비+골드 통일
const TASK_TYPE_BADGES: Record<Part3TaskType, { label: string; bgColor: string; textColor: string; borderColor: string }> = {
  prompt: { label: 'A) 프롬프트 작성', bgColor: COLORS.goldMuted, textColor: COLORS.navy, borderColor: COLORS.gold },
  analyze: { label: 'B) AI 활용 판단', bgColor: COLORS.goldMuted, textColor: COLORS.navy, borderColor: COLORS.gold },
  collaborate: { label: 'C) AI 협업', bgColor: COLORS.goldMuted, textColor: COLORS.navy, borderColor: COLORS.gold },
  evaluate: { label: 'D) 결과물 평가', bgColor: COLORS.goldMuted, textColor: COLORS.navy, borderColor: COLORS.gold },
};

// API 키 (환경변수 또는 하드코딩 - 실제로는 백엔드에서 처리해야 함)
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

export const Part3 = () => {
  const navigate = useNavigate();
  const { startTime, getAnswer, setAnswer, toggleFlag, isFlagged, selectedRoles } = useExam();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { content: string; chatMessages?: ChatMessage[] }>>({});

  // 선택한 직무의 문항 가져오기
  const selectedJobCode = selectedRoles[0] as JobCode;
  const tasks = getJobTasks(selectedJobCode);
  const jobInfo = getJobInfo(selectedJobCode);

  // 리다이렉트 체크
  useEffect(() => {
    if (!startTime) {
      navigate('/rules');
      return;
    }
    if (!selectedJobCode || tasks.length === 0) {
      navigate('/rules');
      return;
    }
  }, [startTime, selectedJobCode, tasks.length, navigate]);

  if (!startTime || tasks.length === 0) {
    return null;
  }

  const currentTask = tasks[currentTaskIndex];
  const badge = TASK_TYPE_BADGES[currentTask.taskType];

  // 저장된 답변 불러오기
  const savedAnswer = answers[currentTask.id] || { content: '', chatMessages: [] };

  // 답변 저장
  const handleSaveAnswer = (content: string, chatMessages?: ChatMessage[]) => {
    setAnswers(prev => ({
      ...prev,
      [currentTask.id]: { content, chatMessages }
    }));

    // ExamContext에도 저장
    setAnswer(3, currentTask.id, {
      answer: JSON.stringify({ content, chatMessages })
    });
  };

  // 다음 문항으로
  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      // Part 3 완료 → 결과 페이지
      navigate('/results');
    }
  };

  // 이전 문항으로
  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  // 문항 선택
  const handleSelectTask = (index: number) => {
    setCurrentTaskIndex(index);
  };

  // 문항 유형별 컴포넌트 렌더링
  const renderTaskEditor = () => {
    switch (currentTask.taskType) {
      case 'prompt':
        return (
          <PromptEditor
            task={currentTask}
            onSave={(content) => handleSaveAnswer(content)}
            initialContent={savedAnswer.content}
            apiKey={API_KEY}
          />
        );

      case 'analyze':
        return (
          <AnalyzeEditor
            task={currentTask}
            onSave={(content) => handleSaveAnswer(content)}
            initialContent={savedAnswer.content}
          />
        );

      case 'collaborate':
        return (
          <ChatInterface
            task={currentTask}
            onSave={(content, messages) => handleSaveAnswer(content, messages)}
            initialContent={savedAnswer.content}
            initialMessages={savedAnswer.chatMessages || []}
            apiKey={API_KEY}
          />
        );

      case 'evaluate':
        return (
          <EvaluationEditor
            task={currentTask}
            onSave={(content) => handleSaveAnswer(content)}
            initialContent={savedAnswer.content}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ExamShell
      examTitle="필수 AI 인증 시험"
      partLabel={`Part 3: ${jobInfo?.jobTitle || '직무 시나리오'}`}
      currentIndex={currentTaskIndex}
      totalQuestions={tasks.length}
      startTime={startTime}
      duration={50}  // 전체 50분
      questions={tasks.map(t => ({ id: t.id, text: t.title }))}
      getAnswer={(qId) => {
        const ans = answers[qId];
        return ans ? { answer: ans.content } : undefined;
      }}
      isFlagged={(qId) => isFlagged(3, qId)}
      onQuestionSelect={handleSelectTask}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onFlag={() => toggleFlag(3, currentTask.id)}
      disablePrevious={currentTaskIndex === 0}
      disableNext={false}
      nextLabel={currentTaskIndex === tasks.length - 1 ? '제출 및 결과 확인' : '다음 문항'}
    >
      {/* 문항 헤더 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="px-3 py-1.5 rounded-lg border text-sm font-medium"
            style={{ backgroundColor: badge.bgColor, color: badge.textColor, borderColor: badge.borderColor }}
          >
            {badge.label}
          </div>
          <div className="text-sm" style={{ color: COLORS.textMuted }}>
            {currentTaskIndex + 1} / {tasks.length} 문항
          </div>
          {currentTask.aiMessagesLimit > 0 && (
            <div className="text-sm font-medium" style={{ color: COLORS.gold }}>
              AI 메시지 {currentTask.aiMessagesLimit}회 가능
            </div>
          )}
          {currentTask.aiMessagesLimit === 0 && (
            <div className="text-sm font-medium" style={{ color: COLORS.error }}>
              AI 사용 불가
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold" style={{ color: COLORS.navy }}>{currentTask.title}</h1>
      </div>

      {/* 문항 에디터 */}
      <div className="flex-1">
        {renderTaskEditor()}
      </div>
    </ExamShell>
  );
};
