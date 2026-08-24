"use client";

import React, { useRef, useEffect } from "react";

interface WordInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function WordInput({
  value,
  onChange,
  placeholder = "Type here...",
  autoFocus = true,
  disabled = false,
}: WordInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && !disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="relative w-full rounded-2xl border border-indigo-500/30 bg-slate-950 p-4 sm:p-6 shadow-inner text-center cursor-text focus-within:ring-2 focus-within:ring-indigo-500/50"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full bg-transparent text-center text-2xl sm:text-4xl font-extrabold font-mono text-white tracking-widest placeholder:text-slate-600 focus:outline-none"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
