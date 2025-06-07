'use client'

const tips = [
  {
    job: '개발자',
    questions: [
      '본인이 참여한 프로젝트 중 가장 기억에 남는 것은?',
      '협업 과정에서 어려웠던 점과 해결 방법은?',
    ],
  },
  {
    job: '디자이너',
    questions: [
      '포트폴리오에서 가장 자신 있는 작업물은?',
      '사용자 경험을 개선한 사례를 설명해 주세요.',
    ],
  },
]

export default function TipsBox() {
  return (
    <aside className="bg-blue-50 rounded-xl p-6 shadow max-w-md mx-auto">
      <h3 className="text-lg font-bold text-blue-700 mb-4">직무별 자주 나오는 질문</h3>
      {tips.map((tip, i) => (
        <div key={i} className="mb-4">
          <div className="font-semibold text-blue-600">{tip.job}</div>
          <ul className="list-disc ml-5 text-gray-700">
            {tip.questions.map((q, j) => (
              <li key={j}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  )
} 