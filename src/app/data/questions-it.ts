// ================================
// Part 3) IT/Software/Internet Tasks
// ================================
export const part3TasksIT = [
  // 1) CRM MarTech Software Engineer (CRME-01)
  {
    id: "p3t25",
    role: "crm-se",
    scenario: "crm-se",
    scenarioTitle: "CRM 마테크 소프트웨어 엔지니어",
    scenarioDesc:
      "당신은 CRM 마케팅 실행 플랫폼(실시간 행동 분석·개인화 메시지 자동 발송)의 소프트웨어 엔지니어다. 핵심 기능 기획·구조 설계·UX 검토·개발, iOS/Android/JavaScript SDK 개발·유지보수, 메시징 인프라 안정성 점검 및 장애 원인 분석을 담당한다.",
    context: [
      "제품 사고: 마케터 관점 UX·워크플로우 최적화",
      "아키텍처: 프론트·백·SDK 경계 및 데이터 흐름",
      "관측가능성: 로그·메트릭·타임라인 기반 문제해결",
      "우선순위: 짧은 일정에서 스코프 쪼개기·반복 검증",
      "안정성/성능: 트래픽·병목·장애 대응"
    ],
    taskType: "execute",
    title: "문항 1) 설계 — 마케터용 캠페인 설정 화면/도메인 구조 설계",
    instruction:
      "마케터가 '복잡한 설정 없이' 캠페인을 만들게 하면서도, 고급 기능(세그먼트·트리거·스케줄·채널)을 확장 가능하게 설계하려면 화면/도메인 구조를 어떻게 나누시겠습니까? (기본 설정 vs 고급 설정 분리 포함)",
    requirements: [
      "사용자 여정/업무 흐름 기준 정보 구조(IA) 제안",
      "기본/고급 설정의 점진적 공개(progressive disclosure)",
      "모델(캠페인/오디언스/이벤트/채널) 경계 정의",
      "확장(새 채널/새 규칙) 시 변경 범위 최소화"
    ],
    aiMessagesLimit: 0,
    minLines: 25
  },
  {
    id: "p3t26",
    role: "crm-se",
    scenario: "crm-se",
    scenarioTitle: "CRM 마테크 소프트웨어 엔지니어",
    scenarioDesc:
      "메시징 발송 시스템에서 지연이 발생했다. 원인을 빠르게 찾아 완화 조치를 취하고 재발을 방지해야 한다.",
    context: [
      "증상: 발송 지연 (어느 채널/고객/시간대)",
      "가설: 큐 적체, 외부 API, DB 락, 배포 영향, rate limit 등",
      "관측지표: 큐 길이, 처리율, p95/p99, 에러율, 리트라이, 타임아웃",
      "완화: 우회, 레이트 제한, 기능 플래그, 롤백"
    ],
    taskType: "execute",
    title: "문항 2) 문제해결 — 메시징 발송 지연 원인 진단 및 완화",
    instruction:
      "메시징 발송 지연이 발생했습니다. '원인 후보를 빠르게 나열→논리적 가설부터 검증' 방식으로, 어떤 데이터(로그/메트릭/트레이스)를 어떤 순서로 확인하고 원인을 좁히겠습니까?",
    requirements: [
      "증상 정의(언제부터/어느 채널/어느 고객/지연 분포)",
      "가설 트리(큐 적체, 외부 API, DB 락, 배포 영향, rate limit 등)",
      "관측지표(큐 길이, 처리율, p95/p99, 에러율, 리트라이, 타임아웃)",
      "완화 조치(우회, 레이트 제한, 기능 플래그, 롤백)와 재발 방지"
    ],
    aiMessagesLimit: 0,
    minLines: 25
  },
  {
    id: "p3t27",
    role: "crm-se",
    scenario: "crm-se",
    scenarioTitle: "CRM 마테크 소프트웨어 엔지니어",
    scenarioDesc:
      "iOS/Android/JavaScript SDK를 동시에 운영하며, 버전 호환성과 API 설계 원칙을 유지해야 한다.",
    context: [
      "Semantic versioning 또는 유사 정책",
      "호환성 층(어댑터/폴리필) 전략",
      "API 안정성(필드 추가/삭제/기본값) 설계",
      "릴리즈 노트/마이그레이션 가이드/샘플 코드"
    ],
    taskType: "execute",
    title: "문항 3) SDK/플랫폼 — 멀티 플랫폼 SDK 버저닝 및 API 설계 원칙",
    instruction:
      "iOS/Android/JavaScript SDK를 동시에 운영할 때, 버저닝(호환성)과 API 설계 원칙을 어떻게 가져가시겠습니까? (Breaking change, Deprecation, 마이그레이션 포함)",
    requirements: [
      "Semantic versioning 또는 유사 정책",
      "호환성 층(어댑터/폴리필) 전략",
      "API 안정성(필드 추가/삭제/기본값) 설계",
      "릴리즈 노트/마이그레이션 가이드/샘플 코드"
    ],
    aiMessagesLimit: 0,
    minLines: 22
  },

  // 2) Automotive Delivery Manager (ADM-01)
  {
    id: "p3t28",
    role: "auto-dm",
    scenario: "auto-dm",
    scenarioTitle: "Automotive Delivery Manager",
    scenarioDesc:
      "당신은 한국 고객사-베트남 개발팀 협업으로 자동차 SW(ADAS/AUTOSAR/IVI) 프로젝트를 관리한다. 요구사항 분석/변경 통제/리스크 관리, 일정 준수 및 품질 보증, 다문화·언어·시간대 차이 극복 커뮤니케이션, 안전/표준(ISO 26262 등) 고려가 필요하다.",
    context: [
      "요구사항/변경 관리",
      "품질·안전 기준 기반 딜리버리",
      "리스크·이슈 트라이애지 및 해결",
      "글로벌 커뮤니케이션(브릿지 역할)",
      "프로세스/회고 기반 개선"
    ],
    taskType: "execute",
    title: "문항 1) 요구사항/변경통제 — IVI 기능 변경 요청 처리 절차",
    instruction:
      "한국 고객사가 IVI 기능 변경을 요청했는데, 일정·안전·품질 영향이 큽니다. 변경 요청을 접수한 뒤 '분석→합의→반영'까지 어떤 절차와 산출물을 운영하시겠습니까?",
    requirements: [
      "CR(Change Request) 흐름, 영향 분석(범위/테스트/안전)",
      "우선순위/트레이드오프(일정 vs 품질) 협상",
      "승인 게이트/변경 로그/릴리즈 플랜",
      "테스트 전략 회귀/통합"
    ],
    aiMessagesLimit: 0,
    minLines: 25
  },
  {
    id: "p3t29",
    role: "auto-dm",
    scenario: "auto-dm",
    scenarioTitle: "Automotive Delivery Manager",
    scenarioDesc:
      "언어·시간대 차이로 이슈 대응이 지연된다. 프로젝트 리스크를 상시로 낮추기 위한 커뮤니케이션 운영 규칙이 필요하다.",
    context: [
      "비동기 문서 중심(요구사항/결정/액션 아이템)",
      "핸드오프 템플릿(현황/차단요인/다음 액션)",
      "에스컬레이션 룰/응답 SLA",
      "공통 용어/정의(DoD, Severity 등)"
    ],
    taskType: "execute",
    title: "문항 2) 리스크관리 — 글로벌 협업 커뮤니케이션 운영 규칙 설계",
    instruction:
      "언어·시간대 차이로 이슈 대응이 지연됩니다. 프로젝트 리스크를 상시로 낮추기 위한 커뮤니케이션 운영(회의/문서/핸드오프) 규칙을 설계해 주세요.",
    requirements: [
      "비동기 문서 중심(요구사항/결정/액션 아이템)",
      "핸드오프 템플릿(현황/차단요인/다음 액션)",
      "에스컬레이션 룰/응답 SLA",
      "공통 용어/정의(DoD, Severity 등)"
    ],
    aiMessagesLimit: 0,
    minLines: 22
  },
  {
    id: "p3t30",
    role: "auto-dm",
    scenario: "auto-dm",
    scenarioTitle: "Automotive Delivery Manager",
    scenarioDesc:
      "자동차 SW에서 '안전'이 핵심일 때, 딜리버리 관점에서 품질을 정의하고 보장해야 한다.",
    context: [
      "품질 정의(결함 밀도, 회귀 실패율, 성능/실시간성, 안정성)",
      "안전 관련 체크(표준 준수, 리뷰/검증, 테스트 증빙)",
      "릴리즈 게이트(코드리뷰, 정적분석, HIL/SIL, 통합테스트)"
    ],
    taskType: "execute",
    title: "문항 3) 품질/안전 — 자동차 SW 품질 정의 및 릴리즈 게이트 설계",
    instruction:
      "자동차 SW에서 '안전'이 핵심일 때, 딜리버리 관점에서 품질을 어떻게 정의하고(지표), 어떤 게이트로 보장하시겠습니까?",
    requirements: [
      "품질 정의(결함 밀도, 회귀 실패율, 성능/실시간성, 안정성)",
      "안전 관련 체크(표준 준수, 리뷰/검증, 테스트 증빙)",
      "릴리즈 게이트(코드리뷰, 정적분석, HIL/SIL, 통합테스트)"
    ],
    aiMessagesLimit: 0,
    minLines: 23
  },

  // 3) Game Client Programmer (GC-01)
  {
    id: "p3t31",
    role: "game-client",
    scenario: "game-client",
    scenarioTitle: "게임 클라이언트 프로그래머",
    scenarioDesc:
      "당신은 신작 UI 개발, 기존 UI 분석 후 동일 기능 구현 및 UX 개선, 클라이언트-서버 보안 고려, 코드 리뷰를 담당하는 게임 클라이언트 프로그래머다.",
    context: [
      "UI 아키텍처/상태관리",
      "보안 사고방식(신뢰 경계, 서버 검증)",
      "성능/최적화(프레임/메모리)",
      "디버깅/이슈 분석",
      "협업 역량(코드리뷰·설명 능력)"
    ],
    taskType: "execute",
    title: "문항 1) 보안/설계 — 클라이언트 해킹 방지 '신뢰 경계' 설계",
    instruction:
      "게임에서 클라이언트 해킹을 줄이기 위한 '신뢰 경계' 원칙을 설명하고, 예시(재화/인벤/쿨타임 등) 1개를 골라 설계를 제시해 주세요.",
    requirements: [
      "클라이언트는 신뢰하지 않는다(서버 권위)",
      "검증 포인트(서버에서 규칙/상태 검증)",
      "리플레이/서명/난독화 등 보조 수단의 한계 인지",
      "부정행위 탐지(로그/이상치)"
    ],
    aiMessagesLimit: 0,
    minLines: 23
  },
  {
    id: "p3t32",
    role: "game-client",
    scenario: "game-client",
    scenarioTitle: "게임 클라이언트 프로그래머",
    scenarioDesc:
      "복잡한 UI(여러 패널/팝업/상태 전이)가 있는 게임에서 상태관리/이벤트 흐름을 설계해야 한다.",
    context: [
      "UI 상태 모델(상태 머신 등)",
      "데이터 바인딩/이벤트 버스 남용 방지",
      "모듈 경계/의존성 관리",
      "테스트/디버깅 전략"
    ],
    taskType: "execute",
    title: "문항 2) UI 아키텍처 — 복잡한 게임 UI 상태관리 설계",
    instruction:
      "복잡한 UI(여러 패널/팝업/상태 전이)가 있는 게임에서 상태관리/이벤트 흐름을 어떻게 설계하시겠습니까? (테스트 용이성 포함)",
    requirements: [
      "UI 상태 모델(상태 머신 등)",
      "데이터 바인딩/이벤트 버스 남용 방지",
      "모듈 경계/의존성 관리",
      "테스트/디버깅 전략"
    ],
    aiMessagesLimit: 0,
    minLines: 22
  },
  {
    id: "p3t33",
    role: "game-client",
    scenario: "game-client",
    scenarioTitle: "게임 클라이언트 프로그래머",
    scenarioDesc:
      "'재현이 어려운 UI 버그'가 발생했을 때, 재현 조건을 수집하고 원인을 좁혀야 한다.",
    context: [
      "재현 조건 수집(기기/프레임/입력/네트워크)",
      "로그/이벤트 타임라인, 최소 재현 케이스",
      "가설-검증 루프",
      "회귀 방지(테스트/가드)"
    ],
    taskType: "execute",
    title: "문항 3) 디버깅 — 재현 어려운 UI 버그 원인 진단 절차",
    instruction:
      "'재현이 어려운 UI 버그'가 발생했을 때, 재현 조건을 수집하고 원인을 좁히는 절차를 단계별로 말해 주세요.",
    requirements: [
      "재현 조건 수집(기기/프레임/입력/네트워크)",
      "로그/이벤트 타임라인, 최소 재현 케이스",
      "가설-검증 루프",
      "회귀 방지(테스트/가드)"
    ],
    aiMessagesLimit: 0,
    minLines: 20
  },

  // 4) Security Researcher (SR-01)
  {
    id: "p3t34",
    role: "sec-res",
    scenario: "sec-res",
    scenarioTitle: "보안 연구원/화이트해커",
    scenarioDesc:
      "당신은 웹/모바일/클라우드/IoT 취약점 연구, 랜섬웨어 대응센터 운영, 동향 보고서·가이드 발간, 모의해킹 교육(LMS) 운영을 담당하는 보안 연구원이다.",
    context: [
      "취약점 리서치 방법론(재현/영향/완화)",
      "악성코드·랜섬웨어 분석 사고방식",
      "커뮤니케이션(리포트/가이드/교육)",
      "윤리·책임(합법·범위·공개 정책)",
      "트렌드 학습/지속적 연구"
    ],
    taskType: "execute",
    title: "문항 1) 취약점 리서치 — 신규 취약점 표준 리포트 구조",
    instruction:
      "새로운 IoT/클라우드 취약점을 발견했다고 가정합니다. '재현→영향 분석→제보/공개→완화 가이드'까지의 표준 리포트 구조와 필요한 증빙을 제시해 주세요.",
    requirements: [
      "재현 절차(환경, PoC, 전제조건)",
      "영향(CVSS/권한/데이터/범위), 공격 시나리오",
      "책임 있는 공개(벤더 커뮤니케이션, 타임라인)",
      "완화/탐지 가이드(설정, 패치, 모니터링)"
    ],
    aiMessagesLimit: 0,
    minLines: 25
  },
  {
    id: "p3t35",
    role: "sec-res",
    scenario: "sec-res",
    scenarioTitle: "보안 연구원/화이트해커",
    scenarioDesc:
      "랜섬웨어 샘플 분석을 통해 IOC를 도출하고 탐지/대응 권고를 제공해야 한다.",
    context: [
      "격리/안전한 분석 환경",
      "정적/동적 분석, C2/암호화/지속성 파악",
      "IOC(해시/도메인/레지스트리/프로세스) 도출",
      "탐지 룰(예: YARA/Sigma) 및 대응 권고"
    ],
    taskType: "execute",
    title: "문항 2) 랜섬웨어 분석 — 샘플 분석 플로우 및 IOC 도출",
    instruction:
      "랜섬웨어 샘플이 들어왔습니다. 초기 triage부터 행위 분석, IOC 도출, 탐지/대응 권고까지의 분석 플로우를 설명해 주세요.",
    requirements: [
      "격리/안전한 분석 환경",
      "정적/동적 분석, C2/암호화/지속성 파악",
      "IOC(해시/도메인/레지스트리/프로세스) 도출",
      "탐지 룰(예: YARA/Sigma) 및 대응 권고"
    ],
    aiMessagesLimit: 0,
    minLines: 23
  },
  {
    id: "p3t36",
    role: "sec-res",
    scenario: "sec-res",
    scenarioTitle: "보안 연구원/화이트해커",
    scenarioDesc:
      "화이트해커 업무에서 윤리 의식이 '필수'이며, 실수/오해를 방지하기 위한 체크리스트가 필요하다.",
    context: [
      "권한/범위 관리",
      "민감 데이터 최소 수집 및 보관 정책",
      "감사 가능성(로그/증적)",
      "책임 있는 커뮤니케이션"
    ],
    taskType: "execute",
    title: "문항 3) 윤리/거버넌스 — 화이트해커 윤리 체크리스트",
    instruction:
      "화이트해커 업무에서 윤리 의식이 왜 '필수'인지, 그리고 실제로 실수/오해를 방지하기 위한 본인의 체크리스트(범위/승인/로그/데이터 취급)를 제시해 주세요.",
    requirements: [
      "권한/범위 관리",
      "민감 데이터 최소 수집 및 보관 정책",
      "감사 가능성(로그/증적)",
      "책임 있는 커뮤니케이션"
    ],
    aiMessagesLimit: 0,
    minLines: 20
  },

  // 5) Salesforce Developer (SF-01)
  {
    id: "p3t37",
    role: "sf-dev",
    scenario: "sf-dev",
    scenarioTitle: "세일즈포스 개발자/PL",
    scenarioDesc:
      "당신은 세일즈포스 기반 시스템 구축/운영, 솔루션 제약 내 구현, 데이터 관리, PL로 일정/리스크/이슈 관리를 담당한다.",
    context: [
      "플랫폼 제약 이해(거버너 리밋 등)와 설계",
      "데이터 모델링/품질",
      "통합(API/연동) 설계",
      "운영 관점 문제 해결",
      "협업/커뮤니케이션(이견 조율)"
    ],
    taskType: "execute",
    title: "문항 1) 플랫폼 제약 기반 설계 — 세일즈포스 제약 하 요구사항 구현",
    instruction:
      "세일즈포스처럼 '개발자가 컨트롤할 수 없는 제약'이 많은 플랫폼에서, 요구사항을 구현 가능/불가능으로 나누고 대안을 제시하는 접근법을 설명해 주세요.",
    requirements: [
      "제약 식별(리밋/보안/데이터 모델/트랜잭션)",
      "대안 비교(설정 기반 vs 커스텀 개발 vs 외부 연동)",
      "이견 조율(고객/내부) 커뮤니케이션",
      "리스크/운영 영향"
    ],
    aiMessagesLimit: 0,
    minLines: 23
  },
  {
    id: "p3t38",
    role: "sf-dev",
    scenario: "sf-dev",
    scenarioTitle: "세일즈포스 개발자/PL",
    scenarioDesc:
      "대량 고객 정보를 실시간성으로 관리해야 하는 시스템에서 데이터 모델/인덱싱/조회 패턴을 설계해야 한다.",
    context: [
      "주요 엔티티/관계/권한",
      "조회 패턴 기반 설계(필터/정렬/집계)",
      "운영 이슈 예측(성능 저하, 락, 배치 처리)",
      "모니터링/알람/회귀 테스트"
    ],
    taskType: "execute",
    title: "문항 2) 데이터/운영 — 대량 데이터 실시간 관리 시스템 설계",
    instruction:
      "대량 고객 정보를 실시간성으로 관리해야 하는 시스템에서, 데이터 모델/인덱싱/조회 패턴을 어떻게 설계하고 운영 이슈를 예방하겠습니까?",
    requirements: [
      "주요 엔티티/관계/권한",
      "조회 패턴 기반 설계(필터/정렬/집계)",
      "운영 이슈 예측(성능 저하, 락, 배치 처리)",
      "모니터링/알람/회귀 테스트"
    ],
    aiMessagesLimit: 0,
    minLines: 24
  },
  {
    id: "p3t39",
    role: "sf-dev",
    scenario: "sf-dev",
    scenarioTitle: "세일즈포스 개발자/PL",
    scenarioDesc:
      "프로젝트에서 의견 차이가 발생했을 때, '배경지식 차이를 줄여 합의점에 도달'하는 커뮤니케이션이 필요하다.",
    context: [
      "쟁점 정의/공통 용어 정리",
      "대안/근거 제시",
      "결정 기록과 후속 액션"
    ],
    taskType: "execute",
    title: "문항 3) 커뮤니케이션 — 의견 차이 조율 및 합의 도달 사례",
    instruction:
      "프로젝트에서 의견 차이가 발생했을 때, '배경지식 차이를 줄여 합의점에 도달'하는 커뮤니케이션을 실제 사례 형식으로 설명해 주세요.",
    requirements: [
      "쟁점 정의/공통 용어 정리",
      "대안/근거 제시",
      "결정 기록과 후속 액션"
    ],
    aiMessagesLimit: 0,
    minLines: 20
  },

  // 6) Game Lead/CEO (GL-01)
  {
    id: "p3t40",
    role: "game-lead",
    scenario: "game-lead",
    scenarioTitle: "게임 리드 프로그래머/대표",
    scenarioDesc:
      "당신은 게임 개발 리드와 경영을 병행하며, 일지 기반 업무 관리, 코드리뷰/멘토링, 협업 이슈 해결, 포트폴리오에서 문제 해결 과정 중시를 담당한다.",
    context: [
      "기술 리더십(설계/리뷰/멘토링)",
      "프로덕션 운영(일정/리스크/커뮤니케이션)",
      "품질 문화(회고/문서/일지)",
      "채용/평가 관점",
      "비즈니스 이해(개발 외 업무)"
    ],
    taskType: "execute",
    title: "문항 1) 리더십/운영 — 작업 공유 부족 재발 방지 일일 리듬 설계",
    instruction:
      "작업 공유가 안 되어 일정이 틀어졌던 상황을 가정하고, '매일의 리듬(일지/데일리/리뷰)'을 어떻게 설계해 재발을 막을지 제시해 주세요.",
    requirements: [
      "일지 템플릿(오늘 목표/완료/차단/내일)",
      "데일리 운영(리스크/의존성/우선순위)",
      "변경/요청 우선순위 합의"
    ],
    aiMessagesLimit: 0,
    minLines: 22
  },
  {
    id: "p3t41",
    role: "game-lead",
    scenario: "game-lead",
    scenarioTitle: "게임 리드 프로그래머/대표",
    scenarioDesc:
      "면접에서 지원자의 '설계적 미흡/최적화 미흡'을 확인해야 한다.",
    context: [
      "코드/설계 설명 요구(왜 그렇게 했는지)",
      "병목 추정과 개선안 제시",
      "커밋/개선 흔적 확인(학습/반영)"
    ],
    taskType: "execute",
    title: "문항 2) 채용/평가 — 지원자 설계·최적화 역량 평가 질문 및 루브릭",
    instruction:
      "면접에서 지원자의 '설계적 미흡/최적화 미흡'을 확인하려면 어떤 질문과 과제를 내시겠습니까? 그리고 어떤 루브릭으로 평가하시겠습니까?",
    requirements: [
      "코드/설계 설명 요구(왜 그렇게 했는지)",
      "병목 추정과 개선안 제시",
      "커밋/개선 흔적 확인(학습/반영)"
    ],
    aiMessagesLimit: 0,
    minLines: 20
  }
];

// ================================
// Rubric (1~4) — IT Technical Competency
// ================================
export const part3RubricIT = {
  // IT 직군 공통 채점 원칙: "실무 역량"을 평가(개념 이해 + 구체적 적용 + 트레이드오프 + 재현 가능성)
  commonScale: [
    {
      level: 1,
      label: "부족",
      definition: "핵심 개념/근거가 불명확하고, 실제 경험·검증 절차가 약함"
    },
    {
      level: 2,
      label: "기본",
      definition: "개념은 이해하나 적용이 제한적이며, 사례/수치/트레이드오프 설명이 부족"
    },
    {
      level: 3,
      label: "우수",
      definition: "구체적 사례 기반으로 설계·진단·의사결정 과정을 설명하고, 리스크/대안까지 제시"
    },
    {
      level: 4,
      label: "탁월",
      definition: "복잡한 제약(성능/안정성/사용성/조직/일정)을 통합해 최적화하고, 재현 가능한 방법론·지표·학습을 제시"
    }
  ],

  byTask: {
    // CRM SE
    p3t25: {
      weight: 1.2,
      rubric: [
        { level: 1, indicator: "단순히 '나눠서 배치' 수준, 데이터/상태/확장 고려 없음" },
        { level: 2, indicator: "기본/고급 분리는 제안하나 객체 모델/상태 흐름/예외 처리 설명 부족" },
        { level: 3, indicator: "업무 흐름 기반 IA + 도메인 모델 + 확장 시나리오(채널 추가 등)까지 설명" },
        { level: 4, indicator: "설계 원칙을 지표(클릭 수/완료율/오류율)로 검증하는 계획 + 마이그레이션/호환성 전략까지 제시" }
      ]
    },
    p3t26: {
      weight: 1.5,
      rubric: [
        { level: 1, indicator: "'로그를 본다' 수준의 포괄적 답변, 검증 순서/판단 기준 없음" },
        { level: 2, indicator: "일부 지표를 언급하나 가설-데이터 매핑과 즉시 완화 전략이 약함" },
        { level: 3, indicator: "가설 트리 + 확인 순서 + 지표 기준(p95 등) + 임시/영구 조치 제시" },
        { level: 4, indicator: "사후 RCA 템플릿/알람/SLI-SLO/부하 테스트로 재발 방지 체계까지 제시" }
      ]
    },
    p3t27: {
      weight: 1.3,
      rubric: [
        { level: 1, indicator: "버전만 올린다 수준, 호환성/폐기 정책 없음" },
        { level: 2, indicator: "SemVer 언급은 있으나 실제 운영(Deprecation 기간/가이드) 계획이 약함" },
        { level: 3, indicator: "Breaking change 기준 + Deprecation 정책 + 마이그레이션 경로까지 제시" },
        { level: 4, indicator: "SDK 텔레메트리로 사용 버전 분포를 측정해 단계적 폐기/자동 마이그레이션까지 설계" }
      ]
    },

    // Automotive DM
    p3t28: {
      weight: 1.4,
      rubric: [
        { level: 1, indicator: "요청을 받아서 '반영' 위주, 영향 분석·승인 체계 없음" },
        { level: 2, indicator: "영향 분석은 언급하나 산출물/승인 기준이 모호" },
        { level: 3, indicator: "CR 프로세스 + 영향 분석 + 승인 게이트 + 릴리즈/테스트 계획 제시" },
        { level: 4, indicator: "안전/규정 준수 관점의 증빙(트레이서빌리티, 테스트 커버리지)까지 체계화" }
      ]
    },
    p3t29: {
      weight: 1.2,
      rubric: [
        { level: 1, indicator: "회의 늘리기 수준, 비동기/규칙 설계 없음" },
        { level: 2, indicator: "문서화 필요 언급은 있으나 구체 템플릿/규칙 부족" },
        { level: 3, indicator: "핸드오프·에스컬레이션·SLA·템플릿까지 운영 설계" },
        { level: 4, indicator: "지표(리드타임/재오픈율)로 커뮤니케이션 품질을 측정·개선" }
      ]
    },
    p3t30: {
      weight: 1.3,
      rubric: [
        { level: 1, indicator: "'테스트 많이' 정도, 품질 지표/게이트 부재" },
        { level: 2, indicator: "게이트 일부 언급하나 안전/증빙 연결이 약함" },
        { level: 3, indicator: "지표+게이트+증빙(테스트/리뷰) 연결이 일관됨" },
        { level: 4, indicator: "리스크 기반 테스트 전략과 결함 예방(원인 분석/프로세스 개선)까지 제시" }
      ]
    },

    // Game Client
    p3t31: {
      weight: 1.3,
      rubric: [
        { level: 1, indicator: "'암호화하면 된다' 식의 단편적 답변" },
        { level: 2, indicator: "서버 검증 원칙은 말하지만 구체 검증 규칙/예외가 약함" },
        { level: 3, indicator: "상태/규칙 기반 서버 권위 설계 + 탐지/로그까지 제시" },
        { level: 4, indicator: "공격 시나리오별 방어(리플레이/속도핵 등)와 비용-효과 트레이드오프까지 설명" }
      ]
    },
    p3t32: {
      weight: 1.2,
      rubric: [
        { level: 1, indicator: "구현 중심, 구조/테스트 고려 없음" },
        { level: 2, indicator: "패턴 언급은 있으나 실제 적용 범위/경계가 모호" },
        { level: 3, indicator: "상태 모델 + 모듈 경계 + 테스트 전략까지 설명" },
        { level: 4, indicator: "UI 성능(드로우/GC)까지 고려한 구조와 관측지표/디버그 툴링까지 제시" }
      ]
    },
    p3t33: {
      weight: 1.1,
      rubric: [
        { level: 1, indicator: "감으로 고친다, 재현/기록 없음" },
        { level: 2, indicator: "재현 노력은 있으나 타임라인/가설 검증이 약함" },
        { level: 3, indicator: "조건 수집→최소 재현→가설 검증→회귀 방지까지 일관" },
        { level: 4, indicator: "텔레메트리/리플레이/샘플링으로 '현장 재현'까지 가능하게 설계" }
      ]
    },

    // Security
    p3t34: {
      weight: 1.4,
      rubric: [
        { level: 1, indicator: "발견 사실 중심, 재현/완화/공개 정책이 없음" },
        { level: 2, indicator: "PoC·영향 언급은 있으나 책임공개/가이드 구조가 약함" },
        { level: 3, indicator: "리포트 구조+증빙+책임공개+완화/탐지 가이드까지 포함" },
        { level: 4, indicator: "재현성/검증성을 극대화(스크립트화)하고, 조직/고객 관점의 대응 시나리오까지 제공" }
      ]
    },
    p3t35: {
      weight: 1.3,
      rubric: [
        { level: 1, indicator: "도구 나열 중심, 산출물(IOC/권고) 연결이 약함" },
        { level: 2, indicator: "정적/동적 구분은 있으나 분석 목표/우선순위가 불명확" },
        { level: 3, indicator: "분석 플로우→산출물(IOC/룰)→대응 권고까지 일관됨" },
        { level: 4, indicator: "사전 점검/탐지/복구까지 '원스톱' 관점으로 운영 절차·지표까지 제시" }
      ]
    },
    p3t36: {
      weight: 1.1,
      rubric: [
        { level: 1, indicator: "원론적 윤리 강조만 있고 실무 체크리스트가 없음" },
        { level: 2, indicator: "범위/승인 언급은 있으나 데이터 취급/증적 관리가 약함" },
        { level: 3, indicator: "실무 체크리스트와 예방 조치가 구체적" },
        { level: 4, indicator: "조직 차원의 표준 운영(SOP)·교육·감사 체계까지 제안" }
      ]
    },

    // Salesforce
    p3t37: {
      weight: 1.3,
      rubric: [
        { level: 1, indicator: "무조건 구현 관점, 제약·대안 제시 없음" },
        { level: 2, indicator: "제약을 안다고 말하지만 분류 기준/의사결정 근거 부족" },
        { level: 3, indicator: "제약→대안→트레이드오프→합의까지 논리적" },
        { level: 4, indicator: "재사용 가능한 '적합성 평가 프레임'과 산출물(결정서)을 운영" }
      ]
    },
    p3t38: {
      weight: 1.4,
      rubric: [
        { level: 1, indicator: "일반론, 조회 패턴/운영 고려 부족" },
        { level: 2, indicator: "모델 언급은 있으나 성능·운영 예방책이 약함" },
        { level: 3, indicator: "패턴 기반 설계+운영 이슈 가정+예방(모니터링/테스트) 제시" },
        { level: 4, indicator: "실시간 요구와 배치/비동기 처리의 경계를 설계하고 SLO로 운영" }
      ]
    },
    p3t39: {
      weight: 1.0,
      rubric: [
        { level: 1, indicator: "감정/권위 기반 설득, 합의 구조 없음" },
        { level: 2, indicator: "대화는 하지만 근거/결정 기록이 약함" },
        { level: 3, indicator: "정보 격차 해소→대안 비교→합의→기록까지 명확" },
        { level: 4, indicator: "반복 가능한 운영(의사결정 템플릿/리뷰 루틴)으로 문화화" }
      ]
    },

    // Game Lead
    p3t40: {
      weight: 1.2,
      rubric: [
        { level: 1, indicator: "개인 노력에 의존, 시스템(리듬) 설계 없음" },
        { level: 2, indicator: "데일리/일지 언급은 있으나 템플릿/규칙이 모호" },
        { level: 3, indicator: "템플릿+규칙+의존성 관리까지 포함한 운영 제안" },
        { level: 4, indicator: "지표(리드타임/재작업률)로 운영 효과를 측정·개선" }
      ]
    },
    p3t41: {
      weight: 1.1,
      rubric: [
        { level: 1, indicator: "암기형 질문 위주, 실력 검증 구조가 약함" },
        { level: 2, indicator: "기술 질문은 있으나 평가 기준(루브릭)이 불명확" },
        { level: 3, indicator: "질문-과제-루브릭이 일관되고 '근거 기반 설명'을 요구" },
        { level: 4, indicator: "실무 유사 과제 + 리뷰 세션 + 학습/커뮤니케이션까지 평가" }
      ]
    }
  }
};
