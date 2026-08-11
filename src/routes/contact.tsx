import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE, SITE_URL } from "@/lib/site";
import { SocialIcons } from "@/components/zeta/SocialIcons";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Zetabytes Nepal" },
      {
        name: "description",
        content: `Get in touch with Zetabytes Nepal. Call ${SITE.phoneDisplay} or email ${SITE.email}.`,
      },
      { property: "og:title", content: "Contact Zetabytes Nepal" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
});

function ContactPage() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const msg =
      `*New Inquiry from Zetabytes Site*%0A` +
      `• *Name:* ${encodeURIComponent(name)}%0A` +
      `• *Organization:* ${encodeURIComponent(org)}%0A` +
      `• *Phone:* ${encodeURIComponent(phone)}%0A` +
      (email ? `• *Email:* ${encodeURIComponent(email)}%0A` : "") +
      `• *Message:* ${encodeURIComponent(message)}`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${msg}`;

    setTimeout(() => {
      setSending(false);
      toast.success(`Thanks ${name || "there"}! Redirecting to WhatsApp…`);
      window.open(url, "_blank", "noopener,noreferrer");
    }, 500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</div>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">Let's talk</h1>
        <p className="mt-4 text-muted-foreground">
          Have a question about Zean, or want a demo tailored to your organization? We usually
          respond within one business day.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Call us"
            body={SITE.phoneDisplay}
            href={`tel:${SITE.phone}`}
          />
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            body={SITE.email}
            href={`mailto:${SITE.email}`}
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp"
            body="Chat with sales instantly"
            href={`https://wa.me/${SITE.whatsapp}`}
          />
          <ContactCard icon={<MapPin className="h-5 w-5" />} title="Office" body={SITE.address} />
          <div className="rounded-2xl border bg-card p-5">
            <div className="font-heading text-sm font-semibold">Follow us</div>
            <div className="mt-3">
              <SocialIcons />
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border bg-card p-6 sm:p-8 animate-fade-up">
          <h2 className="font-heading text-xl font-bold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the form and we'll continue on WhatsApp for faster replies.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name *</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Organization *</Label>
              <Input id="org" required value={org} onChange={(e) => setOrg(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977 98..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="msg">Message *</Label>
            <Textarea
              id="msg"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your gym, school or what you're looking to solve..."
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="mt-6 w-full bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {sending ? "Preparing WhatsApp..." : "Send via WhatsApp"}
          </Button>
        </form>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  body,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {icon}
      </div>
      <div>
        <div className="font-heading text-sm font-semibold">{title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">{body}</div>
      </div>
    </div>
  );
  const cls =
    "block rounded-2xl border bg-card p-5 transition hover:border-brand/40 hover:shadow-md";
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
