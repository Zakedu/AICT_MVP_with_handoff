/**
 * 인증서 QR 코드 컴포넌트
 * QR 코드를 생성하여 인증서 검증 페이지로 연결합니다.
 */

import { QRCodeSVG } from 'qrcode.react';

interface CertificateQRCodeProps {
  certificateId: string;
  size?: number;
}

export function CertificateQRCode({ certificateId, size = 128 }: CertificateQRCodeProps) {
  // 검증 URL 생성
  const verifyUrl = `${window.location.origin}/aict-platform/verify/${certificateId}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 bg-white rounded-lg shadow-sm border">
        <QRCodeSVG
          value={verifyUrl}
          size={size}
          level="M"
          includeMargin={false}
          bgColor="#FFFFFF"
          fgColor="#1E3A5F"
        />
      </div>
      <p className="text-xs text-center" style={{ color: '#64748B' }}>
        QR 코드를 스캔하여<br />인증서를 검증하세요
      </p>
    </div>
  );
}
