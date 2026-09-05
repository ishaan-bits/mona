"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Ticket, ChevronRight, Film, Star, Volume2, Award, Clock, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const timelineEvents = [
  { year: "1902", title: "Elphinstone Bioscope", desc: "Silent films come to Patna" },
  { year: "1944", title: "Kataruka Family", desc: "Acquires Elphinstone" },
  { year: "1980", title: "Mona Opens", desc: "Star Wars in 70MM" },
  { year: "2007", title: "Luxury Renovation", desc: "Premium cinema reborn" },
  { year: "2013", title: "Elphinstone Reborn", desc: "Heritage meets modern" },
  { year: "2017", title: "Dolby Atmos", desc: "First in Eastern India" },
];

const stats = [
  { icon: Clock, value: "120+", label: "Years of Cinema" },
  { icon: Film, value: "2", label: "Legendary Theatres" },
  { icon: Volume2, value: "Dolby", label: "Atmos Sound" },
  { icon: Award, value: "#1", label: "In Bihar" },
];

const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    { x: number; y: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/30 rounded-full"
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{ y: [null, -100], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images.jpeg"
            alt="The Premiere Square"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Floating Gold Particles */}
        <FloatingParticles />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto overflow-hidden rounded-full border-2 border-gold/30 glow-gold">
              <Image
                src="/mona-70mm-patna-logo.jpg"
                alt="The Premiere Square Logo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          >
            Est. 1902 &middot; Patna, Bihar
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95]"
          >
            <span className="text-gradient-gold">THE PREMIERE</span>
            <br />
            <span className="text-cream">SQUARE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Where over a century of cinematic heritage meets cutting-edge movie
            technology. Home to the legendary Mona 70MM and the iconic
            Elphinstone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2 text-sm"
            >
              <Ticket size={18} />
              Book Tickets
            </a>
            <Link
              href="/heritage"
              className="btn-outline-gold flex items-center gap-2 text-sm"
            >
              Our Heritage
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-20">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="text-cream/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Two Theatres Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Two Legendary Theatres
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                One Iconic <span className="text-gradient-gold">Destination</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mona Card */}
            <ScrollReveal direction="left">
              <Link href="/heritage#mona" className="block group">
                <div className="bg-gradient-card rounded-2xl overflow-hidden card-hover">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src="/images.png"
                      alt="Mona 70MM"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-gold/20 text-gold text-xs px-3 py-1 rounded-full border border-gold/30 mb-2">
                        Flagship Auditorium
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2">
                      Mona 70MM
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed mb-4">
                      Bihar&apos;s most iconic cinema hall. From 70MM Photophone
                      projection to Dolby Atmos — a pioneer of cinematic
                      technology since 1980.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Dolby Atmos", "70MM Legacy", "442 Seats", "Premium Luxury"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-charcoal-lighter/50 text-cream/60 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center text-gold text-sm group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Heritage</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Elphinstone Card */}
            <ScrollReveal direction="right">
              <Link href="/heritage#elphinstone" className="block group">
                <div className="bg-gradient-card rounded-2xl overflow-hidden card-hover">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src="/avplsx7jf.webp"
                      alt="Elphinstone"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-maroon/30 text-cream text-xs px-3 py-1 rounded-full border border-maroon-light/30 mb-2">
                        Heritage Cinema
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2">
                      Elphinstone
                    </h3>
                    <p className="text-cream/50 text-sm leading-relaxed mb-4">
                      Patna&apos;s oldest surviving cinema institution. From
                      silent bioscope in 1902 to modern luxury — over 120 years
                      of cinematic magic.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Est. 1902", "Digital Cinema", "Heritage Design", "Intimate Luxury"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-charcoal-lighter/50 text-cream/60 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                    <div className="flex items-center text-gold text-sm group-hover:gap-3 gap-2 transition-all">
                      <span>Explore Heritage</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/50 to-background" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                A Legacy Timeline
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                Over a Century of <span className="text-gradient-gold">Cinema</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <ScrollReveal
                  key={i}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                >
                  <div
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        i % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="bg-gradient-card rounded-xl p-6 inline-block">
                        <p className="text-gold font-display text-2xl font-bold mb-1">
                          {event.year}
                        </p>
                        <p className="text-cream font-semibold mb-1">
                          {event.title}
                        </p>
                        <p className="text-cream/50 text-sm">{event.desc}</p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-gold glow-gold shrink-0" />

                    <div className="flex-1" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden p-12 md:p-20">
              <Image
                src="/images.jpeg"
                alt="The Premiere Square"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm" />
              <div className="relative z-10">
                <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-4">
                  Experience <span className="text-gradient-gold">Cinema</span>{" "}
                  Like Never Before
                </h2>
                <p className="text-cream/60 text-base md:text-lg max-w-xl mx-auto mb-8">
                  Visit The Premiere Square at Gandhi Maidan Road, Patna.
                  Premium luxury, legendary heritage, and the magic of the big
                  screen.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex items-center gap-2"
                  >
                    <Ticket size={18} />
                    Book Now
                  </a>
                  <Link href="/location" className="btn-outline-gold">
                    Get Directions
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
