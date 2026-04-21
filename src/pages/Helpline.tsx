import { motion } from "framer-motion";
import { Phone, Shield, Scale, Heart, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const helplines = [
  { num: "181", name: "Women Helpline (All India)", desc: "24x7 emergency response for women in distress.", icon: Phone },
  { num: "112", name: "Emergency Response (Police)", desc: "All-in-one emergency number across India.", icon: Shield },
  { num: "1091", name: "Women in Distress / Domestic Abuse", desc: "Police-operated, district-wise women helpline.", icon: Heart },
  { num: "7827170170", name: "National Commission for Women", desc: "WhatsApp / call NCW for legal complaints.", icon: Scale },
];

const laws = [
  { name: "Dowry Prohibition Act, 1961", desc: "Giving, taking or demanding dowry is a criminal offence. Punishable with imprisonment up to 5 years and fine of ₹15,000 or the value of dowry, whichever is more." },
  { name: "Section 498A IPC", desc: "Cruelty by husband or his relatives — up to 3 years imprisonment + fine. Cognizable, non-bailable." },
  { name: "Section 304B IPC — Dowry Death", desc: "If a woman dies within 7 years of marriage under unnatural circumstances connected to dowry — minimum 7 years, can extend to life imprisonment." },
  { name: "Protection of Women from Domestic Violence Act, 2005", desc: "Civil remedies, protection orders, residence orders, monetary relief." },
];

const Helpline = () => {
  return (
    <div className="container mx-auto px-6 py-20 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Satire ends here.</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">
          You are <span className="italic text-gold">not alone.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          If you, or anyone you know, is facing dowry harassment, threats or violence —
          the following are real, free, confidential channels that can help.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {helplines.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.a
              key={h.num}
              href={`tel:${h.num}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="block group"
            >
              <Card className="p-8 h-full border-border hover:border-primary/60 transition-smooth shadow-noir relative overflow-hidden">
                <div className="absolute inset-0 gradient-radial-gold opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="relative flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center shrink-0 shadow-gold">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-5xl text-gold mb-1">{h.num}</p>
                    <p className="font-medium mb-2">{h.name}</p>
                    <p className="text-sm text-muted-foreground">{h.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-12">
          Know your <span className="italic text-gold">rights.</span>
        </h2>
        <div className="space-y-4">
          {laws.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-border rounded-lg bg-card hover:border-primary/40 transition-smooth"
            >
              <h3 className="font-serif text-2xl text-gold mb-2">{l.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center p-12 border border-primary/30 rounded-lg gradient-noir shadow-gold"
      >
        <h3 className="font-serif text-4xl mb-4">
          Refuse. <span className="italic text-gold">Report.</span> Repeat.
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Every refusal makes the next family braver. Every report makes the law stronger.
          Share this satire — but more importantly, share the helplines.
        </p>
        <a
          href="https://ncw.nic.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-smooth uppercase tracking-wider text-sm"
        >
          National Commission for Women <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
};

export default Helpline;
