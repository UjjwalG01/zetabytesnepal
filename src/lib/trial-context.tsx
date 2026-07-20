import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProductSlug } from "./site";

type TrialPrefill = {
  productSlug?: ProductSlug;
  planLabel?: string;
};

type TrialCtx = {
  open: boolean;
  prefill: TrialPrefill;
  openTrial: (p?: TrialPrefill) => void;
  closeTrial: () => void;
};

const Ctx = createContext<TrialCtx | null>(null);

export function TrialProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<TrialPrefill>({});

  return (
    <Ctx.Provider
      value={{
        open,
        prefill,
        openTrial: (p) => {
          setPrefill(p ?? {});
          setOpen(true);
        },
        closeTrial: () => setOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTrial() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTrial must be used within TrialProvider");
  return ctx;
}
