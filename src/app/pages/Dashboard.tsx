/**
 * 마이페이지 / 대시보드
 * 사용자의 인증서 정보, 응시 이력 등을 표시합니다.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Award, Calendar, Download, Share2, QrCode, ChevronRight, LogOut, FileText, CreditCard } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';
import { CertificateQRCode } from '../components/CertificateQRCode';
import { useAuth } from '../context/AuthContext';
import { downloadCertificatePDF, CertificateData } from '../services/certificateGenerator';

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
};

// 저장된 인증서 정보 가져오기
const getSavedCertificate = (): CertificateData | null => {
  try {
    const saved = localStorage.getItem('aict_certificate');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

// 응시 이력 가져오기
const getExamHistory = () => {
  try {
    const saved = localStorage.getItem('aict_exam_history');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    setCertificate(getSavedCertificate());
    setExamHistory(getExamHistory());
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDownloadPDF = async () => {
    if (!certificate) return;
    await downloadCertificatePDF(certificate);
  };

  const handleLinkedInShare = () => {
    alert('LinkedIn 연동은 준비 중입니다.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.surface }}>
        <div className="text-center">
          <EssentialBadge size="large" showLabel={false} />
          <p className="mt-4" style={{ color: COLORS.textMuted }}>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const daysUntilExpiry = certificate
    ? Math.ceil((new Date(certificate.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <EssentialBadge size="small" showLabel={false} />
            <span className="font-bold" style={{ color: COLORS.navy }}>AICT Essential</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm" style={{ color: COLORS.navy }}>{user.name}님</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm"
              style={{ color: COLORS.textMuted }}
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border p-6 mb-6" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.goldMuted }}
              >
                <User className="w-8 h-8" style={{ color: COLORS.navy }} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold" style={{ color: COLORS.navy }}>{user.name}</h2>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>{user.email}</p>
                <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>가입일: {user.createdAt}</p>
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm"
                style={{ backgroundColor: COLORS.surface, color: COLORS.navy }}
              >
                정보 수정
              </button>
            </div>
          </div>

          {/* Certificate Section */}
          <div className="bg-white rounded-xl border overflow-hidden mb-6" style={{ borderColor: COLORS.border }}>
            <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
              <h3 className="font-bold" style={{ color: COLORS.navy }}>나의 인증 현황</h3>
            </div>

            {certificate ? (
              <div className="p-6">
                {/* Certificate Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Badge */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-32 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: COLORS.goldMuted }}
                    >
                      <EssentialBadge size="large" showLabel={false} />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2" style={{ color: COLORS.navy }}>AICT Essential</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p style={{ color: COLORS.textMuted }}>점수</p>
                        <p className="font-bold" style={{ color: COLORS.navy }}>{certificate.score}/100 (PASS)</p>
                      </div>
                      <div>
                        <p style={{ color: COLORS.textMuted }}>직무</p>
                        <p className="font-bold" style={{ color: COLORS.navy }}>{certificate.jobRole}</p>
                      </div>
                      <div>
                        <p style={{ color: COLORS.textMuted }}>발급일</p>
                        <p className="font-bold" style={{ color: COLORS.navy }}>{certificate.examDate}</p>
                      </div>
                      <div>
                        <p style={{ color: COLORS.textMuted }}>만료일</p>
                        <p className="font-bold" style={{ color: daysUntilExpiry > 30 ? COLORS.navy : COLORS.error }}>
                          {certificate.expiryDate} (D-{daysUntilExpiry})
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                        style={{ backgroundColor: COLORS.navy }}
                      >
                        <Download className="w-4 h-4" />
                        PDF 다운로드
                      </button>
                      <button
                        onClick={handleLinkedInShare}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
                        style={{ borderColor: COLORS.border, color: COLORS.navy }}
                      >
                        <Share2 className="w-4 h-4" />
                        LinkedIn 공유
                      </button>
                      <button
                        onClick={() => setShowQRModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
                        style={{ borderColor: COLORS.border, color: COLORS.navy }}
                      >
                        <QrCode className="w-4 h-4" />
                        QR코드 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Award className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.border }} />
                <h4 className="font-bold mb-2" style={{ color: COLORS.navy }}>아직 인증서가 없습니다</h4>
                <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
                  AICT Essential 시험에 합격하면 인증서가 발급됩니다.
                </p>
                <Link
                  to="/env-check"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white"
                  style={{ backgroundColor: COLORS.navy }}
                >
                  시험 응시하기
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Exam History */}
          <div className="bg-white rounded-xl border overflow-hidden mb-6" style={{ borderColor: COLORS.border }}>
            <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
              <h3 className="font-bold" style={{ color: COLORS.navy }}>응시 이력</h3>
            </div>

            {examHistory.length > 0 ? (
              <div className="divide-y" style={{ borderColor: COLORS.border }}>
                {examHistory.map((exam: any, index: number) => (
                  <div key={index} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5" style={{ color: COLORS.textMuted }} />
                      <div>
                        <p className="font-medium" style={{ color: COLORS.navy }}>{exam.date}</p>
                        <p className="text-xs" style={{ color: COLORS.textMuted }}>{exam.jobRole}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: COLORS.navy }}>{exam.score}/100</p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: exam.passed ? COLORS.success : COLORS.error }}
                      >
                        {exam.passed ? 'PASS' : 'FAIL'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm" style={{ color: COLORS.textMuted }}>응시 이력이 없습니다.</p>
              </div>
            )}
          </div>

          {/* Payment History (Mock) */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
            <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
              <h3 className="font-bold" style={{ color: COLORS.navy }}>결제 내역</h3>
            </div>
            <div className="p-8 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-3" style={{ color: COLORS.border }} />
              <p className="text-sm" style={{ color: COLORS.textMuted }}>결제 내역이 없습니다.</p>
            </div>
          </div>
        </div>
      </main>

      {/* QR Modal */}
      {showQRModal && certificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-center mb-4" style={{ color: COLORS.navy }}>인증서 QR코드</h3>
            <div className="flex justify-center mb-4">
              <CertificateQRCode certificateId={certificate.certificateId} size={200} />
            </div>
            <p className="text-xs text-center mb-4" style={{ color: COLORS.textMuted }}>
              인증번호: {certificate.certificateId}
            </p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: COLORS.navy }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
