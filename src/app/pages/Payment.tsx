/**
 * 결제 페이지
 * 시험 응시료 결제 처리
 */

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CreditCard, Building2, Smartphone, ArrowLeft, Check, Shield, Clock,
  Receipt, Tag, ChevronDown, AlertCircle
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

type PaymentMethod = 'card' | 'bank' | 'kakao' | 'naver' | 'toss';
type ReceiptType = 'none' | 'income' | 'expense' | 'tax';

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'card', label: '신용/체크카드', icon: <CreditCard className="w-5 h-5" />, description: '모든 카드 결제 가능' },
  { id: 'bank', label: '계좌이체', icon: <Building2 className="w-5 h-5" />, description: '실시간 계좌이체' },
  { id: 'kakao', label: '카카오페이', icon: <Smartphone className="w-5 h-5" />, description: '카카오페이 간편결제' },
  { id: 'naver', label: '네이버페이', icon: <Smartphone className="w-5 h-5" />, description: '네이버페이 간편결제' },
  { id: 'toss', label: '토스페이', icon: <Smartphone className="w-5 h-5" />, description: '토스 간편결제' },
];

export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { round = 4 } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [receiptType, setReceiptType] = useState<ReceiptType>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const originalPrice = 49000;
  const discountAmount = couponApplied ? 4900 : 0;
  const finalPrice = originalPrice - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'AICT2026') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('유효하지 않은 쿠폰 코드입니다');
    }
  };

  const handlePayment = () => {
    if (!selectedMethod || !agreedTerms) return;

    setIsProcessing(true);
    // 결제 처리 시뮬레이션
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/identity-verify');
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" style={{ color: COLORS.navy }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: COLORS.navy }}>결제하기</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {/* 상품 정보 */}
          <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>상품 정보</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
                <span className="text-2xl font-bold" style={{ color: COLORS.navy }}>A</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium" style={{ color: COLORS.navy }}>AICT Essential 제{round}회</h3>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>AI 역량 인증 시험</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4" style={{ color: COLORS.textMuted }} />
                  <span className="text-sm" style={{ color: COLORS.textMuted }}>75분 / 19문항</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg" style={{ color: COLORS.navy }}>
                  {originalPrice.toLocaleString()}원
                </p>
              </div>
            </div>
          </section>

          {/* 쿠폰 */}
          <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy }}>
              <Tag className="w-5 h-5" />
              할인 쿠폰
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="쿠폰 코드를 입력하세요"
                className="flex-1 px-4 py-3 rounded-lg border text-sm"
                style={{ borderColor: couponError ? COLORS.error : COLORS.border }}
                disabled={couponApplied}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={couponApplied || !couponCode}
                className="px-6 py-3 rounded-lg font-medium text-sm"
                style={{
                  backgroundColor: couponApplied ? COLORS.success : COLORS.gold,
                  color: 'white',
                  opacity: couponApplied || !couponCode ? 0.7 : 1
                }}
              >
                {couponApplied ? '적용됨' : '적용'}
              </button>
            </div>
            {couponError && (
              <p className="text-sm mt-2 flex items-center gap-1" style={{ color: COLORS.error }}>
                <AlertCircle className="w-4 h-4" />
                {couponError}
              </p>
            )}
            {couponApplied && (
              <p className="text-sm mt-2 flex items-center gap-1" style={{ color: COLORS.success }}>
                <Check className="w-4 h-4" />
                10% 할인 쿠폰이 적용되었습니다
              </p>
            )}
            <p className="text-xs mt-3" style={{ color: COLORS.textMuted }}>
              데모 쿠폰: AICT2026 (10% 할인)
            </p>
          </section>

          {/* 결제 수단 */}
          <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>결제 수단</h2>
            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-lg border flex items-center gap-4 transition-all ${
                    selectedMethod === method.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedMethod === method.id ? COLORS.gold : COLORS.border,
                    ringColor: COLORS.gold
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: COLORS.surface, color: COLORS.navy }}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium" style={{ color: COLORS.navy }}>{method.label}</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>{method.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center`}
                    style={{ borderColor: selectedMethod === method.id ? COLORS.gold : COLORS.border }}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.gold }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 영수증 */}
          <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.navy }}>
              <Receipt className="w-5 h-5" />
              영수증 발급
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'none', label: '발급 안함' },
                { id: 'income', label: '소득공제용' },
                { id: 'expense', label: '지출증빙용' },
                { id: 'tax', label: '세금계산서' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setReceiptType(type.id as ReceiptType)}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all`}
                  style={{
                    borderColor: receiptType === type.id ? COLORS.gold : COLORS.border,
                    backgroundColor: receiptType === type.id ? COLORS.goldMuted : 'white',
                    color: receiptType === type.id ? COLORS.navy : COLORS.textMuted
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </section>

          {/* 결제 금액 */}
          <section className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <h2 className="font-bold mb-4" style={{ color: COLORS.navy }}>결제 금액</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: COLORS.textMuted }}>상품 금액</span>
                <span style={{ color: COLORS.navy }}>{originalPrice.toLocaleString()}원</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between">
                  <span style={{ color: COLORS.textMuted }}>쿠폰 할인</span>
                  <span style={{ color: COLORS.error }}>-{discountAmount.toLocaleString()}원</span>
                </div>
              )}
              <div className="pt-3 border-t flex justify-between items-center" style={{ borderColor: COLORS.border }}>
                <span className="font-bold" style={{ color: COLORS.navy }}>총 결제 금액</span>
                <span className="text-xl font-bold" style={{ color: COLORS.gold }}>
                  {finalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </section>

          {/* 동의 및 결제 */}
          <section>
            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-5 h-5 rounded mt-0.5"
              />
              <span className="text-sm" style={{ color: COLORS.textMuted }}>
                결제 진행 필수 동의: 구매조건 확인 및 결제 진행에 동의합니다.
                환불 규정 및 개인정보 제3자 제공에 동의합니다.
              </span>
            </label>

            <button
              onClick={handlePayment}
              disabled={!selectedMethod || !agreedTerms || isProcessing}
              className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: selectedMethod && agreedTerms ? COLORS.gold : COLORS.border,
                color: selectedMethod && agreedTerms ? 'white' : COLORS.textMuted
              }}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  처리 중...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  {finalPrice.toLocaleString()}원 결제하기
                </>
              )}
            </button>

            <p className="text-center text-xs mt-4" style={{ color: COLORS.textMuted }}>
              안전한 결제를 위해 SSL 암호화 통신을 사용합니다
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};
