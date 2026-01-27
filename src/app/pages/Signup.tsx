/**
 * 회원가입 페이지
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2, Check, X } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';
import { useAuth } from '../context/AuthContext';

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

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1); // 1: 이메일 인증, 2: 정보 입력
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);

  // Mock 이메일 인증 발송
  const sendVerification = () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    // Mock: 항상 성공
    alert('인증번호가 발송되었습니다. (Mock: 123456)');
    setError('');
  };

  // Mock 인증번호 확인
  const verifyCode = () => {
    if (verificationCode === '123456') {
      setEmailVerified(true);
      setError('');
    } else {
      setError('인증번호가 올바르지 않습니다. (힌트: 123456)');
    }
  };

  // 비밀번호 유효성 검사
  const passwordChecks = {
    length: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    match: password === passwordConfirm && password.length > 0,
  };

  const isPasswordValid = passwordChecks.length && passwordChecks.hasLetter && passwordChecks.hasNumber;
  const canSubmit = emailVerified && isPasswordValid && passwordChecks.match && name && phone && termsAgreed && privacyAgreed;

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setError('');

    const result = await signup({
      email,
      password,
      name,
      phone,
      marketingConsent: marketingAgreed,
    });

    if (result.success) {
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } else {
      setError(result.error || '회원가입에 실패했습니다.');
    }

    setIsLoading(false);
  };

  // 전화번호 포맷팅
  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const PasswordCheck = ({ passed, label }: { passed: boolean; label: string }) => (
    <div className="flex items-center gap-1.5 text-xs">
      {passed ? (
        <Check className="w-3 h-3" style={{ color: COLORS.success }} />
      ) : (
        <X className="w-3 h-3" style={{ color: COLORS.textMuted }} />
      )}
      <span style={{ color: passed ? COLORS.success : COLORS.textMuted }}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-md mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.textMuted }}
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-md mx-auto px-4">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <EssentialBadge size="medium" showLabel={false} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>회원가입</h1>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  이메일 *
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    disabled={emailVerified}
                    className="flex-1 px-4 py-3 rounded-lg border text-sm disabled:bg-gray-100"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                  {!emailVerified && (
                    <button
                      type="button"
                      onClick={sendVerification}
                      className="px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap"
                      style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}
                    >
                      인증 발송
                    </button>
                  )}
                </div>
                {emailVerified && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: COLORS.success }}>
                    <Check className="w-3 h-3" />
                    이메일 인증 완료
                  </p>
                )}
              </div>

              {/* Verification Code */}
              {!emailVerified && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                    인증번호 *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="6자리 입력"
                      maxLength={6}
                      className="flex-1 px-4 py-3 rounded-lg border text-sm tracking-widest"
                      style={{ borderColor: COLORS.border }}
                    />
                    <button
                      type="button"
                      onClick={verifyCode}
                      className="px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap text-white"
                      style={{ backgroundColor: COLORS.navy }}
                    >
                      확인
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
                    (데모용: 123456 입력)
                  </p>
                </div>
              )}

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  비밀번호 *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상, 영문+숫자"
                    className="w-full px-4 py-3 pr-12 rounded-lg border text-sm"
                    style={{ borderColor: COLORS.border }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: COLORS.textMuted }}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <PasswordCheck passed={passwordChecks.length} label="8자 이상" />
                  <PasswordCheck passed={passwordChecks.hasLetter} label="영문 포함" />
                  <PasswordCheck passed={passwordChecks.hasNumber} label="숫자 포함" />
                </div>
              </div>

              {/* Password Confirm */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호 재입력"
                  className="w-full px-4 py-3 rounded-lg border text-sm"
                  style={{ borderColor: COLORS.border }}
                  required
                />
                {passwordConfirm && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: passwordChecks.match ? COLORS.success : COLORS.error }}>
                    {passwordChecks.match ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {passwordChecks.match ? '비밀번호 일치' : '비밀번호가 일치하지 않습니다'}
                  </p>
                )}
              </div>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  이름 *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-lg border text-sm"
                  style={{ borderColor: COLORS.border }}
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-lg border text-sm"
                  style={{ borderColor: COLORS.border }}
                  required
                />
                <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
                  본인인증 시 사용됩니다
                </p>
              </div>

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: COLORS.border }} />

              {/* Agreements */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5"
                    style={{ accentColor: COLORS.navy }}
                  />
                  <span className="text-sm" style={{ color: COLORS.navy }}>
                    <span className="font-medium" style={{ color: COLORS.error }}>[필수]</span> 이용약관 동의
                    <button type="button" className="ml-2 text-xs" style={{ color: COLORS.textMuted }}>보기</button>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5"
                    style={{ accentColor: COLORS.navy }}
                  />
                  <span className="text-sm" style={{ color: COLORS.navy }}>
                    <span className="font-medium" style={{ color: COLORS.error }}>[필수]</span> 개인정보 수집·이용 동의
                    <button type="button" className="ml-2 text-xs" style={{ color: COLORS.textMuted }}>보기</button>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketingAgreed}
                    onChange={(e) => setMarketingAgreed(e.target.checked)}
                    className="mt-0.5 w-5 h-5"
                    style={{ accentColor: COLORS.navy }}
                  />
                  <span className="text-sm" style={{ color: COLORS.navy }}>
                    <span style={{ color: COLORS.textMuted }}>[선택]</span> 마케팅 정보 수신 동의
                    <button type="button" className="ml-2 text-xs" style={{ color: COLORS.textMuted }}>보기</button>
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: '#FEE2E2', color: COLORS.error }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="w-full py-4 rounded-lg font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: COLORS.navy }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  '가입하기'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
              <span className="text-xs" style={{ color: COLORS.textMuted }}>또는</span>
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
            </div>

            {/* Social Signup (Mock - disabled) */}
            <div className="flex gap-3">
              <button
                type="button"
                disabled
                className="flex-1 py-3 rounded-lg border text-sm font-medium disabled:opacity-50"
                style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
              >
                Google
              </button>
              <button
                type="button"
                disabled
                className="flex-1 py-3 rounded-lg border text-sm font-medium disabled:opacity-50"
                style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
              >
                Kakao
              </button>
              <button
                type="button"
                disabled
                className="flex-1 py-3 rounded-lg border text-sm font-medium disabled:opacity-50"
                style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
              >
                Naver
              </button>
            </div>
            <p className="text-xs text-center mt-2" style={{ color: COLORS.textMuted }}>
              소셜 가입은 준비 중입니다
            </p>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm" style={{ color: COLORS.textMuted }}>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="font-medium" style={{ color: COLORS.gold }}>
              로그인
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};
