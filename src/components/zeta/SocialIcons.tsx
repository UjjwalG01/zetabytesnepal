import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { SITE } from "@/lib/site";

const items = [
  { href: SITE.social.facebook, Icon: Facebook, label: "Facebook" },
  { href: SITE.social.instagram, Icon: Instagram, label: "Instagram" },
  { href: SITE.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: SITE.social.youtube, Icon: Youtube, label: "YouTube" },
  { href: SITE.social.twitter, Icon: Twitter, label: "Twitter" },
];

export function SocialIcons({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-2">
      {items.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className={`${box} inline-flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition hover:border-brand hover:bg-brand hover:text-brand-foreground`}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}
