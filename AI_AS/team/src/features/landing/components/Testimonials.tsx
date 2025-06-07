'use client'

const testimonials = [
  {
    name: '김지원',
    text: 'AI 피드백 덕분에 실제 면접에서 자신감이 생겼어요!'
  },
  {
    name: '박민수',
    text: '직무별 질문이 정말 실전과 비슷해서 큰 도움이 됐습니다.'
  },
  {
    name: '이서연',
    text: '음성 녹음 기능으로 실전 감각을 익힐 수 있었어요.'
  },
]

export default function Testimonials() {
  return (
    <section className="py-14 bg-blue-50">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">사용자 후기</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 flex-1">
            <div className="text-gray-700 mb-2">"{t.text}"</div>
            <div className="text-blue-700 font-semibold text-right">- {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
} 