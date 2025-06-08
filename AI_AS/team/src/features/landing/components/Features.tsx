'use client'
import { Mic, MessageCircle, Brain, ListChecks } from 'lucide-react'

const features = [
  {
    icon: <Mic className="text-blue-600" size={32} />,
    title: '음성 입력',
    desc: '실제 면접처럼 음성으로 답변을 녹음하고 연습할 수 있습니다.',
    href: '/interview',
  },
  {
    icon: <MessageCircle className="text-blue-600" size={32} />,
    title: '실시간 피드백',
    desc: 'AI가 답변을 분석해 즉각적으로 피드백을 제공합니다.',
    href: '/feedback',
  },
  {
    icon: <ListChecks className="text-blue-600" size={32} />,
    title: '직무별 맞춤 질문',
    desc: '지원 직무에 맞는 질문을 자동으로 추천합니다.',
    href: '/job-select',
  },
  {
    icon: <Brain className="text-blue-600" size={32} />,
    title: '합격률 분석',
    desc: '답변 데이터를 바탕으로 합격률을 예측해드립니다.',
    href: '/mypage',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white" id="about">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-10">핵심 기능</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <a key={i} href={f.href} className="flex flex-col items-center p-6 bg-blue-50 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            {f.icon}
            <div className="mt-4 text-lg font-semibold text-blue-700">{f.title}</div>
            <div className="mt-2 text-gray-600 text-center">{f.desc}</div>
          </a>
        ))}
      </div>
    </section>
  )
} 