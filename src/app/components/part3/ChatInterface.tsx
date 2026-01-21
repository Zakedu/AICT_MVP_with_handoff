/**
 * Part 3-C: AI 협업 과정
 * AI와 5회 대화를 통해 결과물 완성
 */

import { useState, useEffect, useRef } from 'react';
import { FileText, CheckCircle, Send, Loader2, User, Bot, AlertTriangle } from 'lucide-react';
import { Part3Task, ChatMessage } from '../../data/types/part3';
import { chatWithClaude } from '../../services/part3-grading';

// 색상 상수
const COLORS = {
  navy: '#1E3A5F',
  navyDark: '#152A45',
  gold: '#C9A227',
  goldLight: '#E8D48A',
  goldMuted: '#F5EFD7',
  surface: '#F8F9FA',
  border: '#E5E7EB',
  textMuted: '#64748B',
  success: '#059669',
  error: '#DC2626',
};

interface ChatInterfaceProps {
  task: Part3Task;
  onSave: (content: string, messages: ChatMessage[]) => void;
  initialContent?: string;
  initialMessages?: ChatMessage[];
  apiKey?: string;
}

export function ChatInterface({
  task,
  onSave,
  initialContent = '',
  initialMessages = [],
  apiKey
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const maxMessages = task.aiMessagesLimit; // 5회
  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const remainingMessages = maxMessages - userMessageCount;
  const canSendMessage = remainingMessages > 0 && !isLoading && apiKey;

  // 스크롤 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 자동 저장
  useEffect(() => {
    const timer = setTimeout(() => {
      const content = messages
        .map(m => `[${m.role === 'user' ? '응시자' : 'AI'}]\n${m.content}`)
        .join('\n\n---\n\n');
      onSave(content, messages);
    }, 500);
    return () => clearTimeout(timer);
  }, [messages, onSave]);

  // 메시지 전송
  const handleSend = async () => {
    if (!canSendMessage || !input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      const response = await chatWithClaude(task, allMessages, apiKey!);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter 키로 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6 h-full">
      {/* LEFT: 시나리오 & 요구사항 (2/5) */}
      <div className="lg:col-span-2 space-y-4 overflow-y-auto">
        {/* 시나리오 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" style={{ color: COLORS.navy }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>시나리오</h3>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: COLORS.navy }}>
            {task.scenarioDesc}
          </p>

          {task.context && task.context.length > 0 && (
            <div className="rounded-lg p-4 mt-4" style={{ backgroundColor: COLORS.goldMuted }}>
              <h4 className="text-sm font-bold mb-2" style={{ color: COLORS.navy }}>주어진 조건</h4>
              <ul className="space-y-1.5">
                {task.context.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: COLORS.navy }}>
                    <span style={{ color: COLORS.gold }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 평가 기준 */}
        <div className="rounded-lg border-2 p-5" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: COLORS.gold }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>평가 기준</h3>
          </div>
          <ul className="space-y-2 text-sm" style={{ color: COLORS.navy }}>
            <li>• 최종 결과물의 완성도</li>
            <li>• AI와의 대화 효율성 (불필요한 반복 없이)</li>
            <li>• 중간 결과물에 대한 피드백 적절성</li>
            <li>• 전문가 관점의 보완 능력</li>
          </ul>
        </div>

        {/* 요구사항 */}
        <div className="bg-white rounded-lg border-2 p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: COLORS.success }} />
            <h3 className="font-bold" style={{ color: COLORS.navy }}>요구사항</h3>
          </div>
          <div className="space-y-2">
            {task.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm" style={{ color: COLORS.navy }}>
                <span style={{ color: COLORS.success }}>•</span>
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="rounded-lg border-2 p-4" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
          <p className="text-sm" style={{ color: COLORS.navy }}>
            <strong>Tip:</strong> 첫 메시지에 목적과 요구사항을 명확히 전달하세요.
            AI 응답에 대해 구체적인 피드백을 제공하면 더 좋은 결과를 얻을 수 있습니다.
          </p>
        </div>
      </div>

      {/* RIGHT: 채팅 인터페이스 (3/5) */}
      <div className="lg:col-span-3 flex flex-col h-full bg-white rounded-lg border-2 overflow-hidden" style={{ borderColor: COLORS.border }}>
        {/* 헤더 */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: COLORS.navy }}>
          <div className="flex items-center gap-2 text-white">
            <Bot className="w-5 h-5" />
            <span className="font-medium">AI 협업 채팅</span>
          </div>
          <div
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: remainingMessages > 2 ? 'rgba(255,255,255,0.2)' : remainingMessages > 0 ? COLORS.gold : COLORS.error,
              color: remainingMessages > 2 ? 'white' : remainingMessages > 0 ? COLORS.navyDark : 'white',
            }}
          >
            남은 메시지: {remainingMessages}/{maxMessages}
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: COLORS.surface, minHeight: '400px' }}>
          {messages.length === 0 && (
            <div className="text-center py-8" style={{ color: COLORS.textMuted }}>
              <Bot className="w-12 h-12 mx-auto mb-3" style={{ color: COLORS.border }} />
              <p>AI에게 첫 메시지를 보내 협업을 시작하세요.</p>
              <p className="text-sm mt-1">최대 {maxMessages}회의 메시지를 주고받을 수 있습니다.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.navy }}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className="max-w-[80%] rounded-2xl px-4 py-3"
                style={{
                  backgroundColor: msg.role === 'user' ? COLORS.navy : 'white',
                  color: msg.role === 'user' ? 'white' : COLORS.navy,
                  border: msg.role === 'assistant' ? `1px solid ${COLORS.border}` : 'none',
                }}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div
                  className="text-xs mt-1"
                  style={{ color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : COLORS.textMuted }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: COLORS.gold }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.navy }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border rounded-2xl px-4 py-3" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-2" style={{ color: COLORS.textMuted }}>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI가 응답을 작성 중...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 경고 메시지 */}
        {remainingMessages <= 2 && remainingMessages > 0 && (
          <div className="border-t px-4 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.goldMuted, borderColor: COLORS.gold }}>
            <AlertTriangle className="w-4 h-4" style={{ color: COLORS.gold }} />
            <span className="text-sm" style={{ color: COLORS.navy }}>
              메시지가 {remainingMessages}회 남았습니다. 신중하게 사용하세요.
            </span>
          </div>
        )}

        {remainingMessages === 0 && (
          <div className="border-t px-4 py-2 flex items-center gap-2" style={{ backgroundColor: '#FEF2F2', borderColor: COLORS.error }}>
            <AlertTriangle className="w-4 h-4" style={{ color: COLORS.error }} />
            <span className="text-sm" style={{ color: COLORS.navy }}>
              메시지를 모두 사용했습니다. 대화 내용이 그대로 평가에 반영됩니다.
            </span>
          </div>
        )}

        {/* 입력 영역 */}
        <div className="border-t p-4 bg-white" style={{ borderColor: COLORS.border }}>
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!canSendMessage}
              placeholder={
                canSendMessage
                  ? '메시지를 입력하세요... (Shift+Enter: 줄바꿈)'
                  : remainingMessages === 0
                  ? '메시지를 모두 사용했습니다'
                  : 'API 키가 필요합니다'
              }
              className="flex-1 px-4 py-3 border-2 rounded-lg text-sm resize-none focus:outline-none disabled:bg-gray-100"
              style={{ borderColor: COLORS.border, color: COLORS.navy }}
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!canSendMessage || !input.trim()}
              className="px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: canSendMessage && input.trim() ? COLORS.navy : COLORS.border,
                color: canSendMessage && input.trim() ? 'white' : COLORS.textMuted,
                cursor: canSendMessage && input.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
