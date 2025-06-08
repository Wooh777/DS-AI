'use client'

import HistoryViewer from '@/features/mypage/components/HistoryViewer'
import UserInfo from '@/features/mypage/components/UserInfo'
import SettingsMenu from '@/features/mypage/components/SettingsMenu'
import Header from '@/features/job-select/components/Header' // 재사용

export default function MyPage() {
  const dummyHistory = [
    { date: '2023-10-26', score: 4 },
    { date: '2023-10-25', score: 3 },
    { date: '2023-10-24', score: 5 },
    { date: '2023-10-23', score: 4 },
  ]

  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    alert('로그아웃 되었습니다.')
    window.location.href = '/' // 메인 페이지로 이동
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">마이페이지</h1>
        <UserInfo name="사용자1" job="개발자" count={10} />
        <HistoryViewer items={dummyHistory} />
        <div className="mt-8 flex justify-center">
          <SettingsMenu onLogout={handleLogout} />
        </div>
      </main>
    </div>
  )
} 