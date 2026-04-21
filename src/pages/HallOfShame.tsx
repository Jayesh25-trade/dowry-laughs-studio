import { useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingCoins } from "@/components/three/HeroScene";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Scale, Phone, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

type Category = "demands" | "harassment" | "myths";

type Item = {
  d: string;
  year: string;
  state: string;
  category: Category;
  law: { section: string; title: string; summary: string };
};

const items: Item[] = [
  { d: "AC for the in-laws' pet dog", year: "2019", state: "Punjab", category: "demands",
    law: { section: "Section 3, Dowry Prohibition Act 1961", title: "Penalty for giving or taking dowry",
      summary: "Imprisonment up to 5 years and a fine not less than ₹15,000 — or the value of the dowry, whichever is more." } },
  { d: "Honeymoon to Switzerland — parents tag along", year: "2021", state: "Gujarat", category: "demands",
    law: { section: "Section 4, Dowry Prohibition Act 1961", title: "Penalty for demanding dowry",
      summary: "Even asking for dowry — directly or indirectly — is punishable with 6 months to 2 years imprisonment and a fine up to ₹10,000." } },
  { d: "Slapped for not bringing enough cash on engagement", year: "2023", state: "Delhi", category: "harassment",
    law: { section: "Section 498A, IPC / 85 BNS", title: "Cruelty by husband or relatives",
      summary: "Up to 3 years imprisonment and fine. Cognizable, non-bailable offence. Covers physical and mental cruelty linked to dowry demands." } },
  { d: "1 Kg gold — by tola, not gram", year: "2018", state: "Tamil Nadu", category: "demands",
    law: { section: "Section 3, Dowry Prohibition Act 1961", title: "Penalty for giving or taking dowry",
      summary: "Both giver and taker are punishable. Family members who arrange the transfer are equally liable." } },
  { d: "Bride starved and locked in a room for a week", year: "2022", state: "UP", category: "harassment",
    law: { section: "Section 304B, IPC / 80 BNS", title: "Dowry death",
      summary: "If a woman dies within 7 years of marriage under unnatural circumstances and was harassed for dowry — minimum 7 years, up to life imprisonment." } },
  { d: "Plot of land registered in groom's mother's name", year: "2020", state: "Bihar", category: "demands",
    law: { section: "Section 6, Dowry Prohibition Act 1961", title: "Dowry held in trust for the bride",
      summary: "Any dowry received must be transferred to the woman within 3 months of marriage. Failure is a criminal offence." } },
  { d: '"It\'s just a gift, not dowry" — said the groom\'s uncle', year: "—", state: "Everywhere", category: "myths",
    law: { section: "Section 2, Dowry Prohibition Act 1961", title: "Definition of dowry",
      summary: "Any property or valuable security given directly or indirectly in connection with marriage IS dowry — regardless of what you call it." } },
  { d: "Wedding hall AC must be exactly 18°C — or pay penalty", year: "2017", state: "Haryana", category: "demands",
    law: { section: "Section 4, Dowry Prohibition Act 1961", title: "Penalty for demanding dowry",
      summary: "Even oblique demands disguised as 'wedding expenses' fall under this section." } },
  { d: '"Educated grooms don\'t take dowry" — false comfort', year: "—", state: "Pan-India", category: "myths",
    law: { section: "NCRB Data 2022", title: "Reality check",
      summary: "Over 6,500 dowry deaths reported in 2022 across all socio-economic and educational backgrounds. Education is not a vaccine against greed." } },
  { d: "Daily taunts about dahej for 3 years post-marriage", year: "2024", state: "Rajasthan", category: "harassment",
    law: { section: "Section 498A, IPC / 85 BNS", title: "Mental cruelty",
      summary: "Sustained taunting and emotional abuse over dowry qualifies as cruelty. File an FIR — no fee required." } },
  { d: "Branded clothes for 40 of groom's relatives", year: "2021", state: "WB", category: "demands",
    law: { section: "Section 3, Dowry Prohibition Act 1961", title: "Penalty for giving or taking dowry",
      summary: "'Customary gifts' to in-laws' family beyond reasonable scale are not exempt — they constitute dowry." } },
  { d: '"Boys also get harassed by 498A — it\'s misused"', year: "—", state: "Online debates", category: "myths",
    law: { section: "Supreme Court guidelines, 2017 & 2022", title: "Safeguards exist",
      summary: "Courts have laid out clear safeguards against false 498A cases. The law remains essential — misuse stats are <2% per NCRB." } },
];

const filters: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "demands", label: "Demands" },
  { id: "harassment", label: "Harassment" },
  { id: "myths", label: "Myths" },
];

const HallOfShame = () => {
  const [shattered, setShattered] = useState<number[]>([]);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [lawItem, setLawItem] = useState<Item | null>(null);

  const visible = useMemo(
    () => items.map((it, i) => ({ it, i })).filter(({ it }) => filter === "all" || it.category === filter),
    [filter]
  );

  return (
    <div className="relative">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <Suspense fallback={null}><FloatingCoins /></Suspense>
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Museum of Greed</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6">
            Hall of <span className="italic text-gold">Shame</span>
          </h1>
          <p className="text-muted-foreground text-lg font-serif italic max-w-2xl mx-auto">
            Real-ish demands so absurd, they belong behind glass. Click to shatter — like the dignity of those who made them.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <motion.button
                key={f.id}
                onClick={() => setFilter(f.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.2em] border transition-smooth ${
                  active
                    ? "gradient-gold text-primary-foreground border-primary shadow-gold"
                    : "bg-card/60 border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {f.label}
              </motion.button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map(({ it: item, i }) => {
              const isShattered = shattered.includes(i);
              if (isShattered) return null;
              return (
                <motion.div
                  layout
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateZ: -2 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 1.6,
                    rotateZ: Math.random() * 40 - 20,
                    filter: "blur(16px)",
                    transition: { duration: 0.55 },
                  }}
                  transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                  whileHover={{ y: -8, rotateZ: 1, transition: { duration: 0.3 } }}
                  className="group relative p-6 bg-card border border-border hover:border-primary/60 rounded-lg shadow-noir overflow-hidden transition-smooth flex flex-col"
                >
                  <div className="absolute inset-0 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />
                  <div className="relative flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-primary">{item.state}</span>
                      <div className="flex gap-2 items-center">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-background/60 px-2 py-0.5 rounded-full border border-border">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{item.year}</span>
                      </div>
                    </div>
                    <p className="font-serif text-2xl leading-snug mb-6 flex-1">"{item.d}"</p>

                    <div className="flex flex-col gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); setLawItem(item); }}
                        className="border-primary/40 text-primary hover:bg-primary/10 justify-start"
                      >
                        <Scale className="w-3.5 h-3.5" /> Learn the law
                      </Button>
                      <button
                        onClick={() => setShattered((s) => [...s, i])}
                        className="text-[10px] uppercase tracking-wider text-destructive hover:text-destructive/80 flex justify-between items-center pt-2 border-t border-border"
                      >
                        <span>💀 Click card to shatter</span>
                        <span>{item.law.section.split(",")[0]}</span>
                      </button>
                    </div>
                  </div>

                  {/* Click anywhere on card to shatter */}
                  <button
                    aria-label="Shatter"
                    onClick={() => setShattered((s) => [...s, i])}
                    className="absolute inset-0 z-0"
                    tabIndex={-1}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {visible.length > 0 && shattered.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShattered([])}
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-smooth"
            >
              ↻ Reassemble the broken
            </button>
          </div>
        )}

        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-16 text-center p-12 border border-primary/40 rounded-lg gradient-noir shadow-gold"
          >
            <h3 className="font-serif text-4xl text-gold mb-4">You shattered them all.</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              In real life, it isn't this easy. Every demand here is a person, a family, a daughter under pressure.
              Speak up. Report. Refuse. Call <span className="text-gold font-bold">181</span>.
            </p>
            <Button asChild className="mt-6 gradient-gold text-primary-foreground shadow-gold">
              <Link to="/helpline"><Phone className="w-4 h-4" /> Visit Helpline</Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Law Modal */}
      <Dialog open={!!lawItem} onOpenChange={(o) => !o && setLawItem(null)}>
        <DialogContent className="max-w-lg border-primary/40 bg-card">
          {lawItem && (
            <>
              <DialogHeader>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3" /> The Law
                </p>
                <DialogTitle className="font-serif text-2xl text-gold">{lawItem.law.section}</DialogTitle>
                <DialogDescription className="font-serif italic text-base text-foreground/80 pt-1">
                  {lawItem.law.title}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="p-4 border border-border rounded bg-background/40 italic font-serif text-sm text-muted-foreground">
                  "{lawItem.d}"
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{lawItem.law.summary}</p>
                <div className="flex gap-3 pt-2">
                  <Button asChild className="flex-1 gradient-gold text-primary-foreground">
                    <Link to="/helpline" onClick={() => setLawItem(null)}>
                      <Phone className="w-4 h-4" /> Get Help
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1 border-primary/40" onClick={() => setLawItem(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HallOfShame;
