/**
 * 로그인 페이지
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
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
  error: '#DC2626',
};

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || '로그인에 실패했습니다.');
    }

    setIsLoading(false);
  };

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
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <EssentialBadge size="medium" showLabel={false} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: COLORS.navy }}>로그인</h1>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: COLORS.border }}>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border text-sm"
                  style={{ borderColor: COLORS.border }}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.navy }}>
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                    style={{ accentColor: COLORS.navy }}
                  />
                  <span className="text-sm" style={{ color: COLORS.textMuted }}>로그인 상태 유지</span>
                </label>
                <button type="button" className="text-sm" style={{ color: COLORS.gold }}>
                  비밀번호 찾기
                </button>
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
                disabled={isLoading}
                className="w-full py-4 rounded-lg font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: COLORS.navy }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  '로그인'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
              <span className="text-xs" style={{ color: COLORS.textMuted }}>또는</span>
              <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
            </div>

            {/* Social Login (Mock - disabled) */}
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
              소셜 로그인은 준비 중입니다
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm" style={{ color: COLORS.textMuted }}>
            계정이 없으신가요?{' '}
            <Link to="/signup" className="font-medium" style={{ color: COLORS.gold }}>
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};
