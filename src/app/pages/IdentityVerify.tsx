/**
 * 본인 인증 페이지
 * 휴대폰/이메일 인증으로 본인 확인
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone, Mail, ArrowLeft, Check, Shield, AlertCircle, Clock
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

type VerifyMethod = 'phone' | 'email';
type Carrier = 'SKT' | 'KT' | 'LGU' | 'MVNO';

export const IdentityVerify = () => {
  const navigate = useNavigate();

  const [method, setMethod] = useState<VerifyMethod>('phone');
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분

  // 타이머
  useEffect(() => {
    if (!codeSent || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [codeSent, timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSendCode = () => {
    if (method === 'phone' && (!carrier || phoneNumber.length < 10)) return;
    if (method === 'email' && !email.includes('@')) return;

    setCodeSent(true);
    setTimeLeft(180);
    setCodeError('');
  };

  const handleVerify = () => {
    if (verifyCode === '123456') {
      setIsVerifying(true);
      setTimeout(() => {
        navigate('/env-check');
      }, 1500);
    } else {
      setCodeError('인증번호가 일치하지 않습니다');
    }
  };

  const isInputValid = method === 'phone'
    ? carrier && phoneNumber.replace(/-/g, '').length >= 10
    : email.includes('@');

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" style={{ color: COLORS.navy }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: COLORS.navy }}>본인 인증</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        {/* 진행 단계 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: COLORS.success }}>
              <Check className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium" style={{ color: COLORS.success }}>결제</span>
          </div>
          <div className="w-8 h-0.5" style={{ backgroundColor: COLORS.gold }} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium" style={{ backgroundColor: COLORS.gold }}>
              2
            </div>
            <span className="text-sm font-medium" style={{ color: COLORS.gold }}>본인인증</span>
          </div>
          <div className="w-8 h-0.5" style={{ backgroundColor: COLORS.border }} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: COLORS.border, color: COLORS.textMuted }}>
              3
            </div>
            <span className="text-sm" style={{ color: COLORS.textMuted }}>환경점검</span>
          </div>
        </div>

        {/* 안내 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.goldMuted }}>
            <Shield className="w-8 h-8" style={{ color: COLORS.navy }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.navy }}>
            본인 인증이 필요합니다
          </h2>
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            시험 응시 자격 확인을 위해 본인 인증을 진행해 주세요
          </p>
        </div>

        {/* 인증 방식 선택 */}
        <div className="bg-white rounded-xl border p-6 mb-6" style={{ borderColor: COLORS.border }}>
          <h3 className="font-medium mb-4" style={{ color: COLORS.navy }}>인증 방식 선택</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setMethod('phone'); setCodeSent(false); }}
              className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                method === 'phone' ? 'ring-2' : ''
              }`}
              style={{
                borderColor: method === 'phone' ? COLORS.gold : COLORS.border,
                ringColor: COLORS.gold,
                backgroundColor: method === 'phone' ? COLORS.goldMuted : 'white'
              }}
            >
              <Phone className="w-6 h-6" style={{ color: COLORS.navy }} />
              <span className="font-medium text-sm" style={{ color: COLORS.navy }}>휴대폰 인증</span>
            </button>
            <button
              onClick={() => { setMethod('email'); setCodeSent(false); }}
              className={`p-4 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                method === 'email' ? 'ring-2' : ''
              }`}
              style={{
                borderColor: method === 'email' ? COLORS.gold : COLORS.border,
                ringColor: COLORS.gold,
                backgroundColor: method === 'email' ? COLORS.goldMuted : 'white'
              }}
            >
              <Mail className="w-6 h-6" style={{ color: COLORS.navy }} />
              <span className="font-medium text-sm" style={{ color: COLORS.navy }}>이메일 인증</span>
            </button>
          </div>
        </div>

        {/* 인증 정보 입력 */}
        <div className="bg-white rounded-xl border p-6 mb-6" style={{ borderColor: COLORS.border }}>
          {method === 'phone' ? (
            <>
              <h3 className="font-medium mb-4" style={{ color: COLORS.navy }}>통신사 선택</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {(['SKT', 'KT', 'LGU', 'MVNO'] as Carrier[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCarrier(c)}
                    className="py-2 px-3 rounded-lg border text-sm font-medium transition-all"
                    style={{
                      borderColor: carrier === c ? COLORS.gold : COLORS.border,
                      backgroundColor: carrier === c ? COLORS.goldMuted : 'white',
                      color: carrier === c ? COLORS.navy : COLORS.textMuted
                    }}
                  >
                    {c === 'MVNO' ? '알뜰폰' : c}
                  </button>
                ))}
              </div>

              <h3 className="font-medium mb-2" style={{ color: COLORS.navy }}>휴대폰 번호</h3>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 rounded-lg border text-sm"
                style={{ borderColor: COLORS.border }}
                maxLength={13}
              />
            </>
          ) : (
            <>
              <h3 className="font-medium mb-2" style={{ color: COLORS.navy }}>이메일 주소</h3>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg border text-sm"
                style={{ borderColor: COLORS.border }}
              />
            </>
          )}

          {!codeSent ? (
            <button
              onClick={handleSendCode}
              disabled={!isInputValid}
              className="w-full mt-4 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: isInputValid ? COLORS.gold : COLORS.border,
                color: isInputValid ? 'white' : COLORS.textMuted
              }}
            >
              인증번호 받기
            </button>
          ) : (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium" style={{ color: COLORS.navy }}>인증번호 입력</h3>
                <div className="flex items-center gap-1 text-sm" style={{ color: timeLeft < 60 ? COLORS.error : COLORS.textMuted }}>
                  <Clock className="w-4 h-4" />
                  {formatTime(timeLeft)}
                </div>
              </div>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6자리 숫자 입력"
                className="w-full px-4 py-3 rounded-lg border text-sm text-center tracking-widest text-lg font-mono"
                style={{ borderColor: codeError ? COLORS.error : COLORS.border }}
                maxLength={6}
              />
              {codeError && (
                <p className="text-sm mt-2 flex items-center gap-1" style={{ color: COLORS.error }}>
                  <AlertCircle className="w-4 h-4" />
                  {codeError}
                </p>
              )}
              <p className="text-xs mt-2" style={{ color: COLORS.textMuted }}>
                데모 인증번호: 123456
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { setTimeLeft(180); setCodeError(''); }}
                  className="flex-1 py-3 rounded-lg font-medium border"
                  style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
                >
                  재발송
                </button>
                <button
                  onClick={handleVerify}
                  disabled={verifyCode.length !== 6 || isVerifying}
                  className="flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: verifyCode.length === 6 ? COLORS.gold : COLORS.border,
                    color: verifyCode.length === 6 ? 'white' : COLORS.textMuted
                  }}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      확인 중...
                    </>
                  ) : (
                    '인증 확인'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 안내 사항 */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: COLORS.goldMuted }}>
          <p className="text-sm font-medium mb-2" style={{ color: COLORS.navy }}>안내사항</p>
          <ul className="text-xs space-y-1" style={{ color: COLORS.textMuted }}>
            <li>• 입력하신 정보는 본인 확인 목적으로만 사용됩니다</li>
            <li>• 인증번호는 3분 이내에 입력해 주세요</li>
            <li>• 인증에 문제가 있으시면 고객센터로 문의해 주세요</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
