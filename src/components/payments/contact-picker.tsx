"use client";

import { useState } from "react";
import type { Contact } from "@/lib/types";
import { useTranslation } from "@/hooks/use-translation";
import { initials } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export function ContactPicker({
  contacts,
  onSelect,
}: {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.handle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grid gap-3">
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("payments.contactPicker.search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid gap-1.5">
        {filtered.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">{t("payments.contactPicker.empty")}</p>
        )}
        {filtered.map((contact) => {
          const parts = contact.name.split(" ");
          const fallback = initials(parts[0] ?? "", parts[1] ?? "");
          return (
            <button
              key={contact.id}
              type="button"
              onClick={() => onSelect(contact)}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left transition-colors hover:border-border hover:bg-muted"
              )}
            >
              <Avatar>
                <AvatarFallback>{fallback}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium">{contact.name}</p>
                  {contact.isJeebtiUser && (
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {t("payments.contactPicker.jeebtiBadge")}
                    </Badge>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {contact.handle}
                  {contact.bankName ? ` · ${contact.bankName}` : ""}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
