'use client'

interface FeedbackPanelProps {
  totalScore: number
  summary: string
  details: { label: string; score: number }[]
  improvement: string
  onRetry: () => void
  onNext: () => void
}

export default function FeedbackPanel({ totalScore, summary, details, improvement, onRetry, onNext }: FeedbackPanelProps) {
  return (
    <section className="w-full max-w-xl mx-auto mt-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-4 text-center">
        <div className="text-3xl font-bold text-blue-700 mb-2">총점: {totalScore} / 5</div>
        <div className="text-lg text-gray-700">{summary}</div>
      </div>
      <div className="mb-4">
        {details.map((d, i) => (
          <div key={i} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{d.label}</span>
              <span className="text-blue-700 font-bold">{d.score}/5</span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded">
              <div className="h-2 rounded bg-blue-600" style={{ width: `${(d.score / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl my-4">
        <span className="font-semibold text-yellow-700">개선 제안:</span> {improvement}
      </div>
      <div className="flex gap-4 mt-6 justify-center">
        <button onClick={onRetry} className="bg-blue-100 text-blue-700 px-4 py-2 rounded">다시 답변하기</button>
        <button onClick={onNext} className="bg-blue-600 text-white px-4 py-2 rounded">다음 질문</button>
      </div>
    </section>
  )
} 