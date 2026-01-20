import { part3TasksIT, part3RubricIT } from './questions-it';
import { Part1Question, Part2Question } from './questions/types';

// 새 문항 파일에서 import
import { part1Questions as newPart1Questions } from './questions/part1/questions';
import { part2Questions as newPart2Questions } from './questions/part2/questions';

// Part 1 문항 (30문항) - 전체 CSV 데이터 기반
// competency: 'defining' (AI 개념), 'protecting' (데이터 보호), 'refining' (검증), 'acumen' (윤리/판단)
const originalPart1Questions: Part1Question[] = [
  // p1q1 - defining
  {
    id: 'p1q1',
    type: 'mcq',
    competency: 'defining',
    text: 'LLM(대규모 언어 모델)이 답변을 생성하는 기본 원리는 무엇인가요?',
    keyTerms: ['토큰', '예측', '확률'],
    options: [
      { id: 'A', text: '질문에 대한 정답을 데이터베이스에서 검색하여 가져온다.', correct: false },
      { id: 'B', text: '이전 단어들의 문맥을 바탕으로 다음에 올 가장 확률 높은 단어(토큰)를 예측한다.', correct: true },
      { id: 'C', text: '인간처럼 문장의 의미를 완벽하게 이해하고 논리적으로 추론한다.', correct: false },
      { id: 'D', text: '사전에 입력된 규칙에 따라 고정된 답변만을 출력한다.', correct: false }
    ]
  },
  // p1q2 - defining
  {
    id: 'p1q2',
    type: 'mcq',
    competency: 'defining',
    text: '프롬프트 엔지니어링에서 \'페르소나(Persona)\'를 설정하는 것의 주된 효과는?',
    keyTerms: ['페르소나', '역할'],
    options: [
      { id: 'A', text: '모델의 답변 속도를 2배로 높인다.', correct: false },
      { id: 'B', text: '모델이 특정 전문가나 역할의 관점에서 일관된 톤과 전문성을 갖춘 답변을 하도록 유도한다.', correct: true },
      { id: 'C', text: '할루시네이션을 100% 제거한다.', correct: false },
      { id: 'D', text: '토큰 사용량을 줄여 비용을 절약한다.', correct: false }
    ]
  },
  // p1q3 - defining
  {
    id: 'p1q3',
    type: 'mcq',
    competency: 'defining',
    text: '\'맥락(Context)\'이 프롬프트에서 중요한 이유는 무엇인가요?',
    keyTerms: ['맥락', 'Context'],
    options: [
      { id: 'A', text: '맥락이 없으면 모델이 아무런 답변도 할 수 없기 때문이다.', correct: false },
      { id: 'B', text: '모델에게 배경 정보를 제공하여 더 정확하고 상황에 맞는 답변을 얻기 위함이다.', correct: true },
      { id: 'C', text: '맥락이 길수록 무조건 답변의 품질이 좋아지기 때문이다.', correct: false },
      { id: 'D', text: '맥락을 제공하면 모델의 학습 데이터가 영구적으로 업데이트되기 때문이다.', correct: false }
    ]
  },
  // p1q4 - defining
  {
    id: 'p1q4',
    type: 'mcq',
    competency: 'defining',
    text: '프롬프트 작성 시 \'명확하고 구체적인 지시\'가 중요한 이유는?',
    keyTerms: ['명확성', '구체성'],
    options: [
      { id: 'A', text: '모델은 사용자의 의도를 텔레파시로 읽을 수 없기 때문에 모호한 지시는 엉뚱한 결과를 초래한다.', correct: true },
      { id: 'B', text: '짧게 쓰면 모델이 무시하기 때문이다.', correct: false },
      { id: 'C', text: '복잡하게 써야 모델이 똑똑해지기 때문이다.', correct: false },
      { id: 'D', text: '구체적인 지시는 항상 할루시네이션을 유발하기 때문이다.', correct: false }
    ]
  },
  // p1q5 - defining
  {
    id: 'p1q5',
    type: 'mcq',
    competency: 'defining',
    text: 'LLM의 \'Temperature(온도)\' 파라미터를 0에 가깝게 설정했을 때의 결과로 적절한 것은?',
    keyTerms: ['Temperature', '일관성'],
    options: [
      { id: 'A', text: '매우 창의적이고 예측 불가능한 답변이 나온다.', correct: false },
      { id: 'B', text: '가장 확률이 높은 단어만 선택하여 사실적이고 일관된(결정론적) 답변이 나온다.', correct: true },
      { id: 'C', text: '모델이 답변을 거부할 확률이 높아진다.', correct: false },
      { id: 'D', text: '질문과 전혀 상관없는 답변이 나온다.', correct: false }
    ]
  },
  // p1q6 - refining (할루시네이션 방지)
  {
    id: 'p1q6',
    type: 'risk',
    competency: 'refining',
    situation: '당신은 법률 자문 문서를 검토 중입니다.',
    text: '다음 중 AI의 \'할루시네이션(Hallucination)\' 위험을 줄이기 위한 행동으로 적절하지 않은 것은?',
    keyTerms: ['할루시네이션', '검증'],
    options: [
      { id: 'A', text: '출처가 불분명한 정보는 반드시 원본 문서를 통해 사실 관계를 확인한다.', correct: false },
      { id: 'B', text: '중요한 의사결정(의료, 법률 등)은 AI 답변에만 전적으로 의존한다.', correct: true },
      { id: 'C', text: '프롬프트에 \'확실하지 않으면 모른다고 답해줘\'라는 지침을 추가한다.', correct: false },
      { id: 'D', text: '관련된 참고 문서나 데이터를 프롬프트에 함께 제공한다(RAG).', correct: false }
    ]
  },
  // p1q7 - protecting
  {
    id: 'p1q7',
    type: 'risk',
    competency: 'protecting',
    situation: '고객 데이터를 다루는 마케터입니다.',
    text: '기업 내에서 LLM 사용 시 보안상 가장 주의해야 할 행동은?',
    keyTerms: ['보안', '데이터유출'],
    options: [
      { id: 'A', text: '이미 공개된 보도자료를 요약시키는 것', correct: false },
      { id: 'B', text: '비식별화된 일반적인 시장 데이터를 분석시키는 것', correct: false },
      { id: 'C', text: '고객의 실명, 전화번호, 계좌번호가 포함된 파일을 업로드하여 분석시키는 것', correct: true },
      { id: 'D', text: '파이썬 코딩 문법 오류를 수정해달라고 요청하는 것', correct: false }
    ]
  },
  // p1q8 - refining
  {
    id: 'p1q8',
    type: 'mcq',
    competency: 'refining',
    text: 'LLM이 거짓 정보를 사실인 것처럼 확신에 차서 말하는 현상을 무엇이라 하는가?',
    keyTerms: ['할루시네이션'],
    options: [
      { id: 'A', text: '파인튜닝(Fine-tuning)', correct: false },
      { id: 'B', text: '환각(Hallucination)', correct: true },
      { id: 'C', text: '오버피팅(Overfitting)', correct: false },
      { id: 'D', text: '토큰화(Tokenization)', correct: false }
    ]
  },
  // p1q9 - acumen (편향성)
  {
    id: 'p1q9',
    type: 'risk',
    competency: 'acumen',
    situation: '채용 공고문을 작성 중입니다.',
    text: 'AI 모델이 편향된(Biased) 답변을 할 수 있음을 인지하고 대응하는 올바른 태도는?',
    keyTerms: ['편향성', '윤리'],
    options: [
      { id: 'A', text: 'AI는 기계이므로 편향이 절대 없다고 믿는다.', correct: false },
      { id: 'B', text: '답변이 사회적 통념이나 윤리에 어긋나는지 비판적으로 검토한다.', correct: true },
      { id: 'C', text: '편향된 답변이 나오면 무조건 사용자의 책임으로 돌린다.', correct: false },
      { id: 'D', text: '모든 답변을 검토 없이 그대로 외부에 배포한다.', correct: false }
    ]
  },
  // p1q10 - protecting
  {
    id: 'p1q10',
    type: 'mcq',
    competency: 'protecting',
    text: '\'Prompt Injection\' 공격이란 무엇인가?',
    keyTerms: ['보안', 'Prompt Injection'],
    options: [
      { id: 'A', text: '프롬프트를 아주 길게 작성하는 것', correct: false },
      { id: 'B', text: '악의적인 명령어를 숨겨서 모델이 원래 지침을 어기게 만드는 해킹 기법', correct: true },
      { id: 'C', text: '프롬프트에 이미지를 주입하는 기술', correct: false },
      { id: 'D', text: '여러 개의 프롬프트를 동시에 실행하는 것', correct: false }
    ]
  },
  // p1q11 - defining (OpenAI Reasoning)
  {
    id: 'p1q11',
    type: 'mcq',
    competency: 'defining',
    text: 'ChatGPT(OpenAI)의 \'Reasoning 모델(o1, o3)\' 사용 시 권장되지 않는 프롬프팅 방식은?',
    keyTerms: ['OpenAI', 'Reasoning'],
    options: [
      { id: 'A', text: '명확하고 직접적인 목표 제시', correct: false },
      { id: 'B', text: '\'단계별로 생각하라(Think step-by-step)\'고 지시하기', correct: true },
      { id: 'C', text: '참고 자료 제공하기', correct: false },
      { id: 'D', text: '원하는 출력 형식 지정하기', correct: false }
    ]
  },
  // p1q12 - refining
  {
    id: 'p1q12',
    type: 'mcq',
    competency: 'refining',
    text: 'GPT-4와 같은 일반 모델을 \'주니어 동료\'처럼 다룰 때 가장 효과적인 방법은?',
    keyTerms: ['GPT-4', '지시사항'],
    options: [
      { id: 'A', text: '알아서 하라고 맡겨둔다.', correct: false },
      { id: 'B', text: '구체적이고 상세한 지침과 예시를 제공한다.', correct: true },
      { id: 'C', text: '키워드만 던져준다.', correct: false },
      { id: 'D', text: '한 번에 모든 업무를 처리하도록 강요한다.', correct: false }
    ]
  },
  // p1q13 - defining
  {
    id: 'p1q13',
    type: 'mcq',
    competency: 'defining',
    text: 'OpenAI API에서 \'System Message\' 또는 \'Developer Message\'의 역할은?',
    keyTerms: ['시스템메시지', '역할설정'],
    options: [
      { id: 'A', text: '사용자의 질문 내용을 담는다.', correct: false },
      { id: 'B', text: 'AI의 행동 지침, 역할, 톤앤매너를 전역적으로 설정한다.', correct: true },
      { id: 'C', text: '이전 대화 내역을 저장한다.', correct: false },
      { id: 'D', text: '결과물의 길이를 제한한다.', correct: false }
    ]
  },
  // p1q14 - defining
  {
    id: 'p1q14',
    type: 'mcq',
    competency: 'defining',
    text: 'ChatGPT의 \'메모리(Memory)\' 기능의 주요 이점은?',
    keyTerms: ['메모리', '개인화'],
    options: [
      { id: 'A', text: '모든 대화가 1시간 뒤에 삭제되어 보안이 강화된다.', correct: false },
      { id: 'B', text: '사용자의 선호나 정보를 기억하여 대화가 지속될수록 개인화된 경험을 제공한다.', correct: true },
      { id: 'C', text: '인터넷 검색 속도가 빨라진다.', correct: false },
      { id: 'D', text: '할루시네이션이 완전히 사라진다.', correct: false }
    ]
  },
  // p1q15 - defining
  {
    id: 'p1q15',
    type: 'mcq',
    competency: 'defining',
    text: 'OpenAI의 o1/o3 모델에 있는 \'Reasoning Effort\' 파라미터는 무엇을 조절하는가?',
    keyTerms: ['Reasoning Effort', '추론'],
    options: [
      { id: 'A', text: '답변의 창의성 수준', correct: false },
      { id: 'B', text: '문제를 해결하기 위해 모델이 생각(추론)에 들이는 연산량 및 시간', correct: true },
      { id: 'C', text: '답변의 글자 수', correct: false },
      { id: 'D', text: '검색할 웹사이트의 개수', correct: false }
    ]
  },
  // p1q16 - defining (Claude)
  {
    id: 'p1q16',
    type: 'mcq',
    competency: 'defining',
    text: 'Claude 모델에서 복잡한 프롬프트를 구조화할 때 가장 권장되는 형식은?',
    keyTerms: ['Claude', 'XML'],
    options: [
      { id: 'A', text: 'JSON 포맷', correct: false },
      { id: 'B', text: '마크다운(Markdown)', correct: false },
      { id: 'C', text: 'XML 태그 (예: <context>, <instruction>)', correct: true },
      { id: 'D', text: '일반 줄글', correct: false }
    ]
  },
  // p1q17 - defining
  {
    id: 'p1q17',
    type: 'mcq',
    competency: 'defining',
    text: 'Claude의 \'Prefilling(사전 채우기)\' 기능이란?',
    keyTerms: ['Prefilling', '형식유도'],
    options: [
      { id: 'A', text: '사용자의 질문을 미리 예측하는 기능', correct: false },
      { id: 'B', text: 'AI의 답변 시작 부분을 사용자가 미리 작성해두어 출력 형식을 강제하는 기능', correct: true },
      { id: 'C', text: '프롬프트를 자동으로 요약해주는 기능', correct: false },
      { id: 'D', text: '이전 대화 내용을 삭제하는 기능', correct: false }
    ]
  },
  // p1q18 - refining (Claude 거절)
  {
    id: 'p1q18',
    type: 'mcq',
    competency: 'refining',
    text: 'Claude가 불확실한 질문에 대해 거짓 정보를 지어내는 대신 주로 취하는 태도는?',
    keyTerms: ['Claude', '거절', '안전'],
    options: [
      { id: 'A', text: '무조건 아는 척하며 답변한다.', correct: false },
      { id: 'B', text: '답변을 거절(Refusal)하거나 모른다고 답하는 비율이 높다.', correct: true },
      { id: 'C', text: '질문을 사용자에게 되묻는다.', correct: false },
      { id: 'D', text: '검색 결과를 그대로 복사한다.', correct: false }
    ]
  },
  // p1q19 - defining
  {
    id: 'p1q19',
    type: 'mcq',
    competency: 'defining',
    text: 'Claude 프롬프트에서 \'<thinking>\' 태그의 주된 용도는?',
    keyTerms: ['Thinking', 'CoT'],
    options: [
      { id: 'A', text: '모델이 답변을 출력하기 전에 내부적으로 추론 과정을 거치도록 유도한다.', correct: true },
      { id: 'B', text: '사용자의 생각을 입력하는 곳이다.', correct: false },
      { id: 'C', text: '최종 답변을 강조하는 곳이다.', correct: false },
      { id: 'D', text: 'XML 태그 오류를 수정하는 기능이다.', correct: false }
    ]
  },
  // p1q20 - defining
  {
    id: 'p1q20',
    type: 'mcq',
    competency: 'defining',
    text: 'Claude 모델이 코딩이나 긴 작문 작업에 특히 강점을 보이는 이유는?',
    keyTerms: ['Claude', '작문', '코딩'],
    options: [
      { id: 'A', text: '가장 빠른 응답 속도 때문', correct: false },
      { id: 'B', text: 'XML 구조 이해 능력과 긴 문맥 유지 능력, 그리고 Artifacts 기능', correct: true },
      { id: 'C', text: '이미지 생성 기능 때문', correct: false },
      { id: 'D', text: '음성 인식 기능 때문', correct: false }
    ]
  },
  // p1q21 - defining (Gemini)
  {
    id: 'p1q21',
    type: 'mcq',
    competency: 'defining',
    text: 'Google Gemini 모델의 가장 큰 차별점인 \'Context Window\'의 특징은?',
    keyTerms: ['Gemini', 'Context Window'],
    options: [
      { id: 'A', text: '매우 짧은 대화만 기억한다.', correct: false },
      { id: 'B', text: '100만 토큰 이상의 방대한 정보(책, 영상 등)를 한 번에 처리할 수 있다.', correct: true },
      { id: 'C', text: '오직 텍스트만 처리할 수 있다.', correct: false },
      { id: 'D', text: '컨텍스트 윈도우가 없다.', correct: false }
    ]
  },
  // p1q22 - defining
  {
    id: 'p1q22',
    type: 'mcq',
    competency: 'defining',
    text: 'Gemini 모델 사용 시 Google이 강력하게 권장하는 프롬프팅 요소는?',
    keyTerms: ['Gemini', 'Few-shot'],
    options: [
      { id: 'A', text: 'Zero-shot(예시 없음)', correct: false },
      { id: 'B', text: 'Few-shot(예시 포함)', correct: true },
      { id: 'C', text: 'Single-shot(한 번만 질문)', correct: false },
      { id: 'D', text: 'No-instruction(지시 없음)', correct: false }
    ]
  },
  // p1q23 - refining (Grounding)
  {
    id: 'p1q23',
    type: 'mcq',
    competency: 'refining',
    text: 'Gemini의 \'Grounding(그라운딩)\' 기능의 역할은?',
    keyTerms: ['Grounding', 'Google Search'],
    options: [
      { id: 'A', text: '모델을 클라우드 서버에 고정시킨다.', correct: false },
      { id: 'B', text: '답변을 Google 검색 결과(실시간 정보)와 연결하여 사실성을 검증한다.', correct: true },
      { id: 'C', text: '모델의 윤리적 기준을 낮춘다.', correct: false },
      { id: 'D', text: '이미지 해상도를 높인다.', correct: false }
    ]
  },
  // p1q24 - defining (멀티모달)
  {
    id: 'p1q24',
    type: 'mcq',
    competency: 'defining',
    text: 'Gemini Pro 모델로 1시간 분량의 영상을 분석하려 할 때 가장 효율적인 방법은?',
    keyTerms: ['Gemini', 'Multimodal'],
    options: [
      { id: 'A', text: '영상 내용을 사람이 모두 받아적어서 텍스트로 입력한다.', correct: false },
      { id: 'B', text: '영상을 1분 단위로 잘라서 60번 질문한다.', correct: false },
      { id: 'C', text: '영상 파일을 직접 업로드하고 한 번에 분석을 요청한다(멀티모달).', correct: true },
      { id: 'D', text: '영상의 썸네일만 보여준다.', correct: false }
    ]
  },
  // p1q25 - defining
  {
    id: 'p1q25',
    type: 'mcq',
    competency: 'defining',
    text: 'Gemini에서 긴 컨텍스트를 사용할 때, 지시사항(Instruction)의 위치로 가장 권장되는 곳은?',
    keyTerms: ['Gemini', '지시위치'],
    options: [
      { id: 'A', text: '문서의 중간', correct: false },
      { id: 'B', text: '방대한 데이터(컨텍스트)의 다음, 즉 프롬프트의 맨 끝', correct: true },
      { id: 'C', text: '무조건 맨 처음', correct: false },
      { id: 'D', text: '어디든 상관없다.', correct: false }
    ]
  },
  // p1q26 - defining (RAG)
  {
    id: 'p1q26',
    type: 'mcq',
    competency: 'defining',
    text: 'RAG(검색 증강 생성) 기술을 사용하는 주된 이유는?',
    keyTerms: ['RAG', '최신성', '정확성'],
    options: [
      { id: 'A', text: 'LLM의 학습 데이터에 없는 최신 정보나 내부 데이터를 활용해 답변하기 위해', correct: true },
      { id: 'B', text: '모델의 학습 속도를 높이기 위해', correct: false },
      { id: 'C', text: '프롬프트를 짧게 쓰기 위해', correct: false },
      { id: 'D', text: '음성 인식을 하기 위해', correct: false }
    ]
  },
  // p1q27 - defining (CoT)
  {
    id: 'p1q27',
    type: 'mcq',
    competency: 'defining',
    text: 'CoT(Chain of Thought) 프롬프팅의 핵심 개념은?',
    keyTerms: ['CoT', '단계별생각'],
    options: [
      { id: 'A', text: '답변을 빠르게 생성하는 것', correct: false },
      { id: 'B', text: '문제를 해결하는 중간 추론 과정을 단계별로 생성하도록 유도하는 것', correct: true },
      { id: 'C', text: '생각을 멈추게 하는 것', correct: false },
      { id: 'D', text: '여러 모델을 체인처럼 연결하는 것', correct: false }
    ]
  },
  // p1q28 - refining (반복적 개선)
  {
    id: 'p1q28',
    type: 'mcq',
    competency: 'refining',
    text: '프롬프트 엔지니어링에서 \'Iterative Refinement(반복적 개선)\'가 필요한 이유는?',
    keyTerms: ['반복', '개선'],
    options: [
      { id: 'A', text: 'AI는 처음에 항상 틀린 답을 내놓기 때문이다.', correct: false },
      { id: 'B', text: '한 번의 프롬프트로 완벽한 결과를 얻기 어렵기 때문에, 결과를 보고 조건을 수정하며 최적화해야 한다.', correct: true },
      { id: 'C', text: '반복할수록 요금이 할인되기 때문이다.', correct: false },
      { id: 'D', text: 'AI와의 친밀도를 높이기 위해서이다.', correct: false }
    ]
  },
  // p1q29 - defining
  {
    id: 'p1q29',
    type: 'mcq',
    competency: 'defining',
    text: '\'Zero-shot\' 프롬프팅이란?',
    keyTerms: ['Zero-shot', '예시없음'],
    options: [
      { id: 'A', text: '예시를 전혀 제공하지 않고 바로 질문하는 방식', correct: true },
      { id: 'B', text: '0개의 단어로 질문하는 방식', correct: false },
      { id: 'C', text: '예시를 0개에서 100개까지 늘려가는 방식', correct: false },
      { id: 'D', text: '질문을 하지 않는 방식', correct: false }
    ]
  },
  // p1q30 - defining (멀티모달)
  {
    id: 'p1q30',
    type: 'mcq',
    competency: 'defining',
    text: '최근 LLM 트렌드에서 \'멀티모달(Multimodal)\' 능력의 의미는?',
    keyTerms: ['멀티모달', '이미지', '음성'],
    options: [
      { id: 'A', text: '여러 언어(영어, 한국어 등)를 구사하는 능력', correct: false },
      { id: 'B', text: '텍스트뿐만 아니라 이미지, 오디오, 비디오 등 다양한 형태의 데이터를 이해하고 생성하는 능력', correct: true },
      { id: 'C', text: '여러 개의 CPU를 동시에 사용하는 능력', correct: false },
      { id: 'D', text: '여러 명의 사용자와 동시에 대화하는 능력', correct: false }
    ]
  }
];

// Part 2 문항 (20문항) - 전체 CSV 데이터 기반
// competency: 'prompting' (프롬프트 구성), 'integrating' (통합/검토)
const originalPart2Questions: Part2Question[] = [
  // p2q1 - ordering (기본 프롬프트 구성)
  {
    id: 'p2q1',
    type: 'ordering',
    competency: 'prompting',
    instruction: '기본적인 프롬프트 구성 요소를 논리적인 순서로 배열하시오.',
    steps: [
      { id: '1', text: '당신은 전문 마케터입니다.', category: 'Persona', correctOrder: 1 },
      { id: '2', text: '아래 제품 사양 데이터를 바탕으로...', category: 'Context', correctOrder: 2 },
      { id: '3', text: '블로그 홍보 게시글을 작성하세요.', category: 'Task', correctOrder: 3 },
      { id: '4', text: '이모지를 포함하여 친근한 톤으로 작성해 주세요.', category: 'Constraint', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q2 - ordering (CoT 추론)
  {
    id: 'p2q2',
    type: 'ordering',
    competency: 'prompting',
    instruction: 'Chain of Thought(CoT) 추론 과정을 올바르게 배열하시오.',
    steps: [
      { id: '1', text: '질문: 3개의 사과가 있는데 2개를 더 사고 1개를 먹었다. 몇 개 남았나?', category: 'Input', correctOrder: 1 },
      { id: '2', text: '생각: 처음에 3개가 있었다.', category: 'Step1', correctOrder: 2 },
      { id: '3', text: '생각: 2개를 더 사서 3+2=5개가 되었다.', category: 'Step2', correctOrder: 3 },
      { id: '4', text: '생각: 1개를 먹어서 5-1=4개가 되었다.', category: 'Step3', correctOrder: 4 },
      { id: '5', text: '답변: 정답은 4개입니다.', category: 'Answer', correctOrder: 5 }
    ],
    correctOrder: ['1', '2', '3', '4', '5']
  },
  // p2q3 - ordering (Claude XML)
  {
    id: 'p2q3',
    type: 'ordering',
    competency: 'prompting',
    instruction: 'Claude 모델에게 문서를 요약시키는 프롬프트 순서를 배열하시오.',
    steps: [
      { id: '1', text: '<role>문서 요약 전문가</role>', category: 'Role', correctOrder: 1 },
      { id: '2', text: '<documents>...(문서 내용)...</documents>', category: 'Data', correctOrder: 2 },
      { id: '3', text: '<instruction>위 문서를 3줄로 요약해.</instruction>', category: 'Task', correctOrder: 3 },
      { id: '4', text: '<format>불릿 포인트 형식</format>', category: 'Format', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q4 - ordering (RAG)
  {
    id: 'p2q4',
    type: 'ordering',
    competency: 'integrating',
    instruction: 'RAG(검색 증강 생성) 기반 답변 생성 과정을 순서대로 배열하시오.',
    steps: [
      { id: '1', text: '사용자 질문 입력', category: 'Input', correctOrder: 1 },
      { id: '2', text: '관련 문서 검색(Retrieval)', category: 'Search', correctOrder: 2 },
      { id: '3', text: '검색된 문서와 질문을 프롬프트에 결합', category: 'Augment', correctOrder: 3 },
      { id: '4', text: 'LLM이 최종 답변 생성', category: 'Generation', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q5 - ordering (반복 개선)
  {
    id: 'p2q5',
    type: 'ordering',
    competency: 'integrating',
    instruction: '프롬프트를 개선해 나가는 과정을 순서대로 배열하시오.',
    steps: [
      { id: '1', text: '초안 프롬프트 작성 및 실행', category: 'Draft', correctOrder: 1 },
      { id: '2', text: '결과물 확인 및 문제점 분석(너무 김, 부정확함 등)', category: 'Eval', correctOrder: 2 },
      { id: '3', text: '제약 조건 추가 및 구체화하여 프롬프트 수정', category: 'Refine', correctOrder: 3 },
      { id: '4', text: '수정된 프롬프트 재실행 및 최종 확인', category: 'Final', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q6 - rewrite
  {
    id: 'p2q6',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '다음의 모호한 프롬프트를 구체적인 지시가 포함된 프롬프트로 수정하시오.',
    originalPrompt: '보고서 써줘.',
    requirements: ['주제: 2024년 AI 트렌드', '분량: A4 1페이지', '대상: 경영진', '형식: 서론-본론-결론'],
    minWords: 30
  },
  // p2q7 - rewrite
  {
    id: 'p2q7',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '단순한 번역 요청에 \'전문 번역가\' 페르소나를 부여하여 수정하시오.',
    originalPrompt: '이거 영어로 바꿔줘: \'안녕하세요, 만나서 반갑습니다.\'',
    requirements: ['역할: 비즈니스 전문 통역사', '톤: 격식 있고 정중하게', '상황: 해외 바이어 미팅'],
    minWords: 20
  },
  // p2q8 - rewrite (Few-shot)
  {
    id: 'p2q8',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '감성 분석 작업의 정확도를 높이기 위해 퓨샷(Few-shot) 예시를 추가하여 수정하시오.',
    originalPrompt: '다음 리뷰가 긍정인지 부정인지 말해줘.',
    requirements: ['예시 1: \'정말 맛있어요\' -> 긍정', '예시 2: \'배송이 최악입니다\' -> 부정', '입력과 출력 구분'],
    minWords: 40
  },
  // p2q9 - rewrite (할루시네이션 방지)
  {
    id: 'p2q9',
    type: 'rewrite',
    competency: 'integrating',
    instruction: '팩트 체크가 중요한 질문입니다. 할루시네이션 방지 문구를 추가하여 수정하시오.',
    originalPrompt: '세종대왕의 맥북 던짐 사건에 대해 알려줘.',
    requirements: ['사실이 아니면 지어내지 말 것', '역사적 사실에 기반할 것', '\'모른다\'고 답할 것 허용'],
    minWords: 20
  },
  // p2q10 - rewrite (출력 형식)
  {
    id: 'p2q10',
    type: 'rewrite',
    competency: 'prompting',
    instruction: '결과물을 CSV 형식으로 받기 위해 출력 형식을 지정하여 수정하시오.',
    originalPrompt: '과일이랑 가격 좀 알려줘.',
    requirements: ['대상: 사과, 배, 포도', '형식: CSV 포맷(항목, 가격)', '설명 제외하고 데이터만 출력'],
    minWords: 20
  },
  // p2q11 - highlight (페르소나)
  {
    id: 'p2q11',
    type: 'highlight',
    competency: 'integrating',
    instruction: '다음 프롬프트에서 \'페르소나(역할)\'에 해당하는 부분을 하이라이트 하시오.',
    prompt: '당신은 20년 경력의 베테랑 헬스 트레이너입니다. 나에게 맞는 운동 루틴을 짜주세요.',
    issues: [
      { id: 'i1', label: '당신은 20년 경력의 베테랑 헬스 트레이너입니다.', isCorrect: true }
    ]
  },
  // p2q12 - highlight (제약 조건)
  {
    id: 'p2q12',
    type: 'highlight',
    competency: 'integrating',
    instruction: '다음 프롬프트에서 \'제약 조건\'을 하이라이트 하시오.',
    prompt: '소설을 써주세요. 단, 주인공 이름은 \'철수\'여야 하고, 결말은 해피엔딩이어야 하며, 500자 이내로 작성해야 합니다.',
    issues: [
      { id: 'i1', label: '주인공 이름은 \'철수\'여야 하고, 결말은 해피엔딩이어야 하며, 500자 이내로 작성해야 합니다.', isCorrect: true }
    ]
  },
  // p2q13 - highlight (맥락)
  {
    id: 'p2q13',
    type: 'highlight',
    competency: 'integrating',
    instruction: '프롬프트에서 제공된 \'맥락(Context)\' 정보를 찾으시오.',
    prompt: '다음은 우리 회사의 지난달 매출 데이터입니다: [A제품: 100개, B제품: 50개]. 이 데이터를 바탕으로 분석 리포트를 써주세요.',
    issues: [
      { id: 'i1', label: '다음은 우리 회사의 지난달 매출 데이터입니다: [A제품: 100개, B제품: 50개].', isCorrect: true }
    ]
  },
  // p2q14 - highlight (출력 형식)
  {
    id: 'p2q14',
    type: 'highlight',
    competency: 'integrating',
    instruction: '출력 형식을 지정하는 문장을 찾으시오.',
    prompt: '세계 10대 도시를 추천해줘. 결과는 반드시 Markdown 표 형식으로 작성하고, 인구수 컬럼을 포함해줘.',
    issues: [
      { id: 'i1', label: '결과는 반드시 Markdown 표 형식으로 작성하고, 인구수 컬럼을 포함해줘.', isCorrect: true }
    ]
  },
  // p2q15 - highlight (할루시네이션 유발)
  {
    id: 'p2q15',
    type: 'highlight',
    competency: 'integrating',
    instruction: '다음 프롬프트에서 할루시네이션(거짓 정보 생성)을 유발할 수 있는 \'유도신문\' 부분을 찾으시오.',
    prompt: '2025년에 한국이 월드컵에서 우승했을 때의 상황을 기사로 써줘.',
    issues: [
      { id: 'i1', label: '2025년에 한국이 월드컵에서 우승했을 때의 상황', isCorrect: true }
    ]
  },
  // p2q16 - dragdrop (용어 매칭)
  {
    id: 'p2q16',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: '용어와 그 정의를 올바르게 연결하시오.',
    blocks: [
      { id: '1', text: 'Few-shot', category: '용어', correctOrder: 1 },
      { id: '2', text: 'Zero-shot', category: '용어', correctOrder: 2 },
      { id: '3', text: 'Persona', category: '용어', correctOrder: 3 },
      { id: '4', text: 'Temperature', category: '용어', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q17 - dragdrop (모델 특징)
  {
    id: 'p2q17',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: '각 LLM 모델과 대표적인 특징을 연결하시오.',
    blocks: [
      { id: '1', text: 'Gemini', category: '모델', correctOrder: 1 },
      { id: '2', text: 'Claude', category: '모델', correctOrder: 2 },
      { id: '3', text: 'ChatGPT(o1)', category: '모델', correctOrder: 3 },
      { id: '4', text: 'GPT-4', category: '모델', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q18 - dragdrop (구성 요소)
  {
    id: 'p2q18',
    type: 'dragdrop',
    competency: 'prompting',
    instruction: '프롬프트 구성 요소와 그 역할을 연결하시오.',
    blocks: [
      { id: '1', text: 'Instruction', category: '요소', correctOrder: 1 },
      { id: '2', text: 'Context', category: '요소', correctOrder: 2 },
      { id: '3', text: 'Output Indicator', category: '요소', correctOrder: 3 },
      { id: '4', text: 'Constraint', category: '요소', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q19 - dragdrop (좋은/나쁜 습관)
  {
    id: 'p2q19',
    type: 'dragdrop',
    competency: 'integrating',
    instruction: '프롬프팅 습관을 \'좋음\'과 \'나쁨\'으로 분류하시오.',
    blocks: [
      { id: '1', text: '구체적 지시', category: '습관', correctOrder: 1 },
      { id: '2', text: '모호한 표현', category: '습관', correctOrder: 2 },
      { id: '3', text: '반복적 개선', category: '습관', correctOrder: 3 },
      { id: '4', text: '검증 없이 사용', category: '습관', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  },
  // p2q20 - dragdrop (작업-형식 매칭)
  {
    id: 'p2q20',
    type: 'dragdrop',
    competency: 'integrating',
    instruction: '작업 유형에 적합한 출력 형식을 연결하시오.',
    blocks: [
      { id: '1', text: '데이터 정리', category: '작업', correctOrder: 1 },
      { id: '2', text: '코드 작성', category: '작업', correctOrder: 2 },
      { id: '3', text: '요약 보고', category: '작업', correctOrder: 3 },
      { id: '4', text: '이야기 창작', category: '작업', correctOrder: 4 }
    ],
    correctOrder: ['1', '2', '3', '4']
  }
];

// ============================================
// 통합 문항 배열 (기존 + 새 문항)
// ============================================
// 새 문항을 기존 문항과 병합 (새 문항 우선, 중복 ID 제거)
export const part1Questions: Part1Question[] = [
  ...newPart1Questions,
  ...originalPart1Questions,
];

export const part2Questions: Part2Question[] = [
  ...newPart2Questions,
  ...originalPart2Questions,
];

// Part 3 직무 시나리오 (IT + 마케팅 등 통합)
export const part3TasksAll = [
  ...part3TasksIT
];

// Part 3 루브릭
export const part3Rubric = {
  ...part3RubricIT
};

// 직군 정의
export const roleDefinitions = [
  { roleId: 'pmkt', label: '퍼포먼스 마케팅', description: '광고 캠페인 운영, 성과 분석' },
  { roleId: 'brand', label: 'SNS/브랜드 마케팅', description: '브랜드 콘텐츠, 소셜미디어 운영' },
  { roleId: 'hr', label: 'HR(인사/노무)', description: '채용, 인사관리, 노무' },
  { roleId: 'qa', label: 'QA(소프트웨어)', description: '품질보증, 테스트' },
  { roleId: 'biz', label: '사업기획/전략', description: '사업계획, 전략 수립' },
  { roleId: 'fin', label: '재무/회계', description: '예산, 결산, 재무분석' },
  { roleId: 'ops', label: '운영/PMO', description: '프로젝트 관리, 운영' },
  { roleId: 'adm', label: '구매/총무/계약', description: '구매, 계약, 총무' },
  { roleId: 'crm-se', label: 'CRM 소프트웨어 엔지니어', description: 'CRM 시스템 개발' },
  { roleId: 'auto-dm', label: 'Automotive DM', description: '자동차 디지털 마케팅' },
  { roleId: 'game-client', label: '게임 클라이언트 프로그래머', description: '게임 클라이언트 개발' },
  { roleId: 'sec-res', label: '보안 연구원', description: '보안 연구, 취약점 분석' },
  { roleId: 'sf-dev', label: '세일즈포스 개발자', description: 'Salesforce 개발' },
  { roleId: 'game-lead', label: '게임 리드/대표', description: '게임 프로젝트 리드' }
];
