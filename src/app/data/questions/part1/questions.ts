/**
 * Part 1 문항 데이터 - 파트1~2 (AI 개념, 도구, 프롬프트) 기반
 * MCQ (객관식) + Risk (상황 판단) 유형
 */

import { Part1Question } from '../types';

export const part1Questions: Part1Question[] = [
  // ============================================
  // MCQ 유형 - defining (AI 개념 이해)
  // ============================================
  {
    id: 'p1-mcq-defining-001',
    type: 'mcq',
    competency: 'defining',
    text: 'LLM(대규모 언어 모델)의 핵심 작동 원리로 가장 적절한 것은?',
    keyTerms: ['LLM', '토큰 예측', '작동 원리'],
    options: [
      { id: 'a', text: '인터넷에 실시간으로 접속하여 최신 정보를 검색한다', correct: false },
      { id: 'b', text: '학습한 패턴을 기반으로 다음에 올 토큰(단어)을 예측한다', correct: true },
      { id: 'c', text: '모든 질문에 대해 미리 저장된 답변을 검색하여 제공한다', correct: false },
      { id: 'd', text: '사용자의 의도를 파악하여 인과관계를 정확히 추론한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },
  {
    id: 'p1-mcq-defining-002',
    type: 'mcq',
    competency: 'defining',
    text: 'AI, 머신러닝, 딥러닝, 생성형 AI의 관계를 올바르게 설명한 것은?',
    keyTerms: ['AI', '머신러닝', '딥러닝', '생성형 AI', '포함 관계'],
    options: [
      { id: 'a', text: '생성형 AI가 가장 넓은 개념이며, 그 안에 딥러닝, 머신러닝, AI가 포함된다', correct: false },
      { id: 'b', text: 'AI ⊃ 머신러닝 ⊃ 딥러닝 ⊃ 생성형 AI 순서로 포함 관계를 가진다', correct: true },
      { id: 'c', text: '네 가지 기술은 서로 독립적이며 포함 관계가 없다', correct: false },
      { id: 'd', text: '머신러닝과 딥러닝은 같은 개념이며, AI와 생성형 AI만 구분된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // ============================================
  // MCQ 유형 - protecting (데이터 보호)
  // ============================================
  {
    id: 'p1-mcq-protecting-001',
    type: 'mcq',
    competency: 'protecting',
    text: '생성형 AI에 업무 문서를 입력할 때 가장 주의해야 할 사항은?',
    keyTerms: ['데이터 보호', '민감 정보', '보안'],
    options: [
      { id: 'a', text: '문서의 글자 수가 너무 길어지지 않도록 한다', correct: false },
      { id: 'b', text: '고객 개인정보, 사내 기밀 등 민감 정보 포함 여부를 확인한다', correct: true },
      { id: 'c', text: '가능한 많은 맥락 정보를 포함하여 정확한 응답을 유도한다', correct: false },
      { id: 'd', text: '영어로 번역하여 입력하면 보안 문제가 해결된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'protecting', weight: 3 },
    ],
  },
  {
    id: 'p1-mcq-protecting-002',
    type: 'mcq',
    competency: 'protecting',
    text: '회사에서 AI 도구 사용 정책을 수립할 때 우선적으로 고려해야 할 사항은?',
    keyTerms: ['AI 정책', '기업 보안', '데이터 관리'],
    options: [
      { id: 'a', text: '직원들의 AI 사용 편의성을 최우선으로 고려한다', correct: false },
      { id: 'b', text: '최신 AI 도구를 가장 먼저 도입하여 경쟁력을 확보한다', correct: false },
      { id: 'c', text: '입력 데이터의 민감도 분류와 허용 범위를 명확히 정의한다', correct: true },
      { id: 'd', text: '모든 업무에 AI 사용을 의무화하여 생산성을 높인다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'protecting', weight: 3 },
    ],
  },

  // ============================================
  // Risk 유형 - refining (결과 검증)
  // ============================================
  {
    id: 'p1-risk-refining-001',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 발생할 수 있는 가장 큰 위험은 무엇인가?',
    situation: '마케팅 담당자 김대리는 신제품 출시 보도자료를 작성하기 위해 ChatGPT를 활용했습니다. AI가 생성한 보도자료에는 "본 제품은 업계 최초로 특허 받은 기술을 적용했습니다"라는 문구가 포함되어 있습니다. 김대리는 시간이 촉박하여 해당 내용을 검증 없이 언론에 배포했습니다.',
    keyTerms: ['환각', '팩트체킹', '검증'],
    options: [
      { id: 'a', text: 'AI 사용료가 예산을 초과할 수 있다', correct: false },
      { id: 'b', text: 'AI가 생성한 허위 정보(환각)로 인해 법적 문제가 발생할 수 있다', correct: true },
      { id: 'c', text: '보도자료의 문체가 회사 스타일과 맞지 않을 수 있다', correct: false },
      { id: 'd', text: '경쟁사가 AI 사용 사실을 알게 될 수 있다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },
  {
    id: 'p1-risk-refining-002',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 가장 적절한 대응 방법은?',
    situation: '연구원 박씨는 논문 작성을 위해 Claude에게 특정 학술 논문의 내용을 요약해달라고 요청했습니다. Claude는 논문 제목, 저자, 주요 발견 사항을 상세하게 설명했습니다. 박씨는 이 정보를 자신의 논문 참고문헌에 인용하려고 합니다.',
    keyTerms: ['인용', '환각', '출처 검증'],
    options: [
      { id: 'a', text: 'AI가 제공한 정보를 그대로 인용하여 논문 작성을 빠르게 완료한다', correct: false },
      { id: 'b', text: '해당 논문이 실제로 존재하는지 학술 데이터베이스에서 직접 확인한다', correct: true },
      { id: 'c', text: 'AI에게 더 많은 논문을 요청하여 인용 개수를 늘린다', correct: false },
      { id: 'd', text: 'AI가 요약한 내용만 사용하고 원문은 확인하지 않아도 된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // ============================================
  // Risk 유형 - acumen (윤리적 판단)
  // ============================================
  {
    id: 'p1-risk-acumen-001',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 윤리적으로 가장 문제가 되는 점은?',
    situation: '대학생 이모씨는 AI를 활용하여 과제 에세이 전체를 작성했습니다. 교수님의 과제 지침에는 "AI 도구 사용 시 반드시 명시할 것"이라는 내용이 있었지만, 이모씨는 이를 무시하고 자신이 직접 작성한 것처럼 제출했습니다.',
    keyTerms: ['학술 윤리', 'AI 사용 고지', '표절'],
    options: [
      { id: 'a', text: 'AI가 생성한 에세이의 품질이 낮을 수 있다', correct: false },
      { id: 'b', text: 'AI 사용 비용이 발생했을 수 있다', correct: false },
      { id: 'c', text: 'AI 사용 사실을 숨겨 학술 윤리 위반에 해당한다', correct: true },
      { id: 'd', text: '에세이 주제가 과제 요구사항과 맞지 않을 수 있다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },
  {
    id: 'p1-risk-acumen-002',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 가장 바람직한 대응은?',
    situation: '인사팀 최과장은 채용 과정에서 AI를 활용하여 지원자 이력서를 분석하고 1차 서류 합격자를 선별하려고 합니다. AI 분석 결과, 특정 대학 출신 지원자들의 점수가 일관되게 높게 나타났습니다.',
    keyTerms: ['AI 편향', '공정성', '채용 윤리'],
    options: [
      { id: 'a', text: 'AI의 분석이 객관적이므로 결과를 그대로 수용한다', correct: false },
      { id: 'b', text: 'AI 분석 기준에 편향이 있는지 검토하고 공정성을 재확인한다', correct: true },
      { id: 'c', text: '시간 절약을 위해 AI 결과에 따라 빠르게 진행한다', correct: false },
      { id: 'd', text: 'AI 사용을 완전히 중단하고 수작업으로만 진행한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // ============================================
  // 1단계 추가 문항: Ch01 (AI 개념) + Ch09 (환각) 기반
  // ============================================

  // MCQ - defining: 토큰 개념
  {
    id: 'p1-mcq-defining-003',
    type: 'mcq',
    competency: 'defining',
    text: '토큰(Token)에 대한 설명으로 올바른 것은?',
    keyTerms: ['토큰', 'LLM', '텍스트 처리'],
    options: [
      { id: 'a', text: '토큰은 항상 하나의 완전한 단어와 동일하다', correct: false },
      { id: 'b', text: '토큰은 LLM이 텍스트를 처리하는 기본 단위로, 단어 전체 또는 일부일 수 있다', correct: true },
      { id: 'c', text: '모든 언어에서 토큰 수는 글자 수와 정확히 일치한다', correct: false },
      { id: 'd', text: '토큰 수는 AI 서비스 비용과 무관하다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // MCQ - defining: 전통적 AI vs 생성형 AI
  {
    id: 'p1-mcq-defining-004',
    type: 'mcq',
    competency: 'defining',
    text: '전통적 AI와 생성형 AI의 차이점으로 가장 적절한 것은?',
    keyTerms: ['전통적 AI', '생성형 AI', '분류', '생성'],
    options: [
      { id: 'a', text: '전통적 AI는 콘텐츠를 생성하고, 생성형 AI는 데이터를 분류한다', correct: false },
      { id: 'b', text: '전통적 AI는 분류/예측에 초점을 맞추고, 생성형 AI는 새로운 콘텐츠 창조에 초점을 맞춘다', correct: true },
      { id: 'c', text: '전통적 AI와 생성형 AI는 동일한 목적으로 사용된다', correct: false },
      { id: 'd', text: '생성형 AI는 데이터 학습이 필요 없다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // MCQ - defining: LLM 학습 데이터 한계
  {
    id: 'p1-mcq-defining-005',
    type: 'mcq',
    competency: 'defining',
    text: 'LLM의 학습 데이터에 관한 설명으로 올바르지 않은 것은?',
    keyTerms: ['학습 데이터', 'LLM', '한계'],
    options: [
      { id: 'a', text: '학습 시점 이후의 최신 정보는 알 수 없다', correct: false },
      { id: 'b', text: '인터넷에 많이 등장하는 정보가 더 잘 학습된다', correct: false },
      { id: 'c', text: '학습 데이터에 포함된 잘못된 정보도 함께 학습될 수 있다', correct: false },
      { id: 'd', text: 'LLM은 학습 데이터의 모든 정보를 완벽하게 기억하고 정확히 재현한다', correct: true },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // MCQ - defining: 멀티모달 AI
  {
    id: 'p1-mcq-defining-006',
    type: 'mcq',
    competency: 'defining',
    text: '멀티모달(Multimodal) AI에 대한 설명으로 가장 적절한 것은?',
    keyTerms: ['멀티모달', 'AI', '텍스트', '이미지'],
    options: [
      { id: 'a', text: '텍스트만을 전문적으로 처리하는 AI 모델이다', correct: false },
      { id: 'b', text: '텍스트, 이미지, 음성 등 여러 형태의 데이터를 동시에 이해하고 생성할 수 있는 AI이다', correct: true },
      { id: 'c', text: '하나의 작업만 수행할 수 있는 단일 목적 AI이다', correct: false },
      { id: 'd', text: '오직 이미지 생성만 가능한 AI이다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // Risk - refining: 환각 탐지 (Ch09)
  {
    id: 'p1-risk-refining-003',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 환각(Hallucination)을 의심해야 하는 가장 큰 이유는?',
    situation: 'AI에게 "한국의 2024년 1인 가구 비율"을 질문했더니, "34.7%이며, 서울대 사회학과 김OO 교수의 2023년 연구에 따르면 2030년까지 43%에 달할 것"이라는 답변을 받았습니다.',
    keyTerms: ['환각', '출처 검증', '구체적 수치'],
    options: [
      { id: 'a', text: '답변 길이가 너무 짧기 때문이다', correct: false },
      { id: 'b', text: '구체적인 수치와 연구자 이름이 포함되어 있어 허구일 가능성이 있기 때문이다', correct: true },
      { id: 'c', text: 'AI가 한국어로 답변했기 때문이다', correct: false },
      { id: 'd', text: '통계 관련 질문은 AI가 답변할 수 없기 때문이다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // Risk - refining: 환각 검증 방법 (Ch09)
  {
    id: 'p1-risk-refining-004',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 가장 적절한 검증 방법은?',
    situation: 'AI가 시장 조사 보고서를 작성하면서 "글로벌 전기차 시장은 2023년 기준 연 23.4% 성장했으며, Bloomberg NEF 보고서에 따르면..."이라고 답변했습니다.',
    keyTerms: ['출처 검증', '교차 확인', '환각 탐지'],
    options: [
      { id: 'a', text: 'AI가 출처를 명시했으므로 신뢰하고 그대로 사용한다', correct: false },
      { id: 'b', text: 'Bloomberg NEF 공식 사이트에서 해당 보고서와 수치가 실제로 존재하는지 확인한다', correct: true },
      { id: 'c', text: '다른 AI 도구에게 같은 질문을 해서 답변이 일치하면 신뢰한다', correct: false },
      { id: 'd', text: '수치가 구체적이므로 정확한 정보로 간주한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // Risk - refining: Mata v. Avianca 사례 기반 (Ch09)
  {
    id: 'p1-risk-refining-005',
    type: 'risk',
    competency: 'refining',
    text: '이 사례에서 얻을 수 있는 가장 중요한 교훈은?',
    situation: '2023년 미국에서 한 변호사가 ChatGPT를 사용해 법률 조사를 수행했습니다. AI가 제시한 6개의 판례를 법원에 제출했으나, 모든 판례가 실존하지 않는 가짜였습니다. 결국 변호사는 징계와 벌금을 받았습니다.',
    keyTerms: ['환각', '법률 문서', '팩트체킹'],
    options: [
      { id: 'a', text: 'AI를 법률 분야에서 사용해서는 안 된다', correct: false },
      { id: 'b', text: 'AI가 제시한 구체적인 인용이나 출처는 반드시 원본 확인이 필요하다', correct: true },
      { id: 'c', text: 'AI는 법률 분야에서만 환각을 일으킨다', correct: false },
      { id: 'd', text: '유료 AI 서비스를 사용했다면 이런 문제가 없었을 것이다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // MCQ - refining: 환각 발생 원리 (Ch09)
  {
    id: 'p1-mcq-refining-001',
    type: 'mcq',
    competency: 'refining',
    text: 'AI 환각(Hallucination)이 발생하는 근본적인 원인으로 가장 적절한 것은?',
    keyTerms: ['환각', 'LLM', '토큰 예측'],
    options: [
      { id: 'a', text: 'AI가 의도적으로 거짓말을 하기 때문이다', correct: false },
      { id: 'b', text: 'LLM은 사실을 검증하는 것이 아니라 통계적으로 그럴듯한 다음 단어를 예측하기 때문이다', correct: true },
      { id: 'c', text: 'AI의 인터넷 연결이 불안정하기 때문이다', correct: false },
      { id: 'd', text: '사용자가 질문을 잘못했기 때문이다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // MCQ - refining: 환각 고위험 상황 (Ch09)
  {
    id: 'p1-mcq-refining-002',
    type: 'mcq',
    competency: 'refining',
    text: 'AI 환각이 발생할 위험이 가장 높은 상황은?',
    keyTerms: ['환각', '고위험 상황', '검증'],
    options: [
      { id: 'a', text: '널리 알려진 역사적 사실에 대한 질문', correct: false },
      { id: 'b', text: '일반적인 개념에 대한 설명 요청', correct: false },
      { id: 'c', text: '특정 연구자의 논문 인용이나 구체적인 통계 수치 요청', correct: true },
      { id: 'd', text: '간단한 문장 번역 요청', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // Risk - refining: 의료 정보 환각 (Ch09)
  {
    id: 'p1-risk-refining-006',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 가장 적절한 대응은?',
    situation: '두통이 지속되어 AI에게 증상을 설명하고 조언을 구했습니다. AI는 특정 약물과 용량을 권고하며 "이 약이 효과적입니다"라고 답변했습니다.',
    keyTerms: ['의료 정보', '환각', 'AI 한계'],
    options: [
      { id: 'a', text: 'AI의 권고대로 해당 약물을 구입하여 복용한다', correct: false },
      { id: 'b', text: 'AI 답변은 참고만 하고, 실제 진단과 처방은 반드시 의료 전문가에게 받는다', correct: true },
      { id: 'c', text: '여러 AI 도구에게 같은 질문을 해서 다수결로 결정한다', correct: false },
      { id: 'd', text: 'AI가 구체적인 약물명을 제시했으므로 신뢰할 수 있다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // Risk - refining: 기술 문서 환각 (Ch09)
  {
    id: 'p1-risk-refining-007',
    type: 'risk',
    competency: 'refining',
    text: '이 상황에서 발생할 수 있는 문제와 해결책으로 가장 적절한 것은?',
    situation: '개발자가 AI에게 Python 라이브러리의 특정 함수 사용법을 물어봤습니다. AI는 상세한 코드 예시와 함께 함수명, 파라미터, 반환값을 설명했습니다.',
    keyTerms: ['기술 문서', '환각', '코드 검증'],
    options: [
      { id: 'a', text: 'AI가 제시한 코드를 그대로 복사하여 프로덕션에 배포한다', correct: false },
      { id: 'b', text: '해당 함수가 실제로 존재하는지 공식 문서에서 확인하고, 테스트 코드로 검증한다', correct: true },
      { id: 'c', text: 'AI가 코드 예시까지 제공했으므로 정확한 정보이다', correct: false },
      { id: 'd', text: '기술 분야는 환각이 발생하지 않으므로 바로 사용한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'refining', weight: 3 },
    ],
  },

  // ============================================
  // 2단계 추가 문항: Ch10 (윤리) + Ch11 (책임 있는 사용) 기반
  // ============================================

  // MCQ - acumen: 윤리 원칙 (Ch10)
  {
    id: 'p1-mcq-acumen-001',
    type: 'mcq',
    competency: 'acumen',
    text: 'AI 윤리의 핵심 원칙으로 적절하지 않은 것은?',
    keyTerms: ['AI 윤리', '투명성', '책임성'],
    options: [
      { id: 'a', text: '투명성: AI 사용 사실을 숨기지 않는다', correct: false },
      { id: 'b', text: '책임성: AI 출력에 대한 최종 책임은 사용자에게 있다', correct: false },
      { id: 'c', text: '효율성: AI로 업무 속도를 최대한 높이는 것이 최우선이다', correct: true },
      { id: 'd', text: '공정성: 편향이나 차별을 인식하고 완화한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // MCQ - acumen: 저작권 쟁점 (Ch10)
  {
    id: 'p1-mcq-acumen-002',
    type: 'mcq',
    competency: 'acumen',
    text: 'AI와 저작권에 관한 설명으로 올바른 것은?',
    keyTerms: ['저작권', 'AI', '법적 쟁점'],
    options: [
      { id: 'a', text: 'AI가 생성한 콘텐츠는 저작권 문제가 전혀 없다', correct: false },
      { id: 'b', text: 'AI 출력물의 저작권 문제는 법적으로 완전히 정립되지 않아 주의가 필요하다', correct: true },
      { id: 'c', text: 'AI가 학습한 데이터의 저작권자 동의는 법적으로 필요하지 않다', correct: false },
      { id: 'd', text: '유료 AI 서비스를 사용하면 저작권 문제가 자동으로 해결된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: 학술 표절 (Ch10)
  {
    id: 'p1-risk-acumen-003',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 가장 적절한 대응은?',
    situation: '대학원생 A는 연구 논문 작성을 위해 AI를 사용하여 문헌 검토 섹션의 초안을 생성했습니다. 학과에서는 AI 사용 시 반드시 그 범위와 방법을 명시하도록 정책을 수립했습니다.',
    keyTerms: ['학술 윤리', '표절', 'AI 사용 고지'],
    options: [
      { id: 'a', text: 'AI가 생성한 내용이라도 자신이 수정했으므로 고지할 필요가 없다', correct: false },
      { id: 'b', text: '논문에 AI 사용 범위와 방법을 명시하고, 내용의 정확성을 직접 검증한다', correct: true },
      { id: 'c', text: '모든 학생이 AI를 사용하므로 굳이 명시하지 않아도 된다', correct: false },
      { id: 'd', text: 'AI 사용을 숨기고 제출한 후 문제가 생기면 그때 해명한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: AI 편향 인식 (Ch10)
  {
    id: 'p1-risk-acumen-004',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 발생할 수 있는 윤리적 문제는?',
    situation: '마케팅팀에서 AI 이미지 생성 도구를 사용하여 "성공적인 비즈니스 리더" 이미지를 생성했습니다. 생성된 이미지들은 대부분 특정 성별과 인종의 인물로 표현되었습니다.',
    keyTerms: ['AI 편향', '다양성', '스테레오타입'],
    options: [
      { id: 'a', text: 'AI가 생성한 것이므로 사용자의 책임이 아니다', correct: false },
      { id: 'b', text: 'AI가 학습한 데이터의 편향이 반영되어 기존 고정관념을 강화할 수 있다', correct: true },
      { id: 'c', text: 'AI는 객관적이므로 생성된 이미지가 실제 현실을 반영한다', correct: false },
      { id: 'd', text: '마케팅에서는 시각적 효과가 중요하므로 편향 문제는 고려하지 않아도 된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // MCQ - protecting: 정보 보안 (Ch10)
  {
    id: 'p1-mcq-protecting-003',
    type: 'mcq',
    competency: 'protecting',
    text: 'AI에 입력하면 안 되는 정보로 적절하지 않은 것은?',
    keyTerms: ['개인정보', '기밀', '데이터 보안'],
    options: [
      { id: 'a', text: '고객의 주민등록번호와 연락처가 포함된 데이터', correct: false },
      { id: 'b', text: '회사의 미공개 사업 전략 문서', correct: false },
      { id: 'c', text: '공개된 뉴스 기사의 요약 요청', correct: true },
      { id: 'd', text: '직원들의 급여 정보가 포함된 스프레드시트', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'protecting', weight: 3 },
    ],
  },

  // Risk - protecting: 기밀 정보 유출 (Ch10)
  {
    id: 'p1-risk-protecting-001',
    type: 'risk',
    competency: 'protecting',
    text: '이 상황에서 가장 큰 위험은 무엇인가?',
    situation: '영업팀 직원이 경쟁사 분석 보고서를 작성하기 위해, 회사의 내부 매출 데이터와 미공개 신제품 정보를 AI 챗봇에 입력하여 비교 분석을 요청했습니다.',
    keyTerms: ['기밀 정보', '데이터 유출', '보안'],
    options: [
      { id: 'a', text: 'AI가 잘못된 분석 결과를 제공할 수 있다', correct: false },
      { id: 'b', text: 'AI에 입력한 기밀 정보가 외부에 노출되거나 학습에 사용될 위험이 있다', correct: true },
      { id: 'c', text: 'AI 사용 비용이 회사 예산을 초과할 수 있다', correct: false },
      { id: 'd', text: '보고서 작성 시간이 예상보다 오래 걸릴 수 있다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'protecting', weight: 3 },
    ],
  },

  // MCQ - acumen: AI 의존성 (Ch11)
  {
    id: 'p1-mcq-acumen-003',
    type: 'mcq',
    competency: 'acumen',
    text: 'AI 과의존의 위험 신호로 적절하지 않은 것은?',
    keyTerms: ['AI 의존성', '비판적 사고', '역량'],
    options: [
      { id: 'a', text: 'AI 없이는 간단한 글도 시작하기 어렵다', correct: false },
      { id: 'b', text: 'AI 응답을 검증 없이 그대로 사용한다', correct: false },
      { id: 'c', text: 'AI를 활용하여 업무 효율을 높이고 있다', correct: true },
      { id: 'd', text: '스스로 생각하는 시간이 점점 줄어들었다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: 건강한 AI 활용 (Ch11)
  {
    id: 'p1-risk-acumen-005',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 가장 바람직한 접근 방식은?',
    situation: '신입 마케터 B는 모든 업무에서 AI를 적극 활용하고 있습니다. 기획안 작성, 카피라이팅, 데이터 분석까지 AI에게 맡기고 결과물을 거의 수정 없이 사용합니다. 덕분에 업무 속도는 빠르지만, 동료들은 B의 기본기와 독창성에 의문을 갖기 시작했습니다.',
    keyTerms: ['AI 의존', '역량 개발', '균형'],
    options: [
      { id: 'a', text: '업무 효율이 중요하므로 현재 방식을 유지한다', correct: false },
      { id: 'b', text: 'AI 활용과 함께 기본 역량 개발도 병행하고, 결과물에 자신의 판단과 수정을 더한다', correct: true },
      { id: 'c', text: 'AI 사용을 완전히 중단하고 모든 업무를 수작업으로 처리한다', correct: false },
      { id: 'd', text: '동료들의 의견은 무시하고 결과만 좋으면 된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // MCQ - acumen: 인간-AI 협업 (Ch11)
  {
    id: 'p1-mcq-acumen-004',
    type: 'mcq',
    competency: 'acumen',
    text: '효과적인 인간-AI 협업에서 인간이 담당해야 할 역할로 가장 적절한 것은?',
    keyTerms: ['인간-AI 협업', '의사결정', '책임'],
    options: [
      { id: 'a', text: '데이터 수집과 패턴 분석', correct: false },
      { id: 'b', text: '반복적인 형식 변환 작업', correct: false },
      { id: 'c', text: '최종 의사결정, 가치 판단, 윤리적 결정', correct: true },
      { id: 'd', text: '대량의 텍스트 초안 생성', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: 역량 보존 (Ch11)
  {
    id: 'p1-risk-acumen-006',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 장기적으로 발생할 수 있는 문제는?',
    situation: '대학생 C는 모든 과제에 AI를 사용합니다. 에세이 작성, 수학 문제 풀이, 프로그래밍 과제까지 AI가 생성한 답을 그대로 제출합니다. 성적은 좋지만, 시험이나 면접처럼 AI를 사용할 수 없는 상황에서는 자신감이 없습니다.',
    keyTerms: ['역량 퇴화', 'AI 의존', '학습'],
    options: [
      { id: 'a', text: 'AI 사용 비용이 증가할 수 있다', correct: false },
      { id: 'b', text: '기본 역량이 발달하지 않아 실제 문제 해결 능력이 약화될 수 있다', correct: true },
      { id: 'c', text: '다른 학생들보다 더 빨리 졸업할 수 있다', correct: false },
      { id: 'd', text: 'AI 기술이 발전하면 문제가 자연스럽게 해결된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // ============================================
  // 3단계 추가 문항: Ch02 (도구 생태계) + Ch12/13 (역량/미래) 기반
  // ============================================

  // MCQ - integrating: AI 도구 선택 (Ch02)
  {
    id: 'p1-mcq-integrating-001',
    type: 'mcq',
    competency: 'integrating',
    text: '100페이지 분량의 PDF 계약서를 분석해야 할 때 가장 적합한 AI 도구는?',
    keyTerms: ['도구 선택', '컨텍스트 윈도우', '문서 분석'],
    options: [
      { id: 'a', text: 'ChatGPT - 가장 인기 있는 서비스이므로', correct: false },
      { id: 'b', text: 'Claude - 200K 토큰의 긴 컨텍스트 윈도우로 전체 문서 처리 가능', correct: true },
      { id: 'c', text: 'DALL-E - 이미지 처리에 강점이 있으므로', correct: false },
      { id: 'd', text: '모든 AI 도구의 성능은 동일하다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 3 },
    ],
  },

  // MCQ - integrating: AI 도구 특성 (Ch02)
  {
    id: 'p1-mcq-integrating-002',
    type: 'mcq',
    competency: 'integrating',
    text: '실시간 최신 정보가 필요한 리서치 작업에 가장 적합한 도구 조합은?',
    keyTerms: ['실시간 검색', '도구 선택', '리서치'],
    options: [
      { id: 'a', text: 'Claude - 안전성이 높으므로', correct: false },
      { id: 'b', text: 'DALL-E - 이미지 생성이 가능하므로', correct: false },
      { id: 'c', text: 'Gemini 또는 Perplexity - 실시간 웹 검색 기능과 출처 명시', correct: true },
      { id: 'd', text: '모든 AI는 실시간 정보에 동일하게 접근한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 3 },
    ],
  },

  // Risk - integrating: 도구 선택 상황 (Ch02)
  {
    id: 'p1-risk-integrating-001',
    type: 'risk',
    competency: 'integrating',
    text: '이 상황에서 가장 적절한 조언은?',
    situation: '스타트업 대표 D는 회사의 모든 업무에 ChatGPT만 사용하고 있습니다. 긴 문서 분석, 실시간 정보 검색, 이미지 생성, 코드 작성 등 모든 작업을 하나의 도구로 처리하려고 합니다.',
    keyTerms: ['도구 선택', 'AI 생태계', '업무 효율'],
    options: [
      { id: 'a', text: 'ChatGPT가 가장 좋은 도구이므로 현재 방식이 최선이다', correct: false },
      { id: 'b', text: '작업 목적에 따라 각 도구의 강점을 활용하여 적절한 도구를 선택해야 한다', correct: true },
      { id: 'c', text: 'AI 도구를 전혀 사용하지 않는 것이 안전하다', correct: false },
      { id: 'd', text: '가장 비싼 유료 서비스를 구독하면 모든 문제가 해결된다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'integrating', weight: 3 },
    ],
  },

  // MCQ - defining: 에이전트 AI (Ch13)
  {
    id: 'p1-mcq-defining-007',
    type: 'mcq',
    competency: 'defining',
    text: '에이전트 AI(Agent AI)에 대한 설명으로 가장 적절한 것은?',
    keyTerms: ['에이전트 AI', '자율성', '미래 트렌드'],
    options: [
      { id: 'a', text: '사용자의 질문에 단순히 답변만 제공하는 AI', correct: false },
      { id: 'b', text: '스스로 계획을 세우고, 도구를 활용하며, 목표 달성을 위해 자율적으로 행동하는 AI', correct: true },
      { id: 'c', text: '이미지만 생성할 수 있는 특수한 AI', correct: false },
      { id: 'd', text: '인터넷에 접속할 수 없는 오프라인 AI', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // MCQ - defining: AI 발전 방향 (Ch13)
  {
    id: 'p1-mcq-defining-008',
    type: 'mcq',
    competency: 'defining',
    text: 'AI 기술의 현재 한계와 연구 방향으로 올바르지 않은 것은?',
    keyTerms: ['AI 한계', '환각', '연구 방향'],
    options: [
      { id: 'a', text: '환각(Hallucination) 문제 해결을 위해 검색 증강 생성(RAG) 기술이 연구되고 있다', correct: false },
      { id: 'b', text: '복잡한 다단계 추론 능력 향상을 위해 사고의 사슬(CoT) 기법이 발전하고 있다', correct: false },
      { id: 'c', text: '현재 AI는 모든 문제를 완벽하게 해결할 수 있어 추가 연구가 불필요하다', correct: true },
      { id: 'd', text: 'AI의 높은 에너지 소비 문제를 해결하기 위해 모델 경량화 연구가 진행 중이다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'defining', weight: 3 },
    ],
  },

  // MCQ - acumen: AI 시대 핵심 역량 (Ch12)
  {
    id: 'p1-mcq-acumen-005',
    type: 'mcq',
    competency: 'acumen',
    text: 'AI 시대에 더욱 중요해지는 인간 고유의 역량으로 적절하지 않은 것은?',
    keyTerms: ['핵심 역량', 'AI 시대', '인간 역량'],
    options: [
      { id: 'a', text: '비판적 사고력 - AI 출력을 평가하고 검증하는 능력', correct: false },
      { id: 'b', text: '감성 지능 - 진정한 공감과 대인 관계 능력', correct: false },
      { id: 'c', text: '단순 데이터 입력 - 정확하게 정보를 입력하는 능력', correct: true },
      { id: 'd', text: '윤리적 판단력 - 가치 충돌 상황에서 올바른 결정을 내리는 능력', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: 미래 대비 (Ch12/13)
  {
    id: 'p1-risk-acumen-007',
    type: 'risk',
    competency: 'acumen',
    text: '이 상황에서 가장 현명한 대응은?',
    situation: '직장인 E는 자신의 업무 대부분이 AI로 자동화될 수 있다는 뉴스를 보았습니다. 현재 데이터 입력과 정형화된 보고서 작성이 주요 업무입니다.',
    keyTerms: ['미래 대비', '역량 전환', '자동화'],
    options: [
      { id: 'a', text: 'AI 기술은 곧 사라질 유행이므로 현재 업무에 집중한다', correct: false },
      { id: 'b', text: 'AI가 대체하기 어려운 역량(비판적 사고, 창의성, 대인관계)을 개발하고 AI 협업 능력을 기른다', correct: true },
      { id: 'c', text: '당장 직장을 그만두고 완전히 다른 분야로 전환한다', correct: false },
      { id: 'd', text: 'AI를 전혀 사용하지 않고 기존 방식만 고수한다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // Risk - acumen: 규제와 거버넌스 (Ch13)
  {
    id: 'p1-risk-acumen-008',
    type: 'risk',
    competency: 'acumen',
    text: '이 사례에서 얻을 수 있는 가장 중요한 교훈은?',
    situation: '2023년 OpenAI에서 CEO Sam Altman이 갑자기 해임되었다가 며칠 만에 복귀하는 사태가 발생했습니다. 이 과정에서 AI 안전과 상업화 속도에 대한 견해 차이가 드러났습니다.',
    keyTerms: ['AI 거버넌스', 'AI 안전', '기술 윤리'],
    options: [
      { id: 'a', text: 'AI 회사의 인사 문제는 일반인과 무관하다', correct: false },
      { id: 'b', text: 'AI 기술 발전에서 안전과 윤리, 상업적 이익 간의 균형이 중요한 과제이다', correct: true },
      { id: 'c', text: 'AI 개발은 속도가 가장 중요하므로 안전 문제는 나중에 해결하면 된다', correct: false },
      { id: 'd', text: '이런 사건은 AI 산업에 전혀 영향을 미치지 않는다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },

  // MCQ - acumen: 학습 민첩성 (Ch12)
  {
    id: 'p1-mcq-acumen-006',
    type: 'mcq',
    competency: 'acumen',
    text: 'AI 시대에 필요한 "학습 민첩성"에 대한 설명으로 가장 적절한 것은?',
    keyTerms: ['학습 민첩성', '평생 학습', '적응력'],
    options: [
      { id: 'a', text: '한 가지 기술을 완벽하게 마스터하면 평생 사용할 수 있다', correct: false },
      { id: 'b', text: '변화에 빠르게 적응하고 새로운 것을 빠르게 배우는 능력이 중요하다', correct: true },
      { id: 'c', text: 'AI가 모든 학습을 대신해주므로 직접 배울 필요가 없다', correct: false },
      { id: 'd', text: '나이가 들면 새로운 기술을 배우는 것이 불가능하다', correct: false },
    ],
    indicatorWeights: [
      { indicator: 'acumen', weight: 3 },
    ],
  },
];

export default part1Questions;
