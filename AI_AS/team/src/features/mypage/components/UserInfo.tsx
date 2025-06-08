'use client'

interface UserInfoProps {
  name: string
  job: string
  count: number
}

export default function UserInfo({ name, job, count }: UserInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4 flex flex-col md:flex-row items-center gap-4">
      <div className="text-2xl font-bold text-blue-800">{name}</div>
      <div className="text-gray-600">직무: <span className="font-semibold">{job}</span></div>
      <div className="text-gray-600">총 연습 횟수: <span className="font-semibold">{count}</span></div>
    </div>
  )
} 