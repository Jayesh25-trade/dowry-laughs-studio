import { NavLink, Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ShieldAlert } from "lucide-react";
import { BgmPlayer } from "@/components/BgmPlayer";

const links = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/calculator", label: "Calculator" },
  { to: "/hall-of-shame", label: "Hall of Shame" },
  { to: "/helpline", label: "Helpline" },
];

const SatireBanner = () => (
  <div className="bg-primary/10 border-b border-primary/20 text-primary text-xs py-2 text-center font-medium tracking-wider uppercase">
    ⚠ Satire Site · Dowry is illegal in India (Dowry Prohibition Act, 1961) · Helpline 181
  </div>
);

const Nav = () => (
  <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
    <SatireBanner />
    <nav className="container mx-auto flex items-center justify-between py-5">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-3xl font-serif italic text-gold leading-none">Dowry</span>
        <span className="text-3xl font-serif text-foreground leading-none">Bazaar</span>
        <span className="text-[10px] tracking-[0.3em] text-muted-foreground ml-1 mt-2">EST. NEVER</span>
      </Link>
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm tracking-wide uppercase transition-smooth hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="border-t border-border mt-32 bg-card/50">
    <div className="container mx-auto py-16 grid md:grid-cols-3 gap-10">
      <div>
        <h3 className="text-3xl font-serif text-gold mb-3">This is Satire.</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Every "product", "price" and "demand" on this site mocks the absurdity of the dowry system.
          Humans are not commodities. If you or someone you know faces dowry harassment — please reach out.
        </p>
      </div>
      <div>
        <h4 className="text-sm uppercase tracking-[0.25em] text-primary mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> The Law
        </h4>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>Dowry Prohibition Act, 1961</li>
          <li>Section 498A IPC — Cruelty by husband / relatives</li>
          <li>Section 304B IPC — Dowry Death</li>
          <li>Protection of Women from Domestic Violence Act, 2005</li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm uppercase tracking-[0.25em] text-primary mb-4 flex items-center gap-2">
          <Phone className="w-4 h-4" /> Real Helplines
        </h4>
        <ul className="text-sm space-y-2">
          <li className="flex justify-between"><span>Women Helpline</span><span className="text-gold font-semibold">181</span></li>
          <li className="flex justify-between"><span>Police</span><span className="text-gold font-semibold">112</span></li>
          <li className="flex justify-between"><span>Domestic Abuse</span><span className="text-gold font-semibold">1091</span></li>
          <li className="flex justify-between"><span>NCW</span><span className="text-gold font-semibold">7827170170</span></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
      Made with dark humor · Not for profit · Not for sale · © Forever
    </div>
  </footer>
);

export const Layout = () => (
  <div className="min-h-screen grain">
    <Nav />
    <motion.main
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.1, 0.95] }}
    >
      <Outlet />
    </motion.main>
    <Footer />
    <BgmPlayer />
  </div>
);
