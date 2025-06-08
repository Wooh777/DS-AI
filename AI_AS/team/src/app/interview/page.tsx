'use client'
import { useState } from 'react'
import QuestionBox from '@/features/interview/components/QuestionBox'
import VoiceRecorder from '@/features/interview/components/VoiceRecorder'
import FeedbackPanel from '@/features/interview/components/FeedbackPanel'
import NavigationButtons from '@/features/interview/components/NavigationButtons'
import ProgressBar from '@/features/interview/components/ProgressBar'
import Header from '@/features/job-select/components/Header'

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState('AI 면접 서비스에 지원한 동기를 말씀해주세요.')
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const totalQuestions = 3 // 예시

  // Dummy feedback data
  const dummyFeedback = {
    totalScore: 4,
    summary: '전반적으로 잘 답변해주셨습니다. 핵심 키워드를 더 포함하면 좋습니다.',
    details: [
      { label: '논리성', score: 4 },
      { label: '키워드 포함 여부', score: 3 },
      { label: '말 빠르기', score: 5 },
    ],
    improvement: '답변에 지원 직무와 관련된 구체적인 경험을 더 녹여내면 좋습니다.',
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setTranscript('') // Start new recording, clear previous transcript
    // TODO: 음성 녹음 시작 API 호출
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // TODO: 음성 녹음 중지 및 STT API 호출
    // 임시로 바로 피드백 패널 보여주기
    setShowFeedback(true)
  }

  const handleTranscript = (text: string) => {
    setTranscript(text)
    // TODO: 텍스트를 AI에 전송하여 피드백 요청
  }

  const handleRetryAnswer = () => {
    setShowFeedback(false)
    setTranscript('')
    // 다시 답변 시작
  }

  const handleNextQuestion = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1)
      setCurrentQuestion('다음 질문입니다...') // Replace with actual next question
      setTranscript('')
      setShowFeedback(false)
    } else {
      // TODO: 면접 종료 및 최종 피드백 페이지로 이동
      alert('면접이 종료되었습니다. 최종 피드백 페이지로 이동합니다.')
      window.location.href = '/feedback' // Example redirection
    }
  }

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
      setCurrentQuestion('이전 질문입니다...') // Replace with actual previous question
      setTranscript('')
      setShowFeedback(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">면접 진행</h1>
        <ProgressBar current={questionIndex + 1} total={totalQuestions} />
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
          <QuestionBox question={currentQuestion} />
          {!showFeedback && (
            <VoiceRecorder
              isRecording={isRecording}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              onTranscript={handleTranscript}
              transcript={transcript}
            />
          )}
          {showFeedback && (
            <FeedbackPanel
              totalScore={dummyFeedback.totalScore}
              summary={dummyFeedback.summary}
              details={dummyFeedback.details}
              improvement={dummyFeedback.improvement}
              onRetry={handleRetryAnswer}
              onNext={handleNextQuestion}
            />
          )}
          {!showFeedback && (
            <NavigationButtons onPrev={handlePrevQuestion} onNext={handleNextQuestion} />
          )}
        </div>
      </main>
    </div>
  )
} 