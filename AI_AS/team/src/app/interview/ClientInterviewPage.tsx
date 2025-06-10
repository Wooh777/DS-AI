'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import React from 'react'

interface ClientInterviewPageProps {
  searchParams: {
    job?: string;
    questionCount?: string;
    career?: string;
    company?: string;
    feedback?: string;
  };
}

const DynamicInterviewPageContent = dynamic(
  () => import('../../features/interview/components/InterviewPageContent'),
  { ssr: false }
)

export default function ClientInterviewPage({ searchParams }: ClientInterviewPageProps) {
  return (
    <Suspense fallback={<div>Loading interview...</div>}>
      <DynamicInterviewPageContent searchParams={searchParams} />
    </Suspense>
  )
} 