"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Clock,
  Film,
  Globe,
  Monitor,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Sparkles,
  MapPin,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TheatreSelectionDialog from "@/components/TheatreSelectionDialog";
import DateSelector from "@/components/DateSelector";

interface TheatreShowtime {
  name: string;
  venueCode: string;
  showtimes: string[];
  bookingUrl: string;
  minPrice: string;
}

interface Movie {
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

interface ShowDate {
  label: string;
  dateCode: string;
  day: string;
  date: string;
  month: string;
  year: string;
}

interface ApiResponse {
  success: boolean;
  movies: Movie[];
  dates: ShowDate[];
  message?: string;
  lastUpdated?: string;
}

export default function NowShowingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [dates, setDates] = useState<ShowDate[]>([]);

  const fetchMovies = async (dateCode?: string, showLoading = false) => {
    if (showLoading) setLoading(true);
    setError(null);
    const dateParam = dateCode || selectedDate || "";
    const url = dateParam ? `/api/movies?date=${dateParam}` : "/api/movies";
    try {
      const res = await fetch(url);
      const data: ApiResponse = await res.json();

      if (data.success && data.movies.length > 0) {
        setMovies(data.movies);
        setLastUpdated(data.lastUpdated || null);
      } else if (!movies.length) {
        setError(
          data.message ||
            "No shows available at the moment. Please check BookMyShow for the latest schedule."
        );
      }
      // Always update dates if returned
      if (data.dates && data.dates.length > 0) {
        setDates(data.dates);
        // Set initial selected date from API
        if (!selectedDate && data.dates.length > 0) {
          setSelectedDate(data.dates[0].dateCode);
        }
      }
    } catch {
      if (!movies.length) {
        setError(
          "Unable to load showtimes. Please check BookMyShow directly for the latest schedule."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(undefined, true);
    const interval = setInterval(() => fetchMovies(), 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (dateCode: string) => {
    setSelectedDate(dateCode);
    fetchMovies(dateCode, true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles size={14} className="text-gold" />
                <span className="text-gold text-xs tracking-wider uppercase">
                  Live from BookMyShow
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                <span className="text-gradient-gold">Now</span>{" "}
                <span className="text-cream">Showing</span>
              </h1>
              <p className="text-cream/50 text-base md:text-lg max-w-xl mx-auto">
                Movies currently playing at Mona 70MM & Elphinstone. Showtimes
                update automatically from BookMyShow.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Auto-refresh indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchMovies(selectedDate, true)}
              disabled={loading}
              className="flex items-center gap-2 text-cream/40 hover:text-gold text-xs transition-colors"
            >
              <RefreshCw
                size={12}
                className={loading ? "animate-spin" : ""}
              />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
            {lastUpdated && (
              <span className="text-cream/30 text-xs">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
          <a
            href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-cream/40 hover:text-gold text-xs transition-colors"
          >
            View on BookMyShow
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Date Selector */}
      {dates.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <DateSelector
            dates={dates}
            selected={selectedDate}
            onSelect={handleDateChange}
          />
        </div>
      )}

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
          >
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-cream/70 text-sm">{error}</p>
                <a
                  href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold text-sm hover:underline mt-1 inline-block"
                >
                  Open BookMyShow &rarr;
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Movies Grid */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && !movies.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-charcoal-lighter rounded-2xl overflow-hidden">
                    <div className="aspect-[2/3] bg-charcoal-lighter" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-charcoal-lighter rounded w-3/4" />
                      <div className="h-3 bg-charcoal-lighter rounded w-1/2" />
                      <div className="h-3 bg-charcoal-lighter rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie, i) => {
                const totalShows = movie.theatres.reduce(
                  (acc, t) => acc + t.showtimes.length,
                  0
                );
                return (
                  <ScrollReveal key={i} delay={i * 0.05}>
                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className="block group text-left w-full"
                    >
                      <div className="bg-gradient-card rounded-2xl overflow-hidden card-hover">
                        {/* Poster */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                          {movie.poster ? (
                            <Image
                              src={movie.poster}
                              alt={movie.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/images.jpeg";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-charcoal-lighter to-charcoal flex items-center justify-center">
                              <Film size={48} className="text-gold/30" />
                            </div>
                          )}

                          {/* Certification Badge */}
                          {movie.certification && (
                            <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm border border-gold/20 rounded-lg px-2.5 py-1">
                              <span className="text-gold text-xs font-bold">
                                {movie.certification}
                              </span>
                            </div>
                          )}

                          {/* Format Badge */}
                          {movie.format && (
                            <div className="absolute top-3 right-3 bg-gold/90 rounded-lg px-2.5 py-1">
                              <span className="text-charcoal text-xs font-bold">
                                {movie.format}
                              </span>
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                            <div className="w-full">
                              <div className="btn-gold flex items-center justify-center gap-2 w-full text-sm py-3">
                                <Ticket size={16} />
                                Select Theatre & Show
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <h3 className="font-display text-lg font-bold text-cream mb-2 line-clamp-1 group-hover:text-gold transition-colors">
                            {movie.title}
                          </h3>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {movie.language && (
                              <span className="flex items-center gap-1 text-cream/50 text-xs">
                                <Globe size={10} />
                                {movie.language}
                              </span>
                            )}
                            {movie.duration && (
                              <span className="flex items-center gap-1 text-cream/50 text-xs">
                                <Clock size={10} />
                                {movie.duration}
                              </span>
                            )}
                          </div>

                          {movie.genre && (
                            <p className="text-cream/40 text-xs mb-3">
                              {movie.genre}
                            </p>
                          )}

                          {/* Theatre chips */}
                          <div className="flex flex-wrap gap-1.5">
                            {movie.theatres.map((theatre) => (
                              <span
                                key={theatre.venueCode}
                                className="flex items-center gap-1 bg-charcoal-lighter/60 text-cream/60 text-xs px-2.5 py-1 rounded-md border border-gold/5"
                              >
                                <MapPin size={9} className="text-gold" />
                                {theatre.name}
                                <span className="text-cream/30">
                                  ({theatre.showtimes.length})
                                </span>
                              </span>
                            ))}
                            {totalShows === 0 && (
                              <span className="text-cream/30 text-xs">
                                No shows today
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <ScrollReveal>
            <div className="mt-16 text-center">
              <div className="bg-gradient-card rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
                <Monitor className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-cream mb-3">
                  Want the Latest Showtimes?
                </h3>
                <p className="text-cream/50 text-sm mb-6">
                  Visit BookMyShow for real-time availability, seat selection,
                  and instant booking for The Premiere Square.
                </p>
                <a
                  href="https://in.bookmyshow.com/buytickets/Mona-Cinema-70mm-Patna-patna/cinema-patn-MCMP-MT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <Ticket size={16} />
                  Book on BookMyShow
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Theatre Selection Dialog */}
      <TheatreSelectionDialog
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
