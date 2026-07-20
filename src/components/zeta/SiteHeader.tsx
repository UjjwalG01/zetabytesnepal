import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { useTrial } from "@/lib/trial-context";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { openTrial } = useTrial();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden border-b border-border/70 bg-surface text-xs text-muted-foreground md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand">
              <Phone className="h-3.5 w-3.5" /> {SITE.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-brand">
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span>Follow us:</span>
            <MiniSocials />
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => {
              const active =
                n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`text-sm font-medium transition ${
                    active ? "text-brand" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Login portal launching soon")}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              onClick={() => openTrial()}
            >
              Start Free Trial
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t bg-background md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toast.info("Login portal launching soon")}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90"
                  onClick={() => {
                    setOpen(false);
                    openTrial();
                  }}
                >
                  Free Trial
                </Button>
              </div>
              <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {SITE.phoneDisplay}
                </a>
                <MiniSocials />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function MiniSocials() {
  // Kept minimal here to avoid duplicate imports; use SocialIcons in footer.
  const links = [
    { href: SITE.social.facebook, label: "Facebook" },
    { href: SITE.social.instagram, label: "Instagram" },
    { href: SITE.social.linkedin, label: "LinkedIn" },
  ];
  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-brand"
        >
          {l.label[0]}
        </a>
      ))}
    </div>
  );
}
