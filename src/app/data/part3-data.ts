/**
 * Part 3 데이터 파서 및 유틸리티
 * JSON 데이터를 TypeScript로 변환하여 사용
 */

import part3Json from './part3_all_jobs_combined.json';
import {
  Part3Data,
  Part3Task,
  JobData,
  TaskRubric,
  JobCode,
  Part3TaskType,
  JOB_LIST
} from './types/part3';

// JSON 데이터를 타입화
const part3Data = part3Json as Part3Data;

/**
 * 전체 Part 3 데이터 반환
 */
export function getPart3Data(): Part3Data {
  return part3Data;
}

/**
 * 특정 직무의 전체 데이터 반환
 */
export function getJobData(jobCode: JobCode): JobData | undefined {
  return part3Data.jobs.find(job => job.jobCode === jobCode);
}

/**
 * 특정 직무의 4개 문항(A/B/C/D) 반환
 */
export function getJobTasks(jobCode: JobCode): Part3Task[] {
  const job = getJobData(jobCode);
  if (!job) return [];

  // 문항 유형 순서대로 정렬 (prompt → analyze → collaborate → evaluate)
  const typeOrder: Part3TaskType[] = ['prompt', 'analyze', 'collaborate', 'evaluate'];
  return [...job.tasks].sort((a, b) =>
    typeOrder.indexOf(a.taskType as Part3TaskType) - typeOrder.indexOf(b.taskType as Part3TaskType)
  );
}

/**
 * 특정 문항의 루브릭 반환
 */
export function getTaskRubric(jobCode: JobCode, taskId: string): TaskRubric | undefined {
  const job = getJobData(jobCode);
  if (!job) return undefined;
  return job.rubrics[taskId];
}

/**
 * 문항 ID로 문항 데이터 반환
 */
export function getTaskById(taskId: string): Part3Task | undefined {
  for (const job of part3Data.jobs) {
    const task = job.tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}

/**
 * 문항 ID로 루브릭 반환
 */
export function getRubricById(taskId: string): TaskRubric | undefined {
  for (const job of part3Data.jobs) {
    if (job.rubrics[taskId]) {
      return job.rubrics[taskId];
    }
  }
  return undefined;
}

/**
 * 모든 직무 목록 반환
 */
export function getAllJobs() {
  return JOB_LIST;
}

/**
 * 직무 코드로 직무 정보 반환
 */
export function getJobInfo(jobCode: JobCode) {
  return JOB_LIST.find(job => job.jobCode === jobCode);
}

/**
 * 문항 유형별 라벨 반환
 */
export function getTaskTypeLabel(taskType: Part3TaskType): string {
  const labels: Record<Part3TaskType, string> = {
    prompt: 'A) 프롬프트 작성',
    analyze: 'B) AI 활용 판단',
    collaborate: 'C) AI 협업',
    evaluate: 'D) 결과물 평가'
  };
  return labels[taskType];
}

/**
 * 문항 유형별 AI 메시지 제한 반환
 */
export function getAiMessageLimit(taskType: Part3TaskType): number {
  const limits: Record<Part3TaskType, number> = {
    prompt: 3,
    analyze: 0,
    collaborate: 5,
    evaluate: 0
  };
  return limits[taskType];
}

/**
 * 문항 유형별 최소 줄 수 반환
 */
export function getMinLines(taskType: Part3TaskType): number {
  const minLines: Record<Part3TaskType, number> = {
    prompt: 15,
    analyze: 25,
    collaborate: 30,
    evaluate: 20
  };
  return minLines[taskType];
}

// 메타데이터 export
export const part3Metadata = part3Data.metadata;
