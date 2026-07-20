import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  GraduationCap,
  Sparkles,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { DashboardMockup } from "@/components/zeta/DashboardMockup";
import { useTrial } from "@/lib/trial-context";
import { PRODUCTS } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Zetabytes Nepal — Smart SaaS for Fitness & Education" },
      {
        name: "description",
        content:
          "Modern management SaaS built in Nepal — Zean Fitness for gyms, Zean School for schools, plus student & member apps.",
      },
      { property: "og:title", content: "Zetabytes Nepal — Smart SaaS for Fitness & Education" },
      { property: "og:description", content: "Zean Fitness, Zean School, Student Portal and Member App — one platform, made in Nepal." },
    ],
    links: [{ rel: "canonical", href: "https://zetabytesnepal.lovable.app/" }],
  }),
});

const STATS = [
  { value: "1,200+", label: "Active gym members tracked" },
  { value: "45+", label: "Schools in Kathmandu & Pokhara" },
  { value: "18", label: "Cities served across Nepal" },
  { value: "99.9%", label: "Platform uptime SLA" },
];

function HomePage() {
  const { openTrial } = useTrial();
  const [product, setProduct] = useState<"fitness" | "school">("fitness");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center animate-fade-up">
            <Badge
              variant="secondary"
              className="w-fit gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-brand"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Smart SaaS built in Nepal
            </Badge>
            <h1 className="mt-5 font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
              Smart management for <span className="text-brand">fitness & education</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Zetabytes Nepal builds <strong className="text-foreground">Zean Fitness</strong> and{" "}
              <strong className="text-foreground">Zean School</strong> — modern SaaS to run gyms,
              wellness studios and schools with less admin and more clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => openTrial()}
                className="bg-brand text-brand-foreground hover:bg-brand/90"
              >
                Start Free Trial <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/products">Explore products</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
              {["No credit card", "14-day trial", "Onboarding included"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up">
            <div className="mb-4 flex justify-center lg:justify-end">
              <Tabs value={product} onValueChange={(v) => setProduct(v as "fitness" | "school")}>
                <TabsList>
                  <TabsTrigger value="fitness" className="gap-1.5">
                    <Dumbbell className="h-4 w-4" /> Zean Fitness
                  </TabsTrigger>
                  <TabsTrigger value="school" className="gap-1.5">
                    <GraduationCap className="h-4 w-4" /> Zean School
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <DashboardMockup product={product} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-heading text-3xl font-bold text-brand sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Our platform"
          title="One suite. Four focused products."
          subtitle="Choose the Zean product built for your world — or combine them under one Zetabytes account."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                {p.slug === "zean-fitness" && <Dumbbell className="h-5 w-5" />}
                {p.slug === "zean-school" && <GraduationCap className="h-5 w-5" />}
                {p.slug === "student-portal" && <Users className="h-5 w-5" />}
                {p.slug === "zean-member-app" && <Building2 className="h-5 w-5" />}
              </div>
              <div className="mt-4 font-heading text-base font-semibold">{p.name}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {p.tag}
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Why Zetabytes"
            title="Built for Nepal, engineered for scale"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                title: "Real ROI, not vanity metrics",
                body: "Automate renewals, dues follow-up and reporting so your team focuses on members and students.",
              },
              {
                icon: ShieldCheck,
                title: "Enterprise-grade security",
                body: "Role-based access, audit trails, encrypted backups and Nepal-hosted data options.",
              },
              {
                icon: Users,
                title: "Local support, real people",
                body: "Onboarding, training and ongoing support delivered from Kathmandu in Nepali and English.",
              },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-heading font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-brand p-10 text-brand-foreground shadow-lg sm:p-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                Ready to modernize your operations?
              </h2>
              <p className="mt-3 text-brand-foreground/85">
                Start a 14-day free trial of Zean Fitness or Zean School. Our team will help you
                migrate and go live.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => openTrial()}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-foreground/40 bg-transparent text-brand-foreground hover:bg-brand-foreground/10"
                asChild
              >
                <Link to="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</div>
      <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
