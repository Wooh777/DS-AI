import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { questions, answers, job, career, company } = await req.json();

    if (!questions || !answers || !job || !career || !company) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    const conversationHistory = questions.map((q: string, i: number) => `질문 ${i + 1}: ${q}\n답변 ${i + 1}: ${answers[i]}`).join('\n\n');

    const prompt = `
면접 질문 및 답변 기록:
${conversationHistory}

위 면접 기록을 바탕으로 ${job} 직무 (${career} 경력, ${company} 회사)에 대한 면접 분석을 해주세요. 다음 JSON 형식으로 응답해주세요:
{
  "overallScore": (1-5점 사이의 총점),
  "strengths": ["면접자의 강점 1", "면접자의 강점 2"],
  "improvements": ["개선할 점 1", "개선할 점 2"],
  "nextSteps": ["다음 면접을 위한 조언 1", "다음 면접을 위한 조언 2"],
  "questionFeedbacks": [
    {
      "question": "질문 1 내용",
      "answer": "답변 1 내용",
      "feedback": "질문 1에 대한 상세 피드백",
      "score": (1-5점 사이의 질문 1 점수)
    },
    // ... 다른 질문들에 대한 피드백
  ]
}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 모델 변경
      messages: [
        { role: 'system', content: 'You are an AI interviewer providing comprehensive feedback on a full interview session.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      n: 1,
      stop: [],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message?.content;

    if (!content) {
      return NextResponse.json({ error: 'OpenAI 응답 내용이 없습니다.' }, { status: 500 });
    }

    const analysis = JSON.parse(content);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('면접 분석 중 오류:', error);
    return NextResponse.json({ error: '면접 분석에 실패했습니다.' }, { status: 500 });
  }
} 