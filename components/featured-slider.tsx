'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FeaturedSlider({ movies }: { movies: Movie[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  }, [movies.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!movies || movies.length === 0) return null;

  const current = movies[currentIndex];

  return (
    <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden -mt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image with slow zoom */}
          <div className="absolute inset-0 animate-slow-zoom">
            <Image
              src={current.cover}
              alt={current.title}
              fill
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

          {/* Content — bottom-left aligned */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 lg:p-20 flex flex-col justify-end h-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-5"
            >
              {/* Metadata row */}
              <div className="flex items-center gap-3 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">
                <span className="text-primary flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ boxShadow: '0 0 10px var(--color-primary-glow)' }} />
                  Featured
                </span>
                <span className="text-foreground/40">/</span>
                <span className="text-foreground/60">{current.year}</span>
                <span className="text-foreground/40">/</span>
                <span className="text-foreground/60">{current.quality}</span>
                <span className="text-foreground/40">/</span>
                <span className="text-foreground/60 flex items-center gap-1">
                  <Star className="w-3 h-3 text-primary fill-primary" /> {current.rating}
                </span>
              </div>

              {/* Title — massive display type */}
              <h2
                className="font-[family-name:var(--font-display)] font-extrabold text-white leading-[0.95] text-glow"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.04em' }}
              >
                {current.title}
              </h2>

              <p className="text-foreground/60 text-base md:text-lg line-clamp-2 max-w-xl">
                {current.description}
              </p>

              {/* Genre tags */}
              <div className="flex flex-wrap gap-2">
                {current.genre.slice(0, 3).map(g => (
                  <span key={g} className="px-3 py-1 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-foreground/50 border border-border-subtle rounded-full">
                    {g}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/movie/${current.id}`}
                  className="fill-hover flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors hover:text-white"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch & Download
                </Link>
                <Link
                  href={`/movie/${current.id}`}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm"
                >
                  More Info
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-primary text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators — vertical bar style */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index ? 'w-8 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
            style={currentIndex === index ? { boxShadow: '0 0 10px var(--color-primary-glow)' } : {}}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
