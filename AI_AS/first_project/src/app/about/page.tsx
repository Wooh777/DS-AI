"use client";
import { FaCheckCircle, FaRegLightbulb, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-blue-100 rounded-full p-4 mb-3 shadow">
            <FaRegLightbulb className="text-yellow-400 text-4xl" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2 text-blue-700 text-center drop-shadow">Todo List 웹앱 소개</h1>
          <p className="text-gray-500 text-center max-w-md">할 일과 마감기한을 쉽고 빠르게 관리하고, 달력에서 한눈에 일정을 확인할 수 있도록 도와줍니다.<br />바쁜 일상 속에서 일정 관리를 더 직관적으로!</p>
        </div>
        <div className="grid gap-6 w-full">
          <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h2 className="font-semibold mb-1 text-blue-600">주요 기능</h2>
            <ul className="list-none space-y-2">
              <li><FaCheckCircle className="inline text-blue-500 mr-2" />할 일 등록 및 완료 체크</li>
              <li><FaCheckCircle className="inline text-green-500 mr-2" />마감기한 설정 및 시각적 강조</li>
              <li><FaCheckCircle className="inline text-orange-500 mr-2" />달력에서 날짜별 일정 확인</li>
              <li><FaCheckCircle className="inline text-purple-500 mr-2" />일정 수정/삭제 및 필터링</li>
              <li><FaCheckCircle className="inline text-gray-500 mr-2" />로컬 저장(localStorage)로 데이터 유지</li>
            </ul>
          </section>
          <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h2 className="font-semibold mb-1 text-blue-600">사용 방법</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li><b>Home</b>에서 할 일과 마감기한을 입력 후 추가</li>
              <li>할 일 옆 체크박스로 완료/미완료 전환, 휴지통 아이콘으로 삭제</li>
              <li>필터 탭으로 전체/완료/미완료 보기</li>
              <li><b>Calendar</b>에서 날짜별 할 일 개수 확인, 날짜 클릭 시 상세 일정 확인</li>
            </ul>
          </section>
          <section className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <h2 className="font-semibold mb-1 text-blue-600">문의하기</h2>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="이름" className="border rounded px-3 py-2 text-sm" required />
              <input type="email" placeholder="이메일" className="border rounded px-3 py-2 text-sm" required />
              <textarea placeholder="메시지" className="border rounded px-3 py-2 text-sm min-h-[80px]" required />
              <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-2 hover:bg-blue-600 transition-colors font-semibold">보내기</button>
            </form>
          </section>
        </div>
        <div className="mt-10 flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FaGithub /> <span>by Woohyun Kim</span>
          </div>
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition-colors w-full sm:w-auto mt-2 shadow">홈으로 돌아가기</button>
          </Link>
        </div>
      </div>
    </main>
  );
} 