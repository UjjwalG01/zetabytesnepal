import { useEffect, useMemo, useState } from "react";
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
import { SITE, PRODUCTS, type ProductSlug } from "@/lib/site";
import { useTrial } from "@/lib/trial-context";

const PLAN_OPTIONS: Record<ProductSlug, string[]> = {
  "zean-fitness": ["Basic (up to 500 members)", "Premium (unlimited, biometric access)"],
  "zean-school": [
    "Basic (up to 300 students)",
    "Standard (up to 1,000 students)",
    "Premium (unlimited, multi-branch)",
  ],
  "student-portal": [], // free-form textarea
  "zean-member-app": ["Standard member app", "Digital Pass"],
};

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
  const [submitted, setSubmitted] = useState<null | { url: string; summary: string }>(null);

  const planOptions = PLAN_OPTIONS[product];
  const needsFreeText = product === "student-portal";

  useEffect(() => {
    if (open) {
      setStep(1);
      setSubmitted(null);
      setProduct(prefill.productSlug ?? "zean-fitness");
      setPlan(prefill.planLabel ?? "");
      setDetails("");
    }
  }, [open, prefill.productSlug, prefill.planLabel]);

  useEffect(() => {
    // Reset plan when product changes
    setPlan("");
    setDetails("");
  }, [product]);

  const planOrDetails = needsFreeText ? details : plan;

  const canContinueStep1 =
    !!company.trim() && !!contactName.trim() && !!phone.trim();
  const canSubmit =
    canContinueStep1 && (needsFreeText ? !!details.trim() : !!plan);

  const summary = useMemo(
    () =>
      `Trial request submitted for ${slugToLabel(product)} (${planOrDetails || "—"}) under ${company || "—"}!`,
    [product, planOrDetails, company],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const msg =
      `*New Trial Request from Zetabytes Site*%0A` +
      `• *Organization:* ${encodeURIComponent(company)}%0A` +
      `• *Product:* ${encodeURIComponent(slugToLabel(product))}%0A` +
      `• *Plan/Requirement:* ${encodeURIComponent(planOrDetails)}%0A` +
      `• *Contact Person:* ${encodeURIComponent(contactName)}%0A` +
      `• *Phone:* ${encodeURIComponent(phone)}` +
      (email ? `%0A• *Email:* ${encodeURIComponent(email)}` : "");

    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${msg}`;

    setSubmitted({ url: whatsappUrl, summary });
    toast.success(summary);
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

            {/* Stepper */}
            <div className="mb-2 flex items-center gap-2 text-xs">
              <StepDot n={1} label="Your details" active={step >= 1} />
              <div className="h-px flex-1 bg-border" />
              <StepDot n={2} label="Product & plan" active={step >= 2} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization Name *</Label>
                    <Input
                      id="company"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Peak Fitness Kathmandu"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Person *</Label>
                      <Input
                        id="contact"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Aashish Sharma"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98..."
                      />
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
                    />
                  </div>
                  <DialogFooter className="pt-2">
                    <Button
                      type="button"
                      className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                      disabled={!canContinueStep1}
                      onClick={() => setStep(2)}
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
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Briefly describe your business scale & required modules (e.g., Student Portal App)"
                      />
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
                      disabled={!canSubmit}
                    >
                      Submit Request
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
              <DialogDescription className="text-center">
                {submitted.summary}
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-lg border bg-surface p-4 text-xs text-muted-foreground">
              Send the same details directly to our sales team on WhatsApp for the fastest reply.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                asChild
                className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5a]"
              >
                <a href={submitted.url} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  Continue to WhatsApp
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
