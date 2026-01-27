/**
 * 환경 검사 페이지
 * 시험 응시 전 카메라, 마이크, 화면 녹화 권한을 확인합니다.
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Monitor, Wifi, Chrome, Check, X, AlertTriangle, Loader2 } from 'lucide-react';
import { EssentialBadge } from '../components/EssentialBadge';
import { useExam } from '../context/ExamContext';

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

type CheckStatus = 'pending' | 'checking' | 'success' | 'error';

interface CheckItem {
  id: string;
  label: string;
  description: string;
  icon: typeof Camera;
  status: CheckStatus;
  errorMessage?: string;
}

export const EnvCheck = () => {
  const navigate = useNavigate();
  const { setIsRecording } = useExam();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [agreed, setAgreed] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [micLevel, setMicLevel] = useState(0);

  const [checks, setChecks] = useState<CheckItem[]>([
    { id: 'camera', label: '카메라 권한', description: '얼굴이 보이도록 카메라를 허용해주세요', icon: Camera, status: 'pending' },
    { id: 'mic', label: '마이크 권한', description: '음성 녹음을 위해 마이크를 허용해주세요', icon: Mic, status: 'pending' },
    { id: 'screen', label: '화면 녹화 권한', description: '시험 중 화면이 녹화됩니다', icon: Monitor, status: 'pending' },
    { id: 'browser', label: '브라우저 호환성', description: '지원되는 브라우저인지 확인합니다', icon: Chrome, status: 'pending' },
    { id: 'network', label: '네트워크 상태', description: '안정적인 인터넷 연결을 확인합니다', icon: Wifi, status: 'pending' },
  ]);

  // 체크 상태 업데이트 헬퍼
  const updateCheck = (id: string, status: CheckStatus, errorMessage?: string) => {
    setChecks(prev => prev.map(check =>
      check.id === id ? { ...check, status, errorMessage } : check
    ));
  };

  // 브라우저 호환성 체크
  const checkBrowser = () => {
    updateCheck('browser', 'checking');
    setTimeout(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
      const isEdge = userAgent.includes('edg');
      const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

      if (isChrome || isEdge || isSafari) {
        updateCheck('browser', 'success');
      } else {
        updateCheck('browser', 'error', 'Chrome, Edge 또는 Safari 브라우저를 사용해주세요');
      }
    }, 500);
  };

  // 네트워크 체크 (Mock)
  const checkNetwork = () => {
    updateCheck('network', 'checking');
    setTimeout(() => {
      if (navigator.onLine) {
        updateCheck('network', 'success');
      } else {
        updateCheck('network', 'error', '인터넷 연결을 확인해주세요');
      }
    }, 800);
  };

  // 카메라 권한 요청
  const requestCamera = async () => {
    updateCheck('camera', 'checking');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      updateCheck('camera', 'success');
    } catch (err) {
      updateCheck('camera', 'error', '카메라 권한을 허용해주세요');
    }
  };

  // 마이크 권한 요청
  const requestMic = async () => {
    updateCheck('mic', 'checking');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 오디오 레벨 분석
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setMicLevel(Math.min(100, average * 2));
        requestAnimationFrame(checkLevel);
      };
      checkLevel();

      updateCheck('mic', 'success');
    } catch (err) {
      updateCheck('mic', 'error', '마이크 권한을 허용해주세요');
    }
  };

  // 화면 녹화 권한 (Mock - 실제로는 getDisplayMedia 사용)
  const requestScreen = async () => {
    updateCheck('screen', 'checking');
    // 실제 구현에서는 getDisplayMedia를 사용하지만, 데모에서는 Mock
    setTimeout(() => {
      updateCheck('screen', 'success');
    }, 500);
  };

  // 초기 자동 체크
  useEffect(() => {
    checkBrowser();
    checkNetwork();
  }, []);

  // 컴포넌트 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // 모든 체크 완료 여부
  const allChecksPass = checks.every(check => check.status === 'success');

  // 시험 시작
  const handleStart = () => {
    setIsRecording(true);
    navigate('/rules');
  };

  // 상태별 아이콘
  const StatusIcon = ({ status }: { status: CheckStatus }) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="w-5 h-5 animate-spin" style={{ color: COLORS.gold }} />;
      case 'success':
        return <Check className="w-5 h-5" style={{ color: COLORS.success }} />;
      case 'error':
        return <X className="w-5 h-5" style={{ color: COLORS.error }} />;
      default:
        return <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: COLORS.border }} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.surface }}>
      {/* Header */}
      <header className="bg-white border-b" style={{ borderColor: COLORS.border }}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <EssentialBadge size="small" showLabel={false} />
          <div>
            <h1 className="font-bold" style={{ color: COLORS.navy }}>AICT Essential</h1>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>시험 환경 검사</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: COLORS.border }}>
            {/* Title */}
            <div className="p-6 border-b" style={{ borderColor: COLORS.border }}>
              <h2 className="text-xl font-bold mb-2" style={{ color: COLORS.navy }}>
                시험 환경 검사
              </h2>
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                시험 응시를 위해 아래 환경을 확인합니다.
              </p>
            </div>

            {/* Camera Preview */}
            <div className="p-6 border-b" style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}>
              <div className="aspect-video max-w-sm mx-auto bg-black rounded-lg overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraStream && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2" style={{ color: COLORS.textMuted }} />
                      <p className="text-sm" style={{ color: COLORS.textMuted }}>
                        카메라 미리보기
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mic Level */}
              {checks.find(c => c.id === 'mic')?.status === 'success' && (
                <div className="mt-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 text-xs mb-1" style={{ color: COLORS.textMuted }}>
                    <Mic className="w-4 h-4" />
                    <span>마이크 입력 레벨</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.border }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${micLevel}%`,
                        backgroundColor: micLevel > 50 ? COLORS.success : COLORS.gold
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Check List */}
            <div className="divide-y" style={{ borderColor: COLORS.border }}>
              {checks.map((check) => (
                <div key={check.id} className="p-4 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: check.status === 'success' ? '#ECFDF5'
                        : check.status === 'error' ? '#FEE2E2'
                        : COLORS.goldMuted
                    }}
                  >
                    <check.icon
                      className="w-5 h-5"
                      style={{
                        color: check.status === 'success' ? COLORS.success
                          : check.status === 'error' ? COLORS.error
                          : COLORS.navy
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: COLORS.navy }}>{check.label}</p>
                    <p className="text-xs" style={{ color: check.status === 'error' ? COLORS.error : COLORS.textMuted }}>
                      {check.errorMessage || check.description}
                    </p>
                  </div>
                  <StatusIcon status={check.status} />
                  {check.status === 'pending' && (
                    <button
                      onClick={() => {
                        if (check.id === 'camera') requestCamera();
                        if (check.id === 'mic') requestMic();
                        if (check.id === 'screen') requestScreen();
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg"
                      style={{ backgroundColor: COLORS.goldMuted, color: COLORS.navy }}
                    >
                      권한 허용
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Warning Box */}
            <div className="p-6 border-t" style={{ borderColor: COLORS.border, backgroundColor: '#FEF3C7' }}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: COLORS.warning }} />
                <div>
                  <h4 className="font-bold text-sm mb-2" style={{ color: COLORS.navy }}>주의사항</h4>
                  <ul className="space-y-1 text-xs" style={{ color: '#92400E' }}>
                    <li>• 시험 중 다른 탭/창으로 이동하면 기록됩니다</li>
                    <li>• 탭 이탈 3회 시 시험이 자동 제출됩니다</li>
                    <li>• 카메라에 본인 얼굴이 계속 보여야 합니다</li>
                    <li>• 녹화된 영상은 부정행위 검수 후 삭제됩니다</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agreement & Start */}
            <div className="p-6 border-t" style={{ borderColor: COLORS.border }}>
              <label className="flex items-start gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5"
                  style={{ accentColor: COLORS.navy }}
                />
                <span className="text-sm" style={{ color: COLORS.navy }}>
                  위 내용을 확인하였으며, 시험 중 화면 녹화에 동의합니다.
                </span>
              </label>

              <button
                onClick={handleStart}
                disabled={!allChecksPass || !agreed}
                className="w-full py-4 rounded-lg font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.navy }}
              >
                시험 시작하기
              </button>

              {!allChecksPass && (
                <p className="text-center text-xs mt-2" style={{ color: COLORS.textMuted }}>
                  모든 환경 검사를 완료해주세요
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
