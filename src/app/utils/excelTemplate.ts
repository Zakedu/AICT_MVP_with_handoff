/**
 * 문항 데이터 관리용 엑셀 템플릿 생성 유틸리티
 * CSV 형식으로 생성하여 Excel에서 열 수 있음
 */

// Part 1 문항 템플릿 (객관식)
export const part1Template = {
  sheetName: 'Part1_AI리터러시',
  headers: [
    'id',
    'type',
    'text',
    'keyTerms',
    'optionA_text',
    'optionA_correct',
    'optionB_text',
    'optionB_correct',
    'optionC_text',
    'optionC_correct',
    'optionD_text',
    'optionD_correct',
    'situation'  // risk 유형용
  ],
  descriptions: [
    '문항 ID (예: p1q1)',
    '유형: mcq 또는 risk',
    '문항 텍스트',
    '핵심 용어 (쉼표로 구분)',
    'A 선택지 텍스트',
    'A 정답 여부 (TRUE/FALSE)',
    'B 선택지 텍스트',
    'B 정답 여부 (TRUE/FALSE)',
    'C 선택지 텍스트',
    'C 정답 여부 (TRUE/FALSE)',
    'D 선택지 텍스트',
    'D 정답 여부 (TRUE/FALSE)',
    '상황 설명 (risk 유형만)'
  ],
  example: [
    'p1q1',
    'mcq',
    'LLM(대규모 언어 모델)에 대한 설명으로 가장 적절한 것은?',
    'LLM,언어 모델',
    '웹사이트를 자동으로 해킹하는 보안 프로그램이다',
    'FALSE',
    '대량의 텍스트로 학습해 다음 단어를 예측하며 문장을 생성하는 모델이다',
    'TRUE',
    '이미지 픽셀을 분류해 색상을 바꾸는 필터 모델이다',
    'FALSE',
    '인터넷 검색 결과를 그대로 복사해 답을 출력하는 모델이다',
    'FALSE',
    ''
  ]
};

// Part 2 문항 템플릿 (실습형)
export const part2Template = {
  sheetName: 'Part2_프롬프트리터러시',
  headers: [
    'id',
    'type',
    'instruction',
    'prompt',
    'originalPrompt',
    'blocks_json',
    'steps_json',
    'issues_json',
    'requirements_json',
    'correctOrder',
    'minWords'
  ],
  descriptions: [
    '문항 ID (예: p2q1)',
    '유형: dragdrop, highlight, rewrite, ordering',
    '문항 지시문',
    '대상 프롬프트 (highlight용)',
    '원본 프롬프트 (rewrite용)',
    '블록 JSON (dragdrop용)',
    '단계 JSON (ordering용)',
    '이슈 JSON (highlight용)',
    '요구사항 JSON (rewrite용)',
    '정답 순서 (쉼표 구분)',
    '최소 단어 수 (rewrite용)'
  ],
  example: [
    'p2q1',
    'dragdrop',
    '아래 블록들을 올바른 순서로 배치해 프롬프트를 완성하시오.',
    '',
    '',
    '[{"id":"1","text":"너는 프로젝트 매니저다.","category":"역할","correctOrder":1}]',
    '',
    '',
    '',
    '1,2,3,4,5',
    ''
  ]
};

// Part 3 문항 템플릿 (직무 시나리오)
export const part3Template = {
  sheetName: 'Part3_직무시나리오',
  headers: [
    'id',
    'role',
    'scenario',
    'scenarioTitle',
    'scenarioDesc',
    'context_json',
    'taskType',
    'title',
    'instruction',
    'requirements_json',
    'aiDraft_json',
    'aiMessagesLimit',
    'minLines'
  ],
  descriptions: [
    '문항 ID (예: p3t1)',
    '직군 ID (pmkt, brand, hr, qa, biz, fin, ops, adm 등)',
    '시나리오 ID',
    '시나리오 제목',
    '시나리오 설명',
    '맥락/조건 JSON 배열',
    '과제 유형: execute, review, verify',
    '문항 제목',
    '문항 지시문',
    '요구사항 JSON 배열',
    'AI 초안 JSON 배열 (review용)',
    'AI 메시지 제한 수',
    '최소 줄 수'
  ],
  example: [
    'p3t1',
    'pmkt',
    'pmkt',
    '퍼포먼스 마케팅',
    '당신은 IMC 대행사 퍼포먼스 마케팅 팀 신입이다...',
    '["목표(KPI): 리드 300건 / CPA 18,000원 이하","예산: 6,000,000원 (2주)"]',
    'execute',
    '문항 1) 실행형 — 광고주 공유용 운영안',
    '광고주에게 공유할 1페이지 운영안을 작성하라.',
    '["매체 믹스/예산 배분 표","핵심 크리에이티브 메시지 3개"]',
    '',
    '3',
    '18'
  ]
};

// Part 3 루브릭 템플릿
export const rubricTemplate = {
  sheetName: 'Part3_루브릭',
  headers: [
    'taskId',
    'weight',
    'totalPoints',
    'passThreshold',
    'level1_indicator',
    'level2_indicator',
    'level3_indicator',
    'level4_indicator'
  ],
  descriptions: [
    '문항 ID (예: p3t1)',
    '가중치 (기본 1.0)',
    '총점 (기본 100)',
    '통과 기준 점수',
    'Level 1 (부족) 기준',
    'Level 2 (기본) 기준',
    'Level 3 (우수) 기준',
    'Level 4 (탁월) 기준'
  ],
  example: [
    'p3t1',
    '1.0',
    '100',
    '80',
    '캠페인 구조가 불명확하거나 타겟팅이 부적절함',
    '기본적인 캠페인 구조는 있으나 최적화 전략이 부족함',
    '명확한 캠페인 구조와 타겟팅, KPI 설정이 적절함',
    'A/B 테스트, 예산 배분, 성과 예측까지 포함한 종합 전략'
  ]
};

// 직군 코드 참조 시트
export const roleCodesTemplate = {
  sheetName: '직군코드_참조',
  headers: ['roleId', 'label', 'description'],
  data: [
    ['pmkt', '퍼포먼스 마케팅', '광고 캠페인 운영, 성과 분석'],
    ['brand', 'SNS/브랜드 마케팅', '브랜드 콘텐츠, 소셜미디어 운영'],
    ['hr', 'HR(인사/노무)', '채용, 인사관리, 노무'],
    ['qa', 'QA(소프트웨어)', '품질보증, 테스트'],
    ['biz', '사업기획/전략', '사업계획, 전략 수립'],
    ['fin', '재무/회계', '예산, 결산, 재무분석'],
    ['ops', '운영/PMO', '프로젝트 관리, 운영'],
    ['adm', '구매/총무/계약', '구매, 계약, 총무'],
    ['crm-se', 'CRM 소프트웨어 엔지니어', 'CRM 시스템 개발'],
    ['auto-dm', 'Automotive DM', '자동차 디지털 마케팅'],
    ['game-client', '게임 클라이언트 프로그래머', '게임 클라이언트 개발'],
    ['sec-res', '보안 연구원', '보안 연구, 취약점 분석'],
    ['sf-dev', '세일즈포스 개발자', 'Salesforce 개발'],
    ['game-lead', '게임 리드/대표', '게임 프로젝트 리드']
  ]
};

/**
 * CSV 문자열 생성 (셀 내 쉼표/줄바꿈 처리)
 */
function escapeCSV(value: string): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * 시트 데이터를 CSV 문자열로 변환
 */
function sheetToCSV(headers: string[], descriptions: string[], example: string[], data?: string[][]): string {
  const rows: string[] = [];

  // 헤더 행
  rows.push(headers.map(escapeCSV).join(','));

  // 설명 행 (주석용)
  rows.push(descriptions.map(d => escapeCSV(`[${d}]`)).join(','));

  // 예시 행
  rows.push(example.map(escapeCSV).join(','));

  // 추가 데이터 행
  if (data) {
    data.forEach(row => {
      rows.push(row.map(escapeCSV).join(','));
    });
  }

  // 빈 행 추가 (데이터 입력용)
  for (let i = 0; i < 20; i++) {
    rows.push(headers.map(() => '').join(','));
  }

  return rows.join('\n');
}

/**
 * 전체 템플릿을 ZIP 없이 개별 CSV로 다운로드
 * (브라우저에서 간단하게 사용)
 */
export function downloadTemplateCSV(templateType: 'part1' | 'part2' | 'part3' | 'rubric' | 'roles') {
  let template: { sheetName: string; headers: string[]; descriptions: string[]; example?: string[]; data?: string[][] };

  switch (templateType) {
    case 'part1':
      template = part1Template;
      break;
    case 'part2':
      template = part2Template;
      break;
    case 'part3':
      template = part3Template;
      break;
    case 'rubric':
      template = rubricTemplate;
      break;
    case 'roles':
      template = { ...roleCodesTemplate, descriptions: roleCodesTemplate.headers, example: roleCodesTemplate.data[0] };
      break;
    default:
      return;
  }

  const csv = sheetToCSV(
    template.headers,
    template.descriptions,
    template.example || [],
    templateType === 'roles' ? roleCodesTemplate.data : undefined
  );

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AICT_${template.sheetName}_템플릿.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 모든 템플릿을 하나의 CSV로 다운로드 (시트 구분선 포함)
 */
export function downloadAllTemplatesCSV() {
  const sections: string[] = [];

  // Part 1
  sections.push(`### ${part1Template.sheetName} ###`);
  sections.push(sheetToCSV(part1Template.headers, part1Template.descriptions, part1Template.example));
  sections.push('');

  // Part 2
  sections.push(`### ${part2Template.sheetName} ###`);
  sections.push(sheetToCSV(part2Template.headers, part2Template.descriptions, part2Template.example));
  sections.push('');

  // Part 3
  sections.push(`### ${part3Template.sheetName} ###`);
  sections.push(sheetToCSV(part3Template.headers, part3Template.descriptions, part3Template.example));
  sections.push('');

  // 루브릭
  sections.push(`### ${rubricTemplate.sheetName} ###`);
  sections.push(sheetToCSV(rubricTemplate.headers, rubricTemplate.descriptions, rubricTemplate.example));
  sections.push('');

  // 직군 코드
  sections.push(`### ${roleCodesTemplate.sheetName} ###`);
  sections.push(sheetToCSV(
    roleCodesTemplate.headers,
    roleCodesTemplate.headers,
    roleCodesTemplate.data[0],
    roleCodesTemplate.data.slice(1)
  ));

  const csv = sections.join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'AICT_문항관리_전체템플릿.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 현재 데이터를 CSV로 내보내기 (백업용)
 */
export function exportCurrentDataCSV(
  part1Data: any[],
  part2Data: any[],
  part3Data: any[]
) {
  const sections: string[] = [];

  // Part 1 데이터
  sections.push(`### Part1_현재데이터 ###`);
  sections.push(part1Template.headers.map(escapeCSV).join(','));
  part1Data.forEach(q => {
    const row = [
      q.id,
      q.type,
      q.text,
      q.keyTerms?.join(',') || '',
      q.options?.[0]?.text || '',
      q.options?.[0]?.correct ? 'TRUE' : 'FALSE',
      q.options?.[1]?.text || '',
      q.options?.[1]?.correct ? 'TRUE' : 'FALSE',
      q.options?.[2]?.text || '',
      q.options?.[2]?.correct ? 'TRUE' : 'FALSE',
      q.options?.[3]?.text || '',
      q.options?.[3]?.correct ? 'TRUE' : 'FALSE',
      q.situation || ''
    ];
    sections.push(row.map(escapeCSV).join(','));
  });
  sections.push('');

  // Part 3 데이터
  sections.push(`### Part3_현재데이터 ###`);
  sections.push(part3Template.headers.map(escapeCSV).join(','));
  part3Data.forEach(t => {
    const row = [
      t.id,
      t.role,
      t.scenario,
      t.scenarioTitle,
      t.scenarioDesc,
      JSON.stringify(t.context || []),
      t.taskType,
      t.title,
      t.instruction,
      JSON.stringify(t.requirements || []),
      JSON.stringify(t.aiDraft || []),
      String(t.aiMessagesLimit || 3),
      String(t.minLines || 10)
    ];
    sections.push(row.map(escapeCSV).join(','));
  });

  const csv = sections.join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AICT_문항데이터_백업_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
