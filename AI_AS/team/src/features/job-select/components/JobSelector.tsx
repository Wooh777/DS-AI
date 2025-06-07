'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface JobSelectorProps {
  onStart: (prompt: {
    job: string
    career: string
    company: string
    feedback: string[]
  }) => void
}

export default function JobSelector({ onStart }: JobSelectorProps) {
  const { register, handleSubmit, watch } = useForm()
  const onSubmit = (data: any) => {
    const feedback = [
      data.feedback_logic && '논리성',
      data.feedback_keyword && '키워드 포함',
      data.feedback_speed && '말 빠르기',
    ].filter(Boolean)
    onStart({
      job: data.job,
      career: data.career,
      company: data.company,
      feedback: feedback as string[],
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-semibold mb-1">직무 선택</label>
        <Select {...register('job', { required: true })}>
          <SelectItem value="developer">개발자</SelectItem>
          <SelectItem value="designer">디자이너</SelectItem>
          <SelectItem value="marketer">마케터</SelectItem>
        </Select>
      </div>
      <div className="flex gap-4">
        <label>
          <input type="radio" value="신입" {...register('career', { required: true })} /> 신입
        </label>
        <label>
          <input type="radio" value="경력" {...register('career', { required: true })} /> 경력
        </label>
      </div>
      <div>
        <label className="block font-semibold mb-1">회사명</label>
        <input type="text" className="border rounded px-3 py-2 w-full" {...register('company', { required: true })} placeholder="회사명을 입력하세요" />
      </div>
      <div>
        <span className="font-semibold">피드백 항목</span>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-1">
            <Checkbox {...register('feedback_logic')} /> 논리성
          </label>
          <label className="flex items-center gap-1">
            <Checkbox {...register('feedback_keyword')} /> 키워드 포함
          </label>
          <label className="flex items-center gap-1">
            <Checkbox {...register('feedback_speed')} /> 말 빠르기
          </label>
        </div>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">인터뷰 시작</Button>
    </form>
  )
} 