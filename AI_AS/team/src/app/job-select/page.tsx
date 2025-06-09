'use client'

import { useRouter } from 'next/navigation'
import JobSelector from '@/features/job-select/components/JobSelector'
import Header from '@/features/job-select/components/Header'

export default function JobSelectPage() {
  const router = useRouter()

  const handleStartInterview = (prompt: any) => {
    console.log('Prompt object in handleStartInterview:', prompt);
    console.log('Prompt feedback in handleStartInterview:', prompt.feedback);

    const feedbackParam = prompt.feedback ? prompt.feedback.join(',') : '';
    // URL 파라미터로 선택한 정보 전달
    const queryString = new URLSearchParams({
      job: prompt.job,
      questionCount: prompt.questionCount.toString(),
      career: prompt.career,
      company: prompt.company,
      feedback: feedbackParam 
    }).toString()
    
    router.push(`/interview?${queryString}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">직무 선택 및 피드백 설정</h2>
          <JobSelector onStart={handleStartInterview} />
        </div>
      </main>
    </div>
  )
} 