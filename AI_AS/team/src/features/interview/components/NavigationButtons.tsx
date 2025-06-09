'use client'
import { Button } from '@/components/ui/button'

interface NavigationButtonsProps {
  onPrevious: () => void
  onNext: () => void
  isPreviousDisabled: boolean
  isNextDisabled: boolean
}

export default function NavigationButtons({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }: NavigationButtonsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <Button 
        onClick={onPrevious} 
        className="bg-blue-600 text-white"
        disabled={isPreviousDisabled}
      >
        이전 질문
      </Button>
      <Button 
        onClick={onNext} 
        className="bg-blue-600 text-white"
        disabled={isNextDisabled}
      >
        다음 질문
      </Button>
    </div>
  )
} 