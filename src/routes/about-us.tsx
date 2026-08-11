import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, Heart, Rocket } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/about-us")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — Zetabytes Nepal" },
      {
        name: "description",
        content:
          "Zetabytes Nepal is a Kathmandu-based SaaS company building Zean Fitness, Zean School and companion apps for institutions across Nepal.",
      },
      { property: "og:title", content: "About Zetabytes Nepal" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about-us` }],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="border-b bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            About Us
          </div>
          <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
            Software built in Nepal, for Nepal
          </h1>
          <p className="mt-5 text-muted-foreground">
            Zetabytes Nepal is a Kathmandu-based product company building the{" "}
            <strong className="text-foreground">Zean Software Suite</strong> — modern SaaS for gyms,
            wellness studios, schools and institutions. We combine local support with
            enterprise-grade engineering, so every gym owner and school principal can run a modern
            operation without a modern-tech budget.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Our story</h2>
            <p className="mt-4 text-muted-foreground">
              We started Zetabytes after seeing gym owners in Kathmandu still running renewals on
              paper and schools spending weeks preparing marksheets in Excel. We knew the software
              existed — it was just built for someone else. So we built Zean: fast, affordable and
              designed around how institutions actually work in Nepal.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today Zean powers 45+ schools and 1,200+ tracked gym members across cities like
              Kathmandu, Pokhara, Bharatpur, Butwal and Biratnagar. Every feature is shaped by real
              feedback from the teams using it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Target,
                title: "Our mission",
                body: "Give every Nepali institution modern software that just works.",
              },
              {
                icon: Heart,
                title: "Our values",
                body: "Honest pricing, fast support, and shipping the boring stuff well.",
              },
              {
                icon: Rocket,
                title: "How we work",
                body: "Small team, product-led, close to customers — no middlemen.",
              },
              {
                icon: CheckCircle2,
                title: "Our promise",
                body: "You go live in weeks with our team beside you the whole way.",
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-2xl border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-heading text-sm font-semibold">{v.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{v.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { v: "1,200+", l: "Active members tracked" },
              { v: "45+", l: "Schools across Nepal" },
              { v: "99.9%", l: "Uptime SLA delivered" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-4xl font-bold text-brand">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-brand p-10 text-brand-foreground sm:p-14">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold">Come build with us</h2>
              <p className="mt-2 text-brand-foreground/85">
                Want to see how Zean fits your institution? We're always happy to talk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
                asChild
              >
                <Link to="/contact">Contact us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-foreground/40 bg-transparent text-brand-foreground hover:bg-brand-foreground/10"
                asChild
              >
                <Link to="/products">Explore products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
