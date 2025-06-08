'use client'

import FeedbackPanel from '@/features/interview/components/FeedbackPanel'

export default function FeedbackPage() {
  // 실제 데이터는 API 호출을 통해 받아오게 됩니다.
  const dummyFeedback = {
    totalScore: 4,
    summary: '전반적으로 잘 답변해주셨습니다. 핵심 키워드를 더 포함하면 좋습니다.',
    details: [
      { label: '논리성', score: 4 },
      { label: '키워드 포함 여부', score: 3 },
      { label: '말 빠르기', score: 5 },
    ],
    improvement: '답변에 지원 직무와 관련된 구체적인 경험을 더 녹여내면 좋습니다. 특히 ~~~ 부분을 강조하세요.',
  }

  const handleRetry = () => {
    // TODO: 다시 답변하기 로직 (예: 면접 진행 페이지로 돌아가기)
    console.log('다시 답변하기')
    window.location.href = '/interview' // 예시
  }

  const handleNext = () => {
    // TODO: 다음 질문으로 이동 or 최종 피드백 확인 등
    console.log('다음 질문으로 이동')
    window.location.href = '/mypage' // 예시: 최종적으로 마이페이지로 이동
  }

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">피드백 결과</h1>
      <FeedbackPanel
        totalScore={dummyFeedback.totalScore}
        summary={dummyFeedback.summary}
        details={dummyFeedback.details}
        improvement={dummyFeedback.improvement}
        onRetry={handleRetry}
        onNext={handleNext}
      />
    </div>
  )
} 