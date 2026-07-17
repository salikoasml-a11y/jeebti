import { cn } from "@/lib/utils";
import type { Card } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SnowflakeIcon } from "lucide-react";

export function CardFace({
  card,
  revealedNumber,
  className,
}: {
  card: Card;
  revealedNumber?: string;
  className?: string;
}) {
  const number = revealedNumber ?? `•••• •••• •••• ${card.last4}`;

  return (
    <div
      className={cn(
        "relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl p-5 text-white shadow-lg",
        `bg-gradient-to-br ${card.color}`,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-white/70">{card.label}</p>
          <p className="mt-1 text-[11px] capitalize text-white/60">{card.type} card</p>
        </div>
        {card.status === "frozen" ? (
          <Badge variant="secondary" className="gap-1 bg-white/20 text-white">
            <SnowflakeIcon className="size-3" />
            Frozen
          </Badge>
        ) : card.status === "pending" ? (
          <Badge variant="secondary" className="bg-white/20 text-white">
            Pending
          </Badge>
        ) : null}
      </div>

      <p className="mt-6 font-mono text-lg tracking-widest tabular-nums sm:text-xl">{number}</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-white/60">Card holder</p>
          <p className="text-sm font-medium">{card.holderName}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wide text-white/60">Expires</p>
          <p className="text-sm font-medium tabular-nums">{card.expiry}</p>
        </div>
        <div className="text-right">
          {card.network === "visa" ? (
            <span className="text-xl font-bold italic tracking-tight">VISA</span>
          ) : (
            <span className="text-sm font-bold tracking-tight">Mastercard</span>
          )}
        </div>
      </div>

      {card.status === "frozen" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <SnowflakeIcon className="size-10 text-white/70" />
        </div>
      )}
    </div>
  );
}
