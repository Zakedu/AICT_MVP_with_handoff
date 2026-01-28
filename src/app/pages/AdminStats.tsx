/**
 * 관리자 통계 페이지
 * 시험 결과 및 응시자 분석
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Users, Award, BarChart3, PieChart,
  Download, Calendar, Filter
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
};

// 월별 통계
const monthlyStats = [
  { month: '2025.10', applicants: 89, passRate: 71.2, avgScore: 69.8 },
  { month: '2025.11', applicants: 124, passRate: 73.5, avgScore: 71.2 },
  { month: '2025.12', applicants: 156, passRate: 72.8, avgScore: 70.5 },
  { month: '2026.01', applicants: 187, passRate: 74.1, avgScore: 72.5 },
];

// 역량별 평균 점수
const competencyScores = [
  { name: 'Defining', nameKr: '문제정의', score: 75, color: '#3B82F6' },
  { name: 'Prompting', nameKr: '프롬프트설계', score: 68, color: '#8B5CF6' },
  { name: 'Refining', nameKr: '결과검증', score: 72, color: '#EC4899' },
  { name: 'Protecting', nameKr: '데이터보호', score: 78, color: '#10B981' },
  { name: 'Acumen', nameKr: '비즈니스판단', score: 65, color: '#F59E0B' },
  { name: 'Integrating', nameKr: '업무통합', score: 70, color: '#EF4444' },
];

// 직군별 분포
const roleDistribution = [
  { role: '개발/엔지니어링', count: 487, percentage: 28 },
  { role: '기획/PM', count: 312, percentage: 18 },
  { role: '마케팅', count: 276, percentage: 16 },
  { role: '디자인', count: 189, percentage: 11 },
  { role: 'HR/인사', count: 154, percentage: 9 },
  { role: '영업', count: 142, percentage: 8 },
  { role: '기타', count: 174, percentage: 10 },
];

// 점수 분포
const scoreDistribution = [
  { range: '0-20', count: 12 },
  { range: '21-40', count: 45 },
  { range: '41-60', count: 156 },
  { range: '61-80', count: 423 },
  { range: '81-100', count: 211 },
];

export const AdminStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2026.01');

  const maxApplicants = Math.max(...monthlyStats.map(s => s.applicants));
  const maxScoreCount = Math.max(...scoreDistribution.map(s => s.count));

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
            <Link to="/admin/dashboard" className="text-sm" style={{ color: COLORS.textMuted }}>대시보드</Link>
            <Link to="/admin/stats" className="text-sm font-medium" style={{ color: COLORS.gold }}>통계</Link>
            <Link to="/admin/users" className="text-sm" style={{ color: COLORS.textMuted }}>사용자</Link>
            <Link to="/admin" className="text-sm" style={{ color: COLORS.textMuted }}>시험관리</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>통계 분석</h1>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>시험 결과 및 응시자 분석 데이터</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: COLORS.border }}>
              <Filter className="w-4 h-4" style={{ color: COLORS.textMuted }} />
              <span className="text-sm" style={{ color: COLORS.textMuted }}>필터</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: COLORS.navy }}>
              <Download className="w-4 h-4 text-white" />
              <span className="text-sm text-white">리포트 다운로드</span>
            </button>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="bg-white rounded-xl border p-6 mb-6" style={{ borderColor: COLORS.border }}>
          <h2 className="font-bold mb-6" style={{ color: COLORS.navy }}>월별 추이</h2>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {monthlyStats.map((stat, index) => (
              <button
                key={stat.month}
                onClick={() => setSelectedPeriod(stat.month)}
                className={`p-4 rounded-lg border transition-all ${selectedPeriod === stat.month ? 'ring-2' : ''}`}
                style={{
                  borderColor: selectedPeriod === stat.month ? COLORS.gold : COLORS.border,
                  ringColor: COLORS.gold
                }}
              >
                <p className="text-sm font-medium mb-2" style={{ color: COLORS.textMuted }}>{stat.month}</p>
                <p className="text-xl font-bold" style={{ color: COLORS.navy }}>{stat.applicants}명</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs" style={{ color: COLORS.success }}>합격률 {stat.passRate}%</span>
                </div>
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-40 flex items-end justify-between gap-2">
            {monthlyStats.map((stat, index) => (
              <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t transition-all"
                  style={{
                    height: `${(stat.applicants / maxApplicants) * 100}%`,
                    backgroundColor: selectedPeriod === stat.month ? COLORS.gold : COLORS.navy,
                    opacity: selectedPeriod === stat.month ? 1 : 0.4
                  }}
                />
                <span className="text-xs" style={{ color: COLORS.textMuted }}>{stat.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Daily Trend */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>일별 응시 현황</h2>
            <div className="space-y-4">
              {[
                { date: '01/28 (화)', count: 45, change: '+12%' },
                { date: '01/27 (월)', count: 38, change: '+5%' },
                { date: '01/26 (일)', count: 67, change: '+23%' },
                { date: '01/25 (토)', count: 54, change: '-8%' },
              ].map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm w-24" style={{ color: COLORS.textMuted }}>{day.date}</span>
                  <div className="flex-1 h-6 rounded overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${(day.count / 70) * 100}%`,
                        backgroundColor: COLORS.navy
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12" style={{ color: COLORS.navy }}>{day.count}명</span>
                  <span
                    className="text-xs w-12"
                    style={{ color: day.change.startsWith('+') ? COLORS.success : COLORS.error }}
                  >
                    {day.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Scores */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>역량별 평균 점수</h2>
            <div className="space-y-4">
              {competencyScores.map((comp) => (
                <div key={comp.name} className="flex items-center gap-4">
                  <div className="w-24">
                    <p className="text-sm font-medium" style={{ color: COLORS.navy }}>{comp.name}</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>{comp.nameKr}</p>
                  </div>
                  <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${comp.score}%`,
                        backgroundColor: comp.color
                      }}
                    />
                  </div>
                  <span className="text-sm font-bold w-12" style={{ color: COLORS.navy }}>{comp.score}점</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Distribution */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>직군별 분포</h2>
            <div className="space-y-3">
              {roleDistribution.map((role) => (
                <div key={role.role} className="flex items-center gap-4">
                  <span className="text-sm w-32 truncate" style={{ color: COLORS.navy }}>{role.role}</span>
                  <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.surface }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${role.percentage}%`,
                        backgroundColor: COLORS.gold
                      }}
                    />
                  </div>
                  <span className="text-sm w-16 text-right" style={{ color: COLORS.textMuted }}>
                    {role.count}명 ({role.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>점수 분포</h2>
            <div className="h-48 flex items-end justify-between gap-4">
              {scoreDistribution.map((score) => (
                <div key={score.range} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium" style={{ color: COLORS.navy }}>{score.count}</span>
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${(score.count / maxScoreCount) * 100}%`,
                      backgroundColor: score.range === '61-80' ? COLORS.gold : COLORS.navy,
                      opacity: score.range === '61-80' ? 1 : 0.6
                    }}
                  />
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>{score.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: COLORS.border }}>
              <span className="text-sm" style={{ color: COLORS.textMuted }}>합격선: 60점</span>
              <span className="text-sm font-medium" style={{ color: COLORS.success }}>합격자 634명 (74.9%)</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
