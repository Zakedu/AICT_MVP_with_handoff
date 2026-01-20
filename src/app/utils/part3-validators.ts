/**
 * Part 3 검증형 문항 - 실시간 검증 로직
 */

import { Part3VerifyTask } from '../data/part3-verify-tasks';

// ================================
// 타입 정의
// ================================

export interface Part3VerifyAnswer {
  system_prompt: string;
  user_template: string;
  output_spec: string;
  self_check: string;
  fallback: string;
}

export interface ValidationAlert {
  rule_name: string;
  message: string;
  severity: 'error' | 'warning';
  location?: string; // 어느 블록에서 발견되었는지
  matched_text?: string;
}

export interface StructuralCheckResult {
  has5Blocks: boolean;
  blockLengths: {
    system_prompt: number;
    user_template: number;
    output_spec: number;
    self_check: number;
    fallback: number;
  };
  outputSectionsValid: boolean;
  minItemCounts: {
    questions: { count: number; required: number; passed: boolean };
    experiments: { count: number; required: number; passed: boolean };
    selfChecks: { count: number; required: number; passed: boolean };
  };
  requiredKeywords: {
    system_prompt: { found: string[]; missing: string[] };
    user_template: { found: string[]; missing: string[] };
    output_spec: { found: string[]; missing: string[] };
    self_check: { found: string[]; missing: string[] };
    fallback: { found: string[]; missing: string[] };
  };
}

export interface RubricEstimate {
  scores: Record<string, number>; // 기준명 -> 0-4 점수
  totalEstimate: number; // 100점 만점
  confidence: 'low' | 'medium' | 'high'; // 추정 신뢰도
}

export interface AutoFailResult {
  triggered: boolean;
  reasons: string[];
}

// ================================
// A. 자동 실패 조건 체크
// ================================

export function checkAutoFailConditions(
  answer: Part3VerifyAnswer,
  task: Part3VerifyTask
): AutoFailResult {
  const reasons: string[] = [];
  const fullText = Object.values(answer).join('\n\n');

  // 1. PII 수집/위치추적 감지
  const piiPattern = /(개인.*위치.*추적|개인식별.*수집|실명.*업로드|개인정보.*수집.*지시|위치.*기반.*개인)/gi;
  const piiMatches = fullText.match(piiPattern);
  if (piiMatches && piiMatches.length > 0) {
    reasons.push(`개인정보 수집/위치 추적 지시 감지: "${piiMatches[0]}..."`);
  }

  // 2. 성과 단정 감지
  const assertionPattern = /(무조건.*성공|확정.*증가|보장.*효과|반드시.*달성|100%.*성공)/gi;
  const assertionMatches = fullText.match(assertionPattern);
  if (assertionMatches && assertionMatches.length > 0) {
    reasons.push(`성과 단정 표현 감지: "${assertionMatches[0]}..."`);
  }

  // 3. 질문 제한 위반 (Fallback에서 3개 초과)
  const questionCount = countQuestionsInText(answer.fallback);
  if (questionCount > 3) {
    reasons.push(`Fallback에서 질문 ${questionCount}개 감지 (제한: 3개 이하)`);
  }

  // 4. 커스텀 디텍터 (task에서 추가 정의)
  task.live_validation.auto_fail_detectors.forEach((detector) => {
    if (detector.pattern) {
      const matches = fullText.match(detector.pattern);
      if (matches && matches.length > 0) {
        reasons.push(`${detector.rule_name}: "${matches[0]}..."`);
      }
    }
  });

  return {
    triggered: reasons.length > 0,
    reasons,
  };
}

// ================================
// B. 구조적 요구사항 체크
// ================================

export function checkStructuralRequirements(
  answer: Part3VerifyAnswer,
  task: Part3VerifyTask
): StructuralCheckResult {
  const blockLengths = {
    system_prompt: answer.system_prompt.length,
    user_template: answer.user_template.length,
    output_spec: answer.output_spec.length,
    self_check: answer.self_check.length,
    fallback: answer.fallback.length,
  };

  const has5Blocks = Object.values(blockLengths).every((len) => len > 50); // 최소 50자

  // Output 섹션 검증
  const outputSectionsValid = task.exam_task.output_must_produce.sections_fixed.every(
    (section) => {
      // 섹션명 또는 키워드가 output_spec에 포함되어 있는지
      const sectionKeyword = section.split('.')[0]; // "A. 사전 확인 질문" -> "A"
      return answer.output_spec.includes(sectionKeyword) || answer.output_spec.includes(section);
    }
  );

  // 최소 항목 수 체크
  const questionCount = extractQuestionCount(answer.user_template + answer.output_spec);
  const experimentCount = extractExperimentCount(answer.output_spec);
  const selfCheckCount = extractCheckCount(answer.self_check);

  const minItemCounts = {
    questions: {
      count: questionCount,
      required: task.live_validation.structural_requirements.min_questions || 12,
      passed: questionCount >= (task.live_validation.structural_requirements.min_questions || 12),
    },
    experiments: {
      count: experimentCount,
      required: task.live_validation.structural_requirements.min_experiments || 4,
      passed:
        experimentCount >= (task.live_validation.structural_requirements.min_experiments || 4),
    },
    selfChecks: {
      count: selfCheckCount,
      required: task.live_validation.structural_requirements.min_self_checks || 10,
      passed:
        selfCheckCount >= (task.live_validation.structural_requirements.min_self_checks || 10),
    },
  };

  // 필수 키워드 체크
  const requiredKeywords = {
    system_prompt: checkKeywords(answer.system_prompt, task.live_validation.required_keywords.system_prompt),
    user_template: checkKeywords(answer.user_template, task.live_validation.required_keywords.user_template),
    output_spec: checkKeywords(answer.output_spec, task.live_validation.required_keywords.output_spec),
    self_check: checkKeywords(answer.self_check, task.live_validation.required_keywords.self_check),
    fallback: checkKeywords(answer.fallback, task.live_validation.required_keywords.fallback),
  };

  return {
    has5Blocks,
    blockLengths,
    outputSectionsValid,
    minItemCounts,
    requiredKeywords,
  };
}

// ================================
// C. 실시간 경고 생성
// ================================

export function generateLiveAlerts(
  answer: Part3VerifyAnswer,
  task: Part3VerifyTask
): ValidationAlert[] {
  const alerts: ValidationAlert[] = [];

  // 자동 실패 조건 체크
  const autoFail = checkAutoFailConditions(answer, task);
  if (autoFail.triggered) {
    autoFail.reasons.forEach((reason) => {
      alerts.push({
        rule_name: '자동 실패 조건',
        message: `🚨 ${reason}`,
        severity: 'error',
      });
    });
  }

  // 구조적 요구사항 체크
  const structural = checkStructuralRequirements(answer, task);

  if (!structural.has5Blocks) {
    alerts.push({
      rule_name: '5-블록 구조',
      message: '⚠️ 5개 블록(System/User/Output/SelfCheck/Fallback) 중 일부가 비어있거나 너무 짧습니다.',
      severity: 'warning',
    });
  }

  if (!structural.outputSectionsValid) {
    alerts.push({
      rule_name: 'Output 섹션',
      message: '⚠️ Output 규격에서 필수 섹션(A/B/C/D/E)이 누락되었습니다.',
      severity: 'warning',
      location: 'output_spec',
    });
  }

  if (!structural.minItemCounts.questions.passed) {
    alerts.push({
      rule_name: '사전 질문 수',
      message: `⚠️ 사전 질문이 ${structural.minItemCounts.questions.count}개입니다 (최소 ${structural.minItemCounts.questions.required}개 필요).`,
      severity: 'warning',
      location: 'output_spec',
    });
  }

  if (!structural.minItemCounts.experiments.passed) {
    alerts.push({
      rule_name: '실험 수',
      message: `⚠️ 검증 실험이 ${structural.minItemCounts.experiments.count}개입니다 (최소 ${structural.minItemCounts.experiments.required}개 필요).`,
      severity: 'warning',
      location: 'output_spec',
    });
  }

  if (!structural.minItemCounts.selfChecks.passed) {
    alerts.push({
      rule_name: 'Self-check 항목 수',
      message: `⚠️ Self-check가 ${structural.minItemCounts.selfChecks.count}개입니다 (최소 ${structural.minItemCounts.selfChecks.required}개 필요).`,
      severity: 'warning',
      location: 'self_check',
    });
  }

  // 필수 키워드 누락 경고
  Object.entries(structural.requiredKeywords).forEach(([block, result]) => {
    if (result.missing.length > 0) {
      alerts.push({
        rule_name: '필수 키워드',
        message: `💡 ${block}에 다음 키워드가 누락되었습니다: ${result.missing.join(', ')}`,
        severity: 'warning',
        location: block,
      });
    }
  });

  return alerts;
}

// ================================
// D. 루브릭 점수 추정 (간단 버전)
// ================================

export function estimateRubricScore(
  answer: Part3VerifyAnswer,
  task: Part3VerifyTask
): RubricEstimate {
  const scores: Record<string, number> = {};

  // 자동 실패 체크
  const autoFail = checkAutoFailConditions(answer, task);
  if (autoFail.triggered) {
    // 자동 실패 시 모든 점수 0
    task.rubric.criteria.forEach((criterion) => {
      scores[criterion.name] = 0;
    });
    return {
      scores,
      totalEstimate: 0,
      confidence: 'high',
    };
  }

  // 구조적 체크
  const structural = checkStructuralRequirements(answer, task);

  // 간단한 휴리스틱 기반 추정
  task.rubric.criteria.forEach((criterion) => {
    let level = 0;

    switch (criterion.name) {
      case '상황 이해 및 문제정의':
        level = estimateContextUnderstanding(answer, task);
        break;
      case 'System 프롬프트 품질':
        level = estimateSystemQuality(answer, structural);
        break;
      case 'User 프롬프트 템플릿 구조화':
        level = estimateUserTemplateQuality(answer, structural);
        break;
      case 'Output 규격 강제력':
        level = estimateOutputSpecQuality(answer, structural);
        break;
      case '사전 확인 질문 설계':
        level = estimateQuestionQuality(structural);
        break;
      case '검증 실험 설계':
        level = estimateExperimentQuality(structural);
        break;
      case 'DOOH 측정 한계 대응':
        level = estimateDOOHHandling(answer);
        break;
      case 'Self-check & Fallback 품질':
        level = estimateSelfCheckFallback(answer, structural);
        break;
      default:
        level = 2; // 기본값
    }

    scores[criterion.name] = level;
  });

  // 총점 계산 (가중치 반영)
  let totalEstimate = 0;
  task.rubric.criteria.forEach((criterion) => {
    const level = scores[criterion.name] || 0;
    const score = (level / 4) * criterion.weight;
    totalEstimate += score;
  });

  return {
    scores,
    totalEstimate: Math.round(totalEstimate),
    confidence: 'medium', // 실시간 추정은 중간 신뢰도
  };
}

// ================================
// Helper Functions
// ================================

function countQuestionsInText(text: string): number {
  // "질문 N개" 패턴 찾기
  const matches = text.match(/질문.*?(\d+)/g);
  if (!matches) return 0;

  const numbers = matches.map((m) => parseInt(m.match(/\d+/)?.[0] || '0'));
  return Math.max(...numbers, 0);
}

function extractQuestionCount(text: string): number {
  // "12개", "질문 12개" 등의 패턴
  const patterns = [
    /질문.*?(\d+).*?개/g,
    /(\d+).*?개.*?질문/g,
    /확인.*?(\d+)/g,
  ];

  let maxCount = 0;
  patterns.forEach((pattern) => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((m) => {
        const num = parseInt(m.match(/\d+/)?.[0] || '0');
        if (num > maxCount) maxCount = num;
      });
    }
  });

  // 또는 실제 질문 문장 개수 세기 (1. 2. 3. 또는 - )
  const listItems = text.match(/^[\s]*[\d\-\*]+[\.\)]\s+.+$/gm);
  if (listItems) {
    maxCount = Math.max(maxCount, listItems.length);
  }

  return maxCount;
}

function extractExperimentCount(text: string): number {
  // "실험 4개", "4개 실험" 패턴
  const matches = text.match(/실험.*?(\d+)|(\d+).*?실험/g);
  if (!matches) return 0;

  const numbers = matches.map((m) => parseInt(m.match(/\d+/)?.[0] || '0'));
  return Math.max(...numbers, 0);
}

function extractCheckCount(text: string): number {
  // Self-check 항목 개수
  const matches = text.match(/(\d+).*?개|검증.*?(\d+)|확인.*?(\d+)/g);
  if (!matches) return 0;

  const numbers = matches.map((m) => parseInt(m.match(/\d+/)?.[0] || '0'));
  
  // 또는 체크리스트 항목 세기
  const listItems = text.match(/^[\s]*[\d\-\*✓]+[\.\)]\s+.+$/gm);
  if (listItems) {
    return Math.max(listItems.length, ...numbers);
  }

  return Math.max(...numbers, 0);
}

function checkKeywords(text: string, keywords: string[]): { found: string[]; missing: string[] } {
  const found: string[] = [];
  const missing: string[] = [];

  keywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  return { found, missing };
}

// ================================
// 기준별 레벨 추정 함수
// ================================

function estimateContextUnderstanding(answer: Part3VerifyAnswer, task: Part3VerifyTask): number {
  const systemText = answer.system_prompt.toLowerCase();
  const outputText = answer.output_spec.toLowerCase();

  let score = 0;

  // DOOH 언급
  if (systemText.includes('dooh') || outputText.includes('dooh')) score += 1;
  
  // 측정 한계 언급
  if (systemText.includes('측정') || systemText.includes('관측') || systemText.includes('한계')) score += 1;
  
  // 검증형/추측 방지 언급
  if (systemText.includes('검증') || systemText.includes('추측')) score += 1;
  
  // 시나리오 특수성 반영 (UTM, 전환 정의)
  if (systemText.includes('utm') || systemText.includes('전환')) score += 1;

  return Math.min(score, 4);
}

function estimateSystemQuality(answer: Part3VerifyAnswer, structural: StructuralCheckResult): number {
  const text = answer.system_prompt;
  let score = 0;

  // 길이 체크
  if (text.length > 200) score += 1;
  
  // 필수 키워드
  const foundKeywords = structural.requiredKeywords.system_prompt.found.length;
  const totalKeywords = structural.requiredKeywords.system_prompt.found.length + 
                        structural.requiredKeywords.system_prompt.missing.length;
  
  if (foundKeywords / totalKeywords >= 0.8) score += 2;
  else if (foundKeywords / totalKeywords >= 0.5) score += 1;

  // 금지 표현 명시
  if (text.includes('금지') || text.includes('절대')) score += 1;

  return Math.min(score, 4);
}

function estimateUserTemplateQuality(answer: Part3VerifyAnswer, structural: StructuralCheckResult): number {
  const text = answer.user_template;
  let score = 0;

  // 길이
  if (text.length > 300) score += 1;

  // 구조화 (섹션, 필드)
  const hasSections = text.match(/##|###|\d+\./g);
  if (hasSections && hasSections.length >= 4) score += 2;
  else if (hasSections) score += 1;

  // 변수 {{}} 사용
  const hasVariables = text.match(/\{\{.*?\}\}/g);
  if (hasVariables && hasVariables.length >= 5) score += 1;

  return Math.min(score, 4);
}

function estimateOutputSpecQuality(answer: Part3VerifyAnswer, structural: StructuralCheckResult): number {
  let score = 0;

  if (structural.outputSectionsValid) score += 2;
  
  // 표 형식 언급
  if (answer.output_spec.includes('표') || answer.output_spec.includes('|')) score += 1;
  
  // 최소 항목 수 명시
  if (answer.output_spec.match(/\d+개/g)) score += 1;

  return Math.min(score, 4);
}

function estimateQuestionQuality(structural: StructuralCheckResult): number {
  const count = structural.minItemCounts.questions.count;
  const required = structural.minItemCounts.questions.required;

  if (count >= required) return 4;
  if (count >= required * 0.8) return 3;
  if (count >= required * 0.5) return 2;
  if (count > 0) return 1;
  return 0;
}

function estimateExperimentQuality(structural: StructuralCheckResult): number {
  const count = structural.minItemCounts.experiments.count;
  const required = structural.minItemCounts.experiments.required;

  if (count >= required) return 4;
  if (count >= required * 0.75) return 3;
  if (count >= required * 0.5) return 2;
  if (count > 0) return 1;
  return 0;
}

function estimateDOOHHandling(answer: Part3VerifyAnswer): number {
  const fullText = (answer.system_prompt + answer.output_spec).toLowerCase();
  let score = 0;

  // DOOH 언급
  if (fullText.includes('dooh')) score += 1;
  
  // 프록시 지표
  if (fullText.includes('프록시') || fullText.includes('검색') || fullText.includes('qr')) score += 1;
  
  // 한계 언급
  if (fullText.includes('한계') || fullText.includes('귀속') || fullText.includes('추정')) score += 1;
  
  // 조건부 해석
  if (fullText.includes('조건부') || fullText.includes('(가정)') || fullText.includes('(추정)')) score += 1;

  return Math.min(score, 4);
}

function estimateSelfCheckFallback(answer: Part3VerifyAnswer, structural: StructuralCheckResult): number {
  let score = 0;

  // Self-check 개수
  if (structural.minItemCounts.selfChecks.passed) score += 2;
  else if (structural.minItemCounts.selfChecks.count >= structural.minItemCounts.selfChecks.required * 0.7) score += 1;

  // Fallback 질문 제한
  const questionCount = countQuestionsInText(answer.fallback);
  if (questionCount === 3) score += 2;
  else if (questionCount > 0 && questionCount <= 5) score += 1;

  return Math.min(score, 4);
}
