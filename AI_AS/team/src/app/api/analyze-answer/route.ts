import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, answer, job, career, company } = await req.json();

    if (!question || !answer || !job || !career || !company) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    const prompt = `면접 질문: "${question}"에 대한 답변: "${answer}"을(를) 평가해 주세요. 직무는 ${job}, 경력은 ${career}, 회사는 ${company}입니다. 응답은 다음 JSON 형식으로 제공해주세요:
    {
      "score": (1-5점 사이의 점수),
      "strengths": ["강점 1", "강점 2"],
      "improvements": ["개선점 1", "개선점 2"],
      "overallFeedback": "전반적인 피드백"
    }`; 

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 모델 변경
      messages: [
        { role: 'system', content: 'You are an AI interviewer providing feedback on interview answers.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      n: 1,
      stop: [],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message?.content;

    if (!content) {
      return NextResponse.json({ error: 'OpenAI 응답 내용이 없습니다.' }, { status: 500 });
    }

    const feedback = JSON.parse(content);
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('답변 분석 중 오류:', error);
    return NextResponse.json({ error: '답변 분석에 실패했습니다.' }, { status: 500 });
  }
} 