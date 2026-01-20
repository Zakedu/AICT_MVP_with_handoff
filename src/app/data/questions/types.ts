/**
 * 문항 데이터 타입 정의
 */

// 6가지 통합 역량 지표 (Part 1, 2, 3 공통)
export type IndicatorType =
  | 'defining'     // AI 개념 이해
  | 'prompting'    // 프롬프트 설계
  | 'protecting'   // 데이터 보호
  | 'refining'     // 결과 검증
  | 'acumen'       // 윤리적 판단
  | 'integrating'; // 업무 통합

// Part 1 역량 영역 (기존 호환)
export type Part1Competency = 'defining' | 'protecting' | 'refining' | 'acumen';

// Part 2 역량 영역 (기존 호환)
export type Part2Competency = 'prompting' | 'integrating';

// Part 1 문항 유형
export type Part1QuestionType = 'mcq' | 'risk';

// Part 2 문항 유형
export type Part2QuestionType = 'dragdrop' | 'highlight' | 'rewrite' | 'ordering';

// 지표별 점수 배분
export interface IndicatorWeight {
  indicator: IndicatorType;
  weight: number;  // 해당 지표에 배분되는 점수
}

// Part 1 선택지
export interface Part1Option {
  id: string;
  text: string;
  correct: boolean;
}

// Part 1 문항
export interface Part1Question {
  id: string;
  type: Part1QuestionType;
  competency: Part1Competency;
  text: string;
  keyTerms: string[];
  options: Part1Option[];
  situation?: string; // risk 유형용
  // 6지표 점수 배분 (문항당 3점)
  indicatorWeights?: IndicatorWeight[];
}

// Part 2 블록 (dragdrop용)
export interface Part2Block {
  id: string;
  text: string;
  category: string;
  correctOrder: number;
}

// Part 2 스텝 (ordering용)
export interface Part2Step {
  id: string;
  text: string;
  correctOrder: number;
}

// Part 2 이슈 (highlight용)
export interface Part2Issue {
  id: string;
  label: string;
}

// Part 2 문항
export interface Part2Question {
  id: string;
  type: Part2QuestionType;
  competency: Part2Competency;
  instruction: string;
  // dragdrop용
  blocks?: Part2Block[];
  correctOrder?: string[];
  // highlight용
  prompt?: string;
  issues?: Part2Issue[];
  // rewrite용
  originalPrompt?: string;
  requirements?: string[];
  minWords?: number;
  // ordering용
  steps?: Part2Step[];
  // 6지표 점수 배분 (문항당 4점)
  indicatorWeights?: IndicatorWeight[];
}

// 역량별 추출 비율 설정
export interface CompetencyRatio {
  competency: Part1Competency | Part2Competency;
  count: number;
}

// Part 1 역량 비율 (총 8문항)
export const PART1_RATIOS: CompetencyRatio[] = [
  { competency: 'defining', count: 2 },    // AI 개념 정의 - 2문항
  { competency: 'protecting', count: 2 },  // 데이터 보호 - 2문항
  { competency: 'refining', count: 2 },    // 검증/정제 - 2문항
  { competency: 'acumen', count: 2 },      // 윤리/판단 - 2문항
];

// Part 2 유형별 추출 (총 4문항, 유형당 1개)
export const PART2_TYPE_COUNT = 1; // 각 유형당 1문항
