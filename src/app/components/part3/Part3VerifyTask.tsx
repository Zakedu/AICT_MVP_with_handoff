/**
 * Part 3 검증형 문항 메인 컴포넌트
 */

import { useState, useEffect } from 'react';
import { Part3VerifyTask as Part3VerifyTaskData } from '../../data/part3-verify-tasks';
import { Part3VerifyProvider, usePart3Verify } from '../../context/Part3VerifyContext';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Eye,
  EyeOff,
  Lightbulb,
  Zap,
  Target,
} from 'lucide-react';

interface Part3VerifyTaskProps {
  task: Part3VerifyTaskData;
  onSave: (answer: any) => void;
  initialAnswer?: any;
}

// Wrapper with Provider
export function Part3VerifyTaskComponent({ task, onSave, initialAnswer }: Part3VerifyTaskProps) {
  return (
    <Part3VerifyProvider initialAnswer={initialAnswer}>
      <Part3VerifyTaskInner task={task} onSave={onSave} />
    </Part3VerifyProvider>
  );
}

// Inner Component
function Part3VerifyTaskInner({ task, onSave }: Omit<Part3VerifyTaskProps, 'initialAnswer'>) {
  const {
    currentPhase,
    currentBlock,
    answer,
    liveValidation,
    mode,
    showExamples,
    showHints,
    setPhase,
    setBlock,
    updateBlock,
    toggleMode,
    toggleExamples,
    toggleHints,
    runLiveValidation,
  } = usePart3Verify();

  // 실시간 검증 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      runLiveValidation(task);
    }, 500); // 0.5초 debounce

    return () => clearTimeout(timer);
  }, [answer, task]);

  // 자동 저장
  useEffect(() => {
    const timer = setTimeout(() => {
      onSave(answer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [answer, onSave]);

  const blockNames: Record<string, string> = {
    system: 'System 프롬프트',
    user: 'User 템플릿',
    output: 'Output 규격',
    selfcheck: 'Self-check',
    fallback: 'Fallback',
  };

  const blockKeys: Record<string, keyof typeof answer> = {
    system: 'system_prompt',
    user: 'user_template',
    output: 'output_spec',
    selfcheck: 'self_check',
    fallback: 'fallback',
  };

  const phaseLabels = {
    1: '시나리오 이해',
    2: '프롬프트 작성',
    3: '제출 전 검토',
  };

  // Phase 1: Context
  if (currentPhase === 1) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <PhaseHeader currentPhase={1} phaseLabels={phaseLabels} />

        <div className="mt-8 space-y-6">
          {/* Mission */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">당신의 미션</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {task.exam_task.task_summary}
            </p>
          </div>

          {/* Scenario Summary */}
          <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">시나리오 요약</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {task.scenario.background}
            </p>
          </div>

          {/* Key Constraints */}
          <div className="bg-amber-50 rounded-xl border-2 border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-amber-900">핵심 제약조건</h3>
            </div>
            <ul className="space-y-2">
              {task.constraints.ban_list.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  <span className="text-sm text-amber-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables Preview */}
          <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">제출해야 할 것 (5개 블록)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {task.exam_task.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-blue-200">
                  <div className="w-6 h-6 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-blue-900">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={() => setPhase(2)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
          >
            Phase 2로 이동: 프롬프트 작성 시작
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Phase 2: Writing
  if (currentPhase === 2) {
    return (
      <div className="grid grid-cols-12 gap-6 h-screen overflow-hidden">
        {/* Left Sidebar - Sticky Scenario */}
        <div className="col-span-3 overflow-y-auto p-4 bg-gray-50 border-r-2 border-gray-200">
          <LeftSidebar task={task} liveValidation={liveValidation} />
        </div>

        {/* Center - Editor */}
        <div className="col-span-6 flex flex-col overflow-hidden">
          <PhaseHeader currentPhase={2} phaseLabels={phaseLabels} />

          {/* Block Tabs */}
          <div className="flex gap-2 mt-4 border-b-2 border-gray-200 pb-2 overflow-x-auto">
            {(['system', 'user', 'output', 'selfcheck', 'fallback'] as const).map((block) => {
              const isActive = currentBlock === block;
              const content = answer[blockKeys[block]];
              const hasContent = content.length > 50;

              return (
                <button
                  key={block}
                  onClick={() => setBlock(block)}
                  className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : hasContent
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {hasContent && <CheckCircle className="w-3 h-3" />}
                  {blockNames[block]}
                </button>
              );
            })}
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <BlockEditor
              block={currentBlock}
              content={answer[blockKeys[currentBlock]]}
              onChange={(content) => updateBlock(currentBlock, content)}
              task={task}
              mode={mode}
              showExamples={showExamples}
              showHints={showHints}
            />
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border-t-2 border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMode}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                {mode === 'guided' ? '📝 가이드 모드' : '✍️ 자유 모드'}
              </button>
              <button
                onClick={toggleExamples}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                {showExamples ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                예시 {showExamples ? '숨기기' : '보기'}
              </button>
              <button
                onClick={toggleHints}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                힌트 {showHints ? 'ON' : 'OFF'}
              </button>
            </div>
            <button
              onClick={() => setPhase(3)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors"
            >
              Phase 3로 이동: 제출 전 검토
            </button>
          </div>
        </div>

        {/* Right Sidebar - Live Feedback */}
        <div className="col-span-3 overflow-y-auto p-4 bg-gray-50 border-l-2 border-gray-200">
          <RightSidebar task={task} liveValidation={liveValidation} />
        </div>
      </div>
    );
  }

  // Phase 3: Review
  return (
    <div className="max-w-5xl mx-auto p-8">
      <PhaseHeader currentPhase={3} phaseLabels={phaseLabels} />

      <div className="mt-8 space-y-6">
        <ReviewPanel task={task} answer={answer} liveValidation={liveValidation} />

        <div className="flex gap-4">
          <button
            onClick={() => setPhase(2)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-4 rounded-xl font-bold transition-colors"
          >
            ← 수정하기
          </button>
          <button
            onClick={() => onSave(answer)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-colors"
          >
            최종 제출
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================
// Sub-components
// ================================

function PhaseHeader({ currentPhase, phaseLabels }: { currentPhase: number; phaseLabels: Record<number, string> }) {
  return (
    <div className="flex items-center gap-4">
      {[1, 2, 3].map((phase) => {
        const isActive = phase === currentPhase;
        const isPast = phase < currentPhase;

        return (
          <div key={phase} className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                isActive
                  ? 'bg-green-600 text-white'
                  : isPast
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {phase}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
              {phaseLabels[phase]}
            </span>
            {phase < 3 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
          </div>
        );
      })}
    </div>
  );
}

function LeftSidebar({ task, liveValidation }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-2">📋 시나리오</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <p className="text-xs text-gray-700 leading-relaxed line-clamp-6">{task.scenario.background}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-2">✅ 제출 요구사항</h3>
        <div className="space-y-2">
          {task.exam_task.deliverables.map((item: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{item.split(':')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {liveValidation.estimatedScore && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">📊 예상 점수</h3>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {liveValidation.estimatedScore.totalEstimate}점
            </div>
            <div className="text-xs text-gray-600">
              합격선: {task.rubric.pass_cutline}점
              {liveValidation.estimatedScore.totalEstimate >= task.rubric.pass_cutline ? ' ✅' : ' ⚠️'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RightSidebar({ task, liveValidation }: any) {
  const alerts = liveValidation.alerts || [];
  const errors = alerts.filter((a: any) => a.severity === 'error');
  const warnings = alerts.filter((a: any) => a.severity === 'warning');

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {errors.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-red-900 mb-2">🚨 자동 실패 위험</h3>
          <div className="space-y-2">
            {errors.map((alert: any, idx: number) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-900">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {warnings.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-amber-900 mb-2">⚠️ 경고</h3>
          <div className="space-y-2">
            {warnings.map((alert: any, idx: number) => (
              <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-900">{alert.message}</p>
                {alert.location && (
                  <p className="text-xs text-amber-700 mt-1">위치: {alert.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rubric Mini Dashboard */}
      {liveValidation.estimatedScore && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">📈 기준별 점수</h3>
          <div className="space-y-2">
            {task.rubric.criteria.map((criterion: any) => {
              const level = liveValidation.estimatedScore.scores[criterion.name] || 0;
              const stars = '⭐'.repeat(level) + '⚪'.repeat(4 - level);

              return (
                <div key={criterion.name} className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-xs font-medium text-gray-900 mb-1">{criterion.name}</div>
                  <div className="text-xs text-gray-600">{stars}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function BlockEditor({
  block,
  content,
  onChange,
  task,
  mode,
  showExamples,
  showHints,
}: {
  block: string;
  content: string;
  onChange: (content: string) => void;
  task: Part3VerifyTaskData;
  mode: string;
  showExamples: boolean;
  showHints: boolean;
}) {
  const blockKey = block as 'system' | 'user' | 'output' | 'selfcheck' | 'fallback';
  const deliverableKey =
    blockKey === 'system'
      ? 'system_prompt'
      : blockKey === 'user'
      ? 'user_template'
      : blockKey === 'output'
      ? 'output_spec'
      : blockKey === 'selfcheck'
      ? 'self_check'
      : 'fallback';

  const examples = task.learning.deliverable_examples[deliverableKey];

  return (
    <div className="space-y-4">
      {/* Hints */}
      {showHints && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-bold text-blue-900">작성 힌트</h4>
          </div>
          <p className="text-xs text-blue-900">
            {deliverableKey === 'system_prompt' &&
              '역할, 목표, 금지 표현, 불확실성 표기 규칙, 개인정보 규칙, 질문 제한 규칙을 모두 포함하세요.'}
            {deliverableKey === 'user_template' &&
              '입력값을 카테고리별로 구조화하고, {{변수}} 형식으로 재사용 가능하게 만드세요.'}
            {deliverableKey === 'output_spec' &&
              '5개 섹션(A/B/C/D/E)과 최소 항목 수를 강제하세요. 표 형식도 명시하세요.'}
            {deliverableKey === 'self_check' &&
              '최소 10개 이상의 구체적이고 검증 가능한 체크리스트를 만드세요.'}
            {deliverableKey === 'fallback' &&
              '질문은 정확히 3개로 제한하고, 나머지는 "확인 필요"로 표시하는 규칙을 명시하세요.'}
          </p>
        </div>
      )}

      {/* Examples */}
      {showExamples && examples && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-xs font-bold text-green-900 mb-2">✅ 탁월 예시 (Level 4)</h4>
            <pre className="text-xs text-green-900 whitespace-pre-wrap bg-white rounded p-2 border border-green-200 overflow-x-auto">
              {examples.level_4}
            </pre>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="text-xs font-bold text-amber-900 mb-2">⚠️ 보통 예시 (Level 2)</h4>
            <pre className="text-xs text-amber-900 whitespace-pre-wrap bg-white rounded p-2 border border-amber-200 overflow-x-auto">
              {examples.level_2}
            </pre>
          </div>
        </div>
      )}

      {/* Textarea */}
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${
          block === 'system' ? 'System' : block === 'user' ? 'User' : block === 'output' ? 'Output' : block === 'selfcheck' ? 'Self-check' : 'Fallback'
        } 프롬프트를 작성하세요...`}
        className="w-full h-[500px] px-4 py-3 text-sm font-mono leading-relaxed border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
      />

      {/* Character Count */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>글자 수: {content.length}</span>
        <span>줄 수: {content.split('\n').length}</span>
      </div>
    </div>
  );
}

function ReviewPanel({ task, answer, liveValidation }: any) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">제출 전 최종 검토</h2>

      {/* Auto Fail Check */}
      {liveValidation.alerts.some((a: any) => a.severity === 'error') && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-red-900 mb-2">🚨 자동 실패 조건 감지</h3>
          <p className="text-sm text-red-900">아래 문제를 수정하지 않으면 0점 처리됩니다:</p>
          <ul className="mt-2 space-y-1">
            {liveValidation.alerts
              .filter((a: any) => a.severity === 'error')
              .map((alert: any, idx: number) => (
                <li key={idx} className="text-sm text-red-900">
                  • {alert.message}
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Estimated Score */}
      {liveValidation.estimatedScore && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">예상 점수</h3>
          <div className="flex items-end gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-900">
              {liveValidation.estimatedScore.totalEstimate}
            </div>
            <div className="text-xl text-gray-600 mb-2">/ 100점</div>
          </div>
          <div className="text-sm text-gray-700">
            합격선: {task.rubric.pass_cutline}점{' '}
            {liveValidation.estimatedScore.totalEstimate >= task.rubric.pass_cutline ? (
              <span className="text-green-600 font-bold">✅ 합격 예상</span>
            ) : (
              <span className="text-red-600 font-bold">⚠️ 불합격 위험</span>
            )}
          </div>
        </div>
      )}

      {/* Structural Checks */}
      {liveValidation.structural && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">구조적 요구사항 확인</h3>
          <div className="space-y-2">
            <CheckItem
              label="5개 블록 모두 작성"
              passed={liveValidation.structural.has5Blocks}
            />
            <CheckItem
              label="Output 필수 섹션 포함"
              passed={liveValidation.structural.outputSectionsValid}
            />
            <CheckItem
              label={`사전 질문 ${liveValidation.structural.minItemCounts.questions.required}개 이상`}
              passed={liveValidation.structural.minItemCounts.questions.passed}
              detail={`현재: ${liveValidation.structural.minItemCounts.questions.count}개`}
            />
            <CheckItem
              label={`검증 실험 ${liveValidation.structural.minItemCounts.experiments.required}개 이상`}
              passed={liveValidation.structural.minItemCounts.experiments.passed}
              detail={`현재: ${liveValidation.structural.minItemCounts.experiments.count}개`}
            />
            <CheckItem
              label={`Self-check ${liveValidation.structural.minItemCounts.selfChecks.required}개 이상`}
              passed={liveValidation.structural.minItemCounts.selfChecks.passed}
              detail={`현재: ${liveValidation.structural.minItemCounts.selfChecks.count}개`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CheckItem({ label, passed, detail }: { label: string; passed: boolean; detail?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div
        className={`w-5 h-5 rounded flex items-center justify-center ${
          passed ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        {passed && <CheckCircle className="w-3 h-3 text-white" />}
      </div>
      <div className="flex-1">
        <span className="text-sm text-gray-900">{label}</span>
        {detail && <span className="text-xs text-gray-600 ml-2">({detail})</span>}
      </div>
    </div>
  );
}