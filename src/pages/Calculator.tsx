import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [degree, setDegree] = useState([3]);
  const [salary, setSalary] = useState([10]);
  const [foreign, setForeign] = useState([0]);
  const [govtJob, setGovtJob] = useState([0]);
  const [family, setFamily] = useState([5]);
  const [revealed, setRevealed] = useState(false);

  const fakePrice = useMemo(() => {
    const base = degree[0] * 4 + salary[0] * 2 + foreign[0] * 8 + govtJob[0] * 6 + family[0] * 3;
    return (base * 100000).toLocaleString("en-IN");
  }, [degree, salary, foreign, govtJob, family]);

  const sliders = [
    { label: "Degree level", value: degree, set: setDegree, max: 10, hint: "0 = none · 10 = PhD MIT" },
    { label: "Annual salary (LPA)", value: salary, set: setSalary, max: 50, hint: "in Lakhs" },
    { label: "Foreign-return bonus", value: foreign, set: setForeign, max: 10, hint: "0 = local · 10 = green card" },
    { label: "Govt job multiplier", value: govtJob, set: setGovtJob, max: 10, hint: "IAS = 10" },
    { label: "Family 'reputation'", value: family, set: setFamily, max: 10, hint: "how loud the uncles" },
  ];

  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Patent Pending · 1947</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">
          The <span className="italic text-gold">Dowry</span> Calculator
        </h1>
        <p className="text-muted-foreground text-lg font-serif italic">
          Drag the sliders. Pretend to laugh. Read the result twice.
        </p>
      </motion.div>

      <Card className="p-8 md:p-12 shadow-noir border-border">
        <div className="space-y-10">
          {sliders.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-sm uppercase tracking-wider text-foreground">{s.label}</label>
                <span className="text-2xl font-serif text-gold">{s.value[0]}</span>
              </div>
              <Slider value={s.value} onValueChange={s.set} max={s.max} step={1} />
              <p className="text-xs text-muted-foreground mt-2 italic">{s.hint}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-border text-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div key="prompt" exit={{ opacity: 0, scale: 0.9 }}>
                <p className="text-muted-foreground mb-6">Estimated market value of your son:</p>
                <p className="text-5xl md:text-7xl font-serif text-gold mb-8">₹ {fakePrice}</p>
                <Button
                  size="lg"
                  onClick={() => setRevealed(true)}
                  className="gradient-gold text-primary-foreground shadow-gold"
                >
                  Confirm and Proceed
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.6, 0.05, 0.1, 0.95] }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-destructive mb-6 animate-glitch">
                  Calculation error
                </p>
                <p className="text-7xl md:text-9xl font-serif text-gold mb-8">₹ 0</p>
                <p className="text-xl md:text-2xl font-serif italic max-w-xl mx-auto mb-8">
                  Humans aren't for sale.<br/>The real value of any person is — priceless and not transferable.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Demanding dowry is punishable by up to 5 years in prison and fine of ₹15,000 or value of dowry, whichever is more (Dowry Prohibition Act, 1961).
                </p>
                <Button variant="outline" onClick={() => setRevealed(false)} className="border-primary/40 text-primary">
                  Try again (it'll still be ₹0)
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default Calculator;
