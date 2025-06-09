'use client'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4 text-center">
        AI가 도와주는 <span className="text-blue-600">스마트한 면접 준비</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        실시간 피드백과 맞춤형 질문으로 인터뷰 성공률을 높이세요!
      </p>
      <Button 
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow"
        onClick={() => router.push('/job-select')}
      >
        지금 시작하기
      </Button>
      <div className="flex items-center gap-2 mt-8">
        <Sparkles className="text-blue-500" />
        <span className="text-blue-700 font-semibold">최근 1,200명 중 87%가 합격률 상승을 경험!</span>
      </div>
    </section>
  )
} 