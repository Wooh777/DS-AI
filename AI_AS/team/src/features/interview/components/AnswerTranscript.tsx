'use client'

interface AnswerTranscriptProps {
  transcript: string
  onAnswerSubmit: (answer: string) => void
}

export default function AnswerTranscript({ transcript, onAnswerSubmit }: AnswerTranscriptProps) {
  return (
    <div className="bg-blue-50 rounded-xl p-4 text-gray-700 mt-2 text-base">
      <span className="font-semibold text-blue-700">답변 텍스트:</span> {transcript}
      {transcript && (
        <button
          onClick={() => onAnswerSubmit(transcript)}
          className="ml-4 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          답변 제출
        </button>
      )}
    </div>
  )
} 