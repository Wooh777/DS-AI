'use client'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-30">
      <a href="/" className="text-2xl font-bold text-blue-700 hover:text-blue-600"><span className="text-blue-800">INTERVIEW</span><span className="text-blue-500">.AI</span></a>
      <nav className="flex gap-6 text-blue-800 font-medium">
        <a href="/mypage" className="hover:text-blue-600">마이페이지</a>
      </nav>
    </header>
  )
} 