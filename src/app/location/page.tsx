"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Train,
  Plane,
  Bus,
  Ticket,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function LocationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs tracking-[0.3em] uppercase mb-4"
          >
            Find Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-cream">Location &</span>{" "}
            <span className="text-gradient-gold">Contact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cream/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Situated beside Gandhi Maidan and Kargil Chowk, The Premiere Square
            occupies one of the most recognizable addresses in Patna.
          </motion.p>
        </div>
      </section>

      {/* Map & Info */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Map */}
            <ScrollReveal className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden border border-gold/10 h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8!2d85.13!3d25.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzM2LjAiTiA4NcKwMDcnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.6) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Premiere Square Location"
                />
              </div>
            </ScrollReveal>

            {/* Info Cards */}
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="space-y-5">
                {/* Address */}
                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream mb-1">
                        Address
                      </h3>
                      <p className="text-cream/50 text-sm leading-relaxed">
                        Gandhi Maidan Road, near Kargil Chowk, Patna, Bihar
                        800001, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream mb-1">
                        Phone
                      </h3>
                      <p className="text-cream/50 text-sm">+91 612 222 XXXX</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream mb-1">
                        Email
                      </h3>
                      <p className="text-cream/50 text-sm">
                        info@thepremieresquare.in
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-gradient-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream mb-1">
                        Show Timings
                      </h3>
                      <p className="text-cream/50 text-sm">
                        First show: 9:30 AM &middot; Last show: 10:30 PM
                      </p>
                      <p className="text-cream/40 text-xs mt-1">
                        Open all 7 days including holidays
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://www.google.com/maps/search/The+Premiere+Square+Gandhi+Maidan+Road+Patna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2 w-full"
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/30 to-background" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                How to Reach
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-cream">
                <span className="text-gradient-gold">Accessible</span> From
                Everywhere
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Navigation,
                title: "By Road",
                desc: "Located on Gandhi Maidan Road, easily accessible by car, auto-rickshaw, or cab.",
              },
              {
                icon: Train,
                title: "By Rail",
                desc: "Patna Junction Railway Station is just 3 km away (~10 minutes).",
              },
              {
                icon: Plane,
                title: "By Air",
                desc: "Jay Prakash Narayan International Airport is 15 km away (~30 minutes).",
              },
              {
                icon: Bus,
                title: "By Bus",
                desc: "Patna ISBT is 8 km away. Local buses and auto-rickshaws available.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-gradient-card rounded-2xl p-6 text-center card-hover h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-cream/50 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">
                Nearby Landmarks
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">
                In the Heart of{" "}
                <span className="text-gradient-gold">Patna</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-gradient-card rounded-2xl p-8 md:p-10">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Gandhi Maidan", distance: "Adjacent" },
                  { name: "Kargil Chowk", distance: "Walking distance" },
                  { name: "Patna Museum", distance: "~2 km" },
                  { name: "Bihar Legislative Assembly", distance: "~1.5 km" },
                  { name: "Patna High Court", distance: "~2 km" },
                  { name: "Golghar", distance: "~3 km" },
                  { name: "Patna Junction Station", distance: "~3 km" },
                  { name: "Boring Road", distance: "~4 km" },
                  { name: "PMCH", distance: "~2.5 km" },
                ].map((landmark, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0"
                  >
                    <span className="text-cream/70 text-sm">{landmark.name}</span>
                    <span className="text-gold text-xs">{landmark.distance}</span>
                  </div>
                ))}
              </div>
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
              Plan Your <span className="text-gradient-gold">Visit</span>
            </h2>
            <p className="text-cream/50 mb-8">
              Whether it&apos;s a weekend outing, a festival release, or a
              first-day-first-show — The Premiere Square awaits you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center gap-2"
              >
                <Ticket size={16} />
                Book Tickets
              </a>
              <a
                href="https://www.google.com/maps/search/The+Premiere+Square+Gandhi+Maidan+Road+Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold flex items-center gap-2"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
