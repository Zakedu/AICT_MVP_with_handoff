/**
 * Part 3 채점 서비스 - Claude API 연동
 *
 * FGI MVP용: 프론트엔드에서 직접 Claude API 호출
 * 프로덕션에서는 백엔드 API를 통해 호출해야 합니다.
 */

import { getRubricByTaskId } from '../data/questions-rubric';

export interface GradeResult {
  taskId: string;
  level: 1 | 2 | 3 | 4;
  score: number;
  maxScore: number;
  feedback: string;
  criteria: {
    name: string;
    score: number;
    maxScore: number;
    comment: string;
  }[];
}

export interface GradingRequest {
  taskId: string;
  taskType: 'execute' | 'review' | 'verify';
  scenarioTitle: string;
  scenarioDesc: string;
  requirements: string[];
  context?: string[];
  aiDraft?: string[];
  answer: string;
}

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Claude API를 사용하여 Part 3 답안을 채점합니다.
 */
export async function gradeWithClaude(
  request: GradingRequest,
  apiKey: string
): Promise<GradeResult> {
  const rubric = getRubricByTaskId(request.taskId);

  if (!rubric) {
    // 루브릭이 없는 경우 기본 채점
    return createMockResult(request.taskId, request.answer);
  }

  const taskRubric = rubric.byTask[request.taskId];
  if (!taskRubric) {
    return createMockResult(request.taskId, request.answer);
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(request, taskRubric, rubric.commonScale);

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
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Claude API Error:', error);
      return createMockResult(request.taskId, request.answer);
    }

    const data = await response.json();
    const content = data.content[0]?.text;

    return parseGradingResponse(request.taskId, content, taskRubric);
  } catch (error) {
    console.error('Grading failed:', error);
    return createMockResult(request.taskId, request.answer);
  }
}

function buildSystemPrompt(): string {
  return `당신은 AICT(AI Competency Certification) 시험의 Part 3 채점관입니다.
응시자의 답안을 루브릭에 따라 객관적이고 일관되게 평가합니다.

평가 원칙:
1. 루브릭의 각 기준에 따라 점수를 부여합니다
2. 구체적인 근거를 들어 피드백을 제공합니다
3. 개선 방향을 명확히 제시합니다
4. 4단계 척도(1=부족, 2=기본, 3=우수, 4=탁월)를 사용합니다

반드시 다음 JSON 형식으로만 응답하세요:
{
  "level": <1-4>,
  "criteria": [
    {
      "name": "<기준명>",
      "score": <0-4>,
      "comment": "<평가 코멘트>"
    }
  ],
  "feedback": "<종합 피드백>"
}`;
}

function buildUserPrompt(
  request: GradingRequest,
  taskRubric: any,
  commonScale: any
): string {
  const criteriaList = taskRubric.criteria || taskRubric.rubric || [];

  let prompt = `## 문항 정보
- 시나리오: ${request.scenarioTitle}
- 설명: ${request.scenarioDesc}
- 유형: ${request.taskType}

## 요구사항
${request.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

`;

  if (request.context && request.context.length > 0) {
    prompt += `## 주어진 조건
${request.context.map((c, i) => `- ${c}`).join('\n')}

`;
  }

  if (request.aiDraft && request.aiDraft.length > 0) {
    prompt += `## 검토 대상 AI 초안
${request.aiDraft.map((d, i) => `${i + 1}. ${d}`).join('\n')}

`;
  }

  prompt += `## 채점 루브릭
`;

  if (Array.isArray(criteriaList)) {
    criteriaList.forEach((criterion: any, idx: number) => {
      prompt += `\n### 기준 ${idx + 1}: ${criterion.name || criterion.indicator || '평가항목'}
`;
      if (criterion.weight) {
        prompt += `- 가중치: ${criterion.weight}%\n`;
      }
      if (criterion.anchors) {
        prompt += `- 4점: ${criterion.anchors['4']}\n`;
        prompt += `- 3점: ${criterion.anchors['3']}\n`;
        prompt += `- 2점: ${criterion.anchors['2']}\n`;
        prompt += `- 1점: ${criterion.anchors['1']}\n`;
      } else if (criterion.indicator) {
        prompt += `- 기준: ${criterion.indicator}\n`;
      }
    });
  }

  prompt += `
## 응시자 답안
\`\`\`
${request.answer}
\`\`\`

위 답안을 루브릭에 따라 채점하고 JSON 형식으로 응답하세요.`;

  return prompt;
}

function parseGradingResponse(
  taskId: string,
  response: string,
  taskRubric: any
): GradeResult {
  try {
    // JSON 부분만 추출
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON not found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const level = Math.max(1, Math.min(4, parsed.level)) as 1 | 2 | 3 | 4;

    const criteria = (parsed.criteria || []).map((c: any) => ({
      name: c.name || '평가항목',
      score: Math.max(0, Math.min(4, c.score || 0)),
      maxScore: 4,
      comment: c.comment || ''
    }));

    // 점수 계산: level * 2.5 (최대 10점)
    const score = level * 2.5;

    return {
      taskId,
      level,
      score,
      maxScore: 10,
      feedback: parsed.feedback || '',
      criteria
    };
  } catch (error) {
    console.error('Failed to parse grading response:', error);
    return createMockResult(taskId, '');
  }
}

function createMockResult(taskId: string, answer: string): GradeResult {
  // 답안 길이에 따른 기본 점수 (FGI 데모용)
  const answerLength = answer?.length || 0;
  let level: 1 | 2 | 3 | 4 = 2;

  if (answerLength > 500) level = 3;
  if (answerLength > 1000) level = 4;
  if (answerLength < 100) level = 1;

  return {
    taskId,
    level,
    score: level * 2.5,
    maxScore: 10,
    feedback: 'API 연결 실패로 기본 채점이 적용되었습니다.',
    criteria: []
  };
}

/**
 * 여러 Part 3 답안을 일괄 채점합니다.
 */
export async function gradeAllPart3(
  requests: GradingRequest[],
  apiKey: string,
  onProgress?: (completed: number, total: number) => void
): Promise<GradeResult[]> {
  const results: GradeResult[] = [];

  for (let i = 0; i < requests.length; i++) {
    const result = await gradeWithClaude(requests[i], apiKey);
    results.push(result);
    onProgress?.(i + 1, requests.length);

    // Rate limiting: 1초 간격
    if (i < requests.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

/**
 * API 키가 유효한지 테스트합니다.
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
