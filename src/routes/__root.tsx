import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { SiteHeader } from "@/components/zeta/SiteHeader";
import { SiteFooter } from "@/components/zeta/SiteFooter";
import { TrialProvider } from "@/lib/trial-context";
import { TrialModal } from "@/components/zeta/TrialModal";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      {
        title: "Zetabytes Nepal — Smart Management SaaS for Fitness & Education",
      },
      {
        name: "description",
        content:
          "Zetabytes Nepal builds Zean Fitness and Zean School — modern SaaS management systems for gyms, wellness studios, and schools across Nepal.",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Client-side sync of TanStack Router `head()` output into <head>.
 * Replaces the SSR-only <HeadContent /> shell so per-route titles /
 * meta descriptions still update in this pure SPA build.
 */
function DocumentHeadSync() {
  const matches = useRouterState({ select: (s) => s.matches });

  useEffect(() => {
    let title: string | undefined;
    let description: string | undefined;

    for (const m of matches) {
      const meta = (m as { meta?: Array<Record<string, string | undefined>> }).meta;
      if (!Array.isArray(meta)) continue;
      for (const tag of meta) {
        if (tag.title) title = tag.title;
        if (tag.name === "description" && tag.content) description = tag.content;
      }
    }

    if (title) document.title = title;
    if (description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [matches]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TrialProvider>
        <DocumentHeadSync />
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <TrialModal />
        <Toaster position="top-center" richColors />
      </TrialProvider>
    </QueryClientProvider>
  );
}
