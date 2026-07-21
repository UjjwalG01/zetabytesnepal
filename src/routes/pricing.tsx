import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Dumbbell, GraduationCap, Users, Building2 } from "lucide-react";
import { useTrial } from "@/lib/trial-context";
import type { ProductSlug } from "@/lib/site";
import { Reveal } from "@/components/zeta/Reveal";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Zetabytes Nepal" },
      {
        name: "description",
        content:
          "Transparent NPR pricing for Zean Fitness, Zean School, Student Portal and Member App. Monthly or yearly billing with 15% savings.",
      },
      { property: "og:title", content: "Pricing — Zetabytes Nepal" },
    ],
    links: [{ rel: "canonical", href: "https://zetabytesnepal.lovable.app/pricing" }],
  }),
});

type Plan = { name: string; price: number; tag: string; features: string[]; highlight?: boolean };

const PLANS: Record<ProductSlug, (yearly: boolean) => Plan[]> = {
  "zean-fitness": (y) => [
    {
      name: "Basic",
      price: y ? 1699 : 1999,
      tag: "Great for a single studio",
      features: ["Up to 500 members", "Attendance & check-ins", "Basic bookings", "Payments & receipts", "Email support"],
    },
    {
      name: "Premium",
      price: y ? 2549 : 2999,
      tag: "For multi-branch clubs",
      features: ["Unlimited members", "Biometric access", "Advanced bookings & PT", "Reports & forecasting", "Staff & payroll", "Priority support"],
      highlight: true,
    },
  ],
  "zean-school": (y) => [
    { name: "Basic", price: y ? 3399 : 3999, tag: "For small schools", features: ["Up to 300 students", "Attendance & exams", "Fee collection", "Parent SMS", "Email support"] },
    { name: "Standard", price: y ? 5099 : 5999, tag: "Growing institutions", features: ["Up to 1,000 students", "Parent app", "Timetable & grading", "Library & transport", "Online payments", "Priority support"], highlight: true },
    { name: "Premium", price: y ? 8499 : 9999, tag: "Fully custom", features: ["Unlimited students", "Multi-branch", "Custom modules", "Dedicated onboarding", "API access", "24×7 support"] },
  ],
  "student-portal": (y) => [
    { name: "Starter", price: y ? 1699 : 1999, tag: "Small institution portal", features: ["Up to 500 users", "Notifications & circulars", "Attendance view", "Basic customization"] },
    { name: "Custom Build", price: y ? 0 : 0, tag: "Priced per requirement", features: ["Custom modules", "Branded mobile app", "SSO & role scoping", "Dedicated onboarding"], highlight: true },
  ],
  "zean-member-app": (y) => [
    { name: "Standard Member App", price: y ? 1274 : 1499, tag: "Branded app for your club", features: ["Class bookings", "Digital pass (QR)", "Dues & renewals", "Push notifications"] },
    { name: "Digital Pass", price: y ? 849 : 999, tag: "Lightweight member entry", features: ["QR/digital pass only", "Basic profile", "Renewal reminders", "Standard support"], highlight: true },
  ],
};

const TABS: { slug: ProductSlug; label: string; icon: typeof Dumbbell }[] = [
  { slug: "zean-fitness", label: "Zean Fitness", icon: Dumbbell },
  { slug: "zean-school", label: "Zean School", icon: GraduationCap },
  { slug: "student-portal", label: "Student Portal", icon: Users },
  { slug: "zean-member-app", label: "Member App", icon: Building2 },
];

function PricingPage() {
  const { openTrial } = useTrial();
  const [product, setProduct] = useState<ProductSlug>("zean-fitness");
  const [yearly, setYearly] = useState(false);

  const plans = useMemo(() => PLANS[product](yearly), [product, yearly]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Pricing</div>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
          Simple pricing, priced in NPR
        </h1>
        <p className="mt-4 text-muted-foreground">
          Switch products or billing frequency below. All plans include onboarding and local
          support from our Kathmandu team.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Tabs value={product} onValueChange={(v) => setProduct(v as ProductSlug)}>
          <TabsList className="flex-wrap">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger key={t.slug} value={t.slug} className="gap-1.5">
                  <Icon className="h-4 w-4" /> {t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3 rounded-full border bg-card px-4 py-2">
          <span className={`text-sm ${!yearly ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className={`text-sm ${yearly ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
            Yearly{" "}
            <Badge variant="secondary" className="ml-1 bg-brand/10 text-brand hover:bg-brand/10">
              Save 15%
            </Badge>
          </span>
        </div>
      </div>

      <div
        className={`mt-12 grid gap-6 ${
          plans.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl"
        }`}
      >
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <div
              className={`relative h-full rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${
                p.highlight ? "border-brand ring-1 ring-brand/40" : ""
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-xs font-semibold text-brand-foreground">
                  Most popular
                </div>
              )}
              <div className="font-heading text-lg font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.tag}</div>
              <div className="mt-5 flex items-baseline gap-1">
                {p.price > 0 ? (
                  <>
                    <span className="font-heading text-4xl font-bold">Rs. {p.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">
                      / {yearly ? "mo, billed yearly" : "month"}
                    </span>
                  </>
                ) : (
                  <span className="font-heading text-3xl font-bold">Custom</span>
                )}
              </div>
              <Button
                className={`mt-5 w-full ${
                  p.highlight ? "bg-brand text-brand-foreground hover:bg-brand/90" : ""
                }`}
                variant={p.highlight ? "default" : "outline"}
                onClick={() => openTrial({ productSlug: product, planLabel: p.name })}
              >
                Get Started
              </Button>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Prices are indicative. Modules & pricing can be tailored to your organization — contact us
        for a bespoke quote.
      </p>
    </section>
  );
}
