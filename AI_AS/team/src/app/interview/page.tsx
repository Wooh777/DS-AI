'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

interface InterviewPageProps {
  searchParams: Promise<{
    job?: string;
    questionCount?: string;
    career?: string;
    company?: string;
    feedback?: string;
  }>;
}

const DynamicInterviewPageContent = dynamic(
  () => import('../../features/interview/components/InterviewPageContent'),
  { ssr: false }
)

export default async function InterviewPage({ searchParams }: InterviewPageProps) {
  const params = await searchParams;
  return (
    <Suspense fallback={<div>Loading interview...</div>}>
      <DynamicInterviewPageContent searchParams={params} />
    </Suspense>
  )
} 