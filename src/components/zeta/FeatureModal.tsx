import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  short: string;
  details: string[];
};

export function FeatureModal({
  feature,
  open,
  onOpenChange,
}: {
  feature: Feature | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!feature) return null;
  const Icon = feature.icon;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>{feature.title}</DialogTitle>
              <DialogDescription>{feature.short}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
          {feature.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
