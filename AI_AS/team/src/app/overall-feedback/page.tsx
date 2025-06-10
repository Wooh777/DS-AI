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

export default function OverallFeedbackPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [hasNoData, setHasNoData] = useState(false)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const storedData = localStorage.getItem('allInterviewSessionsData')
        if (!storedData) {
          setHasNoData(true)
          setIsLoading(false)
          return
        }

        const allSessions: InterviewData[] = JSON.parse(storedData)

        // 최근 3개의 면접 세션만 선택
        const recentSessions = allSessions.slice(-3)

        if (recentSessions.length === 0) {
          setHasNoData(true)
          setIsLoading(false)
          return
        }

        let allQuestions: string[] = []
        let allAnswers: string[] = []
        let job = ''
        let career = ''
        let company = ''

        // 선택된 세션의 질문과 답변을 통합
        recentSessions.forEach(session => {
          allQuestions = allQuestions.concat(session.questions)
          allAnswers = allAnswers.concat(session.answers)
          // 마지막 세션의 job, career, company 사용 (또는 가장 최신 데이터)
          job = session.job
          career = session.career
          company = session.company
        })

        const result = await analyzeInterview({
          questions: allQuestions,
          answers: allAnswers,
          job,
          career,
          company,
        })

        setAnalysis(result)
      } catch (error) {
        console.error('통합 면접 분석 중 오류 발생:', error)
        setError('통합 면접 분석에 실패했습니다. 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalysis()
  }, [])

  const handleGoHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="text-xl text-blue-600">AI가 통합 면접을 분석중입니다...</div>
      </div>
    )
  }

  if (hasNoData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="text-xl text-gray-600 mb-4">아직 분석할 면접 데이터가 없습니다. 모의 면접을 먼저 진행해주세요.</div>
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
        <h1 className="text-3xl font-bold text-blue-800">통합 면접 분석 결과</h1>
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
            {analysis.overallScore.split(' - ')[0]}점/5점
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