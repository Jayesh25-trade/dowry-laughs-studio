import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const grooms = [
  { name: "The Engineer 2.0", tag: "Bestseller", mrp: "₹50,00,000", extras: "+ 1 Activa, 1 LED TV", desc: "BTech CSE. Works in Bangalore. Knows React. Cannot cook.", rating: 4.2 },
  { name: "USA-Returned Deluxe", tag: "Premium", mrp: "₹2,00,00,000", extras: "+ Honda City, gold (1kg)", desc: "H1B holder. Visits India once in 3 years. Calls dosa 'crepe'.", rating: 4.8 },
  { name: "Govt Job Classic", tag: "Stable", mrp: "₹75,00,000", extras: "+ Plot in Tier-2 city", desc: "Pension guaranteed. Personality optional. Sleeps at desk.", rating: 4.5 },
  { name: "The Doctor MD", tag: "Limited", mrp: "₹1,50,00,000", extras: "+ Clinic furniture set", desc: "MD. Will diagnose your tea as 'too sweet'. Handwriting: illegible.", rating: 4.7 },
  { name: "Family Business Heir", tag: "VIP", mrp: "Negotiable", extras: "+ entire wedding cost", desc: "Inherits 3 textile shops. Has never worked. Knows everyone's uncle.", rating: 3.9 },
  { name: "The IAS Officer", tag: "Out of Stock", mrp: "P.O.A.", extras: "+ everything you own", desc: "Power. Posting. Patriarchy. Comes with 200 wedding guests minimum.", rating: 5.0 },
];

const Marketplace = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Aisle 498A</p>
        <h1 className="font-serif text-6xl md:text-8xl mb-6">
          The <span className="italic text-gold">Groom</span> Marketplace
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-serif italic">
          Free shipping if you live with the in-laws. T&C apply (forever).
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {grooms.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <Card className="group relative overflow-hidden border-border hover:border-primary/60 transition-smooth shadow-noir h-full">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="gradient-gold text-primary-foreground border-0">{g.tag}</Badge>
              </div>
              <div className="aspect-[4/3] gradient-noir relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 gradient-radial-gold opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl font-serif italic text-gold opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-smooth">
                    {g.name[4] || "G"}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 text-xs text-muted-foreground tracking-wider">★ {g.rating} / 5</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-2">{g.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[60px]">{g.desc}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-serif text-gold">{g.mrp}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{g.extras}</p>
                <Button className="w-full gradient-gold text-primary-foreground hover:opacity-90" disabled>
                  Add to Cart — Forbidden
                </Button>
                <p className="text-[10px] text-center text-destructive/80 mt-3 uppercase tracking-wider">
                  Humans are not for sale · Section 498A
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 text-center max-w-2xl mx-auto p-10 border border-destructive/40 rounded-lg bg-destructive/5"
      >
        <h3 className="font-serif text-3xl mb-3 text-gold">Cart is empty. Always.</h3>
        <p className="text-muted-foreground">
          Because no human — son, daughter, or in-law — has a price tag.
          Demanding or giving dowry is a criminal offence in India.
        </p>
      </motion.div>
    </div>
  );
};

export default Marketplace;
