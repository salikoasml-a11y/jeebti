import { cn } from "@/lib/utils";
import { JeebtiMark } from "@/components/jeebti-mark";

export function JeebtiLogo({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading", className)}>
      <JeebtiMark size={32} />
      {!iconOnly && <span className="text-lg font-bold tracking-tight text-foreground">Jeebti</span>}
    </span>
  );
}
