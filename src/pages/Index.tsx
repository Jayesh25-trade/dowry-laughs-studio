import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { HeroScene } from "@/components/three/HeroScene";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const absurdDemands = [
  "★ 1 Activa for the dog",
  "★ Gold chain by tola, not gram",
  "★ AC for the in-laws' guest room",
  "★ Honeymoon to Switzerland (parents included)",
  "★ Refrigerator (double door, please)",
  "★ Foreign-return bonus: ₹10 Lakh",
  "★ iPhone Pro Max (latest only)",
  "★ Plot of land in groom's name",
  "★ Wedding hall AC must be 18°C",
  "★ Mehendi sponsored by bride's side",
];

const Index = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={ref} className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<div className="absolute inset-0 gradient-noir" />}>
            <HeroScene />
          </Suspense>
        </div>
        <motion.div style={{ y, opacity }} className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs uppercase tracking-[0.5em] text-primary mb-6"
            >
              India's #1 Imaginary Marketplace
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="font-serif text-7xl md:text-9xl leading-[0.95] mb-6"
            >
              The <span className="italic text-gold">Dowry</span><br/>Bazaar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 italic font-serif"
            >
              "Where love is priceless — but the groom comes with an MRP."
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4 justify-center pointer-events-auto"
            >
              <Button asChild size="lg" className="gradient-gold text-primary-foreground hover:opacity-90 shadow-gold">
                <Link to="/marketplace">Browse Grooms <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                <Link to="/calculator"><Sparkles className="mr-2 w-4 h-4" />Get a Quote</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-muted-foreground animate-float">
          ↓ scroll if you dare
        </div>
      </section>

      {/* MARQUEE OF ABSURDITY */}
      <section className="border-y border-border py-6 overflow-hidden bg-card/40">
        <div className="flex marquee whitespace-nowrap">
          {[...absurdDemands, ...absurdDemands].map((d, i) => (
            <span key={i} className="text-2xl font-serif italic text-primary/80 mx-8 shrink-0">{d}</span>
          ))}
        </div>
      </section>

      {/* PARALLAX STORY */}
      <section className="container mx-auto py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Chapter One</p>
          <h2 className="font-serif text-5xl md:text-7xl mb-8">
            A wedding so grand,<br/><span className="italic text-gold">the bride forgot to attend.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-serif italic">
            Welcome to the only bazaar where men come gift-wrapped, fathers do the haggling,
            and the bride is the cherry on a cake she had to bake herself.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "The Marketplace", desc: "Premium grooms at premium prices. Engineers ₹50L, IAS officers POA.", to: "/marketplace", emoji: "🛒" },
            { title: "The Calculator", desc: "Instantly compute your son's market value. Side effect: shame.", to: "/calculator", emoji: "🧮" },
            { title: "Hall of Shame", desc: "Real demands so absurd they belong in a museum. Touch to shatter.", to: "/hall-of-shame", emoji: "💀" },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-smooth shadow-noir overflow-hidden"
            >
              <div className="absolute inset-0 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="relative">
                <div className="text-5xl mb-6">{c.emoji}</div>
                <h3 className="text-3xl font-serif mb-3">{c.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{c.desc}</p>
                <Link to={c.to} className="text-primary text-sm uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-4 transition-all">
                  Enter <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERIOUS ANCHOR */}
      <section className="container mx-auto py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center p-12 md:p-16 border border-primary/30 rounded-lg gradient-noir relative overflow-hidden shadow-gold"
        >
          <div className="absolute inset-0 animate-shimmer pointer-events-none" />
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-6">The Punchline</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            Every <span className="italic text-gold">8 minutes</span>,<br/>a woman dies because of dowry.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            That's the joke. It was never funny. If satire made you uncomfortable —
            good. Now do something about it.
          </p>
          <Button asChild size="lg" className="gradient-gold text-primary-foreground shadow-gold">
            <Link to="/helpline">Get Help / Report — 181</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
