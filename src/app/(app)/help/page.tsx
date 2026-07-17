"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqCategories, faqItems } from "@/components/help/faq-data";
import { ContactSupportCard } from "@/components/help/contact-support-card";
import { LiveChatSheet } from "@/components/help/live-chat-sheet";

export default function HelpPage() {
  const [query, setQuery] = useState("");

  const filteredByCategory = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? faqItems.filter(
          (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
        )
      : faqItems;

    return faqCategories
      .map((category) => ({
        category,
        items: filtered.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div className="pb-24">
      <PageHeader title="Help Center" description="Find answers or get in touch with our support team" />

      <div className="space-y-6 px-4 sm:px-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for answers..."
            className="pl-9"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {filteredByCategory.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;. Try a different search or contact support below.
                </CardContent>
              </Card>
            )}

            {filteredByCategory.map((group) => (
              <Card key={group.category}>
                <CardHeader>
                  <CardTitle>{group.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {group.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <ContactSupportCard />
            <Card>
              <CardHeader>
                <CardTitle>Need it now?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Use the live chat button in the bottom corner to talk to a support agent in real time.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LiveChatSheet />
    </div>
  );
}
