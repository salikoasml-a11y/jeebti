"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function PinInput({
  value,
  onChange,
  length = 4,
  autoFocus,
  disabled,
  className,
  "aria-label": ariaLabel = "Code PIN",
}: {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setDigit(index, digit);
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted.padEnd(length, "").slice(0, length));
    const lastIndex = Math.min(pasted.length, length) - 1;
    inputRefs.current[Math.max(lastIndex, 0)]?.focus();
  }

  return (
    <div className={cn("flex items-center justify-between gap-3", className)} role="group" aria-label={ariaLabel}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          aria-label={`${ariaLabel} chiffre ${index + 1}`}
          className="h-12 w-12 border-0 border-b-2 border-jeebti-navy/30 bg-transparent text-center text-2xl font-semibold text-jeebti-navy outline-none transition-colors focus:border-jeebti-gold disabled:opacity-50 dark:border-white/25 dark:text-white dark:focus:border-jeebti-gold"
        />
      ))}
    </div>
  );
}
