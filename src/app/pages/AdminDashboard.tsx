/**
 * 관리자 대시보드
 * 전체 현황 및 주요 지표 모니터링
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, FileText, Award, TrendingUp, Clock, AlertCircle,
  ChevronRight, BarChart3, Calendar, Settings
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

// 통계 카드 데이터
const statsCards = [
  { icon: Users, label: '총 응시자', value: '2,847', change: '+12%', changeType: 'up' },
  { icon: FileText, label: '이번 주 시험', value: '156', change: '+8%', changeType: 'up' },
  { icon: Award, label: '합격률', value: '73.2%', change: '-2.1%', changeType: 'down' },
  { icon: TrendingUp, label: '평균 점수', value: '72.5', change: '+1.3', changeType: 'up' },
];

// 최근 시험 데이터
const recentExams = [
  { id: 1, round: 3, date: '2026-02-08', registered: 72, capacity: 100, status: 'upcoming' },
  { id: 2, round: 2, date: '2026-01-25', registered: 87, capacity: 100, status: 'scoring' },
  { id: 3, round: 1, date: '2026-01-11', registered: 100, capacity: 100, status: 'completed' },
];

// 주간 응시자 데이터
const weeklyData = [
  { day: '월', count: 23 },
  { day: '화', count: 31 },
  { day: '수', count: 45 },
  { day: '목', count: 28 },
  { day: '금', count: 52 },
  { day: '토', count: 67 },
  { day: '일', count: 41 },
];

// 검토 대기 항목
const pendingReviews = [
  { id: 1, type: '답안 검토', examiner: '김민지', count: 12, priority: 'high' },
  { id: 2, type: '이의 신청', examiner: '이준호', count: 3, priority: 'medium' },
  { id: 3, type: '환불 요청', examiner: '박서연', count: 5, priority: 'low' },
];

export const AdminDashboard = () => {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const maxCount = Math.max(...weeklyData.map(d => d.count));

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold" style={{ color: COLORS.navy }}>
              AICT
            </Link>
            <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: COLORS.goldMuted, color: COLORS.gold }}>
              Admin
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/admin/dashboard" className="text-sm font-medium" style={{ color: COLORS.gold }}>대시보드</Link>
            <Link to="/admin/stats" className="text-sm" style={{ color: COLORS.textMuted }}>통계</Link>
            <Link to="/admin/users" className="text-sm" style={{ color: COLORS.textMuted }}>사용자</Link>
            <Link to="/admin" className="text-sm" style={{ color: COLORS.textMuted }}>시험관리</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>관리자 대시보드</h1>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>AICT 시험 운영 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
                    <Icon className="w-5 h-5" style={{ color: COLORS.navy }} />
                  </div>
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      backgroundColor: stat.changeType === 'up' ? '#ECFDF5' : '#FEE2E2',
                      color: stat.changeType === 'up' ? COLORS.success : COLORS.error
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold" style={{ color: COLORS.navy }}>{stat.value}</p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold" style={{ color: COLORS.navy }}>주간 응시자 현황</h2>
              <div className="flex gap-2">
                {(['week', 'month'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className="px-3 py-1 rounded text-sm font-medium"
                    style={{
                      backgroundColor: period === p ? COLORS.navy : 'transparent',
                      color: period === p ? 'white' : COLORS.textMuted
                    }}
                  >
                    {p === 'week' ? '주간' : '월간'}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-4">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${(data.count / maxCount) * 100}%`,
                      backgroundColor: index === 5 ? COLORS.gold : COLORS.navy,
                      opacity: index === 5 ? 1 : 0.6
                    }}
                  />
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold" style={{ color: COLORS.navy }}>검토 대기</h2>
              <AlertCircle className="w-5 h-5" style={{ color: COLORS.warning }} />
            </div>

            <div className="space-y-4">
              {pendingReviews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: COLORS.surface }}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: COLORS.navy }}>{item.type}</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>{item.examiner}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          item.priority === 'high' ? COLORS.error :
                          item.priority === 'medium' ? COLORS.warning : COLORS.success
                      }}
                    />
                    <span className="text-sm font-medium" style={{ color: COLORS.navy }}>{item.count}건</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full mt-4 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1"
              style={{ backgroundColor: COLORS.surface, color: COLORS.navy }}
            >
              전체 보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recent Exams */}
        <div className="mt-6 bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold" style={{ color: COLORS.navy }}>최근 시험 일정</h2>
            <Link to="/admin" className="text-sm font-medium flex items-center gap-1" style={{ color: COLORS.gold }}>
              전체 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.textMuted }}>회차</th>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.textMuted }}>시험일</th>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.textMuted }}>신청/정원</th>
                  <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: COLORS.textMuted }}>상태</th>
                  <th className="text-right py-3 px-4 text-sm font-medium" style={{ color: COLORS.textMuted }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {recentExams.map((exam) => (
                  <tr key={exam.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    <td className="py-3 px-4">
                      <span className="font-medium" style={{ color: COLORS.navy }}>제{exam.round}회</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm" style={{ color: COLORS.navy }}>{exam.date}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm" style={{ color: COLORS.navy }}>
                          {exam.registered}/{exam.capacity}
                        </span>
                        <div className="w-16 h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.border }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(exam.registered / exam.capacity) * 100}%`,
                              backgroundColor: exam.registered >= exam.capacity ? COLORS.error : COLORS.gold
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor:
                            exam.status === 'upcoming' ? '#EFF6FF' :
                            exam.status === 'scoring' ? '#F3E8FF' : '#F1F5F9',
                          color:
                            exam.status === 'upcoming' ? '#2563EB' :
                            exam.status === 'scoring' ? '#7C3AED' : COLORS.textMuted
                        }}
                      >
                        {exam.status === 'upcoming' ? '예정' :
                         exam.status === 'scoring' ? '채점중' : '완료'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-sm font-medium" style={{ color: COLORS.gold }}>
                        상세
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
