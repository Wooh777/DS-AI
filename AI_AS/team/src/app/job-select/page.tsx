'use client'

import JobSelector from '@/features/job-select/components/JobSelector'
import Header from '@/features/job-select/components/Header'

export default function JobSelectPage() {
  const handleStartInterview = (prompt: any) => {
    // TODO: 인터뷰 시작 로직 (GPT 질문 생성 API 호출 등)
    console.log('인터뷰 시작 프롬프트:', prompt)
    // 다음 페이지로 이동 (예: /interview)
    window.location.href = '/interview'
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