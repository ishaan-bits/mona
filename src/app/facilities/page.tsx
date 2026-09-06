"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Volume2,
  Sofa,
  Wind,
  Monitor,
  Ticket,
  Coffee,
  Car,
  Wifi,
  Accessibility,
  Sparkles,
  Shield,
  Armchair,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const facilities = [
  {
    icon: Volume2,
    title: "Dolby Atmos",
    desc: "Eastern India's first Dolby Atmos cinema. Experience sound that flows around and above you with breathtaking precision.",
    highlight: true,
  },
  {
    icon: Monitor,
    title: "Digital Projection",
    desc: "State-of-the-art digital projection systems delivering crystal-clear visuals on the big screen.",
    highlight: false,
  },
  {
    icon: Sofa,
    title: "Premium Stadium Seating",
    desc: "Wide reclining chairs with extra legroom, designed for maximum comfort during extended viewing.",
    highlight: true,
  },
  {
    icon: Wind,
    title: "Climate Control",
    desc: "Fully air-conditioned interiors maintained at optimal temperature for year-round comfort.",
    highlight: false,
  },
  {
    icon: Coffee,
    title: "Premium Concessions",
    desc: "Curated food and beverage options including gourmet snacks, beverages, and cinema classics.",
    highlight: false,
  },
  {
    icon: Ticket,
    title: "Easy Booking",
    desc: "Online and offline ticket booking available. Skip the queue with digital tickets.",
    highlight: false,
  },
  {
    icon: Armchair,
    title: "Luxury Lobby",
    desc: "Elegant waiting areas with premium interiors, ambient lighting, and comfortable seating.",
    highlight: true,
  },
  {
    icon: Wifi,
    title: "Modern Amenities",
    desc: "High-speed Wi-Fi, digital signage, and modern ticketing systems for a seamless experience.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Safety & Security",
    desc: "CCTV surveillance, trained staff, and emergency protocols ensuring a safe environment.",
    highlight: false,
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    desc: "Wheelchair accessible areas and assistance available for guests with special needs.",
    highlight: false,
  },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images.jpeg"
            alt="Facilities"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
          >
            World-Class Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-cream">Premium</span>{" "}
            <span className="text-gradient-gold">Facilities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Every element at The Premiere Square is centered around delivering a
            high-quality theatrical experience.
          </motion.p>
        </div>
      </section>

      {/* Dolby Atmos Feature */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80" />
              <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-16 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
                    <Volume2 size={14} className="text-gold" />
                    <span className="text-gold text-xs tracking-wider uppercase">
                      Dolby Atmos
                    </span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                    Sound That Surrounds{" "}
                    <span className="text-gradient-gold">You</span>
                  </h2>
                  <p className="text-cream/60 leading-relaxed mb-6">
                    In 2017, Mona became the first Dolby Atmos cinema in Eastern
                    India. The sound experience is designed to create complete
                    immersion, allowing audiences to feel every movement,
                    dialogue, and musical score with exceptional spatial
                    precision.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "128", label: "Audio Tracks" },
                      { value: "64", label: "Speaker Zones" },
                      { value: "3D", label: "Sound Space" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-2xl font-display font-bold text-gradient-gold">
                          {stat.value}
                        </p>
                        <p className="text-cream/40 text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 rounded-full border border-gold/10 animate-[pulse-gold_3s_ease-in-out_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-gold/15" />
                  <div className="absolute inset-8 rounded-full border border-gold/20" />
                  <div className="absolute inset-12 rounded-full border border-gold/25" />
                  <div className="absolute inset-16 rounded-full bg-gold/10 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/dolby-atmos-logo.webp"
                      alt="Dolby Atmos"
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All Facilities Grid */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/30 to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Everything You Need
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                Complete <span className="text-gradient-gold">Experience</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((facility, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className={`rounded-2xl p-6 md:p-8 card-hover h-full ${
                    facility.highlight
                      ? "bg-gradient-card border-gold/20 glow-gold"
                      : "bg-gradient-card"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      facility.highlight
                        ? "bg-gold/20 border border-gold/30"
                        : "bg-charcoal-lighter/50 border border-gold/10"
                    }`}
                  >
                    <facility.icon
                      size={22}
                      className={
                        facility.highlight ? "text-gold" : "text-cream/50"
                      }
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Atmosphere */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Architecture & Atmosphere
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                <span className="text-gradient-gold">Timeless</span> Elegance
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Grand Entrance",
                  desc: "Iconic facade facing Gandhi Maidan Road, welcoming generations of cinema lovers.",
                  icon: Sparkles,
                },
                {
                  title: "Premium Lobby",
                  desc: "Spacious interiors with elegant lighting, modern ticketing, and luxury concession areas.",
                  icon: Armchair,
                },
                {
                  title: "Carpeted Interiors",
                  desc: "Luxury carpeted pathways leading to auditoriums, designed for comfort and acoustic quality.",
                  icon: Shield,
                },
                {
                  title: "Ambient Design",
                  desc: "Clean contemporary finishes while retaining historic character throughout the space.",
                  icon: Wind,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-card rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream mb-1">
                      {item.title}
                    </h3>
                    <p className="text-cream/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal>
            <Ticket className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Ready for a <span className="text-gradient-gold">Premium</span>{" "}
              Experience?
            </h2>
            <p className="text-cream/50 mb-8">
              Book your tickets now and experience Bihar&apos;s finest cinema
              destination.
            </p>
            <a
              href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Ticket size={16} />
              Book Tickets
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
