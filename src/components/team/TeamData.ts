import Sanat from "@/assets/sanat.png";
import Kenneth from "@/assets/ken .png";
import Balaji from "@/assets/Balaji.png";
import Priyal from "@/assets/priya.png";
import Pranay from "@/assets/pranay.png";
import Sivaramakrishnan from "@/assets/sivram.png";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  short: string;
  bio: string;
  image: string;
  socials: { label: string; href: string }[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "sanat",
    name: "Sanat Bhat",
    role: "Founder & Partner",
    short:
      "Gold medalist Chartered Accountant, CFA, FRM with expertise in M&A, Investment Banking, Transaction Advisory, Corporate Structuring, Fundraising, and Debt Syndication. Specialist in Financial, Legal & Operational Due Diligence across Real Estate, Manufacturing, Financial Services, and IT sectors.",
    bio:
      "Gold medalist CA, CFA, FRM with three decades across M&A, fund-raising, transaction advisory, and multi-jurisdiction structuring.",
    image: Sanat,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    id: "kenneth",
    name: "Kenneth D’souza",
    role: "Director - Sales",
    short:
      "30+ years in financial solutions with expertise in business development for treasury, risk, and enterprise banking, holding leadership roles at Intellect Design and KrisFinSoftware.",
    bio:
      "Expert in treasury, risk, and enterprise banking; led global business development at Intellect Design and KrisFin Software.",
    image: Kenneth,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    id: "balaji",
    name: "Balaji Venkatraman",
    role: "Partner - Platform Strategy",
    short:
      "Business leader with 30+ years’ experience, two successful exits, and $100M+ global P&L expertise in scaling revenues and AI/ML SaaS, managed services, and large-scale system integration.",
    bio:
      "Focus on automation, digital lending, and embedded compliance; delivers GTM playbooks that scale across APAC and the Middle East.",
    image: Balaji,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    id: "priyal",
    name: "Priyal Agarwal",
    role: "Chief Growth Officer",
    short:
      "Associate Chartered Accountant with 5+ years’ experience at EY and Deloitte. Specializes in Direct Taxes, Transfer Pricing, and Corporate Compliance, with strong expertise in regulatory representation and efficiency.",
    bio:
      "Drives co-innovation with banks and fintechs, orchestrates partnerships, and embeds AI-led revenue acceleration programs.",
    image: Priyal,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    id: "pranay",
    name: "Pranay D. Vaidya",
    role: "Partner - Regulatory Intelligence",
    short:
      "Former Big-4 risk leader translating complex regulatory landscapes into actionable playbooks for BFSI, export houses, and SEZ/FTZ ecosystems.",
    bio:
      "Translates complex regulatory landscapes into actionable playbooks for BFSI, export houses, and SEZ/FTZ ecosystems.",
    image: Pranay,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
  {
    id: "siva",
    name: "Sivaramakrishnan",
    role: "Head - Customer Success",
    short:
      "National Law University graduate with experience at Lakshmikumaran & Sridharan and Senior Advocate chambers. Expert in fintech compliance, technology law, digital lending, and cross-border investment structuring.",
    bio:
      "Architects onboarding, adoption, and value-realisation journeys for enterprise and government clients.",
    image: Sivaramakrishnan,
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
];


