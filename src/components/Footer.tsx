"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gold/30">
                <Image
                  src="/mona-70mm-patna-logo.jpg"
                  alt="The Premiere Square"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gold font-display text-base font-bold tracking-wider">
                  THE PREMIERE
                </p>
                <p className="text-cream/50 text-[10px] tracking-[0.2em] uppercase">
                  Square
                </p>
              </div>
            </div>
            <p className="text-cream/50 text-sm leading-relaxed">
              Patna&apos;s most iconic cinema destination. Where over a century of
              heritage meets world-class movie technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/heritage", label: "Our Heritage" },
                { href: "/now-showing", label: "Now Showing" },
                { href: "/facilities", label: "Facilities" },
                { href: "/location", label: "Location & Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/50 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/50 text-sm">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>
                  Gandhi Maidan Road, near Kargil Chowk, Patna, Bihar 800001
                </span>
              </li>
              <li className="flex items-center gap-3 text-cream/50 text-sm">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+91 612 222 XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-cream/50 text-sm">
                <Mail size={16} className="text-gold shrink-0" />
                <span>info@thepremieresquare.in</span>
              </li>
            </ul>
          </div>

          {/* Social & Heritage */}
          <div>
            <h3 className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-6">
              Heritage Since
            </h3>
            <div className="mb-6">
              <p className="text-5xl font-display text-gradient-gold font-bold">
                1902
              </p>
              <p className="text-cream/40 text-xs mt-1">
                Elphinstone Bioscope established
              </p>
            </div>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/50 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} The Premiere Square. Amrapali Films
            Ltd. All rights reserved.
          </p>
          <p className="text-cream/20 text-xs">
            A Kataruka Family Legacy &middot; Four Generations of Cinema
          </p>
        </div>
      </div>
    </footer>
  );
}
