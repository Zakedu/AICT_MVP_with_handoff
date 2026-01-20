/**
 * Part 3 타입 정의
 * 10개 직무 × 4개 유형 = 40개 문항
 */

// 6가지 통합 역량 지표
export type IndicatorType =
  | 'defining'     // AI 개념 이해
  | 'prompting'    // 프롬프트 설계
  | 'protecting'   // 데이터 보호
  | 'refining'     // 결과 검증
  | 'acumen'       // 윤리적 판단
  | 'integrating'; // 업무 통합

// Part 3 문항 유형
export type Part3TaskType = 'prompt' | 'analyze' | 'collaborate' | 'evaluate';

// Part 3 문항 유형 라벨
export const PART3_TASK_TYPE_LABELS: Record<Part3TaskType, string> = {
  prompt: '3-A: 프롬프트 작성 기술',
  analyze: '3-B: AI 활용 판단력',
  collaborate: '3-C: AI 협업 과정',
  evaluate: '3-D: 결과물 품질 판단'
};

// 직무 코드
export type JobCode =
  | 'data-marketer'
  | 'hr-manager'
  | 'game-programmer'
  | 'media-planner'
  | 'sales-finance'
  | 'security-researcher'
  | 'content-planner'
  | 'business-planning'
  | 'food-rnd'
  | 'event-planner';

// 직무 정보
export interface JobInfo {
  jobNumber: number;
  jobTitle: string;
  jobCode: JobCode;
  sourceInterview: string;
}

// Part 3 문항
export interface Part3Task {
  id: string;
  role: JobCode;
  scenario: string;
  scenarioTitle: string;
  scenarioDesc: string;
  context: string[];
  taskType: Part3TaskType;
  taskTypeLabel: string;
  title: string;
  instruction: string;
  requirements: string[];
  aiMessagesLimit: number;  // 0, 3, or 5
  minLines: number;
}

// 루브릭 기준
export interface RubricCriterion {
  level: 1 | 2 | 3 | 4;
  label: '부족' | '기본' | '우수' | '탁월';
  indicator: string;
}

// 문항별 루브릭
export interface TaskRubric {
  taskTypeLabel: string;
  weight: number;
  criteria: RubricCriterion[];
}

// 직무별 전체 데이터
export interface JobData {
  jobNumber: number;
  jobTitle: string;
  jobCode: JobCode;
  sourceInterview: string;
  tasks: Part3Task[];
  rubrics: Record<string, TaskRubric>;
}

// Part 3 전체 데이터
export interface Part3Data {
  metadata: {
    version: string;
    created: string;
    project: string;
    description: string;
    totalJobs: number;
    totalTasks: number;
    taskTypes: Record<string, string>;
  };
  jobs: JobData[];
}

// 채팅 메시지 (3-C용)
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Part 3 응시자 응답
export interface Part3Response {
  taskId: string;
  taskType: Part3TaskType;
  content: string;  // 텍스트 답변 또는 JSON 문자열 (채팅)
  chatMessages?: ChatMessage[];  // 3-C용 채팅 기록
  startedAt: number;
  submittedAt: number;
}

// 지표별 점수
export interface IndicatorScores {
  defining: number;
  prompting: number;
  protecting: number;
  refining: number;
  acumen: number;
  integrating: number;
}

// Part 3 채점 결과
export interface Part3ScoringResult {
  taskId: string;
  taskType: Part3TaskType;
  rubricLevel: 1 | 2 | 3 | 4;
  rubricLabel: string;
  indicatorScores: IndicatorScores;
  totalScore: number;
  maxScore: number;
  feedback: string;
  isAutoScored: boolean;  // true = AI 채점, false = 인간 검토 후
}

// Part 3 문항별 배점 설정
export const PART3_TASK_SCORES: Record<Part3TaskType, { base: number; weight: number; max: number }> = {
  prompt: { base: 15, weight: 1.0, max: 15 },
  analyze: { base: 15, weight: 1.0, max: 15 },
  collaborate: { base: 15, weight: 1.2, max: 18 },
  evaluate: { base: 12, weight: 1.0, max: 12 }
};

// Part 3 지표별 최대 기여 점수
export const PART3_INDICATOR_MAX: IndicatorScores = {
  defining: 8,
  prompting: 15,
  protecting: 8,
  refining: 12,
  acumen: 7,
  integrating: 10
};

// 전체 지표별 최대 점수 (Part 1 + 2 + 3)
export const TOTAL_INDICATOR_MAX: IndicatorScores = {
  defining: 15,
  prompting: 25,
  protecting: 15,
  refining: 20,
  acumen: 10,
  integrating: 15
};

// 지표 한글 라벨
export const INDICATOR_LABELS: Record<IndicatorType, string> = {
  defining: 'AI 개념 이해',
  prompting: '프롬프트 설계',
  protecting: '데이터 보호',
  refining: '결과 검증',
  acumen: '윤리적 판단',
  integrating: '업무 통합'
};

// 직무 정보 목록
export const JOB_LIST: JobInfo[] = [
  { jobNumber: 1, jobTitle: '데이터/퍼포먼스 마케터', jobCode: 'data-marketer', sourceInterview: '스킨1004 브랜드 데이터 비즈니스팀 양승민 파트장' },
  { jobNumber: 2, jobTitle: 'HR/인사담당자', jobCode: 'hr-manager', sourceInterview: '헤리트 HR팀 인사담당자' },
  { jobNumber: 3, jobTitle: '게임 프로그래머', jobCode: 'game-programmer', sourceInterview: '게임 개발사 클라이언트 프로그래머' },
  { jobNumber: 4, jobTitle: '미디어 플래너', jobCode: 'media-planner', sourceInterview: '광고대행사 미디어플래닝팀' },
  { jobNumber: 5, jobTitle: '영업 (금융)', jobCode: 'sales-finance', sourceInterview: '금융권 영업담당자' },
  { jobNumber: 6, jobTitle: '보안 연구원', jobCode: 'security-researcher', sourceInterview: '보안 연구소 연구원' },
  { jobNumber: 7, jobTitle: '콘텐츠 기획', jobCode: 'content-planner', sourceInterview: '콘텐츠 기획팀' },
  { jobNumber: 8, jobTitle: '경영기획', jobCode: 'business-planning', sourceInterview: '경영기획팀' },
  { jobNumber: 9, jobTitle: '식품 R&D', jobCode: 'food-rnd', sourceInterview: '식품회사 R&D 연구원' },
  { jobNumber: 10, jobTitle: '행사/상품 기획', jobCode: 'event-planner', sourceInterview: 'MICE 전문 기획사' }
];
