"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Clock, Film, Ticket, MapPin } from "lucide-react";

interface TheatreShowtime {
  name: string;
  venueCode: string;
  showtimes: string[];
  bookingUrl: string;
  minPrice: string;
}

interface MovieData {
  title: string;
  poster: string;
  certification: string;
  duration: string;
  genre: string;
  language: string;
  format: string;
  eventCode: string;
  theatres: TheatreShowtime[];
}

interface TheatreSelectionDialogProps {
  movie: MovieData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TheatreSelectionDialog({
  movie,
  isOpen,
  onClose,
}: TheatreSelectionDialogProps) {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[70] flex items-center md:items-start justify-center"
          >
            <div className="bg-charcoal border border-gold/20 rounded-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl shadow-black/50">
              {/* Header with poster */}
              <div className="relative">
                <div className="h-40 md:h-48 overflow-hidden">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Movie info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-24 rounded-lg overflow-hidden border border-gold/30 shrink-0 hidden sm:block">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {movie.certification && (
                          <span className="bg-gold/20 text-gold text-xs font-bold px-2 py-0.5 rounded">
                            {movie.certification}
                          </span>
                        )}
                        <span className="text-cream/50 text-xs">
                          {movie.format}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-cream truncate">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-cream/40 text-xs">
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {movie.duration}
                        </span>
                        <span>{movie.genre}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theatre options */}
              <div className="p-5 pt-4 space-y-3">
                <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-3">
                  Choose your theatre
                </p>

                {movie.theatres.map((theatre) => (
                  <div
                    key={theatre.venueCode}
                    className="bg-charcoal-lighter/50 border border-gold/10 rounded-xl p-4 hover:border-gold/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gold" />
                        <span className="text-cream font-semibold text-sm">
                          {theatre.name}
                        </span>
                      </div>
                      {theatre.minPrice && (
                        <span className="text-cream/40 text-xs">
                          from {theatre.minPrice}
                        </span>
                      )}
                    </div>

                    {/* Showtimes for this theatre */}
                    {theatre.showtimes.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {theatre.showtimes.map((time, i) => (
                          <a
                            key={i}
                            href={theatre.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold/10 hover:bg-gold/20 border border-gold/20 hover:border-gold/40 text-cream text-sm px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
                          >
                            <Clock size={12} className="text-gold" />
                            {time}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-cream/30 text-xs">
                        No shows today
                      </p>
                    )}

                    {/* Book at theatre button */}
                    <a
                      href={theatre.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/20 hover:border-gold/40 text-gold text-xs font-semibold transition-all"
                    >
                      <Ticket size={14} />
                      View all shows at {theatre.name}
                    </a>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-4">
                <p className="text-cream/20 text-xs text-center">
                  Showtimes from BookMyShow • Prices may vary
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
