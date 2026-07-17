"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  author: "user" | "bot";
  text: string;
}

const BOT_REPLIES = [
  "Thanks for reaching out! I'm looking into your account now — this'll just take a moment.",
  "I can see your recent activity. Could you tell me a bit more about the issue you're experiencing?",
  "Got it, I've logged this for our support team. You'll also get a confirmation by email within 24 hours.",
];

export function LiveChatSheet() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greet", author: "bot", text: "Hi there! I'm Jeebti's support assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const replyIndex = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage: ChatMessage = { id: `msg_${Date.now()}`, author: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const reply = BOT_REPLIES[Math.min(replyIndex.current, BOT_REPLIES.length - 1)];
    replyIndex.current += 1;

    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `bot_${Date.now()}`, author: "bot", text: reply }]);
    }, 1200);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-24 right-4 z-40 rounded-full shadow-lg sm:bottom-8 sm:right-8" size="lg">
          <MessageCircle className="size-4" />
          Live chat
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Live chat support</SheetTitle>
          <SheetDescription>Typically replies in under a minute</SheetDescription>
        </SheetHeader>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.author === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                  message.author === "user"
                    ? "bg-jeebti-brand text-white"
                    : "bg-muted text-foreground"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <form className="flex w-full items-center gap-2" onSubmit={handleSend}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              aria-label="Chat message"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
