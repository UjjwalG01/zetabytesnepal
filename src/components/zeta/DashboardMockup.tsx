import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CalendarCheck, CreditCard, BarChart3, BookOpen, GraduationCap, ClipboardList, Wallet } from "lucide-react";

type Product = "fitness" | "school";

const fitnessTabs = [
  {
    id: "members",
    label: "Members",
    icon: Users,
    stats: [
      { label: "Active members", value: "1,248" },
      { label: "New this week", value: "37" },
      { label: "Renewals due", value: "18" },
    ],
    rows: [
      ["Sanjay Rai", "Premium", "Active", "12 Aug"],
      ["Priya Thapa", "Basic", "Active", "01 Sep"],
      ["Bikash K.C.", "Premium", "Renew", "22 Aug"],
      ["Anita Gurung", "Basic", "Active", "05 Sep"],
    ],
    columns: ["Member", "Plan", "Status", "Renewal"],
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: CalendarCheck,
    stats: [
      { label: "Check-ins today", value: "312" },
      { label: "Avg. daily", value: "268" },
      { label: "Peak hour", value: "6–7pm" },
    ],
    rows: [
      ["Morning (6–10am)", "94", "On track", "+8%"],
      ["Midday (10–4pm)", "61", "Steady", "+2%"],
      ["Evening (4–9pm)", "157", "Peak", "+14%"],
    ],
    columns: ["Slot", "Check-ins", "Status", "vs last week"],
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: ClipboardList,
    stats: [
      { label: "Sessions today", value: "42" },
      { label: "Trainers on shift", value: "9" },
      { label: "Utilization", value: "78%" },
    ],
    rows: [
      ["Yoga Flow", "Sita M.", "18/20", "7:00 am"],
      ["HIIT", "Rohan S.", "12/15", "6:30 pm"],
      ["Personal Training", "Ravi T.", "1/1", "8:00 pm"],
    ],
    columns: ["Class", "Trainer", "Capacity", "Time"],
  },
  {
    id: "payments",
    label: "Payments",
    icon: Wallet,
    stats: [
      { label: "Revenue (Aug)", value: "Rs. 8.4L" },
      { label: "Pending", value: "Rs. 62K" },
      { label: "Refunds", value: "Rs. 4K" },
    ],
    rows: [
      ["#INV-2041", "Sanjay Rai", "Rs. 2,999", "Paid"],
      ["#INV-2042", "Priya Thapa", "Rs. 1,999", "Paid"],
      ["#INV-2043", "Bikash K.C.", "Rs. 2,999", "Pending"],
    ],
    columns: ["Invoice", "Member", "Amount", "Status"],
  },
] as const;

const schoolTabs = [
  {
    id: "students",
    label: "Students",
    icon: GraduationCap,
    stats: [
      { label: "Enrolled", value: "1,864" },
      { label: "New admissions", value: "126" },
      { label: "Sections", value: "48" },
    ],
    rows: [
      ["Aarav Shrestha", "Grade 8-A", "Active", "Roll 12"],
      ["Nisha Basnet", "Grade 10-B", "Active", "Roll 04"],
      ["Kabir Lama", "Grade 6-C", "Active", "Roll 21"],
    ],
    columns: ["Student", "Class", "Status", "Roll"],
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: CalendarCheck,
    stats: [
      { label: "Present today", value: "1,712" },
      { label: "Absent", value: "94" },
      { label: "Rate", value: "94.8%" },
    ],
    rows: [
      ["Grade 6", "312", "18", "94.5%"],
      ["Grade 8", "298", "12", "96.1%"],
      ["Grade 10", "281", "22", "92.7%"],
    ],
    columns: ["Grade", "Present", "Absent", "Rate"],
  },
  {
    id: "exams",
    label: "Exams",
    icon: BookOpen,
    stats: [
      { label: "Upcoming", value: "6" },
      { label: "Graded", value: "24" },
      { label: "Avg. score", value: "76%" },
    ],
    rows: [
      ["Mid-term Math", "Grade 8", "22 Aug", "Scheduled"],
      ["Unit Test Sci.", "Grade 6", "18 Aug", "Graded"],
      ["Final English", "Grade 10", "05 Sep", "Draft"],
    ],
    columns: ["Exam", "Class", "Date", "Status"],
  },
  {
    id: "fees",
    label: "Fees",
    icon: CreditCard,
    stats: [
      { label: "Collected", value: "Rs. 42L" },
      { label: "Outstanding", value: "Rs. 3.1L" },
      { label: "This month", value: "Rs. 12L" },
    ],
    rows: [
      ["#FEE-8801", "Aarav S.", "Rs. 8,500", "Paid"],
      ["#FEE-8802", "Nisha B.", "Rs. 9,200", "Pending"],
      ["#FEE-8803", "Kabir L.", "Rs. 7,800", "Paid"],
    ],
    columns: ["Invoice", "Student", "Amount", "Status"],
  },
] as const;

export function DashboardMockup({ product }: { product: Product }) {
  const tabs = product === "fitness" ? fitnessTabs : schoolTabs;
  const [active, setActive] = useState<string>(tabs[0].id);

  return (
    <div className="relative rounded-2xl border bg-card p-4 shadow-2xl shadow-primary/10 ring-1 ring-primary/5">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs text-muted-foreground">
            {product === "fitness" ? "Zean Fitness" : "Zean School"} · Dashboard
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Live</span>
        </div>
      </div>

      <Tabs value={active} onValueChange={setActive} className="mt-4">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/60">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <TabsTrigger key={t.id} value={t.id} className="gap-1.5 text-xs">
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((t) => (
          <TabsContent key={t.id} value={t.id} className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {t.stats.map((s) => (
                <div key={s.label} className="rounded-lg border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                  <div className="mt-1 text-base font-semibold">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/60 text-muted-foreground">
                  <tr>
                    {t.columns.map((c) => (
                      <th key={c} className="px-3 py-2 font-medium">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r, i) => (
                    <tr key={i} className="border-t">
                      {r.map((cell, j) => (
                        <td key={j} className="px-3 py-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-brand/10 blur-2xl" />
    </div>
  );
}
