import { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: number;
  duration: number; // in minutes
  onExpire?: () => void;
}

export const Timer = ({ startTime, duration, onExpire }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const hasExpired = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = (duration * 60) - elapsed;
      setTimeLeft(Math.max(0, remaining));

      // 타이머 만료 시 콜백 호출 (한 번만)
      if (remaining <= 0 && !hasExpired.current && onExpire) {
        hasExpired.current = true;
        onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isLow = timeLeft < 300; // Less than 5 minutes

  return (
    <div 
      className="flex items-center gap-2 px-4 py-2 rounded-none border font-mono font-bold"
      style={{
        backgroundColor: isLow ? '#922F39' : 'white',
        color: isLow ? 'white' : '#2B2C30',
        borderColor: isLow ? '#922F39' : '#2B2C30',
        borderWidth: isLow ? '2px' : '1px'
      }}
    >
      <Clock className="w-4 h-4" />
      <span className="text-sm tracking-wider">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};