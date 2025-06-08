'use client'
import { Button } from '@/components/ui/button'

interface SettingsMenuProps {
  onLogout: () => void
}

export default function SettingsMenu({ onLogout }: SettingsMenuProps) {
  return (
    <div className="flex gap-4">
      <Button variant="outline" className="border-blue-600 text-blue-600" onClick={onLogout}>로그아웃</Button>
      <Button className="bg-blue-100 text-blue-700">계정 설정</Button>
    </div>
  )
} 