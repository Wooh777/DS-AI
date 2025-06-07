'use client'
import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-8 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <div>
          <div className="font-bold text-lg">AI 모의면접</div>
          <div className="text-sm mt-1">© 2024 AI Interview. All rights reserved.</div>
        </div>
        <div className="flex gap-4 items-center">
          <a href="mailto:contact@aiinterview.com" aria-label="이메일 문의"><Mail /></a>
          <a href="https://github.com/aiinterview" target="_blank" rel="noopener" aria-label="깃허브"><Github /></a>
        </div>
        <div className="text-sm">
          <a href="#" className="underline mr-2">개인정보 처리방침</a>
          <span>문의: contact@aiinterview.com</span>
        </div>
      </div>
    </footer>
  )
} 