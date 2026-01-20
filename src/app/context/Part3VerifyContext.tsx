/**
 * Part 3 검증형 문항 Context
 */

import { createContext, useContext, useState, ReactNode } from 'react';
import { Part3VerifyTask } from '../data/part3-verify-tasks';
import {
  Part3VerifyAnswer,
  ValidationAlert,
  StructuralCheckResult,
  RubricEstimate,
  generateLiveAlerts,
  checkStructuralRequirements,
  estimateRubricScore,
} from '../utils/part3-validators';

// ================================
// 타입 정의
// ================================

type Phase = 1 | 2 | 3;
type Block = 'system' | 'user' | 'output' | 'selfcheck' | 'fallback';
type Mode = 'guided' | 'freeform';

interface Part3VerifyState {
  // 현재 단계
  currentPhase: Phase;
  currentBlock: Block;

  // 작성 내용
  answer: Part3VerifyAnswer;

  // 실시간 검증 결과
  liveValidation: {
    alerts: ValidationAlert[];
    structural: StructuralCheckResult | null;
    estimatedScore: RubricEstimate | null;
  };

  // UI 상태
  mode: Mode;
  showExamples: boolean;
  showHints: boolean;

  // 제출 후
  submitted: boolean;
}

interface Part3VerifyContextValue extends Part3VerifyState {
  // Actions
  setPhase: (phase: Phase) => void;
  setBlock: (block: Block) => void;
  updateBlock: (block: Block, content: string) => void;
  toggleMode: () => void;
  toggleExamples: () => void;
  toggleHints: () => void;
  runLiveValidation: (task: Part3VerifyTask) => void;
  submitAnswer: () => void;
  resetAnswer: () => void;
}

// ================================
// Context
// ================================

const Part3VerifyContext = createContext<Part3VerifyContextValue | undefined>(undefined);

export function usePart3Verify() {
  const context = useContext(Part3VerifyContext);
  if (!context) {
    throw new Error('usePart3Verify must be used within Part3VerifyProvider');
  }
  return context;
}

// ================================
// Provider
// ================================

interface Part3VerifyProviderProps {
  children: ReactNode;
  initialAnswer?: Partial<Part3VerifyAnswer>;
}

export function Part3VerifyProvider({ children, initialAnswer }: Part3VerifyProviderProps) {
  const [state, setState] = useState<Part3VerifyState>({
    currentPhase: 1,
    currentBlock: 'system',
    answer: {
      system_prompt: initialAnswer?.system_prompt || '',
      user_template: initialAnswer?.user_template || '',
      output_spec: initialAnswer?.output_spec || '',
      self_check: initialAnswer?.self_check || '',
      fallback: initialAnswer?.fallback || '',
    },
    liveValidation: {
      alerts: [],
      structural: null,
      estimatedScore: null,
    },
    mode: 'guided',
    showExamples: false,
    showHints: true,
    submitted: false,
  });

  const setPhase = (phase: Phase) => {
    setState((prev) => ({ ...prev, currentPhase: phase }));
  };

  const setBlock = (block: Block) => {
    setState((prev) => ({ ...prev, currentBlock: block }));
  };

  const updateBlock = (block: Block, content: string) => {
    const blockKeyMap: Record<Block, keyof Part3VerifyAnswer> = {
      system: 'system_prompt',
      user: 'user_template',
      output: 'output_spec',
      selfcheck: 'self_check',
      fallback: 'fallback',
    };

    setState((prev) => ({
      ...prev,
      answer: {
        ...prev.answer,
        [blockKeyMap[block]]: content,
      },
    }));
  };

  const toggleMode = () => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === 'guided' ? 'freeform' : 'guided',
    }));
  };

  const toggleExamples = () => {
    setState((prev) => ({ ...prev, showExamples: !prev.showExamples }));
  };

  const toggleHints = () => {
    setState((prev) => ({ ...prev, showHints: !prev.showHints }));
  };

  const runLiveValidation = (task: Part3VerifyTask) => {
    const alerts = generateLiveAlerts(state.answer, task);
    const structural = checkStructuralRequirements(state.answer, task);
    const estimatedScore = estimateRubricScore(state.answer, task);

    setState((prev) => ({
      ...prev,
      liveValidation: {
        alerts,
        structural,
        estimatedScore,
      },
    }));
  };

  const submitAnswer = () => {
    setState((prev) => ({ ...prev, submitted: true }));
  };

  const resetAnswer = () => {
    setState({
      currentPhase: 1,
      currentBlock: 'system',
      answer: {
        system_prompt: '',
        user_template: '',
        output_spec: '',
        self_check: '',
        fallback: '',
      },
      liveValidation: {
        alerts: [],
        structural: null,
        estimatedScore: null,
      },
      mode: 'guided',
      showExamples: false,
      showHints: true,
      submitted: false,
    });
  };

  const value: Part3VerifyContextValue = {
    ...state,
    setPhase,
    setBlock,
    updateBlock,
    toggleMode,
    toggleExamples,
    toggleHints,
    runLiveValidation,
    submitAnswer,
    resetAnswer,
  };

  return <Part3VerifyContext.Provider value={value}>{children}</Part3VerifyContext.Provider>;
}
