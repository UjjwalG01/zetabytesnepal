import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  GraduationCap,
  Users,
  Building2,
  Wallet,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  Bus,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  UserCog,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PRODUCTS, type ProductSlug } from "@/lib/site";
import { useTrial } from "@/lib/trial-context";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetailPage,
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.product.name ?? "Product";
    return {
      meta: [
        { title: `${name} — Zetabytes Nepal` },
        { name: "description", content: `${name} by Zetabytes Nepal — modern SaaS built for Nepali institutions.` },
        { property: "og:title", content: `${name} — Zetabytes Nepal` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `https://zetabytesnepal.lovable.app/products/${params.slug}` }],
    };
  },
});

type Feature = { icon: LucideIcon; title: string; body: string };

const CONTENT: Record<
  ProductSlug,
  { icon: LucideIcon; hero: string; sub: string; features: Feature[]; useCases: string[] }
> = {
  "zean-fitness": {
    icon: Dumbbell,
    hero: "Run your gym like a modern brand",
    sub: "From single studios to multi-branch chains — automate check-ins, class bookings, payments and member engagement.",
    features: [
      { icon: Users, title: "Member Management", body: "Profiles, plans, renewals and family/corporate accounts." },
      { icon: CalendarCheck, title: "Biometric Attendance", body: "Fingerprint, RFID and QR check-ins with real-time gates." },
      { icon: ClipboardList, title: "Class & PT Bookings", body: "Recurring schedules, waitlists and self-booking portal." },
      { icon: Wallet, title: "Payments & POS", body: "eSewa, Khalti, cards, invoices and in-club retail POS." },
      { icon: BarChart3, title: "Reports & Forecast", body: "Churn, retention, LTV and revenue forecasts." },
      { icon: UserCog, title: "Staff & Payroll", body: "Rosters, PT commissions and attendance-linked payroll." },
    ],
    useCases: ["Independent gyms", "Multi-branch chains", "Yoga & pilates studios", "CrossFit boxes", "Corporate wellness centers"],
  },
  "zean-school": {
    icon: GraduationCap,
    hero: "One system for the whole school",
    sub: "Admissions to alumni, exams to fees, classroom to bus — modules and pricing tailored to your institution.",
    features: [
      { icon: GraduationCap, title: "Student Information", body: "Admissions, sections, guardians and document vault." },
      { icon: CalendarCheck, title: "Attendance", body: "Class & subject attendance with parent SMS alerts." },
      { icon: BookOpen, title: "Exams & Grading", body: "Custom marking schemes, marksheets and GPAs." },
      { icon: Wallet, title: "Fee Management", body: "Fee heads, discounts, gateways and auto-reminders." },
      { icon: MessageSquare, title: "Parent Communication", body: "Parent app, homework, circulars and chat." },
      { icon: Bus, title: "Transport & Library", body: "Routes, GPS tracking, library issue/return and fines." },
    ],
    useCases: ["Primary & secondary schools", "Colleges & +2 institutes", "Language & tuition centers", "Boarding schools", "Multi-branch networks"],
  },
  "student-portal": {
    icon: Users,
    hero: "A student portal built around your institution",
    sub: "A branded web + mobile portal for students and parents — configured to your modules, scale and workflows.",
    features: [
      { icon: BookOpen, title: "Course & Content", body: "Timetables, syllabus, homework and study material." },
      { icon: ClipboardList, title: "Assignments", body: "Submissions, grading and teacher feedback." },
      { icon: CalendarCheck, title: "Attendance View", body: "Live class-wise attendance for students and parents." },
      { icon: MessageSquare, title: "Notifications", body: "Circulars, exam schedules and event updates." },
      { icon: Wallet, title: "Fee Portal", body: "Online fee payments with digital receipts." },
      { icon: ShieldCheck, title: "Secure Access", body: "Per-user roles, OTP login and audit trails." },
    ],
    useCases: ["Universities", "Boarding schools", "Coaching institutes", "Vocational academies", "Multi-campus schools"],
  },
  "zean-member-app": {
    icon: Building2,
    hero: "A member-first mobile experience",
    sub: "A branded member app with digital passes, class bookings, dues and progress — plugs straight into your Zean Fitness setup.",
    features: [
      { icon: Users, title: "Digital Membership", body: "Digital pass, QR entry and profile management." },
      { icon: CalendarCheck, title: "Class Bookings", body: "See schedules, book classes and manage waitlists." },
      { icon: Wallet, title: "Payments & Renewals", body: "Renew plans, pay dues via eSewa, Khalti or card." },
      { icon: BarChart3, title: "Progress Tracking", body: "Attendance streaks, body metrics and PT logs." },
      { icon: MessageSquare, title: "Notifications", body: "Renewal nudges, offers and class updates." },
      { icon: ShieldCheck, title: "Privacy First", body: "Members control what they share with your club." },
    ],
    useCases: ["Boutique gyms", "Multi-branch chains", "Yoga & pilates studios", "Wellness clubs", "Sports academies"],
  },
};

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { openTrial } = useTrial();
  const content = CONTENT[product.slug as ProductSlug];
  const Icon = content.icon;

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-brand">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-brand">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="animate-fade-up">
              <Badge className="w-fit bg-brand/10 text-brand hover:bg-brand/10">{product.tag}</Badge>
              <h1 className="mt-4 font-heading text-4xl font-bold sm:text-5xl">{content.hero}</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">{content.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                  onClick={() => openTrial({ productSlug: product.slug as ProductSlug })}
                >
                  Request Free Trial <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-brand text-brand-foreground shadow-xl">
                <Icon className="h-20 w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Modules</div>
          <h2 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">Everything you get</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((f) => {
            const FIcon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border bg-card p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <FIcon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-heading font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.body}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Use cases */}
      <section className="border-y bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ideal for</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {content.useCases.map((u) => (
              <div
                key={u}
                className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-brand" /> {u}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-brand p-10 text-brand-foreground sm:p-14">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Try {product.name} free for 14 days
              </h2>
              <p className="mt-2 text-brand-foreground/85">
                Our team will migrate your existing data and get you live within a week.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
                onClick={() => openTrial({ productSlug: product.slug as ProductSlug })}
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
