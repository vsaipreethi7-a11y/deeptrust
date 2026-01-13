import { useEffect, useRef, useState } from "react";
import { teamMembers, type TeamMember } from "./TeamData";
import { Facebook, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function TeamSection() {
  const [active, setActive] = useState<TeamMember | undefined>(undefined);

  // Accent aligned to UI (blue)
  const accent = "#2563eb"; // Tailwind blue-600

  const selected = active ?? teamMembers[0];
  const bigListRef = useRef<HTMLDivElement>(null);
  const bigItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep big gallery in sync: center the selected slide
  useEffect(() => {
    if (!selected || !bigListRef.current) return;
    const idx = teamMembers.findIndex((m) => m.id === selected.id);
    const el = bigItemRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selected]);

  // One-time keyframes injection for subtle reveals
  useEffect(() => {
    const id = "team-animations";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
      .animate-fade-up { animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both; }
      @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 rgba(37,99,235,0) } 50% { box-shadow:0 10px 30px rgba(37,99,235,.25) } }
      .glow-pulse { animation: glowPulse 2.5s ease-in-out infinite; }
    `;
    document.head.appendChild(style);
    return () => { const n = document.getElementById(id); if (n) n.remove(); };
  }, []);

  const handleNext = () => {
    const current = teamMembers.findIndex((m) => m.id === selected.id);
    const nextIndex = (current + 1) % teamMembers.length;
    const nextEl = bigItemRefs.current[nextIndex];
    if (nextEl && bigListRef.current) {
      nextEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section id="about-us" className="py-32 relative">
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(0,0,0,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.6)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-[0.08]" />
      <div className="container mx-auto px-4 2xl:px-6 max-w-7xl xl:max-w-[1400px]">
        <div className="relative mb-12">
          <div className="absolute left-1/2 md:left-0 top-0 -translate-x-1/2 md:translate-x-0 h-1 w-32 rounded-full bg-gradient-to-r from-transparent to-transparent"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
          />

          <div className="pt-6 text-center">
            <div className="text-lg md:text-2xl xl:text-3xl uppercase tracking-widest text-primary mb-4 font-extrabold">About Us</div>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold mb-4 text-white">Our Team</h2>
          </div>
        </div>

        <p className="max-w-4xl xl:max-w-5xl mx-auto text-center text-lg md:text-xl xl:text-2xl text-foreground/80 mb-16 leading-relaxed">
          Our leadership team comprises Chartered Accountants, Lawyers, and Industry Specialists with decades of combined experience in transaction advisory, restructuring, corporate law, and regulatory affairs. Their vision is backed by a strong execution team trained in AI-enabled diligence and compliance.
        </p>

        {/* Master-detail layout */}
        <div className="relative grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start mb-12">
          {/* LEFT HALF - dynamic details */}
          <div className="relative overflow-hidden rounded-[32px] border border-blue-500/40 bg-gradient-to-br from-[#0b1224] via-[#081125] to-[#050b1b] p-8 md:p-10 shadow-[0_25px_55px_rgba(4,12,35,0.55)] animate-fade-up min-h-[380px] md:min-h-[420px] flex flex-col justify-between">
            <div className="absolute inset-0 rounded-[32px] border border-blue-500/10 pointer-events-none" />
            <div className="relative flex-1 flex flex-col">
              <div>
                <div className="text-4xl md:text-[40px] font-semibold tracking-tight mb-4 text-slate-100">{selected.name}</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6 text-blue-300 bg-blue-500/15 border border-blue-500/40">
                  {selected.role}
                </div>
              </div>
              <p className="text-base md:text-lg text-slate-200/90 leading-relaxed mb-8 flex-1">
                {selected.short}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-5">
                <a aria-label="LinkedIn" href={selected.socials[0]?.href || "#"} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 text-slate-100 hover:bg-blue-500/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a aria-label="Twitter" href={selected.socials[1]?.href || "#"} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 text-slate-100 hover:bg-blue-500/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a aria-label="Facebook" href={selected.socials[2]?.href || "#"} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 text-slate-100 hover:bg-blue-500/10 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/50 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 transition-colors"
                aria-label="Next team member"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* RIGHT HALF - horizontal image list */}
          <div className="relative">
            {/* Horizontal big-image gallery; scrolling changes selection */}
            <div
              ref={bigListRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar flex-nowrap"
              onScroll={() => {
                const container = bigListRef.current;
                if (!container) return;
                // rAF to avoid thrash
                requestAnimationFrame(() => {
                  const center = container.scrollLeft + container.clientWidth / 2;
                  let closest = 0;
                  let min = Number.POSITIVE_INFINITY;
                  bigItemRefs.current.forEach((node, index) => {
                    if (!node) return;
                    const rectLeft = node.offsetLeft;
                    const rectCenter = rectLeft + node.offsetWidth / 2;
                    const d = Math.abs(rectCenter - center);
                    if (d < min) { min = d; closest = index; }
                  });
                  setActive(teamMembers[closest]);
                });
              }}
            >
              {teamMembers.map((m, i) => (
                <div
                  key={m.id}
                  ref={(el) => { bigItemRefs.current[i] = el; }}
                  className="snap-center shrink-0 w-[70vw] md:w-[380px] lg:w-[420px]"
                >
                  <div className="p-1 rounded-[28px] bg-blue-500/5 backdrop-blur-sm">
                    <div
                      onClick={() => setActive(m)}
                      className={`relative w-full overflow-hidden rounded-3xl border transition-all duration-500 group cursor-pointer ${
                        selected?.id === m.id
                          ? "border-blue-500 shadow-[0_18px_45px_rgba(37,99,235,0.3)]"
                          : "border-blue-500/30 shadow-[0_18px_35px_rgba(15,23,42,0.25)]"
                      }`}
                      style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(14,21,45,0.55))" }}
                    >
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-[280px] sm:h-[340px] md:h-[400px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


