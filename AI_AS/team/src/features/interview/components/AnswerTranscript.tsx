'use client'

export default function AnswerTranscript({ transcript }: { transcript: string }) {
  return (
    <div className="bg-blue-50 rounded-xl p-4 text-gray-700 mt-2 text-base">
      <span className="font-semibold text-blue-700">답변 텍스트:</span> {transcript}
    </div>
  )
} 