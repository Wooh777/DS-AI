'use client'

import { FeedbackData } from '@/types/interview'

interface FeedbackPanelProps {
  answer: string
  question: string
  feedbackData: FeedbackData | null // AI 피드백 데이터 추가
}

export default function FeedbackPanel({ answer, question, feedbackData }: FeedbackPanelProps) {
  if (!answer || !feedbackData) return null

  return (
    <section className="w-full max-w-xl mx-auto mt-6">
      <div className="bg-blue-50 rounded-xl p-6 mb-4 text-center">
        <div className="text-3xl font-bold text-blue-700 mb-2">총점: {feedbackData.score} / 5</div>
        {feedbackData.overallFeedback && (
          <div className="text-lg text-gray-700">{feedbackData.overallFeedback}</div>
        )}
      </div>
      <div className="mb-4">
        {feedbackData.strengths && feedbackData.strengths.length > 0 && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl my-4">
            <span className="font-semibold text-green-700">강점:</span>
            <ul className="list-disc list-inside mt-2">
              {feedbackData.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
        )}
        {feedbackData.improvements && feedbackData.improvements.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl my-4">
            <span className="font-semibold text-yellow-700">개선 제안:</span>
            <ul className="list-disc list-inside mt-2">
              {feedbackData.improvements.map((improvement, i) => (
                <li key={i}>{improvement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 상세 질문 피드백 (선택적으로 표시) */}
        {feedbackData.questionFeedbacks && feedbackData.questionFeedbacks.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">질문별 피드백</h3>
            {feedbackData.questionFeedbacks.map((qf, i) => (
              <div key={i} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                <p className="font-bold text-gray-800 mb-2">질문: {qf.question}</p>
                <p className="text-gray-700 mb-2">답변: {qf.answer}</p>
                <p className="text-gray-700 mb-2">피드백: {qf.feedback}</p>
                <p className="font-semibold text-blue-700">점수: {qf.score} / 5</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 