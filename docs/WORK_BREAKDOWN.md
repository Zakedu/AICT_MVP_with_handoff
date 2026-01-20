# AICT 서비스 개발 작업 분해 (WBS)

> ARCHITECTURE_WIREFRAME.md 기반 작업 목록

---

## 개요

| 구분 | 현재 상태 | 목표 상태 |
|------|----------|----------|
| **Frontend** | ✅ 80% 완료 | UI/UX 완성 + API 연동 |
| **Backend** | ❌ 없음 | FastAPI + 핵심 API |
| **Database** | ❌ 없음 | Supabase/RDS 구축 |
| **인증** | ⚠️ LocalStorage만 | JWT 기반 인증 |
| **채점** | ⚠️ 클라이언트만 | 서버 저장 + AI 연동 |

---

## Phase 1: MVP 완성 (2주)

### 1.1 인프라 셋업 [3일]

| # | 작업 | 상세 | 산출물 | 담당 |
|---|------|------|--------|------|
| 1.1.1 | Supabase 프로젝트 생성 | 프로젝트 생성, 환경변수 설정 | `.env` 파일 | DevOps |
| 1.1.2 | DB 스키마 생성 | users, exam_sessions, answers, scores 테이블 | SQL 마이그레이션 | Backend |
| 1.1.3 | Supabase Auth 설정 | Email 로그인, 소셜 로그인(선택) | Auth 설정 완료 | Backend |
| 1.1.4 | FastAPI 프로젝트 초기화 | 프로젝트 구조, Docker 설정 | `/backend` 폴더 | Backend |
| 1.1.5 | CI/CD 파이프라인 | GitHub Actions, 자동 배포 | `.github/workflows` | DevOps |

```
산출물 체크리스트:
□ Supabase 대시보드 접근 가능
□ DB 테이블 6개 생성 완료
□ FastAPI /health 엔드포인트 응답
□ 환경별 설정 분리 (dev/prod)
```

---

### 1.2 인증 시스템 [4일]

| # | 작업 | 상세 | API | 담당 |
|---|------|------|-----|------|
| 1.2.1 | 회원가입 API | 이메일 검증, 비밀번호 해시 | `POST /auth/register` | Backend |
| 1.2.2 | 로그인 API | JWT 발급, Refresh Token | `POST /auth/login` | Backend |
| 1.2.3 | 토큰 갱신 API | Access Token 재발급 | `POST /auth/refresh` | Backend |
| 1.2.4 | 프론트 AuthContext | Supabase Auth 연동 | - | Frontend |
| 1.2.5 | 로그인/회원가입 UI | Landing 페이지 수정 | - | Frontend |
| 1.2.6 | Protected Route | 인증 필요 페이지 가드 | - | Frontend |

```typescript
// Frontend AuthContext 구조
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
```

```
산출물 체크리스트:
□ 회원가입 → 로그인 → 시험 진입 플로우 동작
□ 새로고침 시 로그인 상태 유지
□ 비로그인 시 /exam 접근 차단
□ 로그아웃 동작 확인
```

---

### 1.3 시험 세션 관리 [5일]

| # | 작업 | 상세 | API | 담당 |
|---|------|------|-----|------|
| 1.3.1 | 세션 생성 API | 사용자별 시험 세션 생성 | `POST /exams/sessions` | Backend |
| 1.3.2 | 문항 추출 API | 역량별 랜덤 추출 로직 | `GET /exams/sessions/:id/questions` | Backend |
| 1.3.3 | 시험 시작 API | 시작 시간 기록, 상태 변경 | `POST /exams/sessions/:id/start` | Backend |
| 1.3.4 | 답안 저장 API | 자동저장 (30초 인터벌) | `POST /exams/sessions/:id/answers` | Backend |
| 1.3.5 | 시험 제출 API | 최종 제출, 상태 변경 | `POST /exams/sessions/:id/submit` | Backend |
| 1.3.6 | Frontend 연동 | ExamContext API 호출 연결 | - | Frontend |
| 1.3.7 | 자동저장 훅 | useAutoSave 구현 | - | Frontend |

```
데이터 흐름:
1. 시험 시작 버튼 → POST /exams/sessions (세션 생성)
2. 문항 로드 → GET /exams/sessions/:id/questions
3. 답안 입력 → 30초마다 POST /exams/sessions/:id/answers
4. 제출 버튼 → POST /exams/sessions/:id/submit
```

```
산출물 체크리스트:
□ 시험 시작 시 서버에 세션 생성됨
□ 답안 입력 시 30초마다 서버 저장
□ 새로고침 시 답안 복원
□ 제출 시 세션 상태가 'submitted'로 변경
```

---

### 1.4 채점 시스템 [4일]

| # | 작업 | 상세 | API | 담당 |
|---|------|------|-----|------|
| 1.4.1 | Part 1,2 자동채점 | 정답 비교 로직 | `POST /scoring/auto` | Backend |
| 1.4.2 | Part 3 AI 채점 | Claude API 연동 | `POST /scoring/ai` | Backend |
| 1.4.3 | 채점 결과 저장 | scores 테이블 저장 | - | Backend |
| 1.4.4 | 결과 조회 API | 파트별/역량별 점수 | `GET /scoring/results/:session_id` | Backend |
| 1.4.5 | Results 페이지 연동 | API에서 결과 조회 | - | Frontend |

```
채점 파이프라인:
제출 → Part1 자동채점 → Part2 자동채점 → Part3 AI채점(비동기) → 결과 저장
```

```
산출물 체크리스트:
□ Part 1,2 즉시 채점 완료
□ Part 3 AI 채점 결과 저장
□ Results 페이지에서 결과 조회 가능
□ 역량별 점수 차트 표시
```

---

## Phase 2: Admin 기능 (2주)

### 2.1 관리자 인증 [2일]

| # | 작업 | 상세 |
|---|------|------|
| 2.1.1 | Admin Role 추가 | users 테이블 role 필드 활용 |
| 2.1.2 | Admin Guard | role='admin' 체크 미들웨어 |
| 2.1.3 | Admin 라우트 보호 | /admin/* 접근 제어 |

---

### 2.2 문항 관리 [4일]

| # | 작업 | 상세 | API |
|---|------|------|-----|
| 2.2.1 | 문항 목록 API | 필터/페이지네이션 | `GET /questions` |
| 2.2.2 | 문항 생성 API | 유효성 검증 | `POST /questions` |
| 2.2.3 | 문항 수정 API | 부분 업데이트 | `PUT /questions/:id` |
| 2.2.4 | 문항 삭제 API | Soft delete | `DELETE /questions/:id` |
| 2.2.5 | CSV Import API | 일괄 업로드 | `POST /questions/import` |
| 2.2.6 | CSV Export API | 다운로드 | `GET /questions/export` |
| 2.2.7 | 문항 관리 UI | CRUD 화면 | - |

```
산출물 체크리스트:
□ 문항 목록 조회 (필터: part, competency, type)
□ 새 문항 추가 폼
□ 기존 문항 편집
□ CSV 업로드로 일괄 등록
□ CSV 다운로드로 백업
```

---

### 2.3 사용자/시험 관리 [3일]

| # | 작업 | 상세 | API |
|---|------|------|-----|
| 2.3.1 | 사용자 목록 API | 검색/필터 | `GET /users` |
| 2.3.2 | 사용자 시험 이력 | 세션 목록 | `GET /users/:id/exams` |
| 2.3.3 | 시험 세션 목록 | 전체 세션 조회 | `GET /exams/sessions` |
| 2.3.4 | 관리 UI | 테이블 + 상세 |  - |

---

### 2.4 통계/리포트 [3일]

| # | 작업 | 상세 | API |
|---|------|------|-----|
| 2.4.1 | 전체 현황 API | 응시자수, 평균점수 | `GET /analytics/overview` |
| 2.4.2 | 역량별 통계 API | 역량별 평균/분포 | `GET /analytics/by-competency` |
| 2.4.3 | 문항 분석 API | 정답률, 변별도 | `GET /analytics/item-analysis` |
| 2.4.4 | 대시보드 UI | 차트 시각화 | - |

```
산출물 체크리스트:
□ 오늘/이번주/이번달 응시자 수
□ 평균 점수 트렌드
□ 역량별 레이더 차트
□ 문항별 정답률 표
```

---

## Phase 3: 고도화 (1개월+)

### 3.1 시험 무결성 [1주]

| # | 작업 | 상세 |
|---|------|------|
| 3.1.1 | 탭 이탈 감지 | visibility API 활용 |
| 3.1.2 | 복사/붙여넣기 감지 | 이벤트 로깅 |
| 3.1.3 | 시간 검증 | 서버 타임스탬프 비교 |
| 3.1.4 | 행동 로깅 | activity_logs 저장 |

---

### 3.2 실시간 기능 [1주]

| # | 작업 | 상세 |
|---|------|------|
| 3.2.1 | WebSocket 서버 | FastAPI WebSocket |
| 3.2.2 | 실시간 자동저장 | 입력 시 즉시 저장 |
| 3.2.3 | 감독관 모니터링 | 진행 중 세션 실시간 조회 |
| 3.2.4 | 알림 시스템 | 부정행위 감지 알림 |

---

### 3.3 성능 최적화 [1주]

| # | 작업 | 상세 |
|---|------|------|
| 3.3.1 | Redis 캐싱 | 문항 데이터 캐시 |
| 3.3.2 | CDN 설정 | 정적 자산 캐싱 |
| 3.3.3 | DB 인덱스 최적화 | 쿼리 성능 개선 |
| 3.3.4 | API 응답 압축 | gzip 적용 |

---

### 3.4 추가 기능 [2주+]

| # | 작업 | 우선순위 |
|---|------|---------|
| 3.4.1 | 인증서 발급 | Medium |
| 3.4.2 | 이메일 알림 | Medium |
| 3.4.3 | 연습 모드 | Low |
| 3.4.4 | 다국어 지원 | Low |
| 3.4.5 | 모바일 앱 | Low |

---

## 기술 스택 확정

### Frontend (현재)
```
React 18 + TypeScript + Vite
├── 상태관리: Context API (→ 필요시 Zustand)
├── 스타일: CSS Modules (현재) / Tailwind (권장)
├── 차트: Recharts
├── HTTP: fetch (→ axios 권장)
└── 배포: Netlify / Vercel
```

### Backend (신규)
```
FastAPI + Python 3.11
├── ORM: SQLAlchemy 2.0
├── 인증: Supabase Auth / JWT
├── 검증: Pydantic v2
├── 비동기: asyncio + httpx
├── 테스트: pytest + httpx
└── 배포: Cloud Run / EC2
```

### Database
```
PostgreSQL (Supabase / AWS RDS)
├── 캐시: Redis (Phase 3)
├── 파일: Supabase Storage / S3
└── 로그: CloudWatch / Supabase Logs
```

### External APIs
```
├── Claude API: Part 3 채점
├── SendGrid: 이메일 (Phase 2)
└── Sentry: 에러 트래킹 (Phase 2)
```

---

## 일정 요약

```
Week 1-2:  Phase 1 (MVP 완성)
           ├── 인프라 셋업
           ├── 인증 시스템
           ├── 시험 세션 관리
           └── 채점 시스템

Week 3-4:  Phase 2 (Admin)
           ├── 관리자 인증
           ├── 문항 관리
           ├── 사용자 관리
           └── 통계/리포트

Week 5-8:  Phase 3 (고도화)
           ├── 시험 무결성
           ├── 실시간 기능
           ├── 성능 최적화
           └── 추가 기능
```

---

## 즉시 시작 가능한 작업

### 오늘 바로 시작
1. **Supabase 프로젝트 생성** → 10분
2. **DB 스키마 SQL 작성** → 30분
3. **FastAPI 프로젝트 초기화** → 20분

### 이번 주 목표
- [ ] 인증 시스템 완료 (로그인/회원가입)
- [ ] 시험 세션 API 기본 구조
- [ ] 프론트엔드 API 연동 시작

---

## 의사결정 필요 사항

| 항목 | 옵션 A | 옵션 B | 권장 |
|------|--------|--------|------|
| **DB** | Supabase (간편) | AWS RDS (확장성) | Supabase (MVP) |
| **인증** | Supabase Auth | 직접 구현 | Supabase Auth |
| **배포** | Cloud Run | EC2 | Cloud Run (MVP) |
| **캐시** | 없음 (MVP) | Redis | 없음 (Phase 3) |
| **파일저장** | Supabase Storage | S3 | Supabase (MVP) |

---

## 다음 액션

1. 위 의사결정 항목 확정
2. Supabase 프로젝트 생성
3. Backend 프로젝트 구조 생성
4. Phase 1 스프린트 시작
