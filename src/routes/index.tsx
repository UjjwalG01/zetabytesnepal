import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Dumbbell,
  GraduationCap,
  Users,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  BarChart3,
  ClipboardList,
  MessageSquare,
  BookOpen,
  Bus,
  UserCog,
  Sparkles,
  Rocket,
  MonitorSmartphone,
  Menu,
  X,
  Quote,
  ChevronRight,
} from "lucide-react";
import { DashboardMockup } from "@/components/zeta/DashboardMockup";
import { FeatureModal, type Feature } from "@/components/zeta/FeatureModal";
import { TrialModal } from "@/components/zeta/TrialModal";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { name: "keywords", content: "Nepal gym software, school management Nepal, Zean Fitness, Zean School, SaaS Nepal, Zetabytes" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

type Product = "fitness" | "school";

const fitnessFeatures: Feature[] = [
  { icon: Users, title: "Member Management", short: "Full lifecycle from signup to renewal.", details: ["Profiles, plans and body metrics", "Automated renewal reminders", "Family and corporate accounts", "Bulk import from spreadsheets"] },
  { icon: CalendarCheck, title: "Attendance & Access", short: "Biometric and QR check-ins.", details: ["Fingerprint, RFID and QR support", "Real-time gate access control", "Absentee alerts to trainers", "Heatmap of peak hours"] },
  { icon: ClipboardList, title: "Bookings & Classes", short: "Studio classes and PT sessions.", details: ["Recurring class schedules", "Trainer availability and capacity", "Waitlists and no-show tracking", "Online self-booking portal"] },
  { icon: CreditCard, title: "Payments & POS", short: "Cards, wallets and cash reconciled.", details: ["eSewa, Khalti and card gateways", "Invoices, receipts and refunds", "In-club retail POS", "Automated dues follow-up"] },
  { icon: BarChart3, title: "Reports & Forecast", short: "Revenue, retention, LTV.", details: ["Churn and retention analytics", "Revenue forecast by plan", "Trainer performance", "Exportable owner dashboards"] },
  { icon: UserCog, title: "Staff & Payroll", short: "Roles, shifts, commissions.", details: ["Shift rosters and leaves", "Commission on PT sessions", "Role-based permissions", "Attendance-linked payroll"] },
  { icon: ShieldCheck, title: "Access Control", short: "Granular per-branch security.", details: ["Multi-branch role scoping", "Audit trail on sensitive actions", "Data export controls", "2FA for admin accounts"] },
  { icon: MessageSquare, title: "Member Engagement", short: "SMS, email and in-app.", details: ["Birthday and milestone campaigns", "Renewal nudges", "Broadcast announcements", "Feedback and NPS"] },
];

const schoolFeatures: Feature[] = [
  { icon: GraduationCap, title: "Student Information", short: "One record from admission to alumni.", details: ["Admissions and enrollment", "Sections, houses and rolls", "Guardian and sibling links", "Document vault"] },
  { icon: CalendarCheck, title: "Attendance", short: "Daily, period-wise, biometric.", details: ["Class and subject attendance", "Absentee SMS to parents", "Biometric and RFID integration", "Attendance analytics"] },
  { icon: BookOpen, title: "Exams & Grading", short: "Flexible marking schemes.", details: ["Term, unit and board exams", "Custom grading systems", "Marksheets and report cards", "GPA and rank calculation"] },
  { icon: CreditCard, title: "Fee Management", short: "Structures, discounts, receipts.", details: ["Custom fee heads and cycles", "Scholarships and discounts", "Online payment gateways", "Auto-reminders for dues"] },
  { icon: MessageSquare, title: "Parent Communication", short: "App, SMS and email in sync.", details: ["Parent mobile app", "Homework and circulars", "Teacher–parent chat", "Progress notifications"] },
  { icon: Bus, title: "Transport", short: "Routes, stops and live tracking.", details: ["Route and vehicle assignment", "GPS live tracking", "Driver and conductor records", "Fee integration with transport"] },
  { icon: UserCog, title: "Staff & Payroll", short: "HR built for schools.", details: ["Teacher timetables and load", "Leave and substitution", "Payroll with tax rules", "Performance appraisals"] },
  { icon: ShieldCheck, title: "Library & Inventory", short: "Books, assets and issue tracking.", details: ["Barcode-based issue/return", "Fine calculation", "Asset and inventory registers", "Purchase orders"] },
];

const fitnessPlans = (yearly: boolean) => [
  {
    name: "Basic",
    price: yearly ? 1699 : 1999,
    tag: "Great for a single studio",
    features: ["Up to 500 members", "Attendance & check-ins", "Basic bookings", "Payments & receipts", "Email support"],
    highlight: false,
  },
  {
    name: "Premium",
    price: yearly ? 2549 : 2999,
    tag: "For multi-branch clubs",
    features: ["Unlimited members", "Biometric access control", "Advanced bookings & PT", "Reports & forecasting", "Staff & payroll", "Priority support"],
    highlight: true,
  },
];

const schoolPlans = (yearly: boolean) => [
  {
    name: "Basic",
    price: yearly ? 3399 : 3999,
    tag: "For small schools",
    features: ["Up to 300 students", "Attendance & exams", "Fee collection", "Parent SMS", "Email support"],
    highlight: false,
  },
  {
    name: "Standard",
    price: yearly ? 5099 : 5999,
    tag: "Growing institutions",
    features: ["Up to 1,000 students", "Parent app", "Timetable & grading", "Library & transport", "Online payments", "Priority support"],
    highlight: true,
  },
  {
    name: "Premium",
    price: yearly ? 8499 : 9999,
    tag: "Fully custom",
    features: ["Unlimited students", "Multi-branch", "Custom modules", "Dedicated onboarding", "API access", "24×7 support"],
    highlight: false,
  },
];

const steps = [
  { icon: Sparkles, title: "Tell us your needs", body: "Share your organization size and modules that matter." },
  { icon: MonitorSmartphone, title: "We configure Zean", body: "We tailor Zean Fitness or Zean School to your workflow." },
  { icon: Rocket, title: "Onboard your team", body: "Guided training for staff, trainers or teachers." },
  { icon: BarChart3, title: "Grow with insights", body: "Use live dashboards to make better decisions." },
];

const testimonials = [
  { name: "Manish Gurung", role: "Owner, Peak Fitness Kathmandu", quote: "Zean Fitness cut our admin work in half. Renewals and PT bookings just run themselves." },
  { name: "Sabina Adhikari", role: "Principal, Himalayan Academy", quote: "Parents love the app and our teachers finally have one place for attendance, exams and fees." },
  { name: "Rajesh Shrestha", role: "Director, FlexZone Chain", quote: "We moved 4 branches to Zean in a month. Reporting across branches is finally clean." },
];

function LandingPage() {
  const [product, setProduct] = useState<Product>("fitness");
  const [yearly, setYearly] = useState(false);
  const [pricingProduct, setPricingProduct] = useState<Product>("fitness");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feature, setFeature] = useState<Feature | null>(null);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialPlan, setTrialPlan] = useState<string | undefined>();

  const features = product === "fitness" ? fitnessFeatures : schoolFeatures;
  const plans = useMemo(
    () => (pricingProduct === "fitness" ? fitnessPlans(yearly) : schoolPlans(yearly)),
    [pricingProduct, yearly],
  );

  const openTrial = (plan?: string) => {
    setTrialPlan(plan);
    setTrialOpen(true);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground">
      <Toaster position="top-center" richColors />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground shadow-md shadow-primary/30">
              <span className="text-sm font-bold">Z</span>
            </div>
            <span className="text-base font-semibold tracking-tight">Zetabytes <span className="text-primary">Nepal</span></span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-muted-foreground transition hover:text-foreground">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" onClick={() => toast.info("Login coming soon")}>Login</Button>
            <Button size="sm" onClick={() => openTrial()} className="bg-gradient-to-r from-primary to-fuchsia-500 shadow-md shadow-primary/25 hover:opacity-95">
              Start Free Trial
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t bg-background md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="rounded-md px-3 py-2 text-left text-sm hover:bg-secondary">
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.info("Login coming soon")}>Login</Button>
                <Button size="sm" className="flex-1" onClick={() => openTrial()}>Free Trial</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-40 right-0 h-[300px] w-[300px] rounded-full bg-fuchsia-400/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Smart SaaS built in Nepal
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Smart management for{" "}
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-primary bg-clip-text text-transparent">
                fitness & education
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Zetabytes Nepal builds <strong className="text-foreground">Zean Fitness</strong> and{" "}
              <strong className="text-foreground">Zean School</strong> — modern SaaS to run gyms, wellness studios and schools with less admin and more clarity.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => openTrial()} className="bg-gradient-to-r from-primary to-fuchsia-500 shadow-lg shadow-primary/25 hover:opacity-95">
                Start Free Trial <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("products")}>
                Explore products
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground">
              {["No credit card", "14-day trial", "Onboarding included"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex justify-center lg:justify-end">
              <Tabs value={product} onValueChange={(v) => setProduct(v as Product)}>
                <TabsList>
                  <TabsTrigger value="fitness" className="gap-1.5"><Dumbbell className="h-4 w-4" /> Zean Fitness</TabsTrigger>
                  <TabsTrigger value="school" className="gap-1.5"><GraduationCap className="h-4 w-4" /> Zean School</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <DashboardMockup product={product} />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Our products"
          title="Two focused platforms, one unified experience"
          subtitle="Pick the Zean product built for your world. Switch anytime, or run both under one Zetabytes account."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              key: "fitness" as Product,
              icon: Dumbbell,
              name: "Zean Fitness Software",
              tag: "Gyms · Studios · Wellness",
              body: "Members, bookings, biometric attendance, PT sessions, POS and forecasting — everything to run a modern fitness business.",
              bullets: ["Biometric check-ins", "Class & PT bookings", "Renewal automation", "Owner dashboards"],
            },
            {
              key: "school" as Product,
              icon: GraduationCap,
              name: "Zean School Software",
              tag: "Schools · Colleges · Institutes",
              body: "One system for admissions, attendance, exams, fees, transport and parent communication — modules can be customized to your needs.",
              bullets: ["Parent mobile app", "Exam & grading engine", "Online fee collection", "Custom modules"],
            },
          ].map((p) => {
            const Icon = p.icon;
            const active = product === p.key;
            return (
              <button
                key={p.key}
                onClick={() => {
                  setProduct(p.key);
                  setPricingProduct(p.key);
                  scrollTo(p.key === "fitness" ? "fitness" : "school");
                }}
                className={`group relative overflow-hidden rounded-2xl border p-8 text-left transition ${
                  active ? "border-primary/60 bg-primary/5 shadow-xl shadow-primary/10" : "hover:border-primary/40 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{p.tag}</div>
                    <div className="text-lg font-semibold">{p.name}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{p.body}</p>
                <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> {b}</li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore {p.name.split(" ")[1]} <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Fitness detail */}
      <ProductDetail
        id="fitness"
        eyebrow="Zean Fitness Software"
        title="Run your gym like a modern brand"
        body="From single studios to multi-branch chains — automate check-ins, class bookings, payments and member engagement. Trainers focus on members, not spreadsheets."
        modules={fitnessFeatures.slice(0, 6)}
        onOpen={setFeature}
        cta={() => openTrial("Zean Fitness")}
        pricing={[
          { name: "Basic", price: 1999, features: ["Up to 500 members", "Attendance", "Bookings", "Payments"] },
          { name: "Premium", price: 2999, features: ["Unlimited members", "Biometric access", "PT & POS", "Reports & forecast"], highlight: true },
        ]}
        onSelectPlan={(p) => openTrial(`Zean Fitness · ${p}`)}
      />

      {/* School detail */}
      <ProductDetail
        id="school"
        eyebrow="Zean School Software"
        title="One system for the whole school"
        body="Admissions to alumni, exams to fees, classroom to bus. Modules and pricing are fully customizable — start with what you need, add the rest when you're ready."
        modules={schoolFeatures.slice(0, 6)}
        onOpen={setFeature}
        cta={() => openTrial("Zean School")}
        pricing={[
          { name: "Basic", price: 3999, features: ["Up to 300 students", "Attendance & exams", "Fee collection"] },
          { name: "Standard", price: 5999, features: ["Up to 1,000 students", "Parent app", "Timetable & grading"], highlight: true },
          { name: "Premium", price: 9999, features: ["Unlimited students", "Multi-branch", "Custom modules"] },
        ]}
        onSelectPlan={(p) => openTrial(`Zean School · ${p}`)}
        note="Modules and pricing are fully customizable. Contact us for a tailored quote."
      />

      {/* Features grid */}
      <section id="features" className="border-y bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Modules"
            title={product === "fitness" ? "Everything Zean Fitness gives you" : "Everything Zean School gives you"}
            subtitle="Click any module to see what's inside."
          />
          <div className="mt-4 flex justify-center">
            <Tabs value={product} onValueChange={(v) => setProduct(v as Product)}>
              <TabsList>
                <TabsTrigger value="fitness" className="gap-1.5"><Dumbbell className="h-4 w-4" /> Fitness</TabsTrigger>
                <TabsTrigger value="school" className="gap-1.5"><GraduationCap className="h-4 w-4" /> School</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.title}
                  onClick={() => setFeature(f)}
                  className="group rounded-xl border bg-background p-5 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-medium">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.short}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead eyebrow="How it works" title="Live in weeks, not months" subtitle="A calm, guided path from first call to first insight." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-2xl border bg-card p-6">
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Step {i + 1}
                </div>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.body}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Pricing" title="Simple pricing, priced in NPR" subtitle="Switch products or billing frequency below. All plans include onboarding." />
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Tabs value={pricingProduct} onValueChange={(v) => setPricingProduct(v as Product)}>
              <TabsList>
                <TabsTrigger value="fitness" className="gap-1.5"><Dumbbell className="h-4 w-4" /> Zean Fitness</TabsTrigger>
                <TabsTrigger value="school" className="gap-1.5"><GraduationCap className="h-4 w-4" /> Zean School</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-3 rounded-full border bg-background px-4 py-2">
              <span className={`text-sm ${!yearly ? "font-semibold" : "text-muted-foreground"}`}>Monthly</span>
              <Switch checked={yearly} onCheckedChange={setYearly} />
              <span className={`text-sm ${yearly ? "font-semibold" : "text-muted-foreground"}`}>
                Yearly <Badge variant="secondary" className="ml-1 bg-primary/10 text-primary">Save 15%</Badge>
              </span>
            </div>
          </div>

          <div className={`mt-10 grid gap-6 ${plans.length === 2 ? "sm:grid-cols-2 lg:mx-auto lg:max-w-4xl" : "md:grid-cols-3"}`}>
            {plans.map((p) => (
              <PricingCard key={p.name} plan={p} yearly={yearly} onSelect={() => openTrial(`${pricingProduct === "fitness" ? "Zean Fitness" : "Zean School"} · ${p.name}`)} />
            ))}
          </div>

          {pricingProduct === "school" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Prices are indicative. Zean School modules & pricing can be tailored to your institution.
            </p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Loved by teams" title="Trusted by gyms and schools across Nepal" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative rounded-2xl border bg-card p-6">
              <Quote className="absolute right-5 top-5 h-6 w-6 text-primary/30" />
              <p className="text-sm text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-sm font-semibold text-primary-foreground">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-fuchsia-600 p-10 text-primary-foreground shadow-2xl shadow-primary/30 sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25), transparent 40%)" }} />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to modernize your operations?</h2>
              <p className="mt-3 text-primary-foreground/85">Start a 14-day free trial of Zean Fitness or Zean School. Our team will help you migrate and go live.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button size="lg" variant="secondary" onClick={() => openTrial()}>Start Free Trial</Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => toast.message("Call us at +977-98-XXXXXXXX")}>
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground">
                <span className="text-sm font-bold">Z</span>
              </div>
              <span className="font-semibold">Zetabytes Nepal</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Smart Management Solutions for Fitness & Education. Built in Kathmandu.</p>
          </div>
          <FooterCol title="Products" items={["Zean Fitness", "Zean School", "Roadmap", "Changelog"]} />
          <FooterCol title="Company" items={["About", "Careers", "Contact", "Blog"]} />
          <FooterCol title="Legal" items={["Privacy", "Terms", "Security", "GDPR"]} />
        </div>
        <div className="border-t py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Zetabytes Nepal Pvt. Ltd. All rights reserved.
        </div>
      </footer>

      <FeatureModal feature={feature} open={!!feature} onOpenChange={(o) => !o && setFeature(null)} />
      <TrialModal open={trialOpen} onOpenChange={setTrialOpen} planName={trialPlan} />
    </div>
  );
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function ProductDetail({
  id, eyebrow, title, body, modules, onOpen, cta, pricing, onSelectPlan, note,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  modules: Feature[];
  onOpen: (f: Feature) => void;
  cta: () => void;
  pricing: { name: string; price: number; features: string[]; highlight?: boolean }[];
  onSelectPlan: (name: string) => void;
  note?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={cta} className="bg-gradient-to-r from-primary to-fuchsia-500">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Button>
            <Button variant="outline" onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>See pricing</Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <button key={m.title} onClick={() => onOpen(m)} className="group flex items-start gap-3 rounded-xl border bg-card p-4 text-left transition hover:border-primary/40 hover:shadow-md">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.short}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-card p-6">
            <div className="text-sm font-semibold">{eyebrow} plans</div>
            <div className="mt-4 grid gap-3">
              {pricing.map((p) => (
                <div key={p.name} className={`rounded-xl border p-4 ${p.highlight ? "border-primary/60 bg-primary/5" : ""}`}>
                  <div className="flex items-baseline justify-between">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-lg font-bold">Rs. {p.price.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {f}</li>
                    ))}
                  </ul>
                  <Button size="sm" variant={p.highlight ? "default" : "outline"} className="mt-3 w-full" onClick={() => onSelectPlan(p.name)}>
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
            {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan, yearly, onSelect,
}: {
  plan: { name: string; price: number; tag: string; features: string[]; highlight: boolean };
  yearly: boolean;
  onSelect: () => void;
}) {
  return (
    <div className={`relative rounded-2xl border bg-card p-6 ${plan.highlight ? "border-primary/60 shadow-xl shadow-primary/10 ring-1 ring-primary/20" : ""}`}>
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-3 py-0.5 text-xs font-semibold text-primary-foreground">
          Most popular
        </div>
      )}
      <div className="text-lg font-semibold">{plan.name}</div>
      <div className="text-xs text-muted-foreground">{plan.tag}</div>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-bold">Rs. {plan.price.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground">/ {yearly ? "mo, billed yearly" : "month"}</span>
      </div>
      <Button className={`mt-5 w-full ${plan.highlight ? "bg-gradient-to-r from-primary to-fuchsia-500" : ""}`} variant={plan.highlight ? "default" : "outline"} onClick={onSelect}>
        Get Started
      </Button>
      <ul className="mt-6 space-y-2 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}><a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-foreground">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
