interface GenerateQuestionsParams {
  job: string
  career: string
  company: string
  count: number
}

export async function generateQuestions({ job, career, company, count }: GenerateQuestionsParams) {
  try {
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job,
        career,
        company,
        questionCount: count,
        prompt: `${career} ${company}에 지원하는 ${job} 포지션에 대한 면접 질문을 생성해주세요.`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate questions');
    }

    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

interface AnalyzeAnswerParams {
  question: string
  answer: string
  feedback: string[]
}

interface AnalysisResult {
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export async function analyzeAnswer(question: string, answer: string, feedback: string[]) {
  try {
    const response = await fetch('/api/analyze-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer, feedback }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to analyze answer')
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Error analyzing answer:', error)
    throw error
  }
}

interface AnalyzeInterviewParams {
  questions: string[]
  answers: string[]
  job: string
  career: string
  company: string
}

interface InterviewAnalysis {
  overallScore: number
  detailedFeedback: {
    question: string
    answer: string
    score: number
    feedback: string
  }[]
  strengths: string[]
  improvements: string[]
  nextSteps: string[]
}

export async function analyzeInterview({
  questions,
  answers,
  job,
  career,
  company
}: AnalyzeInterviewParams): Promise<InterviewAnalysis> {
  try {
    const response = await fetch('/api/analyze-interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questions,
        answers,
        job,
        career,
        company
      }),
    })

    console.log('analyzeInterview Response Status:', response.status);
    console.log('analyzeInterview Content-Type:', response.headers.get('content-type'));
    const rawResponseText = await response.text();
    console.log('Raw Response Text (analyzeInterview Client):', rawResponseText);

    if (!response.ok) {
      let errorMessage = '면접 분석에 실패했습니다';
      try {
        const errorData = JSON.parse(rawResponseText);
        if (errorData && typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData && typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.error('Error parsing error response JSON:', e);
      }
      throw new Error(errorMessage + (rawResponseText ? `: ${rawResponseText.substring(0, 100)}...` : ''));
    }

    const data = JSON.parse(rawResponseText);
    console.log('Parsed data structure (analyzeInterview):', data);

    if (!data.overallScore || !data.detailedFeedback) {
      throw new Error('분석 결과가 올바르지 않습니다.')
    }
    return data
  } catch (error) {
    console.error('면접 분석 중 오류 발생:', error)
    throw error
  }
} 