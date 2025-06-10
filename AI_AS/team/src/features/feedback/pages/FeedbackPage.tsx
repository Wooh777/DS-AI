'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { analyzeInterview } from '@/lib/api'

interface InterviewData {
  job: string
  career: string
  company: string
  questions: string[]
  answers: string[]
  questionCount: number
}

interface AnalysisResult {
  overallScore: string
  detailedFeedback: {
    question: string
    answer: string
    score: number
    feedback: string
  }[]
  strengths: string[]
  improvements: string[]
  nextSteps: string[]
}

export default function FeedbackPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const storedData = sessionStorage.getItem('latestInterviewSessionData')
        if (!storedData) {
          throw new Error('면접 데이터가 없습니다')
        }

        const currentSession: InterviewData = JSON.parse(storedData)

        // 단일 세션의 질문과 답변을 analyzeInterview API에 전달
        const result = await analyzeInterview({
          questions: currentSession.questions,
          answers: currentSession.answers,
          job: currentSession.job,
          career: currentSession.career,
          company: currentSession.company,
        })

        setAnalysis(result)
      } catch (error) {
        console.error('분석 중 오류 발생:', error)
        setError('면접 분석에 실패했습니다. 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, []) // 빈 배열로 유지하여 컴포넌트 마운트 시 한 번만 실행되도록

  const handleGoHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="text-xl text-blue-600">AI가 면접을 분석중입니다...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <Button 
          onClick={handleGoHome}
          variant="outline"
          className="flex items-center gap-2 mx-auto"
        >
          <Home size={20} />
          홈으로
        </Button>
      </div>
    )
  }

  if (!analysis) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">면접 분석 결과</h1>
        <Button 
          onClick={handleGoHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Home size={20} />
          홈으로
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">종합 점수</h2>
          <div className="text-4xl font-bold text-blue-600">
            {analysis.overallScore.split(' - ')[0]}
          </div>
          <p className="text-lg text-gray-700 mt-2">
            {analysis.overallScore.split(' - ').slice(1).join(' - ')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">강점</h3>
            <ul className="list-disc list-inside space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="text-gray-600">{strength}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">개선점</h3>
            <ul className="list-disc list-inside space-y-2">
              {analysis.improvements.map((improvement, index) => (
                <li key={index} className="text-gray-600">{improvement}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">상세 피드백</h2>
        {analysis.detailedFeedback.map((feedback, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">질문 {index + 1}</h3>
              <p className="text-gray-600">{feedback.question}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">답변</h4>
              <p className="text-gray-600">{feedback.answer}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">점수</h4>
              <p className="text-blue-600 font-bold">{feedback.score}점</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">피드백</h4>
              <p className="text-gray-600">{feedback.feedback}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">다음 단계 제안</h2>
        <ul className="list-disc list-inside space-y-2">
          {analysis.nextSteps.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ul>
      </div>
    </div>
  )
} 