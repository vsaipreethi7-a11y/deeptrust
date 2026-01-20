import { Card } from "@/components/ui/card";
import { ArrowRight, Facebook, Linkedin, Twitter } from "lucide-react";
import type { TeamMember } from "./TeamData";

type Props = {
  member: TeamMember;
  onOpen: (member: TeamMember) => void;
};

const gold = "#C7A24A";

export default function TeamCard({ member, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      className="snap-center shrink-0 w-[380px] md:w-[520px] text-left"
    >
      <Card
        className="relative group rounded-2xl overflow-hidden border bg-gradient-to-br from-background via-background to-muted/30"
        style={{ borderColor: gold }}
      >
        {/* Accent ribbon */}
        <div
          className="absolute left-0 top-0 h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${gold}, rgba(199,162,74,0))` }}
        />

        <div className="flex items-stretch min-h-[240px]">
          {/* Left - text */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-2xl font-semibold tracking-tight">{member.name}</div>
              <div className="mt-1 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "rgba(199,162,74,0.12)", color: gold, border: `1px solid ${gold}` }}
              >
                {member.role}
              </div>
              <div className="mt-3 h-0.5 w-16 rounded-full" style={{ backgroundColor: gold }} />
              <div className="mt-3 text-sm text-foreground/80 leading-relaxed">
                {member.short}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <a aria-label="LinkedIn" href={member.socials[0]?.href || "#"} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 hover:bg-muted/40">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a aria-label="Twitter" href={member.socials[1]?.href || "#"} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 hover:bg-muted/40">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a aria-label="Facebook" href={member.socials[2]?.href || "#"} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 hover:bg-muted/40">
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right - image */}
          <div className="relative shrink-0 w-[176px] md:w-[224px] p-4 md:p-6 flex items-center justify-center">
            <div className="relative h-[176px] w-[176px] md:h-[224px] md:w-[224px] overflow-hidden border rounded-lg" style={{ borderColor: gold }}>
              {/* Decorative frame */}
              <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px rgba(199,162,74,0.25)` }} />
              <img src={member.image} alt={member.name} className="h-full w-full object-cover object-center scale-100 group-hover:scale-[1.03] transition-transform duration-500" />
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${gold} 0%, transparent 60%)` }} />
            </div>

            <div
              className="absolute -bottom-4 -right-4 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              style={{ border: `1px solid ${gold}` }}
            >
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Hover shadow glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: `0 20px 60px rgba(199,162,74,0.35)` }}
        />
      </Card>
    </button>
  );
}


