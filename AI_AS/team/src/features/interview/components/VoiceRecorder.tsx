'use client'
import { useState } from 'react'
import { Mic, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoiceRecorderProps {
  isRecording: boolean
  onStart: () => void
  onStop: () => void
  onTranscript: (text: string) => void
  transcript?: string
}

export default function VoiceRecorder({ isRecording, onStart, onStop, onTranscript, transcript }: VoiceRecorderProps) {
  // 실제 STT 연동은 별도 구현 필요. 아래는 UI 및 더미 처리 예시
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      onTranscript(input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex items-center gap-4">
        {isRecording ? (
          <Button onClick={onStop} className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4">
            <StopCircle size={32} />
          </Button>
        ) : (
          <Button onClick={onStart} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4">
            <Mic size={32} />
          </Button>
        )}
        <span className={isRecording ? 'text-red-600 font-bold' : 'text-gray-500'}>
          {isRecording ? '녹음 중...' : '대기 중'}
        </span>
      </div>
      {/* 실제 STT 결과가 있으면 표시 */}
      {transcript && (
        <div className="bg-blue-50 rounded-xl p-4 text-gray-700 mt-2 text-base w-full">
          <span className="font-semibold text-blue-700">답변 텍스트:</span> {transcript}
        </div>
      )}
      {/* 데모용 텍스트 입력 (실제 STT 연동 전용) */}
      <div className="flex gap-2 w-full mt-2">
        <input
          type="text"
          className="border rounded px-3 py-2 flex-1"
          placeholder="여기에 답변을 입력(테스트용)"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button type="button" onClick={handleSend} className="bg-blue-600 text-white">전송</Button>
      </div>
    </div>
  )
} 