import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: '서버에 OpenAI API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }
    console.log('OpenAI API Key loaded:', !!process.env.OPENAI_API_KEY); // 키가 로드되었는지 여부만 표시

    const { job, questionCount, prompt } = await req.json()

    const systemPrompt = `
      당신은 ${job} 직무 면접을 진행하는 면접관입니다.
      다음 요구사항에 맞는 면접 질문 ${questionCount}개를 정확히 생성해주세요:
      ${prompt}

      응답은 다음 JSON 형식으로 해주세요:
      {
        "questions": [
          {
            "id": 1,
            "text": "질문 내용",
            "type": "technical" | "behavioral" | "situational"
          }
        ]
      }
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "면접 질문을 생성해주세요. 반드시 JSON 형식으로 응답해주세요." }
      ],
      temperature: 0.7,
      max_tokens: 1000, // 최대 토큰 수 설정
    })

    console.log('Full OpenAI Completion Object:', JSON.stringify(completion, null, 2)); // 전체 completion 객체 로그 추가

    const content = completion.choices[0].message.content
    console.log('Raw OpenAI Response Content:', content); // OpenAI 응답 원본 로그

    if (!content) {
      return NextResponse.json({ error: '응답 내용이 없습니다.' }, { status: 500 })
    }

    try {
      const parsedData = JSON.parse(content)
      console.log('Parsed OpenAI Response Object (Server):', parsedData); // 서버에서 파싱된 원본 응답 객체

      if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
        console.warn('OpenAI 응답에 questions 배열이 없거나 올바르지 않습니다. 빈 배열로 처리합니다.', parsedData);
        parsedData.questions = [];
      }

      const finalQuestions = parsedData.questions.slice(0, questionCount);
      console.log('Final Questions array before NextResponse.json (Server):', finalQuestions); // 클라이언트로 보내기 직전 질문 배열

      return NextResponse.json({ questions: finalQuestions })

    } catch (parseError) {
      console.error('JSON 파싱 오류 (generate-questions 서버):', parseError)
      console.error('원본 응답 (generate-questions 서버):', content)
      return NextResponse.json(
        { error: '서버에서 응답을 처리하는 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('API 오류 (generate-questions):', error)
    let errorMessage = '질문 생성 중 오류가 발생했습니다.'
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error.message || errorMessage
    } else if (error.message) {
      errorMessage = error.message
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    )
  }
} 