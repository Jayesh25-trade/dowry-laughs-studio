import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { ShoppingCart, Trash2, Heart, ShieldAlert, Phone, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { GroomMannequin } from "@/components/three/GroomMannequin";

type Groom = {
  id: string;
  name: string;
  tag: string;
  mrp: string;
  extras: string;
  desc: string;
  rating: number;
};

const grooms: Groom[] = [
  { id: "eng",  name: "The Engineer 2.0",       tag: "Bestseller",   mrp: "₹50,00,000",  extras: "+ 1 Activa, 1 LED TV",        desc: "BTech CSE. Works in Bangalore. Knows React. Cannot cook.",                       rating: 4.2 },
  { id: "usa",  name: "USA-Returned Deluxe",    tag: "Premium",      mrp: "₹2,00,00,000", extras: "+ Honda City, gold (1kg)",   desc: "H1B holder. Visits India once in 3 years. Calls dosa 'crepe'.",                  rating: 4.8 },
  { id: "gov",  name: "Govt Job Classic",       tag: "Stable",       mrp: "₹75,00,000",   extras: "+ Plot in Tier-2 city",      desc: "Pension guaranteed. Personality optional. Sleeps at desk.",                      rating: 4.5 },
  { id: "doc",  name: "The Doctor MD",          tag: "Limited",      mrp: "₹1,50,00,000", extras: "+ Clinic furniture set",     desc: "MD. Will diagnose your tea as 'too sweet'. Handwriting: illegible.",             rating: 4.7 },
  { id: "biz",  name: "Family Business Heir",   tag: "VIP",          mrp: "Negotiable",   extras: "+ entire wedding cost",      desc: "Inherits 3 textile shops. Has never worked. Knows everyone's uncle.",            rating: 3.9 },
  { id: "ias",  name: "The IAS Officer",        tag: "Out of Stock", mrp: "P.O.A.",       extras: "+ everything you own",       desc: "Power. Posting. Patriarchy. Comes with 200 wedding guests minimum.",             rating: 5.0 },
];

const Marketplace = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = (id: string) => {
    if (cart.includes(id)) return;
    setCart((c) => [...c, id]);
  };
  const removeFromCart = (id: string) => setCart((c) => c.filter((x) => x !== id));

  const cartItems = grooms.filter((g) => cart.includes(g.id));

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Floating cart */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-24 right-6 z-40"
      >
        <Button
          onClick={() => setCheckoutOpen(true)}
          disabled={cart.length === 0}
          className="gradient-gold text-primary-foreground shadow-gold rounded-full h-12 px-5 gap-2 disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart ({cart.length})
        </Button>
      </motion.div>

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
          Rotate. Inspect. Refuse. Free shipping if you live with the in-laws — T&C apply (forever).
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {grooms.map((g, i) => {
          const inCart = cart.includes(g.id);
          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <Card className="group relative overflow-hidden border-border hover:border-primary/60 transition-smooth shadow-noir h-full flex flex-col">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="gradient-gold text-primary-foreground border-0">{g.tag}</Badge>
                </div>

                {/* 3D mannequin viewer */}
                <div className="aspect-[4/3] gradient-noir relative overflow-hidden border-b border-border">
                  <div className="absolute inset-0 gradient-radial-gold opacity-40 pointer-events-none" />
                  <Suspense fallback={<div className="w-full h-full gradient-noir" />}>
                    <GroomMannequin variant={i} />
                  </Suspense>
                  <div className="absolute bottom-3 left-3 text-[10px] text-muted-foreground tracking-wider flex items-center gap-1.5 pointer-events-none">
                    <RotateCw className="w-3 h-3" /> drag to rotate
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground tracking-wider pointer-events-none">★ {g.rating} / 5</div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif mb-2">{g.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed min-h-[60px]">{g.desc}</p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-serif text-gold">{g.mrp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">{g.extras}</p>
                  <Button
                    onClick={() => addToCart(g.id)}
                    disabled={inCart}
                    className="w-full gradient-gold text-primary-foreground hover:opacity-90 mt-auto"
                  >
                    {inCart ? "✓ Added — now refuse" : "Add to Cart"}
                  </Button>
                  <p className="text-[10px] text-center text-destructive/80 mt-3 uppercase tracking-wider">
                    Humans are not for sale · Section 498A
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 text-center max-w-2xl mx-auto p-10 border border-destructive/40 rounded-lg bg-destructive/5"
      >
        <h3 className="font-serif text-3xl mb-3 text-gold">Cart total is always ₹0.</h3>
        <p className="text-muted-foreground">
          Because no human — son, daughter, or in-law — has a price tag.
          Demanding or giving dowry is a criminal offence in India.
        </p>
      </motion.div>

      {/* Checkout modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-lg border-primary/40 bg-card">
          <DialogHeader>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Checkout</p>
            <DialogTitle className="font-serif text-3xl">
              Proceed to <span className="italic text-gold">Refuse</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground italic font-serif">
              Review your cart. Then decline — like every self-respecting family should.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-60 overflow-y-auto py-2">
            <AnimatePresence>
              {cartItems.map((g) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between gap-3 p-3 border border-border rounded bg-background/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-serif truncate">{g.name}</div>
                    <div className="text-[11px] text-muted-foreground line-through">{g.mrp}</div>
                  </div>
                  <div className="text-gold font-serif text-lg">₹0</div>
                  <button onClick={() => removeFromCart(g.id)} className="text-muted-foreground hover:text-destructive p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal (mocked greed)</span>
              <span className="line-through">₹{cartItems.length * 5000000}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Patriarchy tax</span>
              <span className="line-through">₹∞</span>
            </div>
            <div className="flex justify-between text-2xl font-serif pt-2 border-t border-border">
              <span>Total</span>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-gold"
              >
                ₹0
              </motion.span>
            </div>
            <p className="text-[11px] text-muted-foreground italic text-center pt-2">
              Because love isn't a transaction. And dignity isn't deductible.
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button asChild className="w-full gradient-gold text-primary-foreground shadow-gold">
              <Link to="/helpline" onClick={() => setCheckoutOpen(false)}>
                <Phone className="w-4 h-4" /> Refuse & Visit Helpline
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-primary/40"
              onClick={() => { setCart([]); setCheckoutOpen(false); }}
            >
              <Heart className="w-4 h-4" /> Empty cart, marry for love
            </Button>
            <p className="text-[10px] text-center text-destructive uppercase tracking-wider flex items-center justify-center gap-1 pt-1">
              <ShieldAlert className="w-3 h-3" /> Dowry Prohibition Act, 1961
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
