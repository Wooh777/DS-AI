'use client'
import { Progress } from '@/components/ui/progress'

export default function ProgressBar({ current, total }: { current: number, total: number }) {
  return (
    <div className="my-4">
      <Progress value={(current / total) * 100} className="h-2 bg-blue-100" />
      <div className="text-right text-sm text-blue-700 mt-1">{current} / {total} 질문</div>
    </div>
  )
} 