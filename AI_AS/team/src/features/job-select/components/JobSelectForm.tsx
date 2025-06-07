'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectItem } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export default function JobSelectForm() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: any) => {
    // TODO: 인터뷰 시작 로직
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Select label="직무 선택" {...register('job')}>
        <SelectItem value="developer">개발자</SelectItem>
        <SelectItem value="designer">디자이너</SelectItem>
        {/* ... */}
      </Select>
      <div className="flex gap-4">
        <label>
          <input type="radio" value="신입" {...register('career')} /> 신입
        </label>
        <label>
          <input type="radio" value="경력" {...register('career')} /> 경력
        </label>
      </div>
      <Input label="회사명" {...register('company')} />
      <div>
        <span className="font-semibold">피드백 항목</span>
        <div className="flex gap-2 mt-2">
          <Checkbox {...register('feedback.logic')} /> 논리성
          <Checkbox {...register('feedback.keyword')} /> 키워드 포함
          <Checkbox {...register('feedback.speed')} /> 말 빠르기
        </div>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">인터뷰 시작</Button>
    </form>
  )
} 