"use client";

import React from "react";

interface TypingKeyboardProps {
  expectedKey: string;
  pressedKey: string | null;
  targetKeys?: string[];
  onKeyPress?: (key: string) => void;
}

export function TypingKeyboard({
  expectedKey,
  pressedKey,
  targetKeys,
  onKeyPress,
}: TypingKeyboardProps) {
  const numberRow = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"];
  const topRow = ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"];
  const homeRow = ["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"];
  const bottomRow = ["L-Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "R-Shift"];

  const normalize = (key: string) => key.toUpperCase();

  const targetNorm = normalize(expectedKey);
  const pressedNorm = pressedKey ? normalize(pressedKey) : null;
  const lessonTargetNorms = targetKeys?.map(normalize) || [];

  const renderKey = (keyLabel: string, widthClass = "w-7 sm:w-9") => {
    const normLabel = normalize(keyLabel.replace("L-", "").replace("R-", ""));

    const isExpected =
      targetNorm === normLabel ||
      (expectedKey === " " && keyLabel === "Spacebar") ||
      (expectedKey === "Backspace" && keyLabel === "Backspace");

    const isPressed =
      pressedNorm === normLabel ||
      (pressedKey === " " && keyLabel === "Spacebar") ||
      (pressedKey === "Backspace" && keyLabel === "Backspace");

    const isLessonTarget = lessonTargetNorms.includes(normLabel);

    let baseClass =
      "key-cap flex h-8 sm:h-10 items-center justify-center rounded-lg font-mono text-xs font-semibold select-none transition-all cursor-pointer ";

    if (isPressed) {
      baseClass +=
        "key-cap-active bg-indigo-600 text-white border border-indigo-400 scale-95 shadow-lg shadow-indigo-600/50 ";
    } else if (isExpected) {
      baseClass +=
        "bg-indigo-950 text-indigo-300 border-2 border-indigo-500/80 animate-pulse shadow-md shadow-indigo-500/20 ";
    } else if (isLessonTarget) {
      baseClass +=
        "bg-slate-900 text-indigo-300 border border-indigo-500/50 shadow-sm ";
    } else {
      baseClass +=
        "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white ";
    }

    const handleClick = () => {
      if (!onKeyPress) return;
      if (keyLabel === "Spacebar") {
        onKeyPress(" ");
        return;
      }
      const displayText = keyLabel.replace("L-", "").replace("R-", "");
      if (normalize(displayText) === normalize(expectedKey)) {
        onKeyPress(expectedKey);
      } else {
        onKeyPress(displayText.toLowerCase());
      }
    };

    return (
      <button
        key={keyLabel}
        type="button"
        onClick={handleClick}
        className={`${baseClass} ${widthClass}`}
        aria-label={`Key ${keyLabel.replace("L-", "").replace("R-", "")}`}
      >
        {keyLabel.replace("L-", "").replace("R-", "")}
      </button>
    );
  };

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950/80 p-3 sm:p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {/* Number Row */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {numberRow.map((k) =>
            renderKey(k, k === "Backspace" ? "w-14 sm:w-20 text-[10px]" : "w-6 sm:w-9")
          )}
        </div>

        {/* Top Row */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {topRow.map((k) =>
            renderKey(k, k === "Tab" ? "w-10 sm:w-14 text-[10px]" : "w-6 sm:w-9")
          )}
        </div>

        {/* Home Row */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {homeRow.map((k) =>
            renderKey(
              k,
              k === "Caps"
                ? "w-12 sm:w-16 text-[10px]"
                : k === "Enter"
                ? "w-12 sm:w-16 text-[10px]"
                : "w-6 sm:w-9"
            )
          )}
        </div>

        {/* Bottom Row */}
        <div className="flex justify-center gap-1 sm:gap-1.5">
          {bottomRow.map((k) =>
            renderKey(k, k.includes("Shift") ? "w-14 sm:w-20 text-[10px]" : "w-6 sm:w-9")
          )}
        </div>

        {/* Spacebar Row */}
        <div className="flex justify-center pt-1">
          {renderKey("Spacebar", "w-44 sm:w-64 text-[10px]")}
        </div>
      </div>
    </div>
  );
}
