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
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <span className="font-semibold">직무 선택</span>
        <Select {...register('job')}>
          <SelectItem value="developer">개발자</SelectItem>
          <SelectItem value="designer">디자이너</SelectItem>
          {/* Add more job options here if needed */}
        </Select>
      </div>
      <div className="flex gap-4">
        <label>
          <input type="radio" value="신입" {...register('career')} /> 신입
        </label>
        <label>
          <input type="radio" value="경력" {...register('career')} /> 경력
        </label>
      </div>
      <div>
        <span className="font-semibold">회사명</span>
        <Input {...register('company')} className="bg-white text-black mt-2" placeholder="회사명을 입력하세요" />
      </div>
      <div>
        <span className="font-semibold">질문 개수</span>
        <div className="flex gap-4 mt-2">
          <label>
            <input type="radio" value="3" {...register('questionCount')} defaultChecked /> 3개
          </label>
          <label>
            <input type="radio" value="6" {...register('questionCount')} /> 6개
          </label>
          <label>
            <input type="radio" value="9" {...register('questionCount')} /> 9개
          </label>
        </div>
      </div>
      <div>
        <span className="font-semibold">피드백 항목</span>
        <div className="flex gap-2 mt-2">
          <Checkbox {...register('feedback.logic')} /> 논리성
          <Checkbox {...register('feedback.keyword')} /> 키워드 포함
        </div>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">인터뷰 시작</Button>
    </form>
  )
} 