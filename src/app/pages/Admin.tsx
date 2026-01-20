import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, FileSpreadsheet, Database, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import {
  downloadTemplateCSV,
  downloadAllTemplatesCSV,
  exportCurrentDataCSV
} from '../utils/excelTemplate';
import { part1Questions, part2Questions, part3TasksAll } from '../data/questions';

export const Admin = () => {
  const navigate = useNavigate();
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);

  const handleDownload = (type: 'part1' | 'part2' | 'part3' | 'rubric' | 'roles' | 'all' | 'backup') => {
    try {
      if (type === 'all') {
        downloadAllTemplatesCSV();
        setDownloadStatus('전체 템플릿');
      } else if (type === 'backup') {
        exportCurrentDataCSV(part1Questions, part2Questions, part3TasksAll);
        setDownloadStatus('현재 데이터 백업');
      } else {
        downloadTemplateCSV(type);
        const names: Record<string, string> = {
          part1: 'Part 1 템플릿',
          part2: 'Part 2 템플릿',
          part3: 'Part 3 템플릿',
          rubric: '루브릭 템플릿',
          roles: '직군 코드'
        };
        setDownloadStatus(names[type]);
      }

      setTimeout(() => setDownloadStatus(null), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const templateCards = [
    {
      id: 'part1',
      title: 'Part 1: AI 리터러시',
      description: '객관식 8문항 (mcq, risk 유형)',
      columns: ['id', 'type', 'text', 'keyTerms', 'options (A~D)', 'situation'],
      color: '#375C68'
    },
    {
      id: 'part2',
      title: 'Part 2: 프롬프트 리터러시',
      description: '실습형 4문항 (dragdrop, highlight, rewrite, ordering)',
      columns: ['id', 'type', 'instruction', 'blocks/steps/issues JSON'],
      color: '#79C4C2'
    },
    {
      id: 'part3',
      title: 'Part 3: 직무 시나리오',
      description: '24문항 (8직군 × 3유형)',
      columns: ['id', 'role', 'taskType', 'context', 'requirements', 'aiDraft'],
      color: '#922F39'
    },
    {
      id: 'rubric',
      title: 'Part 3 루브릭',
      description: '채점 기준 (4단계 척도)',
      columns: ['taskId', 'weight', 'level1~4_indicator'],
      color: '#E0CD8C'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F3F2' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm mb-6 hover:opacity-70"
            style={{ color: '#2B2C30' }}
          >
            <ArrowLeft className="w-4 h-4" />
            메인으로 돌아가기
          </button>

          <h1 className="text-3xl font-bold uppercase tracking-widest mb-3" style={{ color: '#2B2C30' }}>
            문항 데이터 관리
          </h1>
          <p className="text-sm" style={{ color: '#2B2C30', opacity: 0.7 }}>
            엑셀(CSV) 템플릿을 다운로드하여 문항을 관리하세요. 작성된 CSV는 개발자에게 전달하여 시스템에 반영합니다.
          </p>
        </div>

        {/* Download Status */}
        {downloadStatus && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-300 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-green-900 font-medium">{downloadStatus} 다운로드 완료!</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => handleDownload('all')}
            className="flex items-center gap-4 p-6 bg-white border-2 rounded-lg hover:shadow-md transition-shadow text-left"
            style={{ borderColor: '#2B2C30' }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2B2C30' }}>
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: '#2B2C30' }}>전체 템플릿 다운로드</div>
              <div className="text-sm" style={{ color: '#2B2C30', opacity: 0.6 }}>
                Part 1, 2, 3 + 루브릭 + 직군코드 통합 파일
              </div>
            </div>
            <Download className="w-5 h-5 ml-auto" style={{ color: '#2B2C30' }} />
          </button>

          <button
            onClick={() => handleDownload('backup')}
            className="flex items-center gap-4 p-6 bg-white border-2 rounded-lg hover:shadow-md transition-shadow text-left"
            style={{ borderColor: '#375C68' }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#375C68' }}>
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: '#2B2C30' }}>현재 데이터 백업</div>
              <div className="text-sm" style={{ color: '#2B2C30', opacity: 0.6 }}>
                시스템에 등록된 현재 문항 데이터 내보내기
              </div>
            </div>
            <Download className="w-5 h-5 ml-auto" style={{ color: '#375C68' }} />
          </button>
        </div>

        {/* Template Cards */}
        <h2 className="text-xl font-bold uppercase tracking-wider mb-6" style={{ color: '#2B2C30' }}>
          개별 템플릿 다운로드
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {templateCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border-2 rounded-lg overflow-hidden"
              style={{ borderColor: card.color }}
            >
              <div className="p-5" style={{ backgroundColor: card.color }}>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#2B2C30', opacity: 0.5 }}>
                  주요 컬럼
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.columns.map((col, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: '#F3F3F2', color: '#2B2C30' }}
                    >
                      {col}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleDownload(card.id as any)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: card.color, color: 'white' }}
                >
                  <Download className="w-4 h-4" />
                  CSV 다운로드
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Role Codes */}
        <div className="bg-white border-2 rounded-lg p-6 mb-10" style={{ borderColor: '#E0CD8C' }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold" style={{ color: '#2B2C30' }}>직군 코드 참조표</h3>
              <p className="text-sm" style={{ color: '#2B2C30', opacity: 0.6 }}>
                Part 3 문항의 role 필드에 사용하는 코드입니다.
              </p>
            </div>
            <button
              onClick={() => handleDownload('roles')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#E0CD8C', color: '#2B2C30' }}
            >
              <Download className="w-4 h-4" />
              다운로드
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'pmkt', label: '퍼포먼스 마케팅' },
              { id: 'brand', label: 'SNS/브랜드 마케팅' },
              { id: 'hr', label: 'HR(인사/노무)' },
              { id: 'qa', label: 'QA(소프트웨어)' },
              { id: 'biz', label: '사업기획/전략' },
              { id: 'fin', label: '재무/회계' },
              { id: 'ops', label: '운영/PMO' },
              { id: 'adm', label: '구매/총무/계약' }
            ].map((role) => (
              <div key={role.id} className="flex items-center gap-2 text-sm">
                <code className="px-2 py-1 rounded text-xs font-mono" style={{ backgroundColor: '#F3F3F2' }}>
                  {role.id}
                </code>
                <span style={{ color: '#2B2C30' }}>{role.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">사용 방법</h3>
              <ol className="text-sm text-blue-800 space-y-2">
                <li>1. 원하는 템플릿을 다운로드합니다.</li>
                <li>2. Excel에서 CSV 파일을 열고 문항을 입력합니다.</li>
                <li>3. 첫 번째 행(헤더)은 수정하지 마세요.</li>
                <li>4. 두 번째 행(설명)은 참고용이며 삭제해도 됩니다.</li>
                <li>5. 세 번째 행부터 데이터를 입력합니다.</li>
                <li>6. JSON 컬럼은 배열 형식으로 입력합니다: <code>["항목1","항목2"]</code></li>
                <li>7. 작성 완료된 파일을 개발자에게 전달합니다.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 pt-8 border-t-2" style={{ borderColor: '#2B2C30', opacity: 0.2 }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: '#2B2C30', opacity: 0.5 }}>
            현재 등록된 문항 수
          </h3>
          <div className="flex gap-6">
            <div>
              <span className="text-3xl font-bold" style={{ color: '#2B2C30' }}>{part1Questions.length}</span>
              <span className="text-sm ml-2" style={{ color: '#2B2C30', opacity: 0.6 }}>Part 1</span>
            </div>
            <div>
              <span className="text-3xl font-bold" style={{ color: '#2B2C30' }}>{part2Questions.length}</span>
              <span className="text-sm ml-2" style={{ color: '#2B2C30', opacity: 0.6 }}>Part 2</span>
            </div>
            <div>
              <span className="text-3xl font-bold" style={{ color: '#2B2C30' }}>{part3TasksAll.length}</span>
              <span className="text-sm ml-2" style={{ color: '#2B2C30', opacity: 0.6 }}>Part 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
