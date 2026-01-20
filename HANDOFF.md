# AICT MVP 프로젝트 핸드오프 문서

## 프로젝트 개요
- **프로젝트명**: AI Competency Certification (AICT) - Essential 레벨
- **목표**: TOEIC처럼 AI 활용 능력의 표준 자격증 구축
- **현재 단계**: FGI(Focus Group Interview) 준비를 위한 MVP 완성

---

## 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI + shadcn/ui
- **State**: React Context API
- **Charts**: Recharts
- **DnD**: react-dnd
- **Routing**: React Router v7

---

## 현재 완성 상태

### ✅ 완성됨 (100%)
| 영역 | 파일 | 상세 |
|------|------|------|
| Landing | `pages/Landing.tsx` | 시험 소개, 3파트 설명 |
| Rules/Consent | `pages/RulesConsent.tsx` | 규칙 동의 + 14개 직군 선택 |
| Part 1 | `pages/Part1.tsx` | 8문항 객관식 (AI 리터러시) |
| Part 2 | `pages/Part2.tsx` | 4문항 (드래그앤드롭, 하이라이트, 리라이트, 순서배열) - 모두 구현됨 |
| Part 3 일반 | `pages/Part3.tsx` | 시나리오 + 텍스트 입력 |
| Part 3 검증형 | `components/part3/Part3VerifyTask.tsx` | 5블록 에디터, 실시간 검증, 힌트/예시 |
| Results | `pages/Results.tsx` | 6축 레이더차트, 개선가이드, 인증서 (점수는 Mock) |
| 상태관리 | `context/ExamContext.tsx` | 답안, 시간, 동의, 직군선택 |
| Practice | `pages/Practice.tsx` | 연습문제 1개 |

### ⚠️ Mock 상태 (실제 로직 필요)
| 영역 | 현재 | 필요한 작업 |
|------|------|------------|
| Part 3 채점 | 80% 고정 | Claude API 연동 |
| Results 점수 | Mock 데이터 | 실제 계산 연결 |
| 6축 역량 | Mock 점수 | 문항별 역량 매핑 |

### ❌ 미구현
| 영역 | 필요성 | 우선순위 |
|------|--------|----------|
| LocalStorage | 새로고침 시 데이터 유실 방지 | 🔴 높음 |
| 사용자 식별 | FGI 참가자 구분 | 🔴 높음 |
| Claude API 연동 | Part 3 실제 채점 | 🔴 높음 |
| 백엔드 저장 | 결과 영구 저장 | 🟡 중간 |

---

## 핵심 데이터 구조

### 문항 데이터 (`data/questions.ts`)
- `part1Questions`: 8개 객관식
- `part2Questions`: 4개 실습형 (dragdrop, highlight, rewrite, ordering)
- `part3TasksAll`: 24개 시나리오 (8직군 × 3유형: execute, review, verify)

### 루브릭 (`data/questions-rubric.ts`)
- 직군별 + 유형별 5단계 채점 기준
- `byTemplate`: execute/review/verify 공통 루브릭
- `byTask`: 문항별 세부 루브릭

### 검증형 문항 (`data/part3-verify-tasks.ts`)
- 5블록 구조: system_prompt, user_template, output_spec, self_check, fallback
- 실시간 검증 로직 포함

---

## FGI까지 필수 작업 (우선순위순)

### 1. LocalStorage 중간 저장 (반나절)
```typescript
// ExamContext.tsx에 추가
useEffect(() => {
  localStorage.setItem('examAnswers', JSON.stringify(answers));
}, [answers]);

// 초기화 시 복원
const [answers, setAnswers] = useState(() => {
  const saved = localStorage.getItem('examAnswers');
  return saved ? JSON.parse(saved) : [];
});
```

### 2. 간단한 사용자 식별 (반나절)
- RulesConsent.tsx에 이름/이메일 입력 필드 추가
- ExamContext에 user 정보 저장

### 3. Claude API 채점 연동 (2-3일)
```typescript
// 예상 구조
async function gradeWithClaude(
  task: Part3Task,
  answer: string,
  rubric: Rubric
): Promise<GradeResult> {
  const response = await fetch('/api/grade', {
    method: 'POST',
    body: JSON.stringify({ task, answer, rubric })
  });
  return response.json();
}
```

### 4. Results 실제 점수 연결 (1일)
- Part 1: 이미 프론트에서 정답 비교 가능
- Part 2: 채점 로직 추가 필요
- Part 3: Claude API 결과 연동

---

## 프로젝트 구조
```
src/
├── app/
│   ├── components/
│   │   ├── ui/           # shadcn/ui 컴포넌트
│   │   ├── part3/        # Part3 검증형 컴포넌트
│   │   ├── ExamShell.tsx # 시험 레이아웃
│   │   ├── Timer.tsx     # 타이머
│   │   └── EssentialBadge.tsx
│   ├── context/
│   │   ├── ExamContext.tsx      # 메인 상태관리
│   │   └── Part3VerifyContext.tsx
│   ├── data/
│   │   ├── questions.ts         # 문항 데이터
│   │   ├── questions-rubric.ts  # 채점 루브릭
│   │   └── part3-verify-tasks.ts
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── RulesConsent.tsx
│   │   ├── Practice.tsx
│   │   ├── Part1.tsx
│   │   ├── Part2.tsx
│   │   ├── Part3.tsx
│   │   └── Results.tsx
│   └── App.tsx
├── styles/
└── main.tsx
```

---

## 실행 방법
```bash
npm install
npm run dev
```

---

## 다음 작업자에게
1. 이 문서를 먼저 읽고 프로젝트 구조 파악
2. `npm run dev`로 로컬 실행 확인
3. 위 "FGI까지 필수 작업" 순서대로 진행
4. Claude API 연동 시 Anthropic API Key 필요 (대표님이 발급)

---

## 관련 문서
- `PART3_VERIFY_DATA_GUIDE.md`: Part3 검증형 문항 데이터 구조 상세
- `guidelines/Guidelines.md`: 코드 스타일 가이드 (빈 상태)
