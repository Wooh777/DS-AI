'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AnswerTranscriptProps {
  transcript: string
  onAnswerSubmit: (answer: string) => void
}

export default function AnswerTranscript({ transcript, onAnswerSubmit }: AnswerTranscriptProps) {
  const [answerInput, setAnswerInput] = useState('')

  const handleSubmit = () => {
    if (answerInput.trim()) {
      onAnswerSubmit(answerInput)
      setAnswerInput('')
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-blue-50 rounded-xl p-4 text-gray-700 text-base">
        <span className="font-semibold text-blue-700">답변 텍스트:</span> {transcript}
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input 
          type="text"
          placeholder="여기에 답변을 입력(테스트용)"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
        <Button type="submit" onClick={handleSubmit}>전송</Button>
      </div>
    </div>
  )
} 