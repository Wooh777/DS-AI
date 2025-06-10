import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { job, career, company, questionCount, prompt } = await req.json()

    if (!job || !career || !company || !questionCount || !prompt) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates interview questions.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      n: 1,
      stop: [],
      temperature: 0.7,
    })

    const generatedText = completion.choices[0].message?.content || ''
    const questions = generatedText.split('\n').filter(q => q.trim() !== '').map((q, index) => ({
      id: index + 1,
      text: q.replace(/^\d+\.\s*/, '').trim(),
      type: 'behavioral',
    }))

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('질문 생성 중 오류:', error)
    return NextResponse.json({ error: '질문 생성에 실패했습니다.' }, { status: 500 })
  }
} 