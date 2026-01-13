import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "./TeamData";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  member?: TeamMember;
};

const gold = "#C7A24A";

export default function TeamModal({ open, onOpenChange, member }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl">
        {member && (
          <div className="grid md:grid-cols-2">
            {/* Left - text */}
            <div className="p-8 md:p-10">
              <div className="text-3xl font-bold mb-2">{member.name}</div>
              <div className="text-sm text-primary mb-6">{member.role}</div>
              <p className="text-foreground/80 leading-relaxed mb-8">{member.bio}</p>

              <div className="flex items-center gap-3">
                {member.socials.map((s) => (
                  <a key={s.label} href={s.href} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 hover:bg-muted/40">
                    <span className="text-xs font-medium">{s.label[0]}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <Button onClick={() => onOpenChange(false)} variant="outline" style={{ borderColor: gold }}>
                  Back
                </Button>
              </div>
            </div>

            {/* Right - big image */}
            <div className="p-8 md:p-10">
              <div className="h-full w-full rounded-2xl overflow-hidden border" style={{ borderColor: gold }}>
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}


