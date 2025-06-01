import React from "react";
import { FaGithub } from "react-icons/fa";

interface FooterProps {
  remaining: number;
  onClearAll?: () => void;
}

export default function Footer({ remaining, onClearAll }: FooterProps) {
  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur mt-8">
      <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-2 text-xs text-gray-500">
        <div>
          남은 할 일: <span className="font-semibold text-blue-600">{remaining}</span>개
          {onClearAll && (
            <button
              className="ml-3 px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
              onClick={onClearAll}
            >
              전체 삭제
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>© 2024 by Woohyun Kim</span>
          <a href="https://github.com/kimwoohyun" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaGithub size={16} /></a>
        </div>
      </div>
    </footer>
  );
} 