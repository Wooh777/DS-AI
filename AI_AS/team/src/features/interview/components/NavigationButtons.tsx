'use client'
import { Button } from '@/components/ui/button'

export default function NavigationButtons({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
  return (
    <div className="flex gap-4 mt-4">
      <Button onClick={onPrev} className="bg-blue-600 text-white">이전 질문</Button>
      <Button onClick={onNext} className="bg-blue-600 text-white">다음 질문</Button>
    </div>
  )
} 