export const SITE = {
  name: "Zetabytes Nepal",
  tagline: "Smart Management Solutions for Fitness & Education",
  phone: "9863612557",
  phoneDisplay: "+977 9863612557",
  whatsapp: "9779863612557",
  email: "info@zeansoftware.com",
  address: "Kathmandu, Nepal",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    twitter: "#",
  },
} as const;

export const PRODUCTS = [
  { slug: "zean-fitness", name: "Zean Fitness", tag: "Gym & Fitness Management" },
  { slug: "zean-school", name: "Zean School", tag: "School Management System" },
  { slug: "student-portal", name: "Student Portal App", tag: "Custom Institution Portals" },
  { slug: "zean-member-app", name: "Zean Member App", tag: "Member-Facing Mobile App" },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];
