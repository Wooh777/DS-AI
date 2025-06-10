import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { allInterviewSessions, job, career, company } = await req.json();

    if (!allInterviewSessions || !job || !career || !company) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    let fullConversationHistory = '';
    allInterviewSessions.forEach((session: any, sessionIndex: number) => {
      fullConversationHistory += `\n--- 면접 세션 ${sessionIndex + 1} ---\n`;
      session.questions.forEach((q: string, i: number) => {
        fullConversationHistory += `질문 ${i + 1}: ${q}\n답변 ${i + 1}: ${session.answers[i] || '답변 없음'}\n`;
      });
    });

    const prompt = `
${fullConversationHistory}

위 면접 기록들을 바탕으로 ${job} 직무 (${career} 경력, ${company} 회사)에 대한 전반적인 합격률을 분석해주세요. 면접자의 강점, 개선점, 이상적인 면접자와의 비교, 합격률에 대한 구체적인 예측 점수 및 그 이유, 그리고 합격률 향상을 위한 구체적인 다음 단계 조언을 포함하여 다음 JSON 형식으로만 응답해주세요. **다른 설명이나 추가 텍스트 없이 오직 JSON 객체만 반환해야 합니다.**
\`\`\`json
{
  "passRateScore": "(예상 합격률 점수 및 상세 설명, 예: 75% - 강점과 개선점을 종합한 결과 높은 합격률이 예상됩니다.)",
  "analysisSummary": "(모든 면접 세션을 종합한 전반적인 분석 요약)",
  "keyFactorsForSuccess": ["성공을 위한 주요 요인 1 (구체적인 예시 포함)", "성공을 위한 주요 요인 2 (구체적인 예시 포함)"],
  "areasForImprovement": ["개선이 필요한 영역 1 (구체적인 제안 포함)", "개선이 필요한 영역 2 (구체적인 제안 포함)"],
  "comparisonToIdeal": "(이상적인 면접자와의 비교 및 현재 면접자의 위치 설명)",
  "recommendedResources": ["추천 자료 1 (예: 관련 기술 스터디 그룹)", "추천 자료 2 (예: 면접 연습 플랫폼)"]
}
\`\`\`
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 여러 면접 세션을 종합적으로 분석하여 합격률을 예측하고 구체적인 피드백을 제공하는 AI 면접 분석 전문가입니다. 응답은 오직 JSON 객체만 포함해야 하며, 어떠한 추가 설명이나 텍스트도 포함해서는 안 됩니다.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000, // 더 많은 데이터 분석 및 상세한 피드백을 위해 토큰 수 증가
      n: 1,
      stop: [],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message?.content;

    if (!content) {
      return NextResponse.json({ error: 'OpenAI 응답 내용이 없습니다.' }, { status: 500 });
    }

    // 정규식을 사용하여 JSON 객체만 추출
    const jsonMatch = content.match(/```json\\n([\\s\\S]*?)\\n```/);
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
    console.error('합격률 분석 중 오류:', error);
    return NextResponse.json({ error: '합격률 분석에 실패했습니다.' }, { status: 500 });
  }
} 