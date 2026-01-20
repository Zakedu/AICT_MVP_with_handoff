/**
 * AICT 점수 집계 서비스
 * 6개 역량 지표 기반 통합 점수 계산
 */

import { IndicatorType } from '../data/questions/types';
import {
  IndicatorScores,
  TOTAL_INDICATOR_MAX,
  INDICATOR_LABELS,
  Part3ScoringResult
} from '../data/types/part3';

// Part 1 문항별 지표 매핑 (문항당 3점)
export const PART1_INDICATOR_MAP: Record<string, { primary: IndicatorType; primaryWeight: number; secondary?: IndicatorType; secondaryWeight?: number }> = {
  // defining 문항들
  'p1q1': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q2': { primary: 'prompting', primaryWeight: 2.0, secondary: 'defining', secondaryWeight: 1.0 },
  'p1q3': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q4': { primary: 'prompting', primaryWeight: 2.0, secondary: 'defining', secondaryWeight: 1.0 },
  'p1q5': { primary: 'defining', primaryWeight: 1.5, secondary: 'refining', secondaryWeight: 1.5 },
  // refining 문항들
  'p1q6': { primary: 'refining', primaryWeight: 2.0, secondary: 'acumen', secondaryWeight: 1.0 },
  'p1q8': { primary: 'refining', primaryWeight: 2.5, secondary: 'defining', secondaryWeight: 0.5 },
  'p1q12': { primary: 'refining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q18': { primary: 'refining', primaryWeight: 2.0, secondary: 'acumen', secondaryWeight: 1.0 },
  'p1q23': { primary: 'refining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q28': { primary: 'refining', primaryWeight: 2.0, secondary: 'protecting', secondaryWeight: 1.0 },
  // protecting 문항들
  'p1q7': { primary: 'protecting', primaryWeight: 2.5, secondary: 'acumen', secondaryWeight: 0.5 },
  'p1q10': { primary: 'protecting', primaryWeight: 2.0, secondary: 'defining', secondaryWeight: 1.0 },
  // acumen 문항들
  'p1q9': { primary: 'acumen', primaryWeight: 2.0, secondary: 'refining', secondaryWeight: 1.0 },
  // 나머지 defining 문항들 (기본 매핑)
  'p1q11': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q13': { primary: 'defining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q14': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q15': { primary: 'defining', primaryWeight: 2.0, secondary: 'refining', secondaryWeight: 1.0 },
  'p1q16': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q17': { primary: 'defining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q19': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q20': { primary: 'defining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q21': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q22': { primary: 'defining', primaryWeight: 2.0, secondary: 'refining', secondaryWeight: 1.0 },
  'p1q24': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q25': { primary: 'defining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q26': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
  'p1q27': { primary: 'defining', primaryWeight: 2.0, secondary: 'refining', secondaryWeight: 1.0 },
  'p1q29': { primary: 'defining', primaryWeight: 2.0, secondary: 'integrating', secondaryWeight: 1.0 },
  'p1q30': { primary: 'defining', primaryWeight: 2.0, secondary: 'prompting', secondaryWeight: 1.0 },
};

// Part 2 유형별 지표 매핑 (문항당 4점)
export const PART2_INDICATOR_MAP: Record<string, { primary: IndicatorType; primaryWeight: number; secondary: IndicatorType; secondaryWeight: number }> = {
  'ordering': { primary: 'prompting', primaryWeight: 2.5, secondary: 'defining', secondaryWeight: 1.5 },
  'rewrite': { primary: 'prompting', primaryWeight: 2.0, secondary: 'refining', secondaryWeight: 2.0 },
  'highlight': { primary: 'refining', primaryWeight: 2.5, secondary: 'protecting', secondaryWeight: 1.5 },
  'dragdrop': { primary: 'integrating', primaryWeight: 2.5, secondary: 'prompting', secondaryWeight: 1.5 },
};

// 빈 점수 객체 생성
export function createEmptyScores(): IndicatorScores {
  return {
    defining: 0,
    prompting: 0,
    protecting: 0,
    refining: 0,
    acumen: 0,
    integrating: 0
  };
}

// Part 1 점수 계산 (정답 문항 목록 기반)
export function calculatePart1Scores(correctQuestionIds: string[]): IndicatorScores {
  const scores = createEmptyScores();

  for (const qId of correctQuestionIds) {
    const mapping = PART1_INDICATOR_MAP[qId];
    if (mapping) {
      scores[mapping.primary] += mapping.primaryWeight;
      if (mapping.secondary && mapping.secondaryWeight) {
        scores[mapping.secondary] += mapping.secondaryWeight;
      }
    }
  }

  return scores;
}

// Part 2 점수 계산 (정답 문항 유형 목록 기반)
export function calculatePart2Scores(correctTypes: string[]): IndicatorScores {
  const scores = createEmptyScores();

  for (const type of correctTypes) {
    const mapping = PART2_INDICATOR_MAP[type];
    if (mapping) {
      scores[mapping.primary] += mapping.primaryWeight;
      scores[mapping.secondary] += mapping.secondaryWeight;
    }
  }

  return scores;
}

// Part 3 점수 합산 (API 채점 결과 기반)
export function calculatePart3Scores(results: Part3ScoringResult[]): IndicatorScores {
  const scores = createEmptyScores();

  for (const result of results) {
    for (const key of Object.keys(result.indicatorScores) as IndicatorType[]) {
      scores[key] += result.indicatorScores[key];
    }
  }

  return scores;
}

// 전체 점수 합산
export function calculateTotalScores(
  part1Scores: IndicatorScores,
  part2Scores: IndicatorScores,
  part3Scores: IndicatorScores
): IndicatorScores {
  const total = createEmptyScores();

  for (const key of Object.keys(total) as IndicatorType[]) {
    total[key] = part1Scores[key] + part2Scores[key] + part3Scores[key];
  }

  return total;
}

// 지표별 정규화 (0~100%, 최대 100%로 캡핑)
export function normalizeScores(scores: IndicatorScores): IndicatorScores {
  const normalized = createEmptyScores();

  for (const key of Object.keys(scores) as IndicatorType[]) {
    const max = TOTAL_INDICATOR_MAX[key];
    normalized[key] = Math.min(100, Math.round((scores[key] / max) * 100));
  }

  return normalized;
}

// 총점 계산
export function calculateTotalPoints(scores: IndicatorScores): number {
  return Object.values(scores).reduce((sum, val) => sum + val, 0);
}

// 합격 여부 판정 (70점 이상)
export function isPassed(totalPoints: number): boolean {
  return totalPoints >= 70;
}

// 파트별 점수 계산
export interface PartScores {
  part1: number;
  part2: number;
  part3: number;
}

export function calculatePartScores(
  part1Scores: IndicatorScores,
  part2Scores: IndicatorScores,
  part3Scores: IndicatorScores
): PartScores {
  return {
    part1: calculateTotalPoints(part1Scores),
    part2: calculateTotalPoints(part2Scores),
    part3: calculateTotalPoints(part3Scores)
  };
}

// 최종 결과 인터페이스
export interface FinalScoreResult {
  indicators: IndicatorScores;
  normalizedIndicators: IndicatorScores;
  parts: PartScores;
  total: number;
  passed: boolean;
  indicatorLabels: Record<IndicatorType, string>;
}

// 최종 점수 계산
export function calculateFinalScore(
  part1CorrectIds: string[],
  part2CorrectTypes: string[],
  part3Results: Part3ScoringResult[]
): FinalScoreResult {
  const part1Scores = calculatePart1Scores(part1CorrectIds);
  const part2Scores = calculatePart2Scores(part2CorrectTypes);
  const part3Scores = calculatePart3Scores(part3Results);

  const totalScores = calculateTotalScores(part1Scores, part2Scores, part3Scores);
  const normalizedScores = normalizeScores(totalScores);
  const partScores = calculatePartScores(part1Scores, part2Scores, part3Scores);
  const total = calculateTotalPoints(totalScores);

  return {
    indicators: totalScores,
    normalizedIndicators: normalizedScores,
    parts: partScores,
    total,
    passed: isPassed(total),
    indicatorLabels: INDICATOR_LABELS
  };
}

// 육각형 차트용 데이터 변환
export interface RadarChartData {
  indicator: string;
  label: string;
  value: number;
  fullMark: number;
}

export function toRadarChartData(normalizedScores: IndicatorScores): RadarChartData[] {
  return [
    { indicator: 'defining', label: 'AI 개념 이해', value: normalizedScores.defining, fullMark: 100 },
    { indicator: 'prompting', label: '프롬프트 설계', value: normalizedScores.prompting, fullMark: 100 },
    { indicator: 'protecting', label: '데이터 보호', value: normalizedScores.protecting, fullMark: 100 },
    { indicator: 'refining', label: '결과 검증', value: normalizedScores.refining, fullMark: 100 },
    { indicator: 'acumen', label: '윤리적 판단', value: normalizedScores.acumen, fullMark: 100 },
    { indicator: 'integrating', label: '업무 통합', value: normalizedScores.integrating, fullMark: 100 },
  ];
}
