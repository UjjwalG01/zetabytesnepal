import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  company: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  product: z.string().trim().min(1).max(80),
  productLabel: z.string().trim().min(1).max(120),
  planOrDetails: z.string().trim().min(1).max(2000),
});

const SALES_EMAIL = "sales@zeansoftware.com";

async function sendSalesEmail(data: z.infer<typeof payloadSchema>) {
  const apiKey = process.env.LOVABLE_API_KEY;
  const subject = `New Trial Request — ${data.productLabel} (${data.company})`;
  const text =
    `New trial request from the Zetabytes Nepal website\n\n` +
    `Organization: ${data.company}\n` +
    `Product: ${data.productLabel}\n` +
    `Plan / Requirement: ${data.planOrDetails}\n` +
    `Contact person: ${data.contactName}\n` +
    `Phone: ${data.phone}\n` +
    `Email: ${data.email || "—"}\n`;

  // Log server-side for audit / fallback visibility
  console.log(`[trial-notification] -> ${SALES_EMAIL}\n${subject}\n${text}`);

  if (!apiKey) {
    return { delivered: false, reason: "email_not_configured" as const };
  }

  try {
    const res = await fetch("https://api.lovable.dev/v1/emails/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: SALES_EMAIL,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(`[trial-notification] email api ${res.status}: ${body}`);
      return { delivered: false, reason: "email_api_error" as const };
    }
    return { delivered: true };
  } catch (err) {
    console.error("[trial-notification] email send failed", err);
    return { delivered: false, reason: "email_exception" as const };
  }
}

export const Route = createFileRoute("/api/trial-notification")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }
        const parsed = payloadSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const result = await sendSalesEmail(parsed.data);
        return Response.json({ ok: true, ...result });
      },
    },
  },
});
