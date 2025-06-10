export type FeedbackData = {
  score: number;
  strengths: string[];
  improvements: string[];
  overallFeedback?: string;
  questionFeedbacks?: Array<{
    question: string;
    answer: string;
    feedback: string;
    score: number;
  }>;
};

export type GeneratedQuestion = {
  id: number;
  text: string;
  type: string;
}; 