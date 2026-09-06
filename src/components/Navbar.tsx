"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Ticket } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/heritage", label: "Heritage" },
  { href: "/now-showing", label: "Now Showing" },
  { href: "/facilities", label: "Facilities" },
  { href: "/location", label: "Location" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-gold/30 group-hover:border-gold transition-colors">
              <Image
                src="/premiere-square-logo.jpeg"
                alt="The Premiere Square"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-gold font-display text-sm md:text-base font-bold tracking-wider leading-tight">
                THE PREMIERE
              </p>
              <p className="text-cream/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                Square
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-cream/70 hover:text-gold transition-colors rounded-full hover:bg-gold/5 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Location */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-cream/50 text-xs">
              <MapPin size={14} className="text-gold" />
              <span>Gandhi Maidan Rd, Patna</span>
            </div>
            <a
              href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2 text-xs py-2 px-5"
            >
              <Ticket size={14} />
              Book Tickets
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-cream/70 hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-charcoal/98 backdrop-blur-xl border-t border-gold/10 overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-cream/80 hover:text-gold hover:bg-gold/5 rounded-xl transition-all text-base"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gold/10">
                <a
                  href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2 w-full"
                >
                  <Ticket size={16} />
                  Book Tickets
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
