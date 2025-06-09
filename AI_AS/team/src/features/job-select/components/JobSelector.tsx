'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface JobSelectorProps {
  onStart: (prompt: {
    job: string
    career: string
    company: string
    feedback: string[]
    questionCount: number
  }) => void
}

export default function JobSelector({ onStart }: JobSelectorProps) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      job: 'developer',
      career: '신입',
      company: '',
      questionCount: '3', // Default as string for RadioGroup
      feedback_logic: false,
      feedback_keyword: false,
      feedback_speed: false,
    },
  })
  const onSubmit = (data: any) => {
    console.log('JobSelector onSubmit data:', data)
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
      questionCount: parseInt(data.questionCount),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-semibold mb-1">직무 선택</label>
        <Select onValueChange={(value) => setValue('job', value)} value={watch('job')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="직무를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">개발자</SelectItem>
            <SelectItem value="designer">디자이너</SelectItem>
            <SelectItem value="marketer">마케터</SelectItem>
          </SelectContent>
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
        <label className="block font-semibold mb-1">질문 개수</label>
        <RadioGroup defaultValue="3" onValueChange={(value) => setValue('questionCount', value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="q3" />
                <Label htmlFor="q3">3개</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" id="q6" />
                <Label htmlFor="q6">6개</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="9" id="q9" />
                <Label htmlFor="q9">9개</Label>
              </div>
            </RadioGroup>
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