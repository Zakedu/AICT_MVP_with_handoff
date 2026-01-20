import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import { ExamShell } from '../components/ExamShell';
import { CircleAlert } from 'lucide-react';

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
};

export const Part1 = () => {
  const navigate = useNavigate();
  const { startTime, getAnswer, setAnswer, toggleFlag, isFlagged, examQuestions } = useExam();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Use questions from context (randomized) or empty array if not initialized
  const questions = examQuestions.part1;

  useEffect(() => {
    if (!startTime) {
      navigate('/rules');
    }
  }, [startTime, navigate]);

  if (!startTime || questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestion];
  const selectedAnswer = getAnswer(1, question.id);

  const handleSelect = (optionId: string) => {
    setAnswer(1, question.id, optionId);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/part2');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <ExamShell
      examTitle="필수 AI 인증 시험"
      partLabel="Part 1: AI 리터러시 & 윤리"
      currentIndex={currentQuestion}
      totalQuestions={questions.length}
      startTime={startTime}
      duration={15}
      questions={questions}
      getAnswer={(qId) => getAnswer(1, qId)}
      isFlagged={(qId) => isFlagged(1, qId)}
      onQuestionSelect={setCurrentQuestion}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onFlag={() => toggleFlag(1, question.id)}
      disablePrevious={currentQuestion === 0}
      disableNext={false}
      nextLabel={currentQuestion === questions.length - 1 ? 'Part 2로 계속' : '다음'}
    >
      {/* Question Card */}
      <div className="bg-white rounded-lg border p-8 lg:p-12" style={{ borderColor: COLORS.border }}>
        {/* Question Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline gap-4">
              <h2 className="text-2xl font-bold" style={{ color: COLORS.navy }}>문항 {currentQuestion + 1}</h2>
              <span className="text-sm font-medium" style={{ color: COLORS.textMuted }}>
                {question.type === 'mcq' ? '객관식' : '사례 판별'}
              </span>
            </div>

            {/* Key Terms */}
            {question.keyTerms && question.keyTerms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {question.keyTerms.map((term, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 text-xs rounded-full font-semibold"
                    style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}
                  >
                    {term}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Scenario Box (for risk-type questions) */}
          {question.type === 'risk' && question.situation && (
            <div className="mb-6 p-5 rounded-lg border" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
              <div className="flex gap-4">
                <CircleAlert className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: COLORS.gold }} />
                <div>
                  <div className="text-xs mb-2 font-bold" style={{ color: COLORS.navy }}>상황</div>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.navy }}>{question.situation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Question Text */}
          <div className="rounded-lg p-6 border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
            <p className="text-lg leading-relaxed font-medium" style={{ color: COLORS.navy }}>{question.text}</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            return (
              <label
                key={option.id}
                className="block p-6 rounded-lg cursor-pointer transition-all hover:shadow-md border-2"
                style={{
                  borderColor: isSelected ? COLORS.navy : COLORS.border,
                  backgroundColor: isSelected ? COLORS.goldMuted : 'white',
                }}
              >
                <div className="flex items-start gap-5">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={isSelected}
                    onChange={() => handleSelect(option.id)}
                    className="mt-1 w-5 h-5 focus:ring-offset-0"
                    style={{ accentColor: COLORS.navy }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold flex-shrink-0 transition-colors"
                        style={{
                          backgroundColor: isSelected ? COLORS.navy : COLORS.surface,
                          color: isSelected ? 'white' : COLORS.textMuted,
                        }}
                      >
                        {option.id}
                      </span>
                      <span className="text-base leading-relaxed pt-1" style={{ color: COLORS.navy }}>{option.text}</span>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </ExamShell>
  );
};