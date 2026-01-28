/**
 * 시험 일정 페이지
 * 월별 시험 회차 조회 및 신청
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar, Clock, Users, ChevronLeft, ChevronRight, ArrowRight,
  CheckCircle2, AlertCircle, Timer, Lock, Award, Mail
} from 'lucide-react';

const COLORS = {
  navy: '#1E3A5F',
  gold: '#C9A227',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
  warning: '#D97706',
};

// 시험 회차 상태
type SessionStatus =
  | 'upcoming'      // 접수 예정
  | 'open'          // 접수 중
  | 'closing_soon'  // 마감 임박
  | 'closed'        // 접수 마감
  | 'in_progress'   // 시험 진행 중
  | 'scoring'       // 채점 중
  | 'completed';    // 완료

interface ExamSession {
  id: number;
  round: number;           // 회차
  year: number;
  month: number;
  examDate: string;        // 시험일
  examTime: string;        // 시험 시간
  registrationStart: string;
  registrationEnd: string;
  capacity: number;        // 정원
  registered: number;      // 신청 인원
  status: SessionStatus;
  price: number;
}

// 2026년 시험 일정 더미 데이터
const examSessions: ExamSession[] = [
  // 1월
  {
    id: 1, round: 1, year: 2026, month: 1,
    examDate: '2026-01-11', examTime: '14:00',
    registrationStart: '2025-12-20', registrationEnd: '2026-01-08',
    capacity: 100, registered: 100, status: 'completed', price: 49000
  },
  {
    id: 2, round: 2, year: 2026, month: 1,
    examDate: '2026-01-25', examTime: '14:00',
    registrationStart: '2026-01-06', registrationEnd: '2026-01-22',
    capacity: 100, registered: 87, status: 'scoring', price: 49000
  },
  // 2월
  {
    id: 3, round: 3, year: 2026, month: 2,
    examDate: '2026-02-08', examTime: '14:00',
    registrationStart: '2026-01-20', registrationEnd: '2026-02-05',
    capacity: 100, registered: 72, status: 'closing_soon', price: 49000
  },
  {
    id: 4, round: 4, year: 2026, month: 2,
    examDate: '2026-02-22', examTime: '14:00',
    registrationStart: '2026-02-03', registrationEnd: '2026-02-19',
    capacity: 100, registered: 23, status: 'open', price: 49000
  },
  // 3월
  {
    id: 5, round: 5, year: 2026, month: 3,
    examDate: '2026-03-14', examTime: '14:00',
    registrationStart: '2026-02-24', registrationEnd: '2026-03-11',
    capacity: 100, registered: 0, status: 'upcoming', price: 49000
  },
  {
    id: 6, round: 6, year: 2026, month: 3,
    examDate: '2026-03-28', examTime: '14:00',
    registrationStart: '2026-03-09', registrationEnd: '2026-03-25',
    capacity: 100, registered: 0, status: 'upcoming', price: 49000
  },
];

const statusConfig: Record<SessionStatus, { label: string; color: string; bg: string }> = {
  upcoming: { label: '접수 예정', color: COLORS.textMuted, bg: '#F1F5F9' },
  open: { label: '접수 중', color: COLORS.success, bg: '#ECFDF5' },
  closing_soon: { label: '마감 임박', color: COLORS.warning, bg: '#FEF3C7' },
  closed: { label: '접수 마감', color: COLORS.error, bg: '#FEE2E2' },
  in_progress: { label: '시험 진행 중', color: '#2563EB', bg: '#EFF6FF' },
  scoring: { label: '채점 중', color: '#7C3AED', bg: '#F3E8FF' },
  completed: { label: '완료', color: COLORS.textMuted, bg: '#F1F5F9' },
};

export const Schedule = () => {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(2); // 2월 기준
  const [selectedSession, setSelectedSession] = useState<ExamSession | null>(null);

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // 현재 월의 시험 일정
  const currentMonthSessions = examSessions.filter(
    s => s.year === currentYear && s.month === currentMonth
  );

  // 달력 생성
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days: (number | null)[] = [];

    // 빈 칸 채우기
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // 날짜 채우기
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendar();

  // 특정 날짜에 시험이 있는지 확인
  const getExamOnDay = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return examSessions.find(s => s.examDate === dateStr);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleApply = (session: ExamSession) => {
    if (session.status === 'open' || session.status === 'closing_soon') {
      navigate('/payment', { state: { sessionId: session.id, round: session.round } });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold" style={{ color: COLORS.navy }}>
            AICT
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/schedule" className="text-sm font-medium" style={{ color: COLORS.gold }}>
              시험 일정
            </Link>
            <Link to="/dashboard" className="text-sm" style={{ color: COLORS.textMuted }}>
              마이페이지
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3" style={{ color: COLORS.navy }}>
            AICT 시험 일정
          </h1>
          <p className="text-lg" style={{ color: COLORS.textMuted }}>
            매월 1~2회 정기 시험이 진행됩니다
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: COLORS.border }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
              <Clock className="w-5 h-5" style={{ color: COLORS.navy }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.navy }}>동시 시작</p>
              <p className="text-xs" style={{ color: COLORS.textMuted }}>전원 동일 시간 응시</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: COLORS.border }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
              <Users className="w-5 h-5" style={{ color: COLORS.navy }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.navy }}>정원 100명</p>
              <p className="text-xs" style={{ color: COLORS.textMuted }}>회차당 제한 인원</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: COLORS.border }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
              <Award className="w-5 h-5" style={{ color: COLORS.navy }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.navy }}>즉시 결과</p>
              <p className="text-xs" style={{ color: COLORS.textMuted }}>임시 결과 즉시 확인</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: COLORS.border }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
              <Mail className="w-5 h-5" style={{ color: COLORS.navy }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: COLORS.navy }}>최종 안내</p>
              <p className="text-xs" style={{ color: COLORS.textMuted }}>검증 후 메일 발송</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: COLORS.navy }} />
              </button>
              <h2 className="text-xl font-bold" style={{ color: COLORS.navy }}>
                {currentYear}년 {monthNames[currentMonth - 1]}
              </h2>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" style={{ color: COLORS.navy }} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div
                  key={day}
                  className="text-center py-2 text-sm font-medium"
                  style={{ color: day === '일' ? COLORS.error : day === '토' ? '#2563EB' : COLORS.textMuted }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const exam = getExamOnDay(day);
                const isToday = day === 28 && currentMonth === 1 && currentYear === 2026; // 오늘 날짜 표시용

                return (
                  <div
                    key={index}
                    className={`
                      aspect-square p-1 rounded-lg relative
                      ${day ? 'cursor-pointer hover:bg-gray-50' : ''}
                      ${exam ? 'ring-2' : ''}
                    `}
                    style={{
                      backgroundColor: exam ? statusConfig[exam.status].bg : 'transparent',
                      ringColor: exam ? statusConfig[exam.status].color : 'transparent'
                    }}
                    onClick={() => exam && setSelectedSession(exam)}
                  >
                    {day && (
                      <>
                        <span
                          className={`
                            text-sm font-medium block text-center
                            ${isToday ? 'bg-navy text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}
                          `}
                          style={{
                            color: isToday ? 'white' : exam ? COLORS.navy : (index % 7 === 0 ? COLORS.error : index % 7 === 6 ? '#2563EB' : COLORS.navy),
                            backgroundColor: isToday ? COLORS.navy : 'transparent'
                          }}
                        >
                          {day}
                        </span>
                        {exam && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                            <span
                              className="text-[10px] font-medium px-1 rounded"
                              style={{ color: statusConfig[exam.status].color }}
                            >
                              {exam.round}회차
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t flex flex-wrap gap-4" style={{ borderColor: COLORS.border }}>
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: config.bg, border: `1px solid ${config.color}` }} />
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>{config.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Session List / Details */}
          <div className="space-y-4">
            {selectedSession ? (
              // Session Detail
              <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold" style={{ color: COLORS.navy }}>
                    제{selectedSession.round}회 AICT
                  </h3>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: statusConfig[selectedSession.status].bg,
                      color: statusConfig[selectedSession.status].color
                    }}
                  >
                    {statusConfig[selectedSession.status].label}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" style={{ color: COLORS.textMuted }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
                        {selectedSession.examDate} {selectedSession.examTime}
                      </p>
                      <p className="text-xs" style={{ color: COLORS.textMuted }}>시험 일시</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Timer className="w-4 h-4" style={{ color: COLORS.textMuted }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
                        {formatDate(selectedSession.registrationStart)} ~ {formatDate(selectedSession.registrationEnd)}
                      </p>
                      <p className="text-xs" style={{ color: COLORS.textMuted }}>접수 기간</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4" style={{ color: COLORS.textMuted }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
                          {selectedSession.registered} / {selectedSession.capacity}명
                        </p>
                        <p className="text-xs" style={{ color: COLORS.textMuted }}>
                          {Math.round((selectedSession.registered / selectedSession.capacity) * 100)}%
                        </p>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.border }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(selectedSession.registered / selectedSession.capacity) * 100}%`,
                            backgroundColor: selectedSession.registered >= selectedSession.capacity ? COLORS.error : COLORS.gold
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: COLORS.surface }}>
                  <p className="text-lg font-bold" style={{ color: COLORS.navy }}>
                    {selectedSession.price.toLocaleString()}원
                  </p>
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>응시료 (VAT 포함)</p>
                </div>

                {(selectedSession.status === 'open' || selectedSession.status === 'closing_soon') ? (
                  <button
                    onClick={() => handleApply(selectedSession)}
                    className="w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.gold }}
                  >
                    신청하기
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : selectedSession.status === 'upcoming' ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.border, color: COLORS.textMuted }}
                  >
                    <Lock className="w-4 h-4" />
                    접수 예정
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                    style={{ backgroundColor: COLORS.border, color: COLORS.textMuted }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    접수 마감
                  </button>
                )}

                <button
                  onClick={() => setSelectedSession(null)}
                  className="w-full mt-2 py-2 text-sm"
                  style={{ color: COLORS.textMuted }}
                >
                  목록으로
                </button>
              </div>
            ) : (
              // Session List
              <>
                <h3 className="font-bold" style={{ color: COLORS.navy }}>
                  {monthNames[currentMonth - 1]} 시험 일정
                </h3>
                {currentMonthSessions.length > 0 ? (
                  currentMonthSessions.map(session => (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className="bg-white rounded-xl border p-4 cursor-pointer hover:shadow-md transition-shadow"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold" style={{ color: COLORS.navy }}>
                          제{session.round}회
                        </span>
                        <span
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: statusConfig[session.status].bg,
                            color: statusConfig[session.status].color
                          }}
                        >
                          {statusConfig[session.status].label}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: COLORS.navy }}>
                        {session.examDate} {session.examTime}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: COLORS.textMuted }}>
                          <Users className="w-3 h-3" />
                          {session.registered}/{session.capacity}명
                        </div>
                        <span className="text-sm font-medium" style={{ color: COLORS.gold }}>
                          상세보기 →
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl border p-6 text-center" style={{ borderColor: COLORS.border }}>
                    <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: COLORS.textMuted }} />
                    <p className="text-sm" style={{ color: COLORS.textMuted }}>
                      이 달에는 예정된 시험이 없습니다
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Notice */}
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: COLORS.border }}>
              <h4 className="font-medium mb-3" style={{ color: COLORS.navy }}>안내사항</h4>
              <ul className="space-y-2 text-xs" style={{ color: COLORS.textMuted }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.gold }}>•</span>
                  시험은 지정된 시간에 동시 시작됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.gold }}>•</span>
                  시험 종료 후 임시 결과를 즉시 확인할 수 있습니다
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.gold }}>•</span>
                  최종 결과는 검증 후 이메일로 안내됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: COLORS.gold }}>•</span>
                  재응시는 다음 회차부터 가능합니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
