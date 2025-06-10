'use client'
import { Mic, MessageCircle, Brain, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

const features = [
  {
    title: '통합 피드백',
    description:
      '지금까지 진행했던 모든 면접 결과를 종합적으로 분석하여 전반적인 면접 평가를 제공합니다.',
    icon: <MessageCircle className="w-10 h-10 text-blue-500" />,
    href: '/overall-feedback',
  },
  {
    icon: <ListChecks className="text-blue-600" size={32} />,
    title: '직무별 맞춤 질문',
    description: '지원 직무에 맞는 질문을 자동으로 추천합니다.',
    href: '/job-select',
  },
  {
    icon: <Brain className="text-blue-600" size={32} />,
    title: '합격률 분석',
    description: '답변 데이터를 바탕으로 합격률을 예측해드립니다.',
    href: '/mypage',
  },
]

export default function FeaturesSummaryPage() {
  const router = useRouter();

  return (
    <section className="py-16 bg-white px-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">서비스 소개</h1>
        <Button 
          onClick={() => router.push('/')}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Home size={20} />
          홈으로
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <a key={i} href={f.href} className="flex flex-col items-center p-6 bg-blue-50 rounded-xl shadow hover:scale-105 transition cursor-pointer">
            {f.icon}
            <div className="mt-4 text-lg font-semibold text-blue-700">{f.title}</div>
            <div className="mt-2 text-gray-600 text-center">{f.description}</div>
          </a>
        ))}
      </div>
    </section>
  )
} 