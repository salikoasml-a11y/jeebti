"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  { value: "account", label: "Account" },
  { value: "card", label: "Card" },
  { value: "payment", label: "Payment" },
  { value: "kyc", label: "Identity verification (KYC)" },
  { value: "technical", label: "Technical issue" },
  { value: "other", label: "Other" },
] as const;

export function ContactSupportCard() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !category || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const ticketId = `TKT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    toast.success(`Support ticket submitted — #${ticketId}. We'll respond within 24 hours.`);
    setSubject("");
    setCategory("");
    setMessage("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact support</CardTitle>
        <CardDescription>Can&apos;t find your answer? Send us a message</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Briefly describe your issue"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about what's going on"
              rows={5}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
