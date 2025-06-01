"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });
import "react-calendar/dist/Calendar.css";
import "./calendar-custom.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaCheckCircle, FaRegCircle, FaTrashAlt } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string; // YYYY-MM-DD
}

function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

function toLocalDateString(date: Date): string {
  // YYYY-MM-DD, 로컬 타임존 기준
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CalendarPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // localStorage에서 항상 최신 데이터 유지
  useEffect(() => {
    const sync = () => setTodos(getTodos());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // 날짜별 할 일 매핑
  const todosByDate: Record<string, Todo[]> = {};
  todos.forEach((todo) => {
    if (!todosByDate[todo.dueDate]) todosByDate[todo.dueDate] = [];
    todosByDate[todo.dueDate].push(todo);
  });

  // 달력 타일에 할 일 개수 표시
  function tileContent({ date, view }: { date: Date; view: string }) {
    if (view !== "month") return null;
    const key = toLocalDateString(date);
    const count = todosByDate[key]?.length || 0;
    if (count === 0) return null;
    return (
      <span className="ml-1 text-xs bg-blue-100 text-blue-600 rounded px-1">
        {count}
      </span>
    );
  }

  // 날짜 클릭 시 해당 날짜의 할 일 리스트 표시
  function handleDateClick(date: Date) {
    setSelectedDate(toLocalDateString(date));
  }

  // 할 일 완료/삭제 (달력에서 직접)
  const handleToggle = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    window.dispatchEvent(new Event('storage'));
  };
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 text-center">달력으로 일정 확인</h1>
        <div className="w-full flex justify-center">
          <div className="calendar-outer">
            <Calendar
              onClickDay={handleDateClick}
              tileContent={tileContent}
              className="custom-calendar"
              calendarType="gregory"
            />
          </div>
        </div>
        {selectedDate && (
          <div className="mt-8 w-full max-w-lg">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-blue-600">{selectedDate}</span>의 할 일
            </h2>
            <ul className="space-y-2">
              {(todosByDate[selectedDate] || []).length === 0 && (
                <li className="text-gray-400 text-sm">할 일이 없습니다.</li>
              )}
              {(todosByDate[selectedDate] || []).map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-white rounded px-4 py-2 shadow-sm border border-gray-100 hover:shadow transition-shadow group"
                >
                  <button
                    onClick={() => handleToggle(todo.id)}
                    className="mr-3 text-blue-500 hover:text-blue-700 focus:outline-none"
                    aria-label={todo.completed ? "미완료로 변경" : "완료로 변경"}
                  >
                    {todo.completed ? <FaCheckCircle /> : <FaRegCircle />}
                  </button>
                  <span className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.text}</span>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="ml-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="삭제"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer remaining={todos.filter((t) => !t.completed).length} />
    </div>
  );
} 