import ClientInterviewPage from './ClientInterviewPage'

interface InterviewPageProps {
  searchParams: {
    job?: string;
    questionCount?: string;
    career?: string;
    company?: string;
    feedback?: string;
  };
}

export default function InterviewPage({ searchParams }: InterviewPageProps) {
  return (
    <ClientInterviewPage searchParams={searchParams} />
  )
} 