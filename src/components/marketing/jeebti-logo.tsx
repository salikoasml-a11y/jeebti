import { WalletMinimal } from "lucide-react";
import { cn } from "@/lib/utils";

export function JeebtiLogo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-jeebti-brand text-white">
        <WalletMinimal className="size-4.5" strokeWidth={2.25} />
      </span>
      {!iconOnly && <span className="text-lg font-bold tracking-tight text-foreground">Jeebti</span>}
    </span>
  );
}
