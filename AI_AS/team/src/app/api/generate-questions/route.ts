import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { job, career, company, questionCount, prompt } = await req.json()

    console.log('API received questionCount:', questionCount);

    if (!job || !career || !company || !questionCount || !prompt) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '면접 질문을 한국어로 생성하는 유용한 도우미입니다. 다른 내용 없이, 오직 번호가 매겨진 질문 목록만 제공해주세요.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      n: 1,
      stop: [],
      temperature: 0.7,
    })

    const generatedText = completion.choices[0].message?.content || ''
    console.log('OpenAI raw generatedText:', generatedText);

    const questionRegex = /^\s*\d+\.\s*(.*)$/gm; // Matches 'N. Question Text' format
    let parsedQuestions: { id: number; text: string; type: string; }[] = [];
    let match;
    let idCounter = 1;

    while ((match = questionRegex.exec(generatedText)) !== null) {
      if (match[1]) {
        parsedQuestions.push({
          id: idCounter,
          text: match[1].trim(),
          type: 'behavioral',
        });
        idCounter++;
      }
    }

    console.log('Parsed questions before slice:', parsedQuestions.length, parsedQuestions);

    // Ensure the number of questions matches the requested questionCount
    const questions = parsedQuestions.slice(0, questionCount);

    console.log('Final questions after slice:', questions.length, questions);

    if (questions.length < questionCount) {
      console.warn(`Requested ${questionCount} questions but only generated ${questions.length}.`);
      // Optionally, you could try to regenerate or fill with placeholders here.
      // For now, we will proceed with the generated questions.
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('질문 생성 중 오류:', error)
    return NextResponse.json({ error: '질문 생성에 실패했습니다.' }, { status: 500 })
  }
} 