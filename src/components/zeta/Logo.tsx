import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <span
        aria-hidden
        className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-sm transition group-hover:scale-105"
      >
        <span className="font-heading text-lg font-bold leading-none">Z</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-brand-2 ring-2 ring-background" />
      </span>
      {!compact && (
        <span className="font-heading text-base font-bold tracking-tight text-foreground">
          Zetabytes<span className="text-brand"> Nepal</span>
        </span>
      )}
    </Link>
  );
}
