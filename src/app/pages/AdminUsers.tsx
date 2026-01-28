/**
 * 관리자 사용자 관리 페이지
 * 응시자 및 회원 관리
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Download, MoreHorizontal, Mail, UserX,
  CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight
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

// 사용자 데이터
const users = [
  {
    id: 1,
    name: '김민지',
    email: 'minji.kim@company.com',
    role: '기획/PM',
    company: '테크스타트업',
    registeredAt: '2026-01-15',
    examCount: 2,
    lastScore: 78,
    status: 'active'
  },
  {
    id: 2,
    name: '이준호',
    email: 'junho.lee@corp.kr',
    role: '개발/엔지니어링',
    company: '대기업 IT',
    registeredAt: '2026-01-10',
    examCount: 1,
    lastScore: 85,
    status: 'active'
  },
  {
    id: 3,
    name: '박서연',
    email: 'seoyeon.park@agency.com',
    role: '마케팅',
    company: '광고대행사',
    registeredAt: '2026-01-08',
    examCount: 3,
    lastScore: 62,
    status: 'active'
  },
  {
    id: 4,
    name: '최현우',
    email: 'hyunwoo.choi@design.co',
    role: '디자인',
    company: '디자인 스튜디오',
    registeredAt: '2026-01-05',
    examCount: 1,
    lastScore: 71,
    status: 'active'
  },
  {
    id: 5,
    name: '정수빈',
    email: 'subin.jung@hr.com',
    role: 'HR/인사',
    company: '컨설팅펌',
    registeredAt: '2025-12-28',
    examCount: 0,
    lastScore: null,
    status: 'pending'
  },
  {
    id: 6,
    name: '강도윤',
    email: 'doyun.kang@sales.kr',
    role: '영업',
    company: 'B2B SaaS',
    registeredAt: '2025-12-20',
    examCount: 2,
    lastScore: 55,
    status: 'inactive'
  },
];

type FilterStatus = 'all' | 'active' | 'pending' | 'inactive';

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.includes(searchQuery) ||
                         user.email.includes(searchQuery) ||
                         user.company.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectUser = (id: number) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { label: '활성', bg: '#ECFDF5', color: COLORS.success };
      case 'pending':
        return { label: '대기', bg: '#FEF3C7', color: COLORS.warning };
      case 'inactive':
        return { label: '비활성', bg: '#FEE2E2', color: COLORS.error };
      default:
        return { label: status, bg: COLORS.surface, color: COLORS.textMuted };
    }
  };

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
            <Link to="/admin/stats" className="text-sm" style={{ color: COLORS.textMuted }}>통계</Link>
            <Link to="/admin/users" className="text-sm font-medium" style={{ color: COLORS.gold }}>사용자</Link>
            <Link to="/admin" className="text-sm" style={{ color: COLORS.textMuted }}>시험관리</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>사용자 관리</h1>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>총 {users.length}명의 회원</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: COLORS.navy }}>
            <Download className="w-4 h-4 text-white" />
            <span className="text-sm text-white">내보내기</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl border p-4 mb-6" style={{ borderColor: COLORS.border }}>
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.textMuted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이름, 이메일, 회사명 검색..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
                style={{ borderColor: COLORS.border }}
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {(['all', 'active', 'pending', 'inactive'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: statusFilter === status ? COLORS.navy : 'transparent',
                    color: statusFilter === status ? 'white' : COLORS.textMuted,
                    border: statusFilter === status ? 'none' : `1px solid ${COLORS.border}`
                  }}
                >
                  {status === 'all' ? '전체' :
                   status === 'active' ? '활성' :
                   status === 'pending' ? '대기' : '비활성'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-white rounded-xl border p-4 mb-4 flex items-center justify-between" style={{ borderColor: COLORS.gold }}>
            <span className="text-sm" style={{ color: COLORS.navy }}>
              {selectedUsers.length}명 선택됨
            </span>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm" style={{ backgroundColor: COLORS.surface }}>
                <Mail className="w-4 h-4" />
                메일 발송
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded text-sm text-white" style={{ backgroundColor: COLORS.error }}>
                <UserX className="w-4 h-4" />
                비활성화
              </button>
            </div>
          </div>
        )}

        {/* User Table */}
        <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: COLORS.surface }}>
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium" style={{ color: COLORS.textMuted }}>사용자</th>
                <th className="py-3 px-4 text-left text-sm font-medium" style={{ color: COLORS.textMuted }}>직군/회사</th>
                <th className="py-3 px-4 text-left text-sm font-medium" style={{ color: COLORS.textMuted }}>가입일</th>
                <th className="py-3 px-4 text-center text-sm font-medium" style={{ color: COLORS.textMuted }}>응시횟수</th>
                <th className="py-3 px-4 text-center text-sm font-medium" style={{ color: COLORS.textMuted }}>최근점수</th>
                <th className="py-3 px-4 text-center text-sm font-medium" style={{ color: COLORS.textMuted }}>상태</th>
                <th className="py-3 px-4 text-right text-sm font-medium" style={{ color: COLORS.textMuted }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const statusBadge = getStatusBadge(user.status);
                return (
                  <tr key={user.id} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white" style={{ backgroundColor: COLORS.navy }}>
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: COLORS.navy }}>{user.name}</p>
                          <p className="text-xs" style={{ color: COLORS.textMuted }}>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm" style={{ color: COLORS.navy }}>{user.role}</p>
                      <p className="text-xs" style={{ color: COLORS.textMuted }}>{user.company}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm" style={{ color: COLORS.textMuted }}>{user.registeredAt}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-medium" style={{ color: COLORS.navy }}>{user.examCount}회</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {user.lastScore !== null ? (
                        <span
                          className="text-sm font-medium"
                          style={{ color: user.lastScore >= 60 ? COLORS.success : COLORS.error }}
                        >
                          {user.lastScore}점
                        </span>
                      ) : (
                        <span className="text-sm" style={{ color: COLORS.textMuted }}>-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ backgroundColor: statusBadge.bg, color: statusBadge.color }}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MoreHorizontal className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: COLORS.border }}>
            <span className="text-sm" style={{ color: COLORS.textMuted }}>
              1-{filteredUsers.length} / {users.length}명
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                className="p-2 rounded border"
                style={{ borderColor: COLORS.border, opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                <ChevronLeft className="w-4 h-4" style={{ color: COLORS.textMuted }} />
              </button>
              <button className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: COLORS.navy, color: 'white' }}>
                1
              </button>
              <button className="px-3 py-1 rounded text-sm" style={{ color: COLORS.textMuted }}>2</button>
              <button className="px-3 py-1 rounded text-sm" style={{ color: COLORS.textMuted }}>3</button>
              <button className="p-2 rounded border" style={{ borderColor: COLORS.border }}>
                <ChevronRight className="w-4 h-4" style={{ color: COLORS.textMuted }} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
