'use client'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-30">
      <a href="/" className="text-2xl font-bold text-blue-700 hover:text-blue-600"><span className="text-blue-800">INTERVIEW</span><span className="text-blue-500">.AI</span></a>
    </header>
  )
} 