import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { PRODUCTS, type ProductSlug } from "@/lib/site";
import { useTrial } from "@/lib/trial-context";

const PLAN_OPTIONS: Record<ProductSlug, string[]> = {
  "zean-fitness": ["Basic (up to 500 members)", "Premium (unlimited, biometric access)"],
  "zean-school": [
    "Basic (up to 300 students)",
    "Standard (up to 1,000 students)",
    "Premium (unlimited, multi-branch)",
  ],
  "student-portal": [],
  "zean-member-app": ["Standard member app", "Digital Pass"],
};

const WHATSAPP_NUMBER = "9779863612557"; // +977 9863612557
const RATE_LIMIT_MS = 2 * 60 * 1000;
const RATE_LIMIT_KEY = "zeta_trial_last_submit";

// Accepts +977 98XXXXXXXX, 977..., or local 98XXXXXXXX / 97XXXXXXXX (Nepali mobile).
const nepaliPhoneRegex = /^(?:\+?977[- ]?)?9[678]\d{8}$/;

const step1Schema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(200),
  contactName: z.string().trim().min(2, "Contact person is required").max(120),
  phone: z
    .string()
    .trim()
    .regex(nepaliPhoneRegex, "Enter a valid Nepali mobile (e.g. +977 98XXXXXXXX)"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255)
    .optional()
    .or(z.literal("")),
});

function slugToLabel(slug: ProductSlug) {
  return PRODUCTS.find((p) => p.slug === slug)?.name ?? slug;
}

export function TrialModal() {
  const { open, prefill, closeTrial } = useTrial();

  const [step, setStep] = useState(1);
  const [product, setProduct] = useState<ProductSlug>(prefill.productSlug ?? "zean-fitness");
  const [plan, setPlan] = useState<string>("");
  const [details, setDetails] = useState("");
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { url: string; summary: string }>(null);

  const planOptions = PLAN_OPTIONS[product];
  const needsFreeText = product === "student-portal";

  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(null);
      setErrors({});
      setProduct(prefill.productSlug ?? "zean-fitness");
      setPlan(prefill.planLabel ?? "");
      setDetails("");
    }
  }, [open, prefill.productSlug, prefill.planLabel]);

  useEffect(() => {
    setPlan("");
    setDetails("");
  }, [product]);

  const planOrDetails = needsFreeText ? details : plan;

  const summary = useMemo(
    () =>
      `Trial request submitted for ${slugToLabel(product)} (${planOrDetails || "—"}) under ${company || "—"}!`,
    [product, planOrDetails, company],
  );

  const handleContinue = () => {
    const result = step1Schema.safeParse({ company, contactName, phone, email });
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({
        company: fe.company?.[0] ?? "",
        contactName: fe.contactName?.[0] ?? "",
        phone: fe.phone?.[0] ?? "",
        email: fe.email?.[0] ?? "",
      });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const buildWhatsAppUrl = () => {
    const raw =
      `*New Trial Request from Zetabytes Site*\n` +
      `• *Organization:* ${company}\n` +
      `• *Product:* ${slugToLabel(product)}\n` +
      `• *Plan/Requirement:* ${planOrDetails}\n` +
      `• *Contact Person:* ${contactName}\n` +
      `• *Phone:* ${phone}` +
      (email ? `\n• *Email:* ${email}` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(raw)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Re-validate step 1 defensively
    const step1 = step1Schema.safeParse({ company, contactName, phone, email });
    const planValid = needsFreeText ? details.trim().length >= 5 : !!plan;
    if (!step1.success) {
      toast.error("Please review your contact details.");
      setStep(1);
      return;
    }
    if (!planValid) {
      setErrors((p) => ({
        ...p,
        planOrDetails: needsFreeText
          ? "Please describe your requirement (min 5 chars)"
          : "Please pick a plan",
      }));
      return;
    }

    // Client-side rate limit
    try {
      const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
      const elapsed = Date.now() - last;
      if (last && elapsed < RATE_LIMIT_MS) {
        const wait = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
        toast.error(`Please wait ${wait}s before submitting again.`);
        return;
      }
    } catch {
      /* ignore storage errors */
    }

    setSubmitting(true);
    const whatsappUrl = buildWhatsAppUrl();

    try {
      const res = await fetch("/api/trial-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          contactName,
          phone,
          email,
          product,
          productLabel: slugToLabel(product),
          planOrDetails,
        }),
      });
      if (!res.ok) {
        console.warn("trial notification api returned", res.status);
      }
    } catch (err) {
      console.warn("trial notification failed", err);
    }

    try {
      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }

    setSubmitting(false);
    setSubmitted({ url: whatsappUrl, summary });
    toast.success(summary);

    // Auto-open WhatsApp so user can send the pre-filled message.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeTrial()}>
      <DialogContent className="sm:max-w-lg">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading">
                {step === 1 ? "Request a Free Trial" : "Choose your product & plan"}
              </DialogTitle>
              <DialogDescription>
                {step === 1
                  ? "Tell us about your organization — we'll respond within one business day."
                  : "Pick the product you'd like to try. We tailor onboarding to your plan."}
              </DialogDescription>
            </DialogHeader>

            <div className="mb-2 flex items-center gap-2 text-xs">
              <StepDot n={1} label="Your details" active={step >= 1} />
              <div className="h-px flex-1 bg-border" />
              <StepDot n={2} label="Product & plan" active={step >= 2} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization Name *</Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Peak Fitness Kathmandu"
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && <FieldError msg={errors.company} />}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Person *</Label>
                      <Input
                        id="contact"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Aashish Sharma"
                        aria-invalid={!!errors.contactName}
                      />
                      {errors.contactName && <FieldError msg={errors.contactName} />}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98XXXXXXXX"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <FieldError msg={errors.phone} />}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <FieldError msg={errors.email} />}
                  </div>
                  <DialogFooter className="pt-2">
                    <Button
                      type="button"
                      className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                      onClick={handleContinue}
                    >
                      Continue <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Product Category *</Label>
                    <Select value={product} onValueChange={(v) => setProduct(v as ProductSlug)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRODUCTS.map((p) => (
                          <SelectItem key={p.slug} value={p.slug}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {needsFreeText ? (
                    <div className="space-y-2">
                      <Label htmlFor="details">Requirements *</Label>
                      <Textarea
                        id="details"
                        rows={4}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Briefly describe your business scale & required modules (e.g., Student Portal App)"
                        aria-invalid={!!errors.planOrDetails}
                      />
                      {errors.planOrDetails && <FieldError msg={errors.planOrDetails} />}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>Plan / Version *</Label>
                      <Select value={plan} onValueChange={setPlan}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          {planOptions.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.planOrDetails && <FieldError msg={errors.planOrDetails} />}
                    </div>
                  )}

                  <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Submit & Continue on WhatsApp"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </form>
          </>
        ) : (
          <div className="animate-fade-up space-y-5">
            <DialogHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <DialogTitle className="text-center font-heading">Request submitted</DialogTitle>
              <DialogDescription className="text-center">{submitted.summary}</DialogDescription>
            </DialogHeader>
            <div className="rounded-lg border bg-surface p-4 text-xs text-muted-foreground">
              WhatsApp should have opened in a new tab with your details pre-filled. If it didn't,
              tap the button below.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5a]">
                <a href={submitted.url} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  Open WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="w-full" onClick={closeTrial}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="text-xs font-medium text-destructive">{msg}</p>;
}

function StepDot({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
          active ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"
        }`}
      >
        {n}
      </span>
      <span className={active ? "font-medium text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}
