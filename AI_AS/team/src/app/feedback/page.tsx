import FeedbackPage from '@/features/feedback/pages/FeedbackPage'
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading feedback...</div>}>
      <FeedbackPage />
    </Suspense>
  )
} 