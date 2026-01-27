/**
 * 탭 이탈 감지 훅
 * 시험 중 탭을 벗어나면 카운트를 증가시킵니다.
 */

import { useEffect, useRef, useCallback } from 'react';
import { useExam } from '../context/ExamContext';

interface UseTabLeaveDetectionOptions {
  enabled?: boolean;
  onTabLeave?: () => void;
  onTabReturn?: (leaveDuration: number) => void;
  onLimitExceeded?: () => void;
}

export function useTabLeaveDetection({
  enabled = true,
  onTabLeave,
  onTabReturn,
  onLimitExceeded,
}: UseTabLeaveDetectionOptions = {}) {
  const { tabLeaveInfo, incrementTabLeave, startTime } = useExam();
  const leaveTimeRef = useRef<number | null>(null);
  const hasExamStarted = startTime !== null;

  const handleVisibilityChange = useCallback(() => {
    if (!enabled || !hasExamStarted) return;

    if (document.hidden) {
      // 탭을 벗어남
      leaveTimeRef.current = Date.now();
      onTabLeave?.();
    } else {
      // 탭으로 돌아옴
      if (leaveTimeRef.current !== null) {
        const leaveDuration = (Date.now() - leaveTimeRef.current) / 1000; // 초 단위
        incrementTabLeave(leaveDuration);
        onTabReturn?.(leaveDuration);
        leaveTimeRef.current = null;

        // 제한 초과 체크
        if (tabLeaveInfo.count + 1 >= 3) {
          onLimitExceeded?.();
        }
      }
    }
  }, [enabled, hasExamStarted, incrementTabLeave, onTabLeave, onTabReturn, onLimitExceeded, tabLeaveInfo.count]);

  useEffect(() => {
    if (!enabled || !hasExamStarted) return;

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, hasExamStarted, handleVisibilityChange]);

  return {
    tabLeaveCount: tabLeaveInfo.count,
    tabLeaveTime: tabLeaveInfo.totalTime,
    isOverLimit: tabLeaveInfo.isOverLimit,
    isTimeOverLimit: tabLeaveInfo.isTimeOverLimit,
  };
}
