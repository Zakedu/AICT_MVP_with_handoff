/**
 * Part 3 채점 서비스 - Claude API 연동
 * 6개 역량 지표 기반 채점
 */

import {
  Part3Task,
  Part3TaskType,
  Part3ScoringResult,
  Part3Response,
  IndicatorScores,
  PART3_INDICATOR_MAX,
  PART3_TASK_SCORES,
  ChatMessage
} from '../data/types/part3';
import { getRubricById } from '../data/part3-data';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * 빈 지표 점수 생성
 */
function createEmptyIndicatorScores(): IndicatorScores {
  return {
    defining: 0,
    prompting: 0,
    protecting: 0,
    refining: 0,
    acumen: 0,
    integrating: 0
  };
}

/**
 * Part 3 문항 채점 (Claude API)
 */
export async function gradePart3Task(
  task: Part3Task,
  response: Part3Response,
  apiKey: string
): Promise<Part3ScoringResult> {
  const rubric = getRubricById(task.id);

  if (!rubric) {
    return createMockResult(task.id, task.taskType, response.content);
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(task, response, rubric);

  try {
    const apiResponse = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.json();
      console.error('Claude API Error:', error);
      return createMockResult(task.id, task.taskType, response.content);
    }

    const data = await apiResponse.json();
    const content = data.content[0]?.text;

    return parseGradingResponse(task.id, task.taskType, content);
  } catch (error) {
    console.error('Grading failed:', error);
    return createMockResult(task.id, task.taskType, response.content);
  }
}

/**
 * 시스템 프롬프트 생성
 */
function buildSystemPrompt(): string {
  return `당신은 AICT(AI Competency Certification) 시험의 Part 3 채점관입니다.
응시자의 답안을 분석하여 6개 역량 지표에 대한 점수를 배분합니다.

## 6개 역량 지표
1. defining (AI 개념 이해): AI/LLM 관련 개념, 용어, 원리에 대한 이해도
2. prompting (프롬프트 설계): 효과적인 프롬프트 작성 및 구조화 능력
3. protecting (데이터 보호): 개인정보, 기밀정보, 보안에 대한 인식
4. refining (결과 검증): AI 결과물 검토, 할루시네이션 탐지, 품질 확인
5. acumen (윤리적 판단): 편향성 인식, 윤리적 사용, 책임감
6. integrating (업무 통합): AI를 실무에 효과적으로 적용하는 능력

## 평가 원칙
1. 루브릭의 4단계 척도(1=부족, 2=기본, 3=우수, 4=탁월)로 전체 수준 평가
2. 해당 수준에 따라 지표별 최대 점수의 25%/50%/75%/100% 배분
3. 답변 내용에서 각 지표가 드러나는 정도에 따라 가중치 조정

반드시 다음 JSON 형식으로만 응답하세요:
{
  "rubricLevel": <1-4>,
  "rubricLabel": "<부족|기본|우수|탁월>",
  "indicatorScores": {
    "defining": <0-8>,
    "prompting": <0-15>,
    "protecting": <0-8>,
    "refining": <0-12>,
    "acumen": <0-7>,
    "integrating": <0-10>
  },
  "totalScore": <합계>,
  "feedback": "<종합 피드백 2-3문장>"
}`;
}

/**
 * 사용자 프롬프트 생성
 */
function buildUserPrompt(
  task: Part3Task,
  response: Part3Response,
  rubric: any
): string {
  const taskConfig = PART3_TASK_SCORES[task.taskType];
  const maxScore = taskConfig.max;

  let prompt = `## 문항 정보
- 문항 ID: ${task.id}
- 유형: ${task.taskTypeLabel}
- 시나리오: ${task.scenarioTitle}
- 설명: ${task.scenarioDesc}
- 최대 점수: ${maxScore}점

## 요구사항
${task.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

## 루브릭 (4단계 평가)
`;

  if (rubric.criteria) {
    rubric.criteria.forEach((criterion: any) => {
      prompt += `- Level ${criterion.level} (${criterion.label}): ${criterion.indicator}\n`;
    });
  }

  prompt += `
## 지표별 최대 점수 (Part 3 전체 기준)
- defining (AI 개념 이해): 8점
- prompting (프롬프트 설계): 15점
- protecting (데이터 보호): 8점
- refining (결과 검증): 12점
- acumen (윤리적 판단): 7점
- integrating (업무 통합): 10점
- 합계: 60점

## 이 문항의 배점: ${maxScore}점
루브릭 레벨에 따라 지표별 점수를 배분하세요:
- Level 1 (부족): 최대 점수의 ~25%
- Level 2 (기본): 최대 점수의 ~50%
- Level 3 (우수): 최대 점수의 ~75%
- Level 4 (탁월): 최대 점수의 ~100%

`;

  // 채팅 기록이 있으면 포함
  if (response.chatMessages && response.chatMessages.length > 0) {
    prompt += `## AI와의 대화 기록
`;
    response.chatMessages.forEach((msg, idx) => {
      prompt += `[${msg.role === 'user' ? '응시자' : 'AI'}] ${msg.content}\n\n`;
    });
  }

  prompt += `## 응시자 답안
\`\`\`
${response.content}
\`\`\`

위 답안을 루브릭과 6개 지표 기준으로 채점하고 JSON 형식으로 응답하세요.`;

  return prompt;
}

/**
 * API 응답 파싱
 */
function parseGradingResponse(
  taskId: string,
  taskType: Part3TaskType,
  response: string
): Part3ScoringResult {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON not found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const level = Math.max(1, Math.min(4, parsed.rubricLevel)) as 1 | 2 | 3 | 4;

    const indicatorScores: IndicatorScores = {
      defining: Math.min(PART3_INDICATOR_MAX.defining, parsed.indicatorScores?.defining || 0),
      prompting: Math.min(PART3_INDICATOR_MAX.prompting, parsed.indicatorScores?.prompting || 0),
      protecting: Math.min(PART3_INDICATOR_MAX.protecting, parsed.indicatorScores?.protecting || 0),
      refining: Math.min(PART3_INDICATOR_MAX.refining, parsed.indicatorScores?.refining || 0),
      acumen: Math.min(PART3_INDICATOR_MAX.acumen, parsed.indicatorScores?.acumen || 0),
      integrating: Math.min(PART3_INDICATOR_MAX.integrating, parsed.indicatorScores?.integrating || 0),
    };

    const totalScore = Object.values(indicatorScores).reduce((sum, val) => sum + val, 0);
    const taskConfig = PART3_TASK_SCORES[taskType];

    return {
      taskId,
      taskType,
      rubricLevel: level,
      rubricLabel: parsed.rubricLabel || getLevelLabel(level),
      indicatorScores,
      totalScore: Math.min(taskConfig.max, totalScore),
      maxScore: taskConfig.max,
      feedback: parsed.feedback || '',
      isAutoScored: true
    };
  } catch (error) {
    console.error('Failed to parse grading response:', error);
    return createMockResult(taskId, taskType, '');
  }
}

/**
 * 레벨 라벨 반환
 */
function getLevelLabel(level: 1 | 2 | 3 | 4): string {
  const labels = { 1: '부족', 2: '기본', 3: '우수', 4: '탁월' };
  return labels[level];
}

/**
 * 목업 결과 생성 (API 실패 시)
 */
function createMockResult(
  taskId: string,
  taskType: Part3TaskType,
  answer: string
): Part3ScoringResult {
  const answerLength = answer?.length || 0;
  let level: 1 | 2 | 3 | 4 = 2;

  if (answerLength > 1000) level = 4;
  else if (answerLength > 500) level = 3;
  else if (answerLength < 100) level = 1;

  const multiplier = level * 0.25;
  const taskConfig = PART3_TASK_SCORES[taskType];

  // 기본 점수 분배
  const indicatorScores: IndicatorScores = {
    defining: Math.round(PART3_INDICATOR_MAX.defining * multiplier * 0.5),
    prompting: Math.round(PART3_INDICATOR_MAX.prompting * multiplier),
    protecting: Math.round(PART3_INDICATOR_MAX.protecting * multiplier * 0.3),
    refining: Math.round(PART3_INDICATOR_MAX.refining * multiplier * 0.7),
    acumen: Math.round(PART3_INDICATOR_MAX.acumen * multiplier * 0.4),
    integrating: Math.round(PART3_INDICATOR_MAX.integrating * multiplier * 0.6),
  };

  const totalScore = Math.min(
    taskConfig.max,
    Object.values(indicatorScores).reduce((sum, val) => sum + val, 0)
  );

  return {
    taskId,
    taskType,
    rubricLevel: level,
    rubricLabel: getLevelLabel(level),
    indicatorScores,
    totalScore,
    maxScore: taskConfig.max,
    feedback: 'API 연결 실패로 기본 채점이 적용되었습니다.',
    isAutoScored: true
  };
}

/**
 * Part 3 전체 채점 (4문항)
 */
export async function gradeAllPart3Tasks(
  tasks: Part3Task[],
  responses: Part3Response[],
  apiKey: string,
  onProgress?: (completed: number, total: number) => void
): Promise<Part3ScoringResult[]> {
  const results: Part3ScoringResult[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const response = responses.find(r => r.taskId === task.id);

    if (response) {
      const result = await gradePart3Task(task, response, apiKey);
      results.push(result);
    }

    onProgress?.(i + 1, tasks.length);

    // Rate limiting: 1초 간격
    if (i < tasks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * 3-C 협업 문항용 Claude API 호출 (채팅)
 */
export async function chatWithClaude(
  task: Part3Task,
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const systemPrompt = `당신은 ${task.scenarioTitle} 직무를 지원하는 AI 어시스턴트입니다.
사용자가 요청하는 업무를 도와주세요.

시나리오: ${task.scenarioDesc}

응답 시 주의사항:
- 전문적이고 실용적인 답변을 제공하세요
- 요청에 따라 문서, 리포트, 분석 등을 작성해주세요
- 마크다운 형식을 사용할 수 있습니다`;

  const apiMessages = messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: apiMessages
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.content[0]?.text || '응답을 생성할 수 없습니다.';
  } catch (error) {
    console.error('Chat failed:', error);
    return '죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.';
  }
}

/**
 * API 키 테스트
 */
export async function testApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hello' }]
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}
