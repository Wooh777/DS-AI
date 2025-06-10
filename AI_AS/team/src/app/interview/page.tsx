'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import ProgressBar from '../../features/interview/components/ProgressBar'
import QuestionBox from '../../features/interview/components/QuestionBox'
import AnswerTranscript from '../../features/interview/components/AnswerTranscript'
import FeedbackPanel from '../../features/interview/components/FeedbackPanel'
import NavigationButtons from '../../features/interview/components/NavigationButtons'
import { generateQuestions, analyzeAnswer } from '@/lib/api'

// 예시 질문 목록 (실제로는 API나 데이터베이스에서 가져올 수 있습니다)
const SAMPLE_QUESTIONS = {
  developer: [
    "자기소개를 해주세요.",
    "프로젝트에서 가장 어려웠던 점과 해결 방법은?",
    "자바스크립트의 클로저에 대해 설명해주세요.",
    "REST API의 특징은 무엇인가요?",
    "데이터베이스 인덱스의 장단점은?",
    "마이크로서비스 아키텍처의 장단점은?",
    "CI/CD 파이프라인을 구축한 경험이 있다면 설명해주세요.",
    "코드 리뷰를 할 때 중요하게 생각하는 부분은?",
    "테스트 자동화에 대해 어떻게 생각하시나요?"
  ],
  designer: [
    "자기소개를 해주세요.",
    "디자인 프로세스에 대해 설명해주세요.",
    "가장 자신 있는 디자인 프로젝트는?",
    "UI/UX의 차이점은 무엇인가요?",
    "디자인 시스템을 구축한 경험이 있다면 설명해주세요.",
    "사용자 리서치 방법에 대해 설명해주세요.",
    "디자인 툴 중 가장 선호하는 것은?",
    "반응형 디자인의 중요성은?",
    "디자인 트렌드에 대해 어떻게 생각하시나요?"
  ],
  marketer: [
    "자기소개를 해주세요.",
    "마케팅 전략을 수립한 경험이 있다면 설명해주세요.",
    "성공적인 마케팅 캠페인 사례를 설명해주세요.",
    "디지털 마케팅과 전통적 마케팅의 차이점은?",
    "타겟 고객층을 분석하는 방법은?",
    "마케팅 ROI를 측정하는 방법은?",
    "소셜 미디어 마케팅 전략은?",
    "브랜드 포지셔닝에 대해 설명해주세요.",
    "마케팅 자동화 도구 사용 경험이 있다면 설명해주세요."
  ]
}

export default function InterviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const job = searchParams.get('job') || 'developer'
  const questionCount = parseInt(searchParams.get('questionCount') || '3')
  const career = searchParams.get('career') || ''
  const company = searchParams.get('company') || ''
  const feedback = searchParams.get('feedback')?.split(',') || []
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState<{ score: number; strengths: string[]; improvements: string[]; } | null>(null)
  const [showOverallFeedbackButton, setShowOverallFeedbackButton] = useState(false)

  const hasFetchedRef = useRef(false)

  // GPT API를 사용하여 질문 생성
  useEffect(() => {
    const fetchQuestions = async () => {
      if (hasFetchedRef.current) {
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const generatedQuestions = await generateQuestions({
          job,
          career,
          company,
          count: questionCount
        })
        const processedQuestions = generatedQuestions.map((q: { id: number; text: string; type: string }) => q.text)
        console.log('Generated Questions for State:', processedQuestions)
        setQuestions(processedQuestions)
        hasFetchedRef.current = true
      } catch (error) {
        console.error('질문 생성 실패:', error)
        setError('질문을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [job, career, company, questionCount])

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 마지막 질문이면 피드백 페이지로 이동
      const feedbackData = {
        job,
        career,
        company,
        feedback,
        questionCount,
        questions,
        answers
      }
      // Session Storage에 현재 세션 데이터 저장
      sessionStorage.setItem('latestInterviewSessionData', JSON.stringify(feedbackData))

      // Local Storage에 현재 세션 데이터 저장 (전체 통합 피드백용)
      const existingData = JSON.parse(localStorage.getItem('allInterviewSessionsData') || '[]')
      const newData = [...existingData, feedbackData]
      localStorage.setItem('allInterviewSessionsData', JSON.stringify(newData))

      // 마지막 질문이면 전체 피드백 보기 버튼 활성화
      setShowOverallFeedbackButton(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleAnswerSubmit = async (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answer
    setAnswers(newAnswers)
    
    try {
      setFeedbackLoading(true)
      const response = await analyzeAnswer({
        question: questions[currentQuestionIndex],
        answer: answer,
        job,
        career,
        company,
      })
      setCurrentFeedback(response)
    } catch (err) {
      console.error('답변 분석 실패:', err)
    } finally {
      setFeedbackLoading(false)
    }

    if (currentQuestionIndex === questions.length - 1) {
      const feedbackData = {
        job,
        career,
        company,
        feedback,
        questionCount,
        questions,
        answers: newAnswers
      }
      // Session Storage에 현재 세션 데이터 저장
      sessionStorage.setItem('latestInterviewSessionData', JSON.stringify(feedbackData))

      // Local Storage에 현재 세션 데이터 저장 (전체 통합 피드백용)
      const existingData = JSON.parse(localStorage.getItem('allInterviewSessionsData') || '[]')
      const newData = [...existingData, feedbackData]
      localStorage.setItem('allInterviewSessionsData', JSON.stringify(newData))

      // 마지막 질문이면 전체 피드백 보기 버튼 활성화
      setShowOverallFeedbackButton(true)
    }
  }

  const handleGoHome = () => {
    router.push('/')
  }

  const handleViewOverallFeedback = () => {
    router.push('/feedback')
  }

  // 로딩 중이거나 에러가 있으면 표시
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <div className="text-xl text-blue-600">AI가 면접 질문을 생성중입니다...</div>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">면접 진행</h1>
        <Button 
          onClick={handleGoHome}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Home size={20} />
          홈으로
        </Button>
      </div>

      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      <div className="mt-8 space-y-6">
        <QuestionBox 
          question={questions[currentQuestionIndex]} 
          questionNumber={currentQuestionIndex + 1}
        />
        
        <AnswerTranscript 
          transcript={answers[currentQuestionIndex] || ''}
          onAnswerSubmit={handleAnswerSubmit}
        />
        
        {feedbackLoading ? (
          <div className="text-center text-blue-600">AI가 답변을 분석 중입니다...</div>
        ) : (
          <FeedbackPanel 
            answer={answers[currentQuestionIndex]}
            question={questions[currentQuestionIndex]}
            feedbackData={currentFeedback}
          />
        )}
          
        <NavigationButtons 
          onPrevious={handlePrevious}
          onNext={handleNext}
          isPreviousDisabled={currentQuestionIndex === 0}
          isNextDisabled={currentQuestionIndex === questions.length - 1 || showOverallFeedbackButton}
        />

        {showOverallFeedbackButton && (
          <div className="mt-8 text-center">
            <Button 
              onClick={handleViewOverallFeedback}
              className="text-xl px-8 py-4"
            >
              전체 피드백 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 