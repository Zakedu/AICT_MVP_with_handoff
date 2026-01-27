/**
 * 인증서 검증 페이지
 * QR 코드 스캔 시 인증서 유효성을 확인하는 페이지입니다.
 */

import { useParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, Award, Calendar, User, Briefcase, Shield } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';

// 색상 상수
const COLORS = {
  navy: '#1E3A5F',
  navyDark: '#152A45',
  gold: '#C9A227',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
  warning: '#D97706',
};

// Mock 인증서 데이터 (실제로는 서버에서 조회)
const MOCK_CERTIFICATES: Record<string, {
  valid: boolean;
  expired: boolean;
  revoked: boolean;
  name: string;
  score: number;
  jobRole: string;
  examDate: string;
  expiryDate: string;
}> = {
  'AICT-2026-012345': {
    valid: true,
    expired: false,
    revoked: false,
    name: '홍길동',
    score: 82,
    jobRole: '미디어 플래너',
    examDate: '2026-01-27',
    expiryDate: '2027-01-27',
  },
  'AICT-2025-999999': {
    valid: false,
    expired: true,
    revoked: false,
    name: '김만료',
    score: 75,
    jobRole: '마케터',
    examDate: '2024-01-15',
    expiryDate: '2025-01-15',
  },
};

export const Verify = () => {
  const { certificateId } = useParams<{ certificateId: string }>();

  // localStorage에서 인증서 데이터 조회 시도
  const getStoredCertificate = () => {
    try {
      const stored = localStorage.getItem('aict_certificate');
      if (stored) {
        const cert = JSON.parse(stored);
        if (cert.certificateId === certificateId) {
          return {
            valid: true,
            expired: new Date(cert.expiryDate) < new Date(),
            revoked: false,
            name: cert.name,
            score: cert.score,
            jobRole: cert.jobRole,
            examDate: cert.examDate,
            expiryDate: cert.expiryDate,
          };
        }
      }
    } catch {
      // ignore
    }
    return null;
  };

  const certificate = getStoredCertificate() || MOCK_CERTIFICATES[certificateId || ''];
  const notFound = !certificate;

  // 상태 결정
  const getStatus = () => {
    if (notFound) return 'not_found';
    if (certificate.revoked) return 'revoked';
    if (certificate.expired) return 'expired';
    if (certificate.valid) return 'valid';
    return 'invalid';
  };

  const status = getStatus();

  // 상태별 UI 설정
  const statusConfig = {
    valid: {
      icon: CheckCircle,
      color: COLORS.success,
      bgColor: '#ECFDF5',
      title: '유효한 인증서입니다',
      subtitle: '이 인증서는 AICT에서 공식 발급한 것입니다.',
    },
    expired: {
      icon: AlertTriangle,
      color: COLORS.warning,
      bgColor: '#FEF3C7',
      title: '만료된 인증서입니다',
      subtitle: '이 인증서의 유효기간이 지났습니다.',
    },
    revoked: {
      icon: XCircle,
      color: COLORS.error,
      bgColor: '#FEE2E2',
      title: '취소된 인증서입니다',
      subtitle: '이 인증서는 부정행위 등의 사유로 취소되었습니다.',
    },
    not_found: {
      icon: XCircle,
      color: COLORS.error,
      bgColor: '#FEE2E2',
      title: '인증서를 찾을 수 없습니다',
      subtitle: '유효하지 않은 인증번호입니다.',
    },
    invalid: {
      icon: XCircle,
      color: COLORS.error,
      bgColor: '#FEE2E2',
      title: '유효하지 않은 인증서입니다',
      subtitle: '이 인증서는 유효하지 않습니다.',
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  // 이름 마스킹 (가운데 글자)
  const maskName = (name: string) => {
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center gap-3">
          <EssentialBadge size="small" showLabel={false} />
          <div>
            <h1 className="font-bold" style={{ color: COLORS.navy }}>AICT Essential</h1>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>인증서 검증</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Status Card */}
          <div
            className="rounded-2xl p-8 text-center mb-6"
            style={{ backgroundColor: config.bgColor }}
          >
            <StatusIcon
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: config.color }}
            />
            <h2 className="text-xl font-bold mb-2" style={{ color: config.color }}>
              {config.title}
            </h2>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              {config.subtitle}
            </p>
          </div>

          {/* Certificate Details */}
          {certificate && (
            <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
              {/* Certificate ID */}
              <div className="px-6 py-4 border-b" style={{ borderColor: COLORS.border, backgroundColor: COLORS.goldMuted }}>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4" style={{ color: COLORS.gold }} />
                  <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>인증번호</span>
                </div>
                <p className="font-mono font-bold" style={{ color: COLORS.navy }}>{certificateId}</p>
              </div>

              {/* Details Grid */}
              <div className="divide-y" style={{ borderColor: COLORS.border }}>
                {/* Name */}
                <div className="px-6 py-4 flex items-center gap-4">
                  <User className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                  <div>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>성명</p>
                    <p className="font-medium" style={{ color: COLORS.navy }}>
                      {maskName(certificate.name)}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="px-6 py-4 flex items-center gap-4">
                  <Award className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                  <div>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>점수</p>
                    <p className="font-medium" style={{ color: COLORS.navy }}>
                      {certificate.score}/100 (PASS)
                    </p>
                  </div>
                </div>

                {/* Job Role */}
                <div className="px-6 py-4 flex items-center gap-4">
                  <Briefcase className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                  <div>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>직무</p>
                    <p className="font-medium" style={{ color: COLORS.navy }}>
                      {certificate.jobRole}
                    </p>
                  </div>
                </div>

                {/* Validity */}
                <div className="px-6 py-4 flex items-center gap-4">
                  <Calendar className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                  <div>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>유효기간</p>
                    <p className="font-medium" style={{ color: COLORS.navy }}>
                      {certificate.examDate} ~ {certificate.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="px-6 py-4 flex items-center gap-4">
                  <StatusIcon className="w-5 h-5" style={{ color: config.color }} />
                  <div>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>상태</p>
                    <p className="font-medium" style={{ color: config.color }}>
                      {status === 'valid' ? '✅ 유효' : status === 'expired' ? '⚠️ 만료' : '❌ 무효'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              본 인증서는 AICT에서 공식 발급한 것입니다.<br />
              문의: support@aict.kr
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
