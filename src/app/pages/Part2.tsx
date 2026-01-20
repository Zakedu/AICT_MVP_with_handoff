import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { ExamShell } from '../components/ExamShell';
import { GripVertical, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

export const Part2 = () => {
  const navigate = useNavigate();
  const { startTime, getAnswer, setAnswer, toggleFlag, isFlagged, examQuestions } = useExam();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Use questions from context (randomized) or empty array if not initialized
  const questions = examQuestions.part2;

  useEffect(() => {
    if (!startTime) {
      navigate('/rules');
    }
  }, [startTime, navigate]);

  if (!startTime || questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestion];
  const savedAnswer = getAnswer(2, question.id);

  // State for different question types
  const [draggedBlocks, setDraggedBlocks] = useState<string[]>([]);
  const [draggedSteps, setDraggedSteps] = useState<string[]>([]);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [explanation, setExplanation] = useState('');
  const [rewrittenPrompt, setRewrittenPrompt] = useState('');

  // Initialize state when question changes
  useEffect(() => {
    if (question.type === 'dragdrop') {
      const initial = savedAnswer?.order || question.blocks.map((b: any) => b.id);
      // Shuffle only if no saved answer
      if (!savedAnswer) {
        const shuffled = [...initial].sort(() => Math.random() - 0.5);
        setDraggedBlocks(shuffled);
      } else {
        setDraggedBlocks(initial);
      }
    } else if (question.type === 'ordering') {
      const initial = savedAnswer?.order || question.steps.map((s: any) => s.id);
      // Shuffle only if no saved answer
      if (!savedAnswer) {
        const shuffled = [...initial].sort(() => Math.random() - 0.5);
        setDraggedSteps(shuffled);
      } else {
        setDraggedSteps(initial);
      }
    } else if (question.type === 'highlight') {
      setSelectedIssues(savedAnswer?.issues || []);
      setExplanation(savedAnswer?.explanation || '');
    } else if (question.type === 'rewrite') {
      setRewrittenPrompt(savedAnswer?.rewritten || '');
    }
  }, [question.id, question.type]);

  const handleNext = () => {
    // Save current answer before moving
    saveCurrentAnswer();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/part3');
    }
  };

  const handlePrevious = () => {
    // Save current answer before moving
    saveCurrentAnswer();

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const saveCurrentAnswer = () => {
    if (question.type === 'dragdrop') {
      setAnswer(2, question.id, { order: draggedBlocks });
    } else if (question.type === 'ordering') {
      setAnswer(2, question.id, { order: draggedSteps });
    } else if (question.type === 'highlight') {
      setAnswer(2, question.id, { issues: selectedIssues, explanation });
    } else if (question.type === 'rewrite') {
      setAnswer(2, question.id, { rewritten: rewrittenPrompt });
    }
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...draggedBlocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    setDraggedBlocks(newBlocks);
  };

  const moveStep = (fromIndex: number, toIndex: number) => {
    const newSteps = [...draggedSteps];
    const [moved] = newSteps.splice(fromIndex, 1);
    newSteps.splice(toIndex, 0, moved);
    setDraggedSteps(newSteps);
  };

  const toggleIssue = (issueId: string) => {
    setSelectedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const renderQuestionContent = () => {
    // Drag & Drop Builder
    if (question.type === 'dragdrop') {
      const orderedBlocks = draggedBlocks
        .map(id => question.blocks.find((b: any) => b.id === id))
        .filter(Boolean);

      const previewText = orderedBlocks.map((b: any) => b.text).join('\n\n');

      return (
        <DndProvider backend={HTML5Backend}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Draggable blocks */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>블록 배치 영역</h3>
              <div className="space-y-3 p-4 rounded-lg border-2 border-dashed min-h-[400px]" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
                {orderedBlocks.map((block: any, index: number) => (
                  <DraggableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    moveBlock={moveBlock}
                  />
                ))}
              </div>
              <div className="mt-3 text-xs" style={{ color: COLORS.textMuted }}>
                블록을 드래그해서 가장 효과적인 프롬프트 순서로 배치하세요
              </div>
            </div>

            {/* Right: Live preview */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" style={{ color: COLORS.gold }} />
                <h3 className="text-sm font-medium" style={{ color: COLORS.navy }}>실시간 미리보기</h3>
              </div>
              <div className="sticky top-4">
                <div className="border-2 p-5 rounded-lg text-sm leading-relaxed whitespace-pre-wrap min-h-[400px]" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
                  {previewText ? (
                    <pre className="font-sans whitespace-pre-wrap" style={{ color: COLORS.navy }}>{previewText}</pre>
                  ) : (
                    <p className="italic" style={{ color: COLORS.textMuted }}>블록을 배치하면 여기에 프롬프트가 표시됩니다...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DndProvider>
      );
    }

    // Highlight Question
    if (question.type === 'highlight') {
      return (
        <div className="space-y-6">
          {/* Prompt display */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>프롬프트</h3>
            <div className="border-2 rounded-lg p-5" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
              <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans" style={{ color: COLORS.navy }}>
                {question.prompt}
              </pre>
            </div>
          </div>

          {/* Issues checklist */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>문제점 선택 (해당되는 항목 모두 선택)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.issues.map((issue: any) => {
                const isSelected = selectedIssues.includes(issue.id);
                return (
                  <label
                    key={issue.id}
                    className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all"
                    style={{
                      borderColor: isSelected ? COLORS.error : COLORS.border,
                      backgroundColor: isSelected ? '#FEF2F2' : 'white',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleIssue(issue.id)}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: COLORS.error }}
                    />
                    <span className="text-sm" style={{ color: COLORS.navy }}>{issue.label}</span>
                    {isSelected && (
                      <AlertTriangle className="w-4 h-4 ml-auto" style={{ color: COLORS.error }} />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Explanation field */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
              왜 문제인지 간단히 설명하시오 (선택사항)
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="예: 고객의 개인정보를 동의 없이 AI에 입력하고 공개 채널에 공유하는 것은 개인정보보호법 위반..."
              className="w-full h-24 px-4 py-3 border-2 rounded-lg transition-all resize-none"
              style={{ borderColor: COLORS.border }}
            />
            <div className="mt-1 text-xs" style={{ color: COLORS.textMuted }}>
              {explanation.length} / 200자
            </div>
          </div>
        </div>
      );
    }

    // Rewrite Question
    if (question.type === 'rewrite') {
      const wordCount = getWordCount(rewrittenPrompt);
      const meetsMinimum = wordCount >= (question.minWords || 0);

      return (
        <div className="space-y-6">
          {/* Original prompt */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>원본 프롬프트</h3>
            <div className="text-gray-100 p-5 rounded-lg font-mono text-sm leading-relaxed" style={{ backgroundColor: COLORS.navyDark }}>
              {question.originalPrompt}
            </div>
          </div>

          {/* Requirements checklist */}
          <div className="border-l-4 p-4 rounded-r-lg" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.navy }}>수정 요구조건</h3>
            <ul className="space-y-2">
              {question.requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm" style={{ color: COLORS.navy }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: COLORS.success }} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rewrite area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium" style={{ color: COLORS.navy }}>
                수정된 프롬프트
              </label>
              <div className="text-sm" style={{ color: meetsMinimum ? COLORS.success : COLORS.textMuted }}>
                {wordCount} / {question.minWords}+ 단어
                {meetsMinimum && <span className="ml-1">✓</span>}
              </div>
            </div>
            <textarea
              value={rewrittenPrompt}
              onChange={(e) => setRewrittenPrompt(e.target.value)}
              placeholder="여기에 개선된 프롬프트를 작성하세요..."
              className="w-full h-48 px-4 py-3 border-2 rounded-lg transition-all resize-none font-mono text-sm"
              style={{ borderColor: COLORS.border }}
            />
          </div>
        </div>
      );
    }

    // Ordering Question
    if (question.type === 'ordering') {
      const orderedSteps = draggedSteps
        .map(id => question.steps.find((s: any) => s.id === id))
        .filter(Boolean);

      return (
        <DndProvider backend={HTML5Backend}>
          <div className="space-y-4">
            <div className="border rounded-lg p-4" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
              <p className="text-sm" style={{ color: COLORS.navy }}>
                카드를 드래그해서 올바른 순서로 배열하세요
              </p>
            </div>

            <div className="space-y-3">
              {orderedSteps.map((step: any, index: number) => (
                <DraggableStep
                  key={step.id}
                  step={step}
                  index={index}
                  moveStep={moveStep}
                />
              ))}
            </div>
          </div>
        </DndProvider>
      );
    }
  };

  // Get question type label in Korean
  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case 'dragdrop': return '프롬프트 빌더';
      case 'highlight': return '문제점 식별';
      case 'rewrite': return '프롬프트 수정';
      case 'ordering': return '순서 배열';
      default: return '';
    }
  };

  return (
    <ExamShell
      examTitle="필수 AI 인증 시험"
      partLabel="Part 2: 프롬프트 리터러시"
      currentIndex={currentQuestion}
      totalQuestions={questions.length}
      startTime={startTime}
      duration={35}
      questions={questions}
      getAnswer={(qId) => getAnswer(2, qId)}
      isFlagged={(qId) => isFlagged(2, qId)}
      onQuestionSelect={(index) => {
        saveCurrentAnswer();
        setCurrentQuestion(index);
      }}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onFlag={() => toggleFlag(2, question.id)}
      disablePrevious={currentQuestion === 0}
      disableNext={false}
      nextLabel={currentQuestion === questions.length - 1 ? 'Part 3로 계속' : '다음'}
    >
      {/* Question Card */}
      <div className="bg-white rounded-lg border p-6 lg:p-8" style={{ borderColor: COLORS.border }}>
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-xl font-bold" style={{ color: COLORS.navy }}>문항 {currentQuestion + 1}</h2>
            <span className="text-sm" style={{ color: COLORS.textMuted }}>{getQuestionTypeLabel()}</span>
          </div>
          <p className="leading-relaxed" style={{ color: COLORS.navy }}>{question.instruction}</p>
        </div>

        {/* Question Content */}
        <div>{renderQuestionContent()}</div>
      </div>
    </ExamShell>
  );
};

// Draggable Block Component
const DraggableBlock = ({ block, index, moveBlock }: { block: any, index: number, moveBlock: (fromIndex: number, toIndex: number) => void }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    hover: (draggedItem: { id: string, index: number }) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-white rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all duration-200 ease-out border-2"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isDragging ? '0 10px 25px -5px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderColor: isOver ? COLORS.navy : COLORS.border,
        backgroundColor: isOver ? COLORS.goldMuted : 'white',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-colors duration-200"
          style={{
            backgroundColor: isDragging ? COLORS.navy : COLORS.surface,
            color: isDragging ? 'white' : COLORS.textMuted,
          }}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans flex-1 pt-2" style={{ color: COLORS.navy }}>
          {block.text}
        </p>
      </div>
    </div>
  );
};

// Draggable Step Component
const DraggableStep = ({ step, index, moveStep }: { step: any, index: number, moveStep: (fromIndex: number, toIndex: number) => void }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'step',
    item: { id: step.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'step',
    hover: (draggedItem: { id: string, index: number }) => {
      if (draggedItem.index !== index) {
        moveStep(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-white rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all duration-200 ease-out border-2"
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isDragging ? '0 10px 25px -5px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderColor: isOver ? COLORS.navy : COLORS.border,
        backgroundColor: isOver ? COLORS.goldMuted : 'white',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 font-bold transition-colors duration-200"
          style={{
            backgroundColor: isDragging ? COLORS.navy : COLORS.goldMuted,
            color: isDragging ? 'white' : COLORS.navy,
          }}
        >
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans" style={{ color: COLORS.navy }}>
            {step.text}
          </p>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-colors duration-200"
          style={{
            backgroundColor: isDragging ? COLORS.navy : COLORS.surface,
            color: isDragging ? 'white' : COLORS.textMuted,
          }}
        >
          <GripVertical className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
