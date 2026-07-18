"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqCategoryKeys, faqItems } from "@/components/help/faq-data";
import { ContactSupportCard } from "@/components/help/contact-support-card";
import { LiveChatSheet } from "@/components/help/live-chat-sheet";
import { useTranslation } from "@/hooks/use-translation";

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const filteredByCategory = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? faqItems.filter(
          (item) =>
            t(item.questionKey).toLowerCase().includes(q) || t(item.answerKey).toLowerCase().includes(q)
        )
      : faqItems;

    return faqCategoryKeys
      .map((categoryKey) => ({
        categoryKey,
        items: filtered.filter((item) => item.categoryKey === categoryKey),
      }))
      .filter((group) => group.items.length > 0);
  }, [query, t]);

  return (
    <div className="pb-24">
      <PageHeader title={t("help.title")} description={t("help.description")} />

      <div className="space-y-6 px-4 sm:px-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("help.search.placeholder")}
            className="pl-9"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {filteredByCategory.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  {t("help.search.noResults", { query })}
                </CardContent>
              </Card>
            )}

            {filteredByCategory.map((group) => (
              <Card key={group.categoryKey}>
                <CardHeader>
                  <CardTitle>{t(group.categoryKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {group.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger>{t(item.questionKey)}</AccordionTrigger>
                        <AccordionContent>{t(item.answerKey)}</AccordionContent>
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
                <CardTitle>{t("help.needItNow.title")}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t("help.needItNow.desc")}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LiveChatSheet />
    </div>
  );
}
