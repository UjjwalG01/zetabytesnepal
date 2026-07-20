import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { SITE, PRODUCTS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {SITE.tagline}. Built in Kathmandu for institutions across Nepal.
          </p>
          <div className="mt-5">
            <SocialIcons />
          </div>
        </div>

        <div>
          <div className="font-heading text-sm font-semibold">Products</div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-brand">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-heading text-sm font-semibold">Company</div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/about-us" className="hover:text-brand">About Us</Link></li>
            <li><Link to="/pricing" className="hover:text-brand">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link to="/products" className="hover:text-brand">All Products</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-heading text-sm font-semibold">Get in touch</div>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-brand" />
              <a href={`tel:${SITE.phone}`} className="hover:text-brand">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-brand" />
              <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name} Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
}
