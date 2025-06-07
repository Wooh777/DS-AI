'use client'

interface QuestionBoxProps {
  question: string
  loading?: boolean
  error?: string
}

export default function QuestionBox({ question, loading, error }: QuestionBoxProps) {
  if (loading) {
    return <div className="bg-white rounded-xl shadow p-6 text-lg text-blue-600 mb-4 text-center">질문 생성 중...</div>
  }
  if (error) {
    return <div className="bg-red-50 rounded-xl shadow p-6 text-lg text-red-600 mb-4 text-center">{error}</div>
  }
  return (
    <div className="bg-white rounded-xl shadow p-6 text-lg font-semibold text-blue-800 mb-4">
      {question}
    </div>
  )
} 