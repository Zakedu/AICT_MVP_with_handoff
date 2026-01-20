import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Part1Question, Part2Question } from '../data/questions/types';
import { extractPart1Questions, extractPart2Questions } from '../services/questionBank';

const STORAGE_KEYS = {
  ANSWERS: 'aict_exam_answers',
  START_TIME: 'aict_exam_startTime',
  CONSENTED: 'aict_exam_consented',
  SELECTED_ROLES: 'aict_exam_selectedRoles',
  USER_INFO: 'aict_exam_userInfo',
  EXAM_QUESTIONS: 'aict_exam_questions',
} as const;

export interface UserInfo {
  name: string;
  email: string;
}

interface Answer {
  partId: number;
  questionId: string;
  answer: any;
  flagged?: boolean;
}

// 시험용 문항 세트 (역량별 추출 + 셔플된 상태)
interface ExamQuestionSet {
  part1: Part1Question[];
  part2: Part2Question[];
}

// Empty question set for default value
const EMPTY_EXAM_QUESTIONS: ExamQuestionSet = {
  part1: [],
  part2: [],
};

interface ExamContextType {
  answers: Answer[];
  setAnswer: (partId: number, questionId: string, answer: any) => void;
  toggleFlag: (partId: number, questionId: string) => void;
  getAnswer: (partId: number, questionId: string) => any;
  isFlagged: (partId: number, questionId: string) => boolean;
  startTime: number | null;
  setStartTime: (time: number) => void;
  consented: boolean;
  setConsented: (value: boolean) => void;
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearExamData: () => void;
  // 문항 세트 관련
  examQuestions: ExamQuestionSet;
  initializeExamQuestions: (part1All: Part1Question[], part2All: Part2Question[]) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider = ({ children }: { children: ReactNode }) => {
  // LocalStorage에서 초기값 복원
  const [answers, setAnswers] = useState<Answer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [startTime, setStartTimeState] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.START_TIME);
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [consented, setConsentedState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONSENTED);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [selectedRoles, setSelectedRolesState] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_ROLES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_INFO);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [examQuestions, setExamQuestions] = useState<ExamQuestionSet>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_QUESTIONS);
      return saved ? JSON.parse(saved) : EMPTY_EXAM_QUESTIONS;
    } catch {
      return EMPTY_EXAM_QUESTIONS;
    }
  });

  // LocalStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (startTime !== null) {
      localStorage.setItem(STORAGE_KEYS.START_TIME, String(startTime));
    }
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONSENTED, String(consented));
  }, [consented]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_ROLES, JSON.stringify(selectedRoles));
  }, [selectedRoles]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (examQuestions) {
      localStorage.setItem(STORAGE_KEYS.EXAM_QUESTIONS, JSON.stringify(examQuestions));
    }
  }, [examQuestions]);

  // Wrapper 함수들 (LocalStorage 저장은 useEffect에서 처리)
  const setStartTime = (time: number) => setStartTimeState(time);
  const setConsented = (value: boolean) => setConsentedState(value);
  const setSelectedRoles = (roles: string[]) => setSelectedRolesState(roles);
  const setUserInfo = (info: UserInfo) => setUserInfoState(info);

  // 시험 문항 초기화 (역량별 추출 + 선택지 셔플)
  const initializeExamQuestions = (part1All: Part1Question[], part2All: Part2Question[]) => {
    // 이미 문항 세트가 있으면 재사용 (새로고침 시 동일 문항 유지)
    if (examQuestions.part1.length > 0) {
      return;
    }
    const newSet: ExamQuestionSet = {
      part1: extractPart1Questions(part1All),
      part2: extractPart2Questions(part2All),
    };
    setExamQuestions(newSet);
  };

  // 시험 데이터 초기화 (새 시험 시작 시 사용)
  const clearExamData = () => {
    setAnswers([]);
    setStartTimeState(null);
    setConsentedState(false);
    setSelectedRolesState([]);
    setUserInfoState(null);
    setExamQuestions(EMPTY_EXAM_QUESTIONS);
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  };

  const setAnswer = (partId: number, questionId: string, answer: any) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.partId === partId && a.questionId === questionId);
      if (existing) {
        return prev.map(a => 
          a.partId === partId && a.questionId === questionId 
            ? { ...a, answer } 
            : a
        );
      }
      return [...prev, { partId, questionId, answer }];
    });
  };

  const toggleFlag = (partId: number, questionId: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.partId === partId && a.questionId === questionId);
      if (existing) {
        return prev.map(a => 
          a.partId === partId && a.questionId === questionId 
            ? { ...a, flagged: !a.flagged } 
            : a
        );
      }
      return [...prev, { partId, questionId, answer: null, flagged: true }];
    });
  };

  const getAnswer = (partId: number, questionId: string) => {
    const answer = answers.find(a => a.partId === partId && a.questionId === questionId);
    return answer?.answer;
  };

  const isFlagged = (partId: number, questionId: string) => {
    const answer = answers.find(a => a.partId === partId && a.questionId === questionId);
    return answer?.flagged || false;
  };

  return (
    <ExamContext.Provider value={{
      answers,
      setAnswer,
      toggleFlag,
      getAnswer,
      isFlagged,
      startTime,
      setStartTime,
      consented,
      setConsented,
      selectedRoles,
      setSelectedRoles,
      userInfo,
      setUserInfo,
      clearExamData,
      examQuestions,
      initializeExamQuestions
    }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within ExamProvider');
  }
  return context;
};