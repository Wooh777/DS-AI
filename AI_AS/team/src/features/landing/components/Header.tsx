'use client'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-30">
      <div className="text-2xl font-bold text-blue-700"><span className="text-blue-800">INTERVIEW</span><span className="text-blue-500">.AI</span></div>
      <nav className="flex gap-8 text-blue-800 font-medium">
        <a href="#about" className="hover:text-blue-600">서비스 소개</a>
      </nav>
    </header>
  )
} 