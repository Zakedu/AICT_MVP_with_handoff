// ================================
// Common Scale for All Part 3 Rubrics
// ================================
export const part3CommonScale = [
  { level: 1, label: '부족', definition: '요구사항을 충족하지 못함. 핵심 요소가 누락되거나 부정확함.' },
  { level: 2, label: '기본', definition: '기본적인 요구사항은 충족하나 세부사항이 부족함.' },
  { level: 3, label: '우수', definition: '요구사항을 충분히 충족하고 실무 적용 가능한 수준.' },
  { level: 4, label: '탁월', definition: '요구사항을 초과 달성하고 창의적이고 전문적인 접근.' }
];

// ================================
// 1. Performance Marketing (PMKT) Rubric
// ================================
export const part3RubricPMKT = {
  commonScale: part3CommonScale,
  byTask: {
    p3t1: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '캠페인 구조가 불명확하거나 타겟팅이 부적절함' },
        { level: 2, indicator: '기본적인 캠페인 구조는 있으나 최적화 전략이 부족함' },
        { level: 3, indicator: '명확한 캠페인 구조와 타겟팅, KPI 설정이 적절함' },
        { level: 4, indicator: 'A/B 테스트, 예산 배분, 성과 예측까지 포함한 종합 전략' }
      ]
    },
    p3t2: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '데이터 분석이 피상적이거나 인사이트가 부족함' },
        { level: 2, indicator: '기본 지표 분석은 있으나 액션 아이템이 모호함' },
        { level: 3, indicator: '데이터 기반 인사이트와 구체적인 개선 방안 제시' },
        { level: 4, indicator: '심층 분석과 예측 모델링, ROI 개선 전략까지 포함' }
      ]
    },
    p3t3: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '광고 소재 제안이 타겟과 맞지 않거나 창의성 부족' },
        { level: 2, indicator: '기본적인 소재 구성은 있으나 차별화 요소 부족' },
        { level: 3, indicator: '타겟 맞춤 소재와 A/B 테스트 계획이 적절함' },
        { level: 4, indicator: '크리에이티브 전략, 채널별 최적화, 성과 예측 포함' }
      ]
    }
  }
};

// ================================
// 2. SNS/Brand Marketing (BRAND) Rubric
// ================================
export const part3RubricBRAND = {
  commonScale: part3CommonScale,
  byTask: {
    p3t4: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '브랜드 톤앤매너가 일관되지 않거나 타겟 이해 부족' },
        { level: 2, indicator: '기본적인 콘텐츠 구성은 있으나 브랜드 연결성 약함' },
        { level: 3, indicator: '브랜드 아이덴티티와 일관된 콘텐츠 전략 제시' },
        { level: 4, indicator: '크로스채널 전략과 바이럴 요소, 커뮤니티 구축 포함' }
      ]
    },
    p3t5: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '인플루언서 선정 기준이 불명확하거나 부적절함' },
        { level: 2, indicator: '기본적인 협업 계획은 있으나 성과 측정 방법 부족' },
        { level: 3, indicator: '적절한 인플루언서 매칭과 캠페인 실행 계획 제시' },
        { level: 4, indicator: '장기 파트너십 전략과 ROI 측정, 위기관리 포함' }
      ]
    },
    p3t6: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '위기 대응 메시지가 부적절하거나 타이밍 고려 부족' },
        { level: 2, indicator: '기본적인 대응은 있으나 후속 조치 계획 부족' },
        { level: 3, indicator: '적절한 위기 커뮤니케이션과 회복 전략 제시' },
        { level: 4, indicator: '예방 전략, 시나리오별 대응, 브랜드 회복 로드맵 포함' }
      ]
    }
  }
};

// ================================
// 3. HR (Human Resources) Rubric
// ================================
export const part3RubricHR = {
  commonScale: part3CommonScale,
  byTask: {
    p3t7: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '채용 공고가 불명확하거나 필수 정보 누락' },
        { level: 2, indicator: '기본 정보는 있으나 매력적인 어필 포인트 부족' },
        { level: 3, indicator: '명확한 JD와 회사 문화, 성장 기회 제시' },
        { level: 4, indicator: 'EVP 기반 차별화된 채용 브랜딩과 타겟 맞춤 전략' }
      ]
    },
    p3t8: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '면접 질문이 직무와 관련 없거나 편향 우려' },
        { level: 2, indicator: '기본적인 질문 세트는 있으나 평가 기준 불명확' },
        { level: 3, indicator: '역량 기반 질문과 명확한 평가 기준 제시' },
        { level: 4, indicator: '구조화된 면접 설계와 편향 방지, 후보자 경험 고려' }
      ]
    },
    p3t9: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '온보딩 계획이 체계적이지 않거나 핵심 요소 누락' },
        { level: 2, indicator: '기본 일정은 있으나 몰입도 향상 요소 부족' },
        { level: 3, indicator: '체계적인 온보딩 프로세스와 멘토링 계획 포함' },
        { level: 4, indicator: '90일 플랜, 성과 마일스톤, 피드백 루프까지 설계' }
      ]
    }
  }
};

// ================================
// 4. QA (Quality Assurance) Rubric
// ================================
export const part3RubricQA = {
  commonScale: part3CommonScale,
  byTask: {
    p3t10: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '테스트 케이스가 불완전하거나 커버리지 부족' },
        { level: 2, indicator: '기본 시나리오는 있으나 엣지케이스 고려 부족' },
        { level: 3, indicator: '체계적인 테스트 케이스와 우선순위 설정' },
        { level: 4, indicator: '자동화 가능성, 리스크 기반 테스트 전략 포함' }
      ]
    },
    p3t11: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '버그 리포트가 불명확하거나 재현 단계 누락' },
        { level: 2, indicator: '기본 정보는 있으나 근본 원인 분석 부족' },
        { level: 3, indicator: '명확한 재현 단계와 영향도 분석 포함' },
        { level: 4, indicator: '근본 원인, 임시 조치, 영구 수정 방안까지 제시' }
      ]
    },
    p3t12: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '테스트 계획이 비체계적이거나 리소스 고려 부족' },
        { level: 2, indicator: '기본 계획은 있으나 리스크 완화 전략 부족' },
        { level: 3, indicator: '체계적인 테스트 전략과 일정, 리소스 배분' },
        { level: 4, indicator: '자동화 로드맵, CI/CD 통합, 메트릭 정의 포함' }
      ]
    }
  }
};

// ================================
// 5. Business Planning/Strategy (BIZ) Rubric
// ================================
export const part3RubricBIZ = {
  commonScale: part3CommonScale,
  byTask: {
    p3t13: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '시장 분석이 피상적이거나 데이터 근거 부족' },
        { level: 2, indicator: '기본적인 분석은 있으나 인사이트 도출 약함' },
        { level: 3, indicator: '체계적인 시장 분석과 전략적 시사점 제시' },
        { level: 4, indicator: '경쟁사 벤치마킹, 시나리오 분석, 진입 전략 포함' }
      ]
    },
    p3t14: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '사업계획이 비현실적이거나 핵심 요소 누락' },
        { level: 2, indicator: '기본 구조는 있으나 실행 가능성 검토 부족' },
        { level: 3, indicator: '실현 가능한 목표와 구체적 실행 계획 제시' },
        { level: 4, indicator: '재무 모델링, 리스크 분석, 마일스톤까지 포함' }
      ]
    },
    p3t15: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '제안서가 설득력 부족하거나 핵심 가치 불명확' },
        { level: 2, indicator: '기본 내용은 있으나 차별화 포인트 약함' },
        { level: 3, indicator: '명확한 가치 제안과 실행 로드맵 제시' },
        { level: 4, indicator: 'ROI 분석, 성공 사례, 리스크 완화 전략 포함' }
      ]
    }
  }
};

// ================================
// 6. Finance/Accounting (FIN) Rubric
// ================================
export const part3RubricFIN = {
  commonScale: part3CommonScale,
  byTask: {
    p3t16: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '예산 분석이 부정확하거나 핵심 항목 누락' },
        { level: 2, indicator: '기본 분석은 있으나 시사점 도출 약함' },
        { level: 3, indicator: '체계적인 예산 분석과 개선 권고안 제시' },
        { level: 4, indicator: '시나리오 분석, 민감도 분석, 최적화 방안 포함' }
      ]
    },
    p3t17: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '재무 보고서가 불완전하거나 오류 포함' },
        { level: 2, indicator: '기본 형식은 있으나 분석적 인사이트 부족' },
        { level: 3, indicator: '정확한 보고서와 트렌드 분석 포함' },
        { level: 4, indicator: '예측 분석, 벤치마킹, 전략적 권고 포함' }
      ]
    },
    p3t18: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      rubric: [
        { level: 1, indicator: '비용 절감 제안이 비현실적이거나 근거 부족' },
        { level: 2, indicator: '기본 아이디어는 있으나 실행 계획 모호' },
        { level: 3, indicator: '구체적인 절감 방안과 예상 효과 제시' },
        { level: 4, indicator: '우선순위화, 리스크 분석, 실행 로드맵 포함' }
      ]
    }
  }
};

// ================================
// 7. Operations / PMO (OPS) Rubric
// ================================
export const part3RubricOPS = {
  commonScale: part3CommonScale,
  byTask: {
    p3t19: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      criteria: [
        {
          name: "WBS 표(최소 18행) 품질(주차/작업/산출물/오너/의존성/완료기준)",
          weight: 45,
          anchors: {
            "4": "18행 이상, 주차별 흐름(요구정의→구성→보안승인→교육→런칭) 명확, 완료기준이 검증 가능",
            "3": "18행 충족하나 의존성/완료기준 일부 약함",
            "2": "18행은 있으나 작업이 중복/누락(교육/전환/지원) 존재",
            "1": "18행 미만 또는 형식 부실",
            "0": "미제공"
          }
        },
        {
          name: "R&R 표(최소 6역할) 명확성",
          weight: 20,
          anchors: {
            "4": "6역할 이상, 책임/승인자/협업자가 구분되고 충돌 방지(결정권) 명확",
            "3": "대체로 좋으나 승인/책임 경계 일부 모호",
            "2": "역할은 있으나 책임이 추상적",
            "1": "6역할 미만",
            "0": "미제공"
          }
        },
        {
          name: "리스크 로그(최소 8개) 실효성",
          weight: 20,
          anchors: {
            "4": "8개 이상, 영향/가능성/조치/오너/트리거가 구체, 실행 가능한 대응(커뮤니케이션/권한/데이터 이관)",
            "3": "8개 충족하나 트리거/조치 일부 일반론",
            "2": "8개는 있으나 리스크가 포괄적",
            "1": "8개 미만",
            "0": "미제공"
          }
        },
        {
          name: "보안 규칙(승인 전 금지 범위) + Self-check 8개 + 질문 제한(≤3)",
          weight: 15,
          anchors: {
            "4": "승인 전 금지 범위가 명확(데이터 이관/권한/외부공유), Self-check 8개 실무적, 질문 3개 이하 핵심",
            "3": "대체로 준수하나 체크리스트/질문 우선순위 약함",
            "2": "보안/체크/질문 중 일부 누락",
            "1": "규칙 위반 다수",
            "0": "미제공"
          }
        }
      ]
    },
    p3t20: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 85,
      criteria: [
        {
          name: "태깅(모호/오너없음/기한없음/리스크누락/규정위반 등) 정확성",
          weight: 30,
          anchors: {
            "4": "문장별로 태그를 정확히 부여하고 중복 최소, 우선순위가 드러남",
            "3": "대체로 정확하나 일부 태깅 과소/과대",
            "2": "태그는 있으나 일관성 부족",
            "1": "태깅 부실",
            "0": "미제공"
          }
        },
        {
          name: "재작성 품질(결정/오너(역할)/기한/완료기준 포함)",
          weight: 45,
          anchors: {
            "4": "모든 수정문이 4요소를 포함, 실행 가능한 액션아이템으로 전환, 역할 기반으로 실명 금지 준수",
            "3": "대부분 포함하나 일부 문장에 완료기준/기한이 약함",
            "2": "형식은 있으나 여전히 모호",
            "1": "요소 누락 다수",
            "0": "미제공"
          }
        },
        {
          name: "Output 표(원문|태그|수정문|이유) 가독성/추적성",
          weight: 15,
          anchors: {
            "4": "표가 깔끔하고 원문-수정문 매핑이 쉽게 추적 가능, 이유가 간결하고 타당",
            "3": "대체로 좋으나 일부 행이 길어 가독성 저하",
            "2": "표는 있으나 정렬/누락 문제",
            "1": "형식 미흡",
            "0": "미제공"
          }
        },
        {
          name: "마지막 확인 질문 5개 자동 생성의 적합성",
          weight: 10,
          anchors: {
            "4": "5개가 실행을 막는 핵심 불확실성(권한/범위/의존성/리스크)만 짚음",
            "3": "5개는 있으나 일부 중복",
            "2": "질문이 일반론",
            "1": "5개 미만",
            "0": "미제공"
          }
        }
      ]
    },
    p3t21: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      criteria: [
        {
          name: "진단 질문 9개(카테고리 커버리지) 품질",
          weight: 35,
          anchors: {
            "4": "9개 모두 카테고리(도달/리더지원/접근권한 등)를 고르게 커버, 측정 가능한 정보로 이어짐",
            "3": "9개 충족하나 일부 중복",
            "2": "9개는 있으나 추상 질문 다수",
            "1": "9개 미만",
            "0": "미제공"
          }
        },
        {
          name: "개선 실험 4개(1변수, 표: 가설|변수|지표|기간|리스크) 완성도",
          weight: 50,
          anchors: {
            "4": "4개 모두 1변수만, 성공지표가 집계 방식 포함, 관찰기간·리스크 합리적, 개인정보 추적 금지 준수",
            "3": "대체로 좋으나 1개 실험이 변수 혼합/지표 모호",
            "2": "표는 있으나 실험 축 중복/실행 난이도 과도",
            "1": "4개 미만",
            "0": "미제공"
          }
        },
        {
          name: "단정 금지 + Self-check 6개 준수",
          weight: 15,
          anchors: {
            "4": "원인/효과를 조건부로만 기술, Self-check 6개가 개인정보/편향/변수통제 포함",
            "3": "대체로 준수하나 일부 단정 표현",
            "2": "체크리스트가 약함",
            "1": "규칙 위반",
            "0": "미제공"
          }
        }
      ]
    }
  }
};

// ================================
// 8. Procurement / General Affairs / Contracts (ADM) Rubric
// ================================
export const part3RubricADM = {
  commonScale: part3CommonScale,
  byTask: {
    p3t22: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 80,
      criteria: [
        {
          name: "가중치 평가표(최소 10항목) 완성도 및 근거",
          weight: 55,
          anchors: {
            "4": "10항목 이상, 필수(보안/데이터소유/SLA/지원/가격/해지) 포함, 가중치 합 일관, 점수 근거가 문서 기반으로 작성 가능",
            "3": "10항목 충족하나 가중치/근거 일부 약함",
            "2": "표는 있으나 항목/근거가 추상적",
            "1": "10항목 미만 또는 필수 항목 누락",
            "0": "미제공"
          }
        },
        {
          name: "추천안 2줄(조건부 추천) 품질",
          weight: 15,
          anchors: {
            "4": "2줄로 조건(예: 보안승인/가격상한/SLA) 명시, 단정 없이 의사결정 포인트 제공",
            "3": "조건부이나 조건이 다소 모호",
            "2": "추천이 애매하거나 사실상 단정",
            "1": "2줄 미준수/누락",
            "0": "미제공"
          }
        },
        {
          name: "협상 포인트 6개 + 우선순위",
          weight: 20,
          anchors: {
            "4": "6개 모두 구체 조항(해지/요율/지연배상/보안감사/데이터반환)이며 우선순위 기준(리스크/비용) 명확",
            "3": "6개 충족하나 우선순위 근거 약함",
            "2": "6개는 있으나 포인트가 일반론",
            "1": "6개 미만",
            "0": "미제공"
          }
        },
        {
          name: "Self-check 8개 + 질문 제한(≤3) 준수",
          weight: 10,
          anchors: {
            "4": "Self-check 8개가 보안/법무/운영/비용 포함, 질문 3개 이하로 핵심 확인",
            "3": "대체로 준수하나 체크 일부 추상",
            "2": "체크/질문 중 일부 누락",
            "1": "규칙 위반",
            "0": "미제공"
          }
        }
      ]
    },
    p3t23: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 85,
      criteria: [
        {
          name: "리스크 태깅 + 안전 리라이트 표(원문|태그|수정문|이유) 완성도",
          weight: 45,
          anchors: {
            "4": "문장별 리스크(책임/면책/SLA/데이터/해지) 태깅 정확, 수정문이 '확인 필요/협상 필요/조건부'로 안전하게 전환",
            "3": "대체로 좋으나 1~2문장이 여전히 단정적",
            "2": "표는 있으나 태그/수정 연결이 약함",
            "1": "형식 부실/누락 다수",
            "0": "미제공"
          }
        },
        {
          name: "협상 질문 8개 자동 생성의 실효성",
          weight: 25,
          anchors: {
            "4": "8개가 핵심 리스크를 직접 겨냥(SLA, 데이터반환, 보안감사, 서브프로세서)하고 우선순위가 암시됨",
            "3": "8개는 있으나 일부가 중복/일반론",
            "2": "질문이 모호",
            "1": "8개 미만",
            "0": "미제공"
          }
        },
        {
          name: "편향/단정 금지 준수 + 법률자문 대체 금지 문구",
          weight: 20,
          anchors: {
            "4": "단정 표현 없이 조건부로만 서술, 마지막에 법률 자문 대체 불가 문구가 명확",
            "3": "대체로 준수하나 문구 위치/표현 약함",
            "2": "조건부 표현이 부족",
            "1": "규칙 위반",
            "0": "미제공"
          }
        },
        {
          name: "이유(1줄) 명료성",
          weight: 10,
          anchors: {
            "4": "각 행 이유가 1줄로 리스크 근거를 명확히 설명",
            "3": "대체로 1줄이나 일부 장황",
            "2": "이유가 일반론",
            "1": "이유 누락",
            "0": "미제공"
          }
        }
      ]
    },
    p3t24: {
      weight: 1.0,
      totalPoints: 100,
      passThreshold: 85,
      criteria: [
        {
          name: "확인 질문 12개(보안/개인정보/SLA/데이터/가격 등) + 이유 1줄",
          weight: 45,
          anchors: {
            "4": "12개 모두 카테고리 균형, 각 항목에 '왜 필요한지' 1줄이 구체(리스크/비용/운영)로 연결",
            "3": "12개 충족하나 이유가 일부 일반론",
            "2": "12개는 있으나 질문/이유가 추상적",
            "1": "12개 미만 또는 이유 누락 다수",
            "0": "미제공"
          }
        },
        {
          name: "증빙 8개 + 이유 1줄(보안 인증서/약관/SLA 문서 등)",
          weight: 25,
          anchors: {
            "4": "8개 모두 구체 문서명(예: 보안인증, DPA, SLA, DR/BCP)이며 이유가 검증 목적과 연결",
            "3": "8개 충족하나 일부 증빙이 중복/우선순위 낮음",
            "2": "증빙이 모호('보안 문서') 수준",
            "1": "8개 미만",
            "0": "미제공"
          }
        },
        {
          name: "결정 기준 6개(가중치 관점 포함) + 이유 1줄",
          weight: 20,
          anchors: {
            "4": "6개가 가중치/임계치/페일패스트(보안 미달 시 탈락) 포함, 이유가 명확",
            "3": "6개 충족하나 가중치/임계치 구체성 부족",
            "2": "기준이 일반론 위주",
            "1": "6개 미만",
            "0": "미제공"
          }
        },
        {
          name: "Self-check 6개(누락/편향 방지) 품질",
          weight: 10,
          anchors: {
            "4": "6개가 누락·편향·단정·증빙부재를 점검하도록 설계",
            "3": "6개는 있으나 일부 중복",
            "2": "체크가 추상적",
            "1": "6개 미만",
            "0": "미제공"
          }
        }
      ]
    }
  }
};

// ================================
// Unified Export for All Non-IT Rubrics
// ================================
export const part3RubricNonIT = {
  PMKT: part3RubricPMKT,
  BRAND: part3RubricBRAND,
  HR: part3RubricHR,
  QA: part3RubricQA,
  BIZ: part3RubricBIZ,
  FIN: part3RubricFIN,
  OPS: part3RubricOPS,
  ADM: part3RubricADM
} as const;

// Helper function to get rubric by task ID
export function getRubricByTaskId(taskId: string) {
  // Extract domain from task ID (e.g., "p3t1" -> check PMKT range p3t1-3)
  const taskNum = parseInt(taskId.replace('p3t', ''));
  
  if (taskNum >= 1 && taskNum <= 3) return part3RubricNonIT.PMKT;
  if (taskNum >= 4 && taskNum <= 6) return part3RubricNonIT.BRAND;
  if (taskNum >= 7 && taskNum <= 9) return part3RubricNonIT.HR;
  if (taskNum >= 10 && taskNum <= 12) return part3RubricNonIT.QA;
  if (taskNum >= 13 && taskNum <= 15) return part3RubricNonIT.BIZ;
  if (taskNum >= 16 && taskNum <= 18) return part3RubricNonIT.FIN;
  if (taskNum >= 19 && taskNum <= 21) return part3RubricNonIT.OPS;
  if (taskNum >= 22 && taskNum <= 24) return part3RubricNonIT.ADM;
  
  return null;
}