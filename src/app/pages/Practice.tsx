import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

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

export const Practice = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = {
    text: "AI 어시스턴트를 사용해 고객에게 이메일 초안을 작성하고 있습니다. AI가 아직 확정되지 않은 구체적인 가격 정보를 포함할 것을 제안했습니다. 어떻게 해야 할까요?",
    options: [
      { id: 'A', text: '시간을 절약하기 위해 AI 제안을 그대로 사용한다', correct: false },
      { id: 'B', text: '응답을 검토하고 확인되지 않은 세부 정보를 제거하도록 수정한다', correct: true },
      { id: 'C', text: 'AI에게 가격을 더 창의적으로 작성하도록 요청한다', correct: false },
      { id: 'D', text: 'AI 제안을 완전히 무시한다', correct: false }
    ]
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const selectedOption = question.options.find(opt => opt.id === selected);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: COLORS.surface }}>
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-lg border p-8" style={{ borderColor: COLORS.border }}>
          <div className="mb-6">
            <div
              className="inline-block px-3 py-1 text-sm rounded-full mb-4 font-medium"
              style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}
            >
              연습 문제
            </div>
            <h1 className="text-xl mb-2 font-bold" style={{ color: COLORS.navy }}>샘플 문제 체험</h1>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              Part 1: AI 리터러시 & 윤리에서 접하게 될 문제 유형의 예시입니다
            </p>
          </div>

          <div className="rounded-lg p-6 mb-6" style={{ backgroundColor: COLORS.surface }}>
            <p style={{ color: COLORS.navy }}>{question.text}</p>
          </div>

          <div className="space-y-3 mb-8">
            {question.options.map((option) => {
              const isSelected = selected === option.id;
              const isCorrect = option.correct;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <label
                  key={option.id}
                  className="block p-4 border-2 rounded-lg cursor-pointer transition-all"
                  style={{
                    borderColor: showCorrect ? COLORS.success : showWrong ? COLORS.error : isSelected ? COLORS.navy : COLORS.border,
                    backgroundColor: showCorrect ? '#ECFDF5' : showWrong ? '#FEF2F2' : isSelected ? COLORS.goldMuted : 'white',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="practice"
                      value={option.id}
                      checked={isSelected}
                      onChange={() => setSelected(option.id)}
                      disabled={showFeedback}
                      className="mt-0.5 w-4 h-4"
                      style={{ accentColor: COLORS.navy }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: COLORS.navy }}>{option.id}.</span>
                        <span style={{ color: COLORS.navy }}>{option.text}</span>
                        {showCorrect && (
                          <Check className="w-5 h-5 ml-auto" style={{ color: COLORS.success }} />
                        )}
                        {showWrong && (
                          <X className="w-5 h-5 ml-auto" style={{ color: COLORS.error }} />
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {showFeedback && (
            <div
              className="p-4 rounded-lg mb-6 border"
              style={{
                backgroundColor: selectedOption?.correct ? '#ECFDF5' : '#FEF2F2',
                borderColor: selectedOption?.correct ? COLORS.success : COLORS.error,
              }}
            >
              {selectedOption?.correct ? (
                <div>
                  <div className="flex items-center gap-2 mb-2" style={{ color: COLORS.success }}>
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">정답입니다!</span>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.navy }}>
                    AI가 생성한 콘텐츠, 특히 가격, 날짜, 약속과 같은 구체적인 세부 정보가 포함된 경우
                    항상 검토하고 확인해야 합니다. AI는 환각(hallucination)을 일으키거나 오래된 정보를
                    포함할 수 있습니다.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-2" style={{ color: COLORS.error }}>
                    <X className="w-5 h-5" />
                    <span className="font-semibold">아쉽게도 오답입니다</span>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.navy }}>
                    정답은 B입니다. 특히 확인되지 않은 구체적인 세부 정보를 다룰 때는
                    정확성을 보장하기 위해 항상 AI 응답을 검토하고 수정해야 합니다.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 bg-white border-2 rounded-lg transition-colors font-medium"
              style={{ color: COLORS.navy, borderColor: COLORS.border }}
            >
              홈으로 돌아가기
            </button>
            {!showFeedback ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="flex-1 px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
                style={{ backgroundColor: COLORS.navy }}
              >
                답안 제출
              </button>
            ) : (
              <button
                onClick={() => navigate('/rules')}
                className="flex-1 px-6 py-3 text-white rounded-lg transition-colors font-semibold"
                style={{ backgroundColor: COLORS.navy }}
              >
                전체 시험 시작
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
