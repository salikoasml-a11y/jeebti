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
import { useTranslation } from "@/hooks/use-translation";

const CATEGORIES = [
  { value: "account", labelKey: "help.contact.category.account" },
  { value: "card", labelKey: "help.contact.category.card" },
  { value: "payment", labelKey: "help.contact.category.payment" },
  { value: "kyc", labelKey: "help.contact.category.kyc" },
  { value: "technical", labelKey: "help.contact.category.technical" },
  { value: "other", labelKey: "help.contact.category.other" },
] as const;

export function ContactSupportCard() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !category || !message.trim()) {
      toast.error(t("help.contact.toast.missingFields"));
      return;
    }

    const ticketId = `TKT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    toast.success(t("help.contact.toast.submitted", { ticketId }));
    setSubject("");
    setCategory("");
    setMessage("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("help.contact.title")}</CardTitle>
        <CardDescription>{t("help.contact.desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="subject">{t("help.contact.field.subject")}</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("help.contact.field.subject.placeholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t("help.contact.field.category")}</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder={t("help.contact.field.category.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {t(c.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("help.contact.field.message")}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("help.contact.field.message.placeholder")}
              rows={5}
            />
          </div>
          <Button type="submit" className="w-full">
            {t("help.contact.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
