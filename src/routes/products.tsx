import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { Dumbbell, GraduationCap, Users, Building2, ArrowRight } from "lucide-react";
import { PRODUCTS, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/products")({
  component: ProductsLayout,
  head: () => ({
    meta: [
      { title: "Products — Zean Software Suite | Zetabytes Nepal" },
      {
        name: "description",
        content:
          "Explore the Zean Software Suite: Zean Fitness, Zean School, Student Portal and Member App from Zetabytes Nepal.",
      },
      { property: "og:title", content: "Zean Software Suite — Zetabytes Nepal" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/products` }],
  }),
});

const ICONS = {
  "zean-fitness": Dumbbell,
  "zean-school": GraduationCap,
  "student-portal": Users,
  "zean-member-app": Building2,
} as const;

function ProductsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = pathname === "/products" || pathname === "/products/";

  if (!isIndex) return <Outlet />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Zean Software Suite
        </div>
        <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">
          Products built for real Nepali institutions
        </h1>
        <p className="mt-4 text-muted-foreground">
          Four focused products that share one clean, unified experience. Pick the one that fits —
          or run several together under one Zetabytes account.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {PRODUCTS.map((p) => {
          const Icon = ICONS[p.slug];
          return (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-2xl border bg-card p-8 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-xl animate-fade-up"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 font-heading text-xl font-semibold">{p.name}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {p.tag}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{productBlurb(p.slug)}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                View product{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function productBlurb(slug: string) {
  switch (slug) {
    case "zean-fitness":
      return "Members, bookings, biometric attendance, PT sessions, POS and forecasting — everything to run a modern fitness business.";
    case "zean-school":
      return "One system for admissions, attendance, exams, fees, transport and parent communication — modules tailored to your school.";
    case "student-portal":
      return "A branded portal and mobile experience for your institution — configured to your modules, scale and workflows.";
    case "zean-member-app":
      return "A member-first mobile app with digital passes, class bookings, dues and progress — matched to your Zean Fitness setup.";
    default:
      return "";
  }
}
