'use client'
import { useState } from 'react'
import { Mic, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoiceRecorderProps {
  isRecording: boolean
  onRecordingChange: (isRecording: boolean) => void
  onTranscriptChange: (text: string) => void
}

export default function VoiceRecorder({ isRecording, onRecordingChange, onTranscriptChange }: VoiceRecorderProps) {
  // 실제 STT 연동은 별도 구현 필요. 아래는 UI 및 더미 처리 예시
  const [input, setInput] = useState('')

  const handleStart = () => {
    onRecordingChange(true)
  }

  const handleStop = () => {
    onRecordingChange(false)
  }

  const handleSend = () => {
    if (input.trim()) {
      onTranscriptChange(input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex items-center gap-4">
        {isRecording ? (
          <Button onClick={handleStop} className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4">
            <StopCircle size={32} />
          </Button>
        ) : (
          <Button onClick={handleStart} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4">
            <Mic size={32} />
          </Button>
        )}
        <span className={isRecording ? 'text-red-600 font-bold' : 'text-gray-500'}>
          {isRecording ? '녹음 중...' : '대기 중'}
        </span>
      </div>
      {/* 실제 STT 결과가 있으면 표시 */}
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