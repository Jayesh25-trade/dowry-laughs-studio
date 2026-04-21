import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingCoins } from "@/components/three/HeroScene";

const demands = [
  { d: "AC for the in-laws' pet dog", year: "2019", state: "Punjab" },
  { d: "Honeymoon to Switzerland — parents tag along", year: "2021", state: "Gujarat" },
  { d: "iPhone 15 Pro Max for groom's younger brother", year: "2023", state: "Delhi" },
  { d: "1 Kg gold — by tola, not gram", year: "2018", state: "Tamil Nadu" },
  { d: "Brand new Royal Enfield for father-in-law's morning ride", year: "2022", state: "UP" },
  { d: "Plot of land registered in groom's mother's name", year: "2020", state: "Bihar" },
  { d: "₹5 Lakh cash — 'gift' on engagement night", year: "2024", state: "Rajasthan" },
  { d: "Wedding hall AC must be exactly 18°C — or pay penalty", year: "2017", state: "Haryana" },
  { d: "Bullet motorcycle for groom's three cousins", year: "2019", state: "MP" },
  { d: "Furniture set for groom's grandparents' village home", year: "2022", state: "Odisha" },
  { d: "Foreign trip every year for 5 years post-marriage", year: "2023", state: "Maharashtra" },
  { d: "Branded clothes for 40 of groom's relatives", year: "2021", state: "WB" },
];

const HallOfShame = () => {
  const [shattered, setShattered] = useState<number[]>([]);

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
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Museum of Greed</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-6">
            Hall of <span className="italic text-gold">Shame</span>
          </h1>
          <p className="text-muted-foreground text-lg font-serif italic max-w-2xl mx-auto">
            Real-ish demands so absurd, they belong behind glass. Hover. Click. Watch them shatter — like the dignity of those who made them.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demands.map((item, i) => {
            const isShattered = shattered.includes(i);
            return (
              <AnimatePresence key={i} mode="wait">
                {!isShattered && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30, rotateZ: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.08, duration: 0.6 }}
                    exit={{
                      opacity: 0,
                      scale: 1.4,
                      rotateZ: Math.random() * 30 - 15,
                      filter: "blur(12px)",
                      transition: { duration: 0.5 },
                    }}
                    whileHover={{ y: -8, rotateZ: 1, transition: { duration: 0.3 } }}
                    onClick={() => setShattered((s) => [...s, i])}
                    className="group relative cursor-pointer p-6 bg-card border border-border hover:border-primary/60 rounded-lg shadow-noir overflow-hidden transition-smooth"
                  >
                    <div className="absolute inset-0 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-smooth" />
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-primary">{item.state}</span>
                        <span className="text-[10px] text-muted-foreground">{item.year}</span>
                      </div>
                      <p className="font-serif text-2xl leading-snug mb-6">"{item.d}"</p>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider">
                        <span className="text-muted-foreground">Click to shatter</span>
                        <span className="text-destructive">💀 Section 498A</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {shattered.length === demands.length && (
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HallOfShame;
