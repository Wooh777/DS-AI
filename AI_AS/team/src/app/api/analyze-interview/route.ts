import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { questions, answers, job, career, company } = await req.json();

    if (!questions || !answers || !job || !career || !company || questions.length === 0) {
      return NextResponse.json({ error: '필수 필드가 누락되었거나 면접 데이터가 없습니다.' }, { status: 400 });
    }

    const conversationHistory = questions.map((q: string, i: number) => `질문 ${i + 1}: ${q}\n답변 ${i + 1}: ${answers[i]}`).join('\n\n');

    const prompt = `
면접 질문 및 답변 기록:
${conversationHistory}

위 면접 기록을 바탕으로 ${job} 직무 (${career} 경력, ${company} 회사)에 대한 통합 면접 분석을 해주세요. 모든 질문과 답변을 종합적으로 평가하여 다음 JSON 형식으로만 응답해주세요. **다른 설명이나 추가 텍스트 없이 오직 JSON 객체만 반환해야 합니다.**
\`\`\`json
{
  "overallScore": "(1-5점 사이의 총점과 그에 대한 상세한 설명, 예: 4점 - 전반적으로 답변의 깊이와 논리성이 우수합니다.)",
  "strengths": ["면접자의 종합적인 강점 1 (구체적인 예시 포함)", "면접자의 종합적인 강점 2 (구체적인 예시 포함)"],
  "improvements": ["개선할 점 1 (구체적인 제안 포함)", "개선할 점 2 (구체적인 제안 포함)"],
  "nextSteps": ["다음 면접을 위한 구체적인 조언 1", "다음 면접을 위한 구체적인 조언 2"],
  "detailedFeedback": [
    {
      "question": "질문 1 내용",
      "answer": "답변 1 내용",
      "feedback": "질문 1에 대한 상세 피드백",
      "score": (1-5점 사이의 질문 1 점수)
    }
  ]
}
\`\`\`
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 모델 변경
      messages: [
        { role: 'system', content: '당신은 전체 면접 세션에 대한 종합적인 피드백을 제공하는 AI 면접관입니다. 응답은 오직 JSON 객체만 포함해야 하며, 어떠한 추가 설명이나 텍스트도 포함해서는 안 됩니다.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000, // 더 많은 데이터 분석 및 상세한 피드백을 위해 토큰 수 증가
      n: 1,
      stop: [],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message?.content;
    console.log('Raw OpenAI Response Content (analyze-interview API):', content);

    if (!content) {
      return NextResponse.json({ error: 'OpenAI 응답 내용이 없습니다.' }, { status: 500 });
    }

    // 정규식을 사용하여 JSON 객체만 추출
    const jsonMatch = content.match(/```json\n([^\s]*?)\n```/);
    let jsonString = content;

    if (jsonMatch && jsonMatch[1]) {
      jsonString = jsonMatch[1].trim();
    } else {
      // ```json``` 블록이 없는 경우, 전체 content에서 JSON 객체를 찾음
      const bracketStartIndex = content.indexOf('{');
      const bracketEndIndex = content.lastIndexOf('}');

      if (bracketStartIndex !== -1 && bracketEndIndex !== -1 && bracketEndIndex > bracketStartIndex) {
        jsonString = content.substring(bracketStartIndex, bracketEndIndex + 1).trim();
      } else {
        console.error('유효한 JSON 객체 또는 JSON 코드 블록을 찾을 수 없습니다:', content);
        return NextResponse.json({ error: '유효한 분석 결과를 찾을 수 없습니다.' }, { status: 500 });
      }
    }
    
    const analysis = JSON.parse(jsonString);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('면접 분석 중 오류:', error);
    return NextResponse.json({ error: '면접 분석에 실패했습니다.' }, { status: 500 });
  }
} 