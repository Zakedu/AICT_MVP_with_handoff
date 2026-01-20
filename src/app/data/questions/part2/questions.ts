/**
 * Part 2 문항 데이터 - 파트1~2 (프롬프트 설계, 고급 기법, 반복 개선) 기반
 * dragdrop, highlight, rewrite, ordering 유형
 */

import { Part2Question } from '../types';

export const part2Questions: Part2Question[] = [
  // ============================================
  // Dragdrop 유형 - prompting (프롬프트 설계)
  // ============================================
  {
    id: 'p2-dragdrop-prompting-001',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: '효과적인 프롬프트의 5요소를 올바른 순서로 배치하세요. 각 요소가 담당하는 역할에 맞게 구성해야 합니다.',
    blocks: [
      { id: 'block-1', text: 'Context (맥락): 배경 상황과 목적 설명', category: 'prompt-element', correctOrder: 1 },
      { id: 'block-2', text: 'Persona (역할): AI가 어떤 전문가로 답변할지 지정', category: 'prompt-element', correctOrder: 2 },
      { id: 'block-3', text: 'Task (과업): 수행할 구체적인 작업 명시', category: 'prompt-element', correctOrder: 3 },
      { id: 'block-4', text: 'Constraints (제약): 길이, 톤, 포함/제외 조건', category: 'prompt-element', correctOrder: 4 },
      { id: 'block-5', text: 'Format (형식): 결과물의 구조와 출력 형태', category: 'prompt-element', correctOrder: 5 },
    ],
    correctOrder: ['block-1', 'block-2', 'block-3', 'block-4', 'block-5'],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },
  {
    id: 'p2-dragdrop-prompting-002',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: '고객 문의 응대 이메일 작성을 위한 프롬프트를 5요소에 맞게 배치하세요.',
    blocks: [
      { id: 'block-a', text: '나는 고객 서비스팀 담당자이며, 배송 지연 관련 고객 불만에 대응해야 합니다.', category: 'context', correctOrder: 1 },
      { id: 'block-b', text: '당신은 10년 경력의 고객 서비스 전문가입니다.', category: 'persona', correctOrder: 2 },
      { id: 'block-c', text: '사과와 보상 안내를 포함한 응대 이메일을 작성해주세요.', category: 'task', correctOrder: 3 },
      { id: 'block-d', text: '200자 이내, 정중하지만 따뜻한 어조, 10% 할인 쿠폰 제공 언급', category: 'constraints', correctOrder: 4 },
      { id: 'block-e', text: '제목과 본문 형식으로 작성', category: 'format', correctOrder: 5 },
    ],
    correctOrder: ['block-a', 'block-b', 'block-c', 'block-d', 'block-e'],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // ============================================
  // Highlight 유형 - prompting (프롬프트 설계)
  // ============================================
  {
    id: 'p2-highlight-prompting-001',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 프롬프트에서 개선이 필요한 부분을 모두 선택하세요.',
    prompt: '좋은 마케팅 이메일 써줘. 적당한 길이로. 잘 좀 부탁해.',
    issues: [
      { id: 'issue-1', label: '대상/맥락 누락: 어떤 제품/서비스인지, 누구에게 보내는지 불명확' },
      { id: 'issue-2', label: '구체적 목적 누락: 홍보, 재방문 유도, 할인 안내 등 목적 미정의' },
      { id: 'issue-3', label: '모호한 제약 조건: "적당한 길이"는 객관적 기준 없음' },
      { id: 'issue-4', label: '형식 미지정: 원하는 출력 형태(제목+본문 등) 불명확' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },
  {
    id: 'p2-highlight-prompting-002',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 프롬프트에서 문제점을 모두 찾아 선택하세요.',
    prompt: '당신은 세계 최고의 변호사입니다. 내 소송에서 반드시 이길 수 있는 법적 조언을 해주세요. 상대방을 완전히 이기는 전략을 알려주세요.',
    issues: [
      { id: 'issue-a', label: '역할 부여의 한계 무시: AI에게 역할을 부여해도 실제 전문 지식이 생기지 않음' },
      { id: 'issue-b', label: '구체적 상황 정보 부재: 소송 내용, 분쟁 유형 등 맥락 없음' },
      { id: 'issue-c', label: 'AI 한계 인식 부족: AI 조언은 법적 효력이 없으며 실제 변호사 상담 필요' },
      { id: 'issue-d', label: '비현실적 기대: "반드시 이긴다"는 보장은 AI가 제공할 수 없음' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 2 },
      { indicator: 'acumen', weight: 2 },
    ],
  },

  // ============================================
  // Rewrite 유형 - prompting (프롬프트 설계)
  // ============================================
  {
    id: 'p2-rewrite-prompting-001',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '아래의 모호한 프롬프트를 5요소(Context, Persona, Task, Constraints, Format)를 포함한 효과적인 프롬프트로 다시 작성하세요.',
    originalPrompt: '이메일 써줘',
    requirements: [
      '구체적인 상황(Context)을 설정할 것',
      'AI의 역할(Persona)을 지정할 것',
      '명확한 작업(Task)을 정의할 것',
      '길이, 톤 등 제약 조건(Constraints)을 명시할 것',
      '원하는 출력 형식(Format)을 지정할 것',
    ],
    minWords: 50,
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },
  {
    id: 'p2-rewrite-prompting-002',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '아래의 단순한 프롬프트를 Few-shot 또는 Chain of Thought 기법을 활용하여 더 효과적인 프롬프트로 개선하세요.',
    originalPrompt: '다음 고객 리뷰가 긍정인지 부정인지 알려줘: "배송은 빨랐는데 제품 품질은 별로네요"',
    requirements: [
      'Few-shot 기법 활용 시: 2-3개의 예시를 포함하여 패턴을 학습시킬 것',
      '또는 Chain of Thought 기법 활용 시: 단계별 분석 과정을 유도할 것',
      '출력 형식을 명확히 지정할 것',
      '긍정/부정 외에 "혼합" 감정도 고려할 것',
    ],
    minWords: 80,
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // ============================================
  // Ordering 유형 - integrating (업무 통합)
  // ============================================
  {
    id: 'p2-ordering-integrating-001',
    type: 'ordering',
    competency: 'integrating',
    instruction: 'AI를 활용한 보고서 작성의 반복 개선 과정을 올바른 순서로 배열하세요.',
    steps: [
      { id: 'step-1', text: '초기 프롬프트로 보고서 개요/초안 요청', correctOrder: 1 },
      { id: 'step-2', text: 'AI 응답 검토 및 문제점 파악 (범위, 깊이, 형식 확인)', correctOrder: 2 },
      { id: 'step-3', text: 'STAR 프레임워크로 구체적 피드백 제공', correctOrder: 3 },
      { id: 'step-4', text: '수정된 결과 확인 및 추가 반복', correctOrder: 4 },
      { id: 'step-5', text: '최종 결과물의 사실 관계 검증 및 출처 확인', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 2 },
      { indicator: 'refining', weight: 2 },
    ],
  },
  {
    id: 'p2-ordering-integrating-002',
    type: 'ordering',
    competency: 'integrating',
    instruction: '업무 상황에 적합한 AI 도구를 선택하는 의사결정 순서를 배열하세요.',
    steps: [
      { id: 'step-a', text: '작업 목적과 요구사항 명확화 (무엇을 달성하려는가?)', correctOrder: 1 },
      { id: 'step-b', text: '데이터 형태와 민감도 확인 (텍스트/이미지, 기밀 여부)', correctOrder: 2 },
      { id: 'step-c', text: '각 도구의 강점과 한계 비교 (컨텍스트 길이, 실시간 검색 등)', correctOrder: 3 },
      { id: 'step-d', text: '비용과 접근성 고려 (무료/유료, API 필요 여부)', correctOrder: 4 },
      { id: 'step-e', text: '최종 도구 선택 및 테스트 실행', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // ============================================
  // 4단계 추가: Ch03 (프롬프트 구조), Ch04 (고급 프롬프팅) 기반
  // ============================================

  // Dragdrop - Chain of Thought 단계별 구성
  {
    id: 'p2-dragdrop-prompting-003',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: 'Chain of Thought(CoT) 기법을 적용한 수학 문제 풀이 프롬프트의 구성 요소를 올바른 순서로 배치하세요.',
    blocks: [
      { id: 'block-cot-1', text: '문제 상황 제시: "한 상점에서 사과 3개를 1,500원에 판매합니다"', category: 'problem', correctOrder: 1 },
      { id: 'block-cot-2', text: '사고 과정 유도: "단계별로 생각해봅시다"', category: 'thinking', correctOrder: 2 },
      { id: 'block-cot-3', text: '1단계 분석: "먼저 사과 1개당 가격을 계산합니다"', category: 'step1', correctOrder: 3 },
      { id: 'block-cot-4', text: '2단계 적용: "이 단가를 필요한 개수에 적용합니다"', category: 'step2', correctOrder: 4 },
      { id: 'block-cot-5', text: '최종 답변 형식 지정: "따라서 정답은 [금액]원입니다"', category: 'answer', correctOrder: 5 },
    ],
    correctOrder: ['block-cot-1', 'block-cot-2', 'block-cot-3', 'block-cot-4', 'block-cot-5'],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Dragdrop - Few-shot 예시 구성
  {
    id: 'p2-dragdrop-prompting-004',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: 'Few-shot 프롬프팅 기법으로 감정 분석을 수행하는 프롬프트의 구성 요소를 올바른 순서로 배치하세요.',
    blocks: [
      { id: 'block-fs-1', text: '작업 정의: "다음 고객 리뷰의 감정을 분석해주세요"', category: 'task', correctOrder: 1 },
      { id: 'block-fs-2', text: '예시 1: "배송이 정말 빨라요!" → 긍정', category: 'example1', correctOrder: 2 },
      { id: 'block-fs-3', text: '예시 2: "제품이 설명과 달라 실망입니다" → 부정', category: 'example2', correctOrder: 3 },
      { id: 'block-fs-4', text: '예시 3: "가격은 비싸지만 품질은 좋네요" → 혼합', category: 'example3', correctOrder: 4 },
      { id: 'block-fs-5', text: '실제 분석 대상: "오늘 받았는데 색상이 예쁘네요" → ?', category: 'target', correctOrder: 5 },
    ],
    correctOrder: ['block-fs-1', 'block-fs-2', 'block-fs-3', 'block-fs-4', 'block-fs-5'],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Highlight - 프롬프트 제약조건 문제점
  {
    id: 'p2-highlight-prompting-003',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 프롬프트에서 제약 조건(Constraints) 관련 문제점을 모두 선택하세요.',
    prompt: '마케팅 보고서를 작성해줘. 길이는 적당하게, 전문적인 느낌으로, 필요한 내용을 모두 포함해서, 최대한 빨리.',
    issues: [
      { id: 'issue-c1', label: '"적당한 길이"는 모호함: 구체적인 글자 수나 페이지 수를 명시해야 함' },
      { id: 'issue-c2', label: '"전문적인 느낌"은 주관적: 어떤 톤과 용어 수준인지 정의 필요' },
      { id: 'issue-c3', label: '"필요한 내용을 모두"는 불명확: 구체적인 포함 항목 나열 필요' },
      { id: 'issue-c4', label: '"최대한 빨리"는 AI 작업과 무관: 응답 속도는 제약조건이 아님' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Highlight - Temperature 설정 관련 문제
  {
    id: 'p2-highlight-prompting-004',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 Temperature 설정에 대한 설명에서 잘못된 부분을 모두 선택하세요.',
    prompt: 'Temperature는 AI 응답의 창의성을 조절합니다. 높은 값(1.0 이상)은 정확한 사실 기반 답변에 적합하고, 낮은 값(0.0~0.3)은 창의적 글쓰기에 최적입니다. Top-P와 Temperature를 모두 최대로 설정하면 가장 좋은 결과를 얻습니다.',
    issues: [
      { id: 'issue-t1', label: '역할 혼동: 높은 Temperature는 창의적 작업에, 낮은 값은 정확성이 필요한 작업에 적합' },
      { id: 'issue-t2', label: '용도 반대 설명: 사실 기반 답변에는 낮은 Temperature가 적합' },
      { id: 'issue-t3', label: '창의적 글쓰기에는 높은 Temperature가 적합' },
      { id: 'issue-t4', label: '파라미터 조합 오류: 두 값을 모두 최대로 설정하면 일관성 없는 출력 발생' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Highlight - 명확성 원칙 위반
  {
    id: 'p2-highlight-prompting-005',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 프롬프트에서 명확성 원칙을 위반한 부분을 모두 선택하세요.',
    prompt: '그거 분석해줘. 아까 말한 것처럼 해서. 결과는 저번에 보여준 형식으로. 중요한 것만 강조해줘.',
    issues: [
      { id: 'issue-m1', label: '"그거"는 불명확: AI는 이전 대화를 기억하지 못할 수 있어 구체적 대상 명시 필요' },
      { id: 'issue-m2', label: '"아까 말한 것처럼"은 참조 불가: 분석 방법을 명시적으로 설명해야 함' },
      { id: 'issue-m3', label: '"저번에 보여준 형식"은 불명확: 원하는 형식을 직접 정의해야 함' },
      { id: 'issue-m4', label: '"중요한 것"의 기준 부재: 무엇이 중요한지 판단 기준 명시 필요' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Rewrite - Role-playing 기법 적용
  {
    id: 'p2-rewrite-prompting-003',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '아래 프롬프트를 Role-playing(역할극) 기법을 활용하여 더 효과적으로 개선하세요. AI에게 적절한 전문가 역할을 부여하고, 그 역할에 맞는 관점에서 답변하도록 유도하세요.',
    originalPrompt: '건강한 식단에 대해 알려줘',
    requirements: [
      '구체적인 전문가 역할을 부여할 것 (예: 영양사, 의사 등)',
      '해당 전문가의 경력이나 전문성을 명시할 것',
      '특정 상황이나 대상을 설정할 것 (예: 직장인, 다이어트 중 등)',
      '원하는 조언의 범위와 형식을 지정할 것',
    ],
    minWords: 60,
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Rewrite - 복합 기법 적용
  {
    id: 'p2-rewrite-prompting-004',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '아래 단순한 프롬프트를 Chain of Thought + 구조화된 출력 형식을 결합하여 개선하세요.',
    originalPrompt: '이 사업 아이디어가 괜찮을까? - 반려동물 전용 호텔 서비스',
    requirements: [
      '단계별 분석을 유도하는 Chain of Thought 기법을 적용할 것',
      '분석할 관점을 구체적으로 제시할 것 (시장성, 경쟁, 리스크 등)',
      '각 관점별로 구조화된 형식(표, 목록 등)을 지정할 것',
      'AI 분석의 한계를 인지하고 추가 조사가 필요한 영역을 요청할 것',
    ],
    minWords: 80,
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Rewrite - 모호한 프롬프트 구체화
  {
    id: 'p2-rewrite-prompting-005',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '아래의 모호한 프롬프트를 구체적인 제약 조건과 명확한 형식을 포함하여 개선하세요.',
    originalPrompt: '좋은 자기소개서 작성법 알려줘',
    requirements: [
      '대상 상황을 구체화할 것 (취업용, 대학원, 장학금 등)',
      '자기소개서의 구체적인 구성 요소를 요청할 것',
      '분량, 어조, 강조점 등 제약 조건을 명시할 것',
      '실제 활용 가능한 예시나 템플릿 형식을 요청할 것',
    ],
    minWords: 70,
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Ordering - 고급 프롬프팅 기법 선택 순서
  {
    id: 'p2-ordering-prompting-001',
    type: 'ordering',
    competency: 'prompting',
    instruction: '복잡한 분석 작업을 위한 프롬프트 작성 시 고급 기법 적용 순서를 올바르게 배열하세요.',
    steps: [
      { id: 'step-adv-1', text: '작업의 특성 파악: 창의성 vs 정확성, 단순 vs 복잡', correctOrder: 1 },
      { id: 'step-adv-2', text: '적합한 기법 선택: Few-shot, CoT, Role-playing 중 선택', correctOrder: 2 },
      { id: 'step-adv-3', text: '기본 프롬프트 구성: 5요소(Context, Persona, Task, Constraints, Format) 작성', correctOrder: 3 },
      { id: 'step-adv-4', text: '선택한 고급 기법 적용: 예시 추가 또는 사고 단계 유도', correctOrder: 4 },
      { id: 'step-adv-5', text: 'Temperature/Top-P 파라미터 조정: 작업 특성에 맞게 설정', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Ordering - 효과적인 예시 선정 순서 (Few-shot)
  {
    id: 'p2-ordering-prompting-002',
    type: 'ordering',
    competency: 'prompting',
    instruction: 'Few-shot 프롬프팅에서 효과적인 예시를 선정하고 구성하는 순서를 배열하세요.',
    steps: [
      { id: 'step-few-1', text: '원하는 출력의 형태와 품질 기준 정의', correctOrder: 1 },
      { id: 'step-few-2', text: '다양한 케이스를 대표하는 예시 2-3개 선정', correctOrder: 2 },
      { id: 'step-few-3', text: '예시를 난이도/복잡도 순으로 배치 (쉬운 것부터)', correctOrder: 3 },
      { id: 'step-few-4', text: '각 예시에 입력→출력 형식을 일관되게 적용', correctOrder: 4 },
      { id: 'step-few-5', text: '실제 분석 대상을 마지막에 배치', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Highlight - 고급 기법 오용 사례
  {
    id: 'p2-highlight-prompting-006',
    type: 'highlight',
    competency: 'prompting',
    instruction: '다음 프롬프트에서 고급 프롬프팅 기법의 오용 사례를 모두 선택하세요.',
    prompt: '당신은 AI 전문가입니다. 예시: Q: 날씨? A: 맑음. 이 패턴으로 다음 복잡한 비즈니스 전략 수립에 대해 한 단어로 답해주세요. 단계별로 생각할 필요 없이 바로 답만.',
    issues: [
      { id: 'issue-adv1', label: '역할과 작업 불일치: AI 전문가 역할인데 비즈니스 전략 요청' },
      { id: 'issue-adv2', label: 'Few-shot 예시 부적절: 단순 날씨 예시로 복잡한 전략 분석 유도 불가' },
      { id: 'issue-adv3', label: 'CoT 기법 배제 오류: 복잡한 문제는 단계별 사고가 필요함' },
      { id: 'issue-adv4', label: '출력 형식 비현실적: 복잡한 전략을 한 단어로 표현 불가능' },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },

  // Dragdrop - 반복 개선 프로세스
  {
    id: 'p2-dragdrop-refining-001',
    type: 'dragdrop',
    competency: 'refining',
    instruction: 'AI 응답이 불만족스러울 때 STAR 프레임워크를 활용한 피드백 구성 요소를 올바른 순서로 배치하세요.',
    blocks: [
      { id: 'block-star-1', text: 'Specific (구체적): 어떤 부분이 문제인지 정확히 지적', category: 'specific', correctOrder: 1 },
      { id: 'block-star-2', text: 'Targeted (표적화): 수정이 필요한 특정 섹션이나 문장 명시', category: 'targeted', correctOrder: 2 },
      { id: 'block-star-3', text: 'Actionable (실행 가능): 구체적인 수정 방향 제시', category: 'actionable', correctOrder: 3 },
      { id: 'block-star-4', text: 'Result-oriented (결과 지향): 원하는 최종 형태 설명', category: 'result', correctOrder: 4 },
    ],
    correctOrder: ['block-star-1', 'block-star-2', 'block-star-3', 'block-star-4'],
    indicatorWeights: [
      { indicator: 'refining', weight: 4 },
    ],
  },

  // ============================================
  // 5단계 추가: Ch05 (반복 개선), Ch06-08 (활용 사례) 기반
  // ============================================

  // Ordering - 반복 개선 워크플로우
  {
    id: 'p2-ordering-refining-001',
    type: 'ordering',
    competency: 'refining',
    instruction: 'AI 응답을 반복 개선하는 5단계 워크플로우를 올바른 순서로 배열하세요.',
    steps: [
      { id: 'step-iter-1', text: '1단계 시작: 핵심 요청과 기본 맥락을 담은 초기 프롬프트 작성', correctOrder: 1 },
      { id: 'step-iter-2', text: '2단계 평가: AI 응답을 검토하고 만족/불만족 여부 판단', correctOrder: 2 },
      { id: 'step-iter-3', text: '3단계 분석: 불만족 원인을 What/Why/How로 분석', correctOrder: 3 },
      { id: 'step-iter-4', text: '4단계 수정: STAR 프레임워크로 구체적 피드백 제공', correctOrder: 4 },
      { id: 'step-iter-5', text: '5단계 반복: 만족할 때까지 2-4단계 반복', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 4 },
    ],
  },

  // Highlight - 비효과적인 피드백 패턴
  {
    id: 'p2-highlight-refining-001',
    type: 'highlight',
    competency: 'refining',
    instruction: '다음 피드백에서 비효과적인 부분을 모두 선택하세요.',
    prompt: 'AI 응답에 대한 피드백: "이건 아니야. 뭔가 부족한 것 같아. 더 좋게 해줘. 느낌이 안 와. 다시 해봐."',
    issues: [
      { id: 'issue-fb1', label: '"이건 아니야"는 무엇이 문제인지 명시하지 않음' },
      { id: 'issue-fb2', label: '"뭔가 부족한 것 같아"는 구체적 개선점을 제시하지 않음' },
      { id: 'issue-fb3', label: '"더 좋게 해줘"는 원하는 방향이 불명확함' },
      { id: 'issue-fb4', label: '"다시 해봐"는 AI가 무엇을 바꿔야 할지 알 수 없음' },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 4 },
    ],
  },

  // Rewrite - 모호한 피드백을 구체적으로 개선
  {
    id: 'p2-rewrite-refining-001',
    type: 'rewrite',
    competency: 'refining',
    instruction: '아래의 모호한 피드백을 STAR 프레임워크(Specify-Tell-Ask-Reframe)를 적용하여 효과적인 피드백으로 개선하세요.',
    originalPrompt: '보고서가 마음에 안 들어. 더 좋게 수정해줘.',
    requirements: [
      'Specify: 문제가 되는 구체적인 부분을 명시할 것 (예: "두 번째 단락에서")',
      'Tell: 현재 어떤 점이 문제인지 설명할 것',
      'Ask: 원하는 변화를 구체적으로 요청할 것',
      'Reframe: 기대하는 최종 결과의 모습을 설명할 것',
    ],
    minWords: 50,
    indicatorWeights: [
      { indicator: 'refining', weight: 4 },
    ],
  },

  // Dragdrop - 학습 질문법 단계
  {
    id: 'p2-dragdrop-integrating-001',
    type: 'dragdrop',
    competency: 'integrating',
    instruction: 'AI를 튜터로 활용할 때 효과적인 학습 질문의 구성 요소를 올바른 순서로 배치하세요.',
    blocks: [
      { id: 'block-learn-1', text: '수준 명시: "고등학교 수학을 배운 사람이 이해할 수 있게"', category: 'level', correctOrder: 1 },
      { id: 'block-learn-2', text: '선행지식 밝히기: "통계학 기초는 알고 있어 (평균, 표준편차 정도)"', category: 'prior', correctOrder: 2 },
      { id: 'block-learn-3', text: '구체적 주제 요청: "머신러닝의 경사하강법을 설명해줘"', category: 'topic', correctOrder: 3 },
      { id: 'block-learn-4', text: '설명 방식 지정: "수식보다는 직관적인 비유로 먼저"', category: 'method', correctOrder: 4 },
      { id: 'block-learn-5', text: '이해 확인 요청: "내가 이해한 게 맞는지 확인해줘"', category: 'verify', correctOrder: 5 },
    ],
    correctOrder: ['block-learn-1', 'block-learn-2', 'block-learn-3', 'block-learn-4', 'block-learn-5'],
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // Ordering - 복잡한 개념 이해 단계
  {
    id: 'p2-ordering-integrating-003',
    type: 'ordering',
    competency: 'integrating',
    instruction: '복잡한 개념을 AI를 통해 단계적으로 이해하는 전략을 올바른 순서로 배열하세요.',
    steps: [
      { id: 'step-concept-1', text: '1단계: 한 문장 정의 요청 - "블록체인을 한 문장으로 정의하면?"', correctOrder: 1 },
      { id: 'step-concept-2', text: '2단계: 핵심 구성요소 파악 - "핵심 구성요소 3가지는?"', correctOrder: 2 },
      { id: 'step-concept-3', text: '3단계: 각 요소 상세화 - "그 중 합의 알고리즘을 더 자세히"', correctOrder: 3 },
      { id: 'step-concept-4', text: '4단계: 연결과 통합 - "이 세 요소가 어떻게 함께 작동해?"', correctOrder: 4 },
      { id: 'step-concept-5', text: '5단계: 실제 예시 적용 - "비트코인에서 이게 어떻게 적용되는지"', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // Highlight - AI 학습 활용의 위험한 패턴
  {
    id: 'p2-highlight-acumen-001',
    type: 'highlight',
    competency: 'acumen',
    instruction: '다음 AI 학습 활용 사례에서 피해야 할 위험한 패턴을 모두 선택하세요.',
    prompt: '학생의 AI 활용: "AI가 설명하는 모든 것을 그대로 믿고 노트에 적었다. 어려운 건 다 AI에게 물어보고 내가 생각하는 과정을 생략했다. 과제는 AI 답변을 복사해서 제출했다. 논문 인용도 AI가 알려준 대로 그대로 사용했다."',
    issues: [
      { id: 'issue-learn1', label: '무비판적 수용: AI 설명을 검증 없이 사실로 받아들임' },
      { id: 'issue-learn2', label: '과도한 의존: 스스로 생각하는 과정을 생략함' },
      { id: 'issue-learn3', label: '복붙 학습: AI 답변을 그대로 복사해 과제 제출 (학문적 부정행위)' },
      { id: 'issue-learn4', label: 'AI 인용 직접 사용: AI가 제시하는 논문/출처는 검증 필수 (환각 위험)' },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 4 },
    ],
  },

  // Rewrite - 업무 문서 요청 개선
  {
    id: 'p2-rewrite-integrating-001',
    type: 'rewrite',
    competency: 'integrating',
    instruction: '아래의 단순한 업무 문서 요청을 구체적인 맥락, 대상, 형식을 포함하여 효과적으로 개선하세요.',
    originalPrompt: '회의록 정리해줘',
    requirements: [
      '회의 개요(일시, 참석자, 목적)를 포함하도록 요청할 것',
      '논의 사항을 주제별로 정리하도록 지정할 것',
      '결정 사항과 액션 아이템(담당자, 마감일)을 구분하도록 요청할 것',
      '원하는 출력 형식을 명확히 지정할 것',
    ],
    minWords: 60,
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // Ordering - 업무 AI 활용 원칙
  {
    id: 'p2-ordering-protecting-001',
    type: 'ordering',
    competency: 'protecting',
    instruction: '업무에서 AI를 안전하게 활용하기 위한 3원칙을 올바른 적용 순서로 배열하세요.',
    steps: [
      { id: 'step-work-1', text: '입력 전 검토: 기밀 정보(고객 정보, 재무 데이터, 영업 비밀)가 포함되어 있지 않은지 확인', correctOrder: 1 },
      { id: 'step-work-2', text: 'AI 초안 생성: AI에게 초안 작성 요청', correctOrder: 2 },
      { id: 'step-work-3', text: '사람의 검토: AI 출력을 반드시 검토하고 사실 확인', correctOrder: 3 },
      { id: 'step-work-4', text: '최종 승인: 수정/보완 후 사람이 최종 결과물로 확정', correctOrder: 4 },
      { id: 'step-work-5', text: '외부 전달: 검증된 내용만 외부에 공유', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'protecting', weight: 4 },
    ],
  },

  // Highlight - 창작에서 AI 활용 시 윤리적 문제
  {
    id: 'p2-highlight-acumen-002',
    type: 'highlight',
    competency: 'acumen',
    instruction: '다음 AI 이미지 생성 프롬프트에서 윤리적으로 문제가 되는 부분을 모두 선택하세요.',
    prompt: 'AI 이미지 생성 요청: "유명 화가 X의 스타일로 그림을 그려줘. 연예인 Y의 얼굴을 사용해서 광고 이미지로 만들어줘. 뉴스 기사에 사용할 가짜 사진도 만들어줘."',
    issues: [
      { id: 'issue-art1', label: '특정 예술가 스타일 직접 모방: 저작권/스타일 도용 논란' },
      { id: 'issue-art2', label: '유명인 얼굴 무단 사용: 초상권 침해' },
      { id: 'issue-art3', label: '허위 뉴스용 이미지 생성: 딥페이크/허위정보 제작' },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 4 },
    ],
  },

  // Dragdrop - AI 공동 창작 워크플로우
  {
    id: 'p2-dragdrop-integrating-002',
    type: 'dragdrop',
    competency: 'integrating',
    instruction: 'AI와 협업하여 블로그 포스트를 작성하는 워크플로우의 단계를 올바른 순서로 배치하세요.',
    blocks: [
      { id: 'block-create-1', text: '주제 선정: 무엇에 대해 쓸지 결정 (사람)', category: 'topic', correctOrder: 1 },
      { id: 'block-create-2', text: '리서치: AI와 함께 관련 정보 수집, 관점 탐색', category: 'research', correctOrder: 2 },
      { id: 'block-create-3', text: '개요 작성: AI가 구조 제안 → 사람이 수정', category: 'outline', correctOrder: 3 },
      { id: 'block-create-4', text: '초안 작성: AI가 섹션별 초안 → 사람이 발전', category: 'draft', correctOrder: 4 },
      { id: 'block-create-5', text: '개인화: 자신의 경험, 관점, 목소리 추가 (사람)', category: 'personalize', correctOrder: 5 },
      { id: 'block-create-6', text: '최종 검토: 전체 흐름, 메시지 확인 (사람)', category: 'review', correctOrder: 6 },
    ],
    correctOrder: ['block-create-1', 'block-create-2', 'block-create-3', 'block-create-4', 'block-create-5', 'block-create-6'],
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // Rewrite - 창작 요청 개선
  {
    id: 'p2-rewrite-integrating-002',
    type: 'rewrite',
    competency: 'integrating',
    instruction: '아래의 막연한 창작 요청을 구체적인 방향, 장르, 구조를 포함하여 효과적으로 개선하세요.',
    originalPrompt: '소설 좀 써줘',
    requirements: [
      '장르와 분위기를 구체적으로 지정할 것',
      '주인공의 특성과 상황을 설정할 것',
      '스토리 구조(예: 3막 구조)를 요청할 것',
      '원하는 분량과 핵심 갈등/주제를 명시할 것',
    ],
    minWords: 70,
    indicatorWeights: [
      { indicator: 'integrating', weight: 4 },
    ],
  },

  // Ordering - 이미지 프롬프트 구성 요소
  {
    id: 'p2-ordering-prompting-003',
    type: 'ordering',
    competency: 'prompting',
    instruction: '효과적인 AI 이미지 생성 프롬프트의 구성 요소를 권장 작성 순서대로 배열하세요.',
    steps: [
      { id: 'step-img-1', text: '주제: 무엇을 그릴지 (예: 산악 자전거 타는 사람)', correctOrder: 1 },
      { id: 'step-img-2', text: '스타일: 어떤 느낌으로 (예: 유화, 애니메이션, 사실적)', correctOrder: 2 },
      { id: 'step-img-3', text: '분위기: 어떤 감정으로 (예: 신비로운, 활기찬, 고요한)', correctOrder: 3 },
      { id: 'step-img-4', text: '구도/조명: 시점과 빛 (예: 클로즈업, 황금빛 역광)', correctOrder: 4 },
      { id: 'step-img-5', text: '품질: 기술적 요소 (예: 4K, 고해상도, 상세한)', correctOrder: 5 },
    ],
    indicatorWeights: [
      { indicator: 'prompting', weight: 4 },
    ],
  },
];

export default part2Questions;
