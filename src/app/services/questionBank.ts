/**
 * QuestionBank Service
 * 역량별 랜덤 추출 및 선택지 셔플 기능
 */

import {
  Part1Question,
  Part2Question,
  Part1Competency,
  Part2QuestionType,
  Part1Option,
  PART1_RATIOS,
  PART2_TYPE_COUNT,
} from '../data/questions/types';

/**
 * Fisher-Yates 셔플 알고리즘
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Part 1 선택지 셔플 (정답 위치 랜덤화)
 * 원본 문항은 수정하지 않고 새 객체 반환
 */
function shufflePart1Options(question: Part1Question): Part1Question {
  const shuffledOptions = shuffle(question.options);
  // 새 ID 할당 (A, B, C, D)
  const newOptions: Part1Option[] = shuffledOptions.map((opt, idx) => ({
    ...opt,
    id: String.fromCharCode(65 + idx), // A, B, C, D
  }));

  return {
    ...question,
    options: newOptions,
  };
}

/**
 * Part 1 문항 역량별 랜덤 추출
 * @param allQuestions 전체 Part 1 문항 배열
 * @returns 역량별 비율에 맞게 추출된 문항 (선택지 셔플됨)
 */
export function extractPart1Questions(allQuestions: Part1Question[]): Part1Question[] {
  const result: Part1Question[] = [];

  for (const ratio of PART1_RATIOS) {
    // 해당 역량의 문항들 필터링
    const competencyQuestions = allQuestions.filter(
      q => q.competency === ratio.competency
    );

    if (competencyQuestions.length === 0) {
      console.warn(`No questions found for competency: ${ratio.competency}`);
      continue;
    }

    // 랜덤 셔플 후 필요한 수만큼 추출
    const shuffled = shuffle(competencyQuestions);
    const selected = shuffled.slice(0, Math.min(ratio.count, shuffled.length));

    // 선택지 셔플 후 결과에 추가
    result.push(...selected.map(shufflePart1Options));
  }

  // 최종 문항 순서도 셔플 (역량 순서가 예측 불가하도록)
  return shuffle(result);
}

/**
 * Part 2 문항 유형별 랜덤 추출
 * @param allQuestions 전체 Part 2 문항 배열
 * @returns 유형별 1개씩 추출된 문항
 */
export function extractPart2Questions(allQuestions: Part2Question[]): Part2Question[] {
  const types: Part2QuestionType[] = ['dragdrop', 'highlight', 'rewrite', 'ordering'];
  const result: Part2Question[] = [];

  for (const type of types) {
    // 해당 유형의 문항들 필터링
    const typeQuestions = allQuestions.filter(q => q.type === type);

    if (typeQuestions.length === 0) {
      console.warn(`No questions found for type: ${type}`);
      continue;
    }

    // 랜덤으로 1개 선택
    const shuffled = shuffle(typeQuestions);
    result.push(...shuffled.slice(0, PART2_TYPE_COUNT));
  }

  // 최종 문항 순서는 유형 순서대로 유지 (dragdrop → highlight → rewrite → ordering)
  // 필요시 이 부분도 shuffle 가능
  return result;
}

/**
 * Part 1 문항에 역량 필드 추가 (마이그레이션용)
 * 기존 문항 데이터에 competency가 없을 경우 추론
 */
export function inferPart1Competency(question: Omit<Part1Question, 'competency'>): Part1Competency {
  const keyTermsLower = question.keyTerms.map(t => t.toLowerCase()).join(' ');
  const textLower = question.text.toLowerCase();
  const combined = `${keyTermsLower} ${textLower}`;

  // Protecting: 개인정보, 보안, 데이터 보호 관련
  if (
    combined.includes('개인정보') ||
    combined.includes('보안') ||
    combined.includes('pii') ||
    combined.includes('데이터 보호')
  ) {
    return 'protecting';
  }

  // Refining: 검증, 사실 확인, 출처, 할루시네이션
  if (
    combined.includes('할루시네이션') ||
    combined.includes('hallucination') ||
    combined.includes('사실 확인') ||
    combined.includes('출처') ||
    combined.includes('검증')
  ) {
    return 'refining';
  }

  // Acumen: 저작권, 윤리, 판단
  if (
    combined.includes('저작권') ||
    combined.includes('copyright') ||
    combined.includes('윤리') ||
    combined.includes('판단')
  ) {
    return 'acumen';
  }

  // Defining: AI 개념 정의 (기본값)
  return 'defining';
}

/**
 * Part 2 문항에 역량 필드 추가 (마이그레이션용)
 */
export function inferPart2Competency(question: Omit<Part2Question, 'competency'>): 'prompting' | 'integrating' {
  // dragdrop, ordering은 프롬프트 구성 역량
  if (question.type === 'dragdrop' || question.type === 'ordering') {
    return 'prompting';
  }
  // highlight, rewrite는 통합/검토 역량
  return 'integrating';
}

/**
 * 시험 시작 시 문항 세트 생성
 * @param part1All 전체 Part 1 문항
 * @param part2All 전체 Part 2 문항
 */
export function generateExamQuestionSet(
  part1All: Part1Question[],
  part2All: Part2Question[]
): {
  part1: Part1Question[];
  part2: Part2Question[];
} {
  return {
    part1: extractPart1Questions(part1All),
    part2: extractPart2Questions(part2All),
  };
}

/**
 * 기존 문항 데이터를 새 형식으로 변환 (마이그레이션)
 */
export function migratePart1Questions(
  oldQuestions: Omit<Part1Question, 'competency'>[]
): Part1Question[] {
  return oldQuestions.map(q => ({
    ...q,
    competency: inferPart1Competency(q),
  }));
}

export function migratePart2Questions(
  oldQuestions: Omit<Part2Question, 'competency'>[]
): Part2Question[] {
  return oldQuestions.map(q => ({
    ...q,
    competency: inferPart2Competency(q),
  }));
}
