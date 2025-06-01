"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaPlus, FaTrashAlt, FaCheckCircle, FaRegCircle, FaCalendarAlt } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: string; // YYYY-MM-DD
}

type Filter = "all" | "active" | "completed";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}
function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState(getToday());
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // localStorage 연동 및 동기화
  useEffect(() => {
    const sync = () => {
      const updated = localStorage.getItem("todos");
      if (updated) {
        try {
          const parsed = JSON.parse(updated);
          // 현재 todos와 다를 때만 setTodos
          if (JSON.stringify(parsed) !== JSON.stringify(todos)) {
            setTodos(parsed);
          }
        } catch {}
      }
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: Date.now(), text, completed: false, dueDate },
      ...prev,
    ]);
    setInput("");
    setDueDate(getToday());
    inputRef.current?.focus();
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // 마감 임박 강조
  function getDueColor(due: string, completed: boolean) {
    if (completed) return "";
    if (due === getToday()) return "text-red-500 font-bold";
    if (due === getTomorrow()) return "text-orange-500 font-semibold";
    return "text-gray-400";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {/* 입력창 */}
        <form
          className="flex flex-col sm:flex-row gap-2 mb-6"
          onSubmit={e => { e.preventDefault(); handleAdd(); }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="할 일을 입력하세요..."
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-sm"
            maxLength={50}
            aria-label="할 일 입력"
          />
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-400" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-2 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
              min={getToday()}
              aria-label="마감기한"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 transition-colors"
            aria-label="추가"
          >
            <FaPlus /> 추가
          </button>
        </form>
        {/* 필터 */}
        <div className="flex gap-2 mb-4 justify-center">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-100"}`}
            onClick={() => setFilter("all")}
          >전체</button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-100"}`}
            onClick={() => setFilter("active")}
          >미완료</button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-100"}`}
            onClick={() => setFilter("completed")}
          >완료</button>
        </div>
        {/* 할 일 리스트 */}
        <ul className="space-y-2 mb-8">
          {filteredTodos.length === 0 && (
            <li className="text-center text-gray-400 py-8 select-none">할 일이 없습니다.</li>
          )}
          {filteredTodos.map((todo) => (
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
              <span className={`ml-4 text-xs flex items-center gap-1 ${getDueColor(todo.dueDate, todo.completed)}`}>
                <FaCalendarAlt />
                {todo.dueDate}
              </span>
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
      </main>
      <Footer remaining={todos.filter((t) => !t.completed).length} onClearAll={todos.length > 0 ? handleClearAll : undefined} />
    </div>
  );
}
