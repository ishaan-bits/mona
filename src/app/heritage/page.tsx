"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Film, Star, Volume2, Award, Users, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function HeritagePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images.jpeg"
            alt="Heritage"
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
            Our Heritage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-gradient-gold">Timeless</span>{" "}
            <span className="text-cream">Legacy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            From silent bioscopes to Dolby Atmos — The Premiere Square has been
            the heart of Patna&apos;s cinematic soul for over 120 years.
          </motion.p>
        </div>
      </section>

      {/* Elphinstone Story */}
      <section id="elphinstone" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <Image
                    src="/avplsx7jf.webp"
                    alt="Elphinstone"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-charcoal border border-gold/20 rounded-xl p-4 glow-gold">
                  <p className="text-gold font-display text-3xl font-bold">1902</p>
                  <p className="text-cream/60 text-xs">Year Established</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                  The Oldest in Patna
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                  The Story of{" "}
                  <span className="text-gradient-gold">Elphinstone</span>
                </h2>
                <div className="space-y-4 text-cream/60 text-sm leading-relaxed">
                  <p>
                    Elphinstone is the oldest surviving cinema institution in
                    Patna. Its origins date back to 1902, when it began operating
                    as Elphinstone Bioscope, screening silent motion pictures
                    during the earliest era of cinema in India.
                  </p>
                  <p>
                    During the bioscope years, audiences gathered to witness
                    silent films accompanied by live musical performances. As
                    Indian cinema evolved, Elphinstone transitioned into talkies,
                    becoming one of the city&apos;s most celebrated theatres.
                  </p>
                  <p>
                    In 1944, the Kataruka family acquired Elphinstone and began
                    developing one of Bihar&apos;s longest-running cinema
                    legacies. Between 2010 and 2013, the theatre underwent
                    complete reconstruction — transformed into a modern luxury
                    cinema while preserving its historic name and heritage.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  {[
                    { icon: Film, label: "Silent Era" },
                    { icon: Star, label: "Talkies" },
                    { icon: Award, label: "Heritage" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 bg-charcoal-lighter/50 rounded-full px-4 py-2 border border-gold/10"
                    >
                      <item.icon size={14} className="text-gold" />
                      <span className="text-cream/70 text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Mona Story */}
      <section id="mona" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                  Bihar&apos;s Finest
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                  The Legend of{" "}
                  <span className="text-gradient-gold">Mona 70MM</span>
                </h2>
                <div className="space-y-4 text-cream/60 text-sm leading-relaxed">
                  <p>
                    Mona 70MM was conceived as Bihar&apos;s most ambitious cinema
                    project. Construction began in April 1978 on land adjoining
                    Elphinstone. The vision was to create a theatre capable of
                    delivering an international-standard cinematic experience
                    through 70mm projection and stereophonic sound.
                  </p>
                  <p>
                    Mona officially opened on 18 January 1980 with George
                    Lucas&apos; Star Wars. The choice of film symbolized
                    technological progress, as audiences experienced authentic
                    70mm visuals with six-track stereophonic audio — an
                    extraordinary achievement for eastern India at the time.
                  </p>
                  <p>
                    In 2017, Mona became the first Dolby Atmos cinema in Eastern
                    India, reinforcing its identity as a technological pioneer
                    and elevating The Premiere Square into one of the
                    region&apos;s leading movie destinations.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { value: "1,361", label: "Original Capacity" },
                    { value: "442", label: "Premium Seats Now" },
                    { value: "70MM", label: "Projection Legacy" },
                    { value: "Dolby", label: "Atmos Sound" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-gradient-card rounded-xl p-4 text-center"
                    >
                      <p className="text-xl font-display font-bold text-gradient-gold">
                        {stat.value}
                      </p>
                      <p className="text-cream/50 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <Image
                    src="/images.png"
                    alt="Mona 70MM"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-charcoal border border-gold/20 rounded-xl p-4 glow-gold">
                  <p className="text-gold font-display text-3xl font-bold">1980</p>
                  <p className="text-cream/60 text-xs">Mona Opens</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* The Kataruka Legacy */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                The Kataruka Legacy
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream mb-4">
                Four Generations of{" "}
                <span className="text-gradient-gold">Cinema</span>
              </h2>
              <p className="text-cream/50 max-w-2xl mx-auto">
                The cinema legacy is built upon four generations of the Kataruka
                family, whose philosophy has always been simple: preserve heritage
                while continuously improving the audience experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Vision",
                desc: "Late Kashi Prasad Kataruka envisioned bringing world-class cinema technology to Patna long before multiplexes became common in India.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Nearly every family in Patna has a personal memory associated with Mona or Elphinstone — school outings, first dates, festival releases.",
              },
              {
                icon: Volume2,
                title: "Innovation",
                desc: "From 70MM to Dolby Digital to Dolby Atmos — always pioneering, always pushing the boundaries of cinematic experience in Bihar.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-gradient-card rounded-2xl p-8 text-center card-hover h-full">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Era */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/30 to-background" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                The Modern Era
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                The Premiere <span className="text-gradient-gold">Square</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-gold mb-4">
                    Mona 70MM
                  </h3>
                  <ul className="space-y-3 text-cream/60 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Grand flagship auditorium
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Large-format blockbuster experience
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Dolby Atmos technology
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Premium luxury seating
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Spectacular scale and immersion
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gold mb-4">
                    Elphinstone
                  </h3>
                  <ul className="space-y-3 text-cream/60 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Heritage-inspired premium auditorium
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Elegant and intimate atmosphere
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Modern digital cinema
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Historic identity preserved
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold mt-1">&#9670;</span>
                      Refined viewing experience
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
