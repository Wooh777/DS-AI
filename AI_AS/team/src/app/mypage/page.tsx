// Test comment
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import UserInfo from '@/features/mypage/components/UserInfo'
import SettingsMenu from '@/features/mypage/components/SettingsMenu'
import Header from '@/features/job-select/components/Header'
import { analyzePassRate } from '@/lib/api'

interface InterviewData {
  job: string
  career: string
  company: string
  questions: string[]
  answers: string[]
  questionCount: number
}

interface PassRateAnalysisResult {
  passRateScore: string;
  analysisSummary: string;
  keyFactorsForSuccess: string[];
  areasForImprovement: string[];
  comparisonToIdeal: string;
  recommendedResources: string[];
}

export default function MyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [passRateAnalysis, setPassRateAnalysis] = useState<PassRateAnalysisResult | null>(null)

  useEffect(() => {
    const fetchPassRateAnalysis = async () => {
      try {
        const storedData = localStorage.getItem('allInterviewSessionsData')
        if (!storedData) {
          throw new Error('면접 데이터가 없습니다. 모의 면접을 먼저 진행해주세요.')
        }

        const allInterviewSessions: InterviewData[] = JSON.parse(storedData)

        if (allInterviewSessions.length === 0) {
          throw new Error('저장된 면접 데이터가 없습니다. 모의 면접을 먼저 진행해주세요.')
        }

        // 모든 세션의 job, career, company는 동일하다고 가정하거나, 가장 최근 세션의 정보를 사용
        const latestSession = allInterviewSessions[allInterviewSessions.length - 1];

        const result = await analyzePassRate({
          allInterviewSessions: allInterviewSessions,
          job: latestSession.job,
          career: latestSession.career,
          company: latestSession.company,
        })

        setPassRateAnalysis(result)
      } catch (err) {
        console.error('합격률 분석 중 오류 발생:', err)
        setError(err instanceof Error ? err.message : '합격률 분석에 실패했습니다. 다시 시도해주세요.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPassRateAnalysis()
  }, [])

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    alert('로그아웃 되었습니다.')
    window.location.href = '/' // 메인 페이지로 이동
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">합격률 분석 중...</h1>
          <div className="text-xl text-blue-600">AI가 면접 데이터를 분석하고 있습니다.</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-red-800 mb-8">오류 발생</h1>
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="flex items-center gap-2 mx-auto"
          >
            <Home size={20} />
            홈으로
          </Button>
        </main>
      </div>
    )
  }

  if (!passRateAnalysis) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-blue-800 mb-8">합격률 분석 결과 없음</h1>
          <div className="text-xl text-gray-600">아직 분석할 면접 데이터가 없습니다. 모의 면접을 진행해주세요.</div>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="flex items-center gap-2 mx-auto mt-4"
          >
            <Home size={20} />
            홈으로
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">합격률 분석 결과</h1>
        <UserInfo 
          name="사용자1" 
          job={passRateAnalysis.keyFactorsForSuccess.length > 0 ? "강점: " + passRateAnalysis.keyFactorsForSuccess.join(', ').substring(0, 50) + '...' : "직무 정보 없음"} 
          count={passRateAnalysis.recommendedResources.length} // 추천 자료 개수를 총 연습 횟수로 임시 사용
        />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">예상 합격률</h2>
            <div className="text-4xl font-bold text-blue-600">
              {passRateAnalysis.passRateScore.split(' - ')[0]}
            </div>
            <p className="text-lg text-gray-700 mt-2">
              {passRateAnalysis.passRateScore.split(' - ').slice(1).join(' - ')}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">종합 분석 요약</h3>
            <p className="text-gray-600 leading-relaxed">{passRateAnalysis.analysisSummary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">성공을 위한 주요 요인</h3>
            <ul className="list-disc list-inside space-y-2">
              {passRateAnalysis.keyFactorsForSuccess.map((factor, index) => (
                <li key={index} className="text-gray-600">{factor}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">개선이 필요한 영역</h3>
            <ul className="list-disc list-inside space-y-2">
              {passRateAnalysis.areasForImprovement.map((area, index) => (
                <li key={index} className="text-gray-600">{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">이상적인 면접자와의 비교</h3>
          <p className="text-gray-600 leading-relaxed">{passRateAnalysis.comparisonToIdeal}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">추천 자료</h3>
          <ul className="list-disc list-inside space-y-2">
            {passRateAnalysis.recommendedResources.map((resource, index) => (
              <li key={index} className="text-gray-600">{resource}</li>
            ))}
          </ul>
        </div>
      </main>
      <div className="mt-8 flex justify-center">
        <SettingsMenu onLogout={handleLogout} />
      </div>
    </div>
  )
} 