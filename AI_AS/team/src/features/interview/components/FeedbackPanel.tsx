'use client'

interface FeedbackPanelProps {
  answer: string
  question: string
}

export default function FeedbackPanel({ answer, question }: FeedbackPanelProps) {
  if (!answer) return null

  // 임시 피드백 데이터 (실제로는 AI로 분석)
  const feedback = {
    totalScore: 4,
    summary: "전반적으로 좋은 답변이었습니다.",
    details: [
      { label: "논리성", score: 4 },
      { label: "전문성", score: 3 },
      { label: "설명력", score: 5 }
    ],
    improvement: "구체적인 예시를 더 추가하면 좋을 것 같습니다."
  }

  return (
    <section className="w-full max-w-xl mx-auto mt-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-4 text-center">
        <div className="text-3xl font-bold text-blue-700 mb-2">총점: {feedback.totalScore} / 5</div>
        <div className="text-lg text-gray-700">{feedback.summary}</div>
      </div>
      <div className="mb-4">
        {feedback.details.map((d, i) => (
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
        <span className="font-semibold text-yellow-700">개선 제안:</span> {feedback.improvement}
      </div>
    </section>
  )
} 