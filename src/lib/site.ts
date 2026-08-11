export const SITE = {
  name: "Zetabytes Nepal",
  tagline: "Smart Management Solutions for Fitness & Education",
  phone: "9716801616",
  phoneDisplay: "+977 971-6801616",
  whatsapp: "9716801616",
  email: "info@zeansoftware.com",
  address: "Chabahil-07, Kathmandu, Nepal",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61591654724497",
    instagram: "https://www.instagram.com/zetabytenepal/",
    linkedin: "#",
    youtube: "https://www.youtube.com/",
    twitter: "https://www.x.com/",
  },
} as const;

export const PRODUCTS = [
  { slug: "zean-fitness", name: "Zean Fitness", tag: "Gym & Fitness Management" },
  { slug: "zean-school", name: "Zean School", tag: "School Management System" },
  { slug: "student-portal", name: "Student Portal App", tag: "Custom Institution Portals" },
  { slug: "zean-member-app", name: "Zean Member App", tag: "Member-Facing Mobile App" },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];

export const SITE_URL = "https://zeansoftware.com"
