"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useBankingStore } from "@/store/banking-store";
import type { Card } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { CardFace } from "@/components/cards/card-face";
import {
  ViewDetailsDialog,
  SetLimitDialog,
  CreateVirtualCardDialog,
  RequestPhysicalCardDialog,
  ApplyCreditCardDialog,
} from "@/components/cards/card-dialogs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon, CreditCardIcon, SettingsIcon } from "lucide-react";

function CardTile({ card }: { card: Card }) {
  const freezeCard = useBankingStore((s) => s.freezeCard);
  const unfreezeCard = useBankingStore((s) => s.unfreezeCard);
  const [toggling, setToggling] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);

  const canFreeze = card.status === "active" || card.status === "frozen";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <CardFace card={card} />

      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Spending limit</p>
          <p className="text-sm font-medium">£{card.spendingLimit.toLocaleString()}</p>
        </div>
        <Badge variant="outline" className="capitalize">
          {card.status}
        </Badge>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="text-sm">Freeze card</span>
        <Switch
          checked={card.status === "frozen"}
          disabled={!canFreeze || toggling}
          onCheckedChange={async (checked) => {
            setToggling(true);
            try {
              if (checked) {
                await freezeCard(card.id);
                toast.success("Card frozen");
              } else {
                await unfreezeCard(card.id);
                toast.success("Card unfrozen");
              }
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Something went wrong");
            } finally {
              setToggling(false);
            }
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => setDetailsOpen(true)}>
          View details
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 gap-1"
          onClick={() => setLimitOpen(true)}
        >
          <SettingsIcon className="size-3.5" />
          Set limit
        </Button>
      </div>

      <ViewDetailsDialog card={card} open={detailsOpen} onOpenChange={setDetailsOpen} />
      <SetLimitDialog card={card} open={limitOpen} onOpenChange={setLimitOpen} />
    </div>
  );
}

export default function CardsPage() {
  const cards = useBankingStore((s) => s.cards);
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [physicalOpen, setPhysicalOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Cards"
        description="Manage your virtual, physical and credit cards."
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" className="gap-1.5">
                <PlusIcon className="size-4" />
                Add card
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setVirtualOpen(true)}>Create virtual card</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPhysicalOpen(true)}>Request physical card</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCreditOpen(true)}>Apply for credit card</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <div className="px-4 pb-10 sm:px-6">
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
            <CreditCardIcon className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">You don&apos;t have any cards yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <CardTile key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>

      <CreateVirtualCardDialog open={virtualOpen} onOpenChange={setVirtualOpen} />
      <RequestPhysicalCardDialog open={physicalOpen} onOpenChange={setPhysicalOpen} />
      <ApplyCreditCardDialog open={creditOpen} onOpenChange={setCreditOpen} />
    </div>
  );
}
