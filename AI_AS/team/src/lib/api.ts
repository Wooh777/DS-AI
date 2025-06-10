import { FeedbackData } from '@/types/interview'

interface GenerateQuestionsParams {
  job: string
  career: string
  company: string
  count: number
  feedback?: string[]
}

export async function generateQuestions({ job, career, company, count, feedback }: GenerateQuestionsParams) {
  try {
    let prompt = `${career} ${company}에 지원하는 ${job} 포지션에 대한 면접 질문 ${count}개를 생성해주세요. 번호가 매겨진 목록으로 제공해주세요.`;

    // 경력자에 대한 심화 질문 추가
    if (career !== '신입') {
      prompt += ` ${career} 경력자로서의 전문성과 리더십을 평가할 수 있는 심화 질문을 포함해주세요.`;
    }

    switch (job) {
      case 'developer':
        if (career !== '신입') {
          prompt += ' 아키텍처 설계, 팀 리더십, 기술 부채 관리, 성능 최적화, 보안 설계 등 고급 기술 역량과 프로젝트 관리 경험에 대한 질문을 포함해주세요.';
        } else {
          prompt += ' 기술 역량, 문제 해결 능력, 협업 경험에 중점을 둔 질문을 포함해주세요.';
        }
        break;
      case 'designer':
        if (career !== '신입') {
          prompt += ' 디자인 시스템 구축, 팀 관리, 사용자 리서치 방법론, 디자인 전략 수립, 브랜드 아이덴티티 설계 등 고급 디자인 역량과 리더십에 대한 질문을 포함해주세요.';
        } else {
          prompt += ' 포트폴리오, 사용자 경험(UX), UI 디자인 원칙, 디자인 프로세스에 대한 질문을 포함해주세요.';
        }
        break;
      case 'marketer':
        if (career !== '신입') {
          prompt += ' 마케팅 전략 수립, 팀 관리, 예산 관리, ROI 분석, 브랜드 전략, 글로벌 마케팅 등 고급 마케팅 역량과 리더십에 대한 질문을 포함해주세요.';
        } else {
          prompt += ' 마케팅 전략 수립, 캠페인 실행, 데이터 분석, 최신 마케팅 트렌드에 대한 질문을 포함해주세요.';
        }
        break;
      default:
        // No specific additions for other job types
        break;
    }

    if (feedback && feedback.length > 0) {
      prompt += ` 면접관은 답변의 ${feedback.join(', ')} 측면을 중요하게 평가할 것입니다. 이를 고려하여 질문을 구성해주세요.`;
    }

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
        prompt,
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
  job: string
  career: string
  company: string
}

interface AnalysisResult {
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export async function analyzeAnswer({ question, answer, job, career, company }: AnalyzeAnswerParams): Promise<FeedbackData> {
  try {
    const response = await fetch('/api/analyze-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, answer, job, career, company, model: 'gpt-3.5-turbo' }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to analyze answer')
    }

    const data = await response.json()
    return data as FeedbackData
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
  overallScore: string
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
        company,
        model: 'gpt-3.5-turbo'
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

interface PassRateAnalysisParams {
  allInterviewSessions: {
    job: string;
    career: string;
    company: string;
    questions: string[];
    answers: string[];
  }[];
  job: string;
  career: string;
  company: string;
}

interface PassRateAnalysisResult {
  passRateScore: string;
  analysisSummary: string;
  keyFactorsForSuccess: string[];
  areasForImprovement: string[];
  comparisonToIdeal: string;
  recommendedResources: string[];
}

export async function analyzePassRate({
  allInterviewSessions,
  job,
  career,
  company,
}: PassRateAnalysisParams): Promise<PassRateAnalysisResult> {
  try {
    const response = await fetch('/api/analyze-pass-rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allInterviewSessions,
        job,
        career,
        company,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze pass rate');
    }

    const rawResponseText = await response.text();
    console.log('Raw Response Text (analyzePassRate Client):', rawResponseText);

    if (!response.ok) {
      let errorMessage = '합격률 분석에 실패했습니다.';
      try {
        const errorData = JSON.parse(rawResponseText);
        if (errorData && typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData && typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.error('Error parsing error response JSON in analyzePassRate:', e);
      }
      throw new Error(errorMessage + (rawResponseText ? `: ${rawResponseText.substring(0, 100)}...` : ''));
    }

    try {
      const data = JSON.parse(rawResponseText);
      console.log('Parsed data structure (analyzePassRate):', data);
      return data;
    } catch (e) {
      console.error('JSON 파싱 중 오류 발생 (analyzePassRate):', e);
      throw new Error(`API 응답 파싱 중 오류가 발생했습니다: ${rawResponseText.substring(0, 100)}...`);
    }
  } catch (error) {
    console.error('합격률 분석 중 오류:', error);
    throw error;
  }
} 