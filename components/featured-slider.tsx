'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
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
    }, 5000); // Auto slide every 5 seconds

    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-xl overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={movies[currentIndex].cover}
            alt={movies[currentIndex].title}
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 flex flex-col justify-end h-full">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="max-w-2xl space-y-4"
            >
              <div className="flex gap-2 text-xs font-medium">
                <span className="bg-primary text-white px-2.5 py-1 rounded-md uppercase tracking-wide">Featured</span>
                <span className="bg-white/5 text-white px-2.5 py-1 rounded-md border border-white/15">{movies[currentIndex].year}</span>
                <span className="bg-white/5 text-white px-2.5 py-1 rounded-md border border-white/15">{movies[currentIndex].quality}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                {movies[currentIndex].title}
              </h2>
              <p className="text-gray-300 text-sm md:text-lg line-clamp-2 md:line-clamp-3 drop-shadow-md">
                {movies[currentIndex].description}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/movie/${movies[currentIndex].id}`}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                >
                  <Play className="w-4 h-4 fill-current" /> Watch Now
                </Link>
                <Link
                  href={`/movie/${movies[currentIndex].id}`}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors backdrop-blur-sm"
                >
                  <Info className="w-4 h-4" /> More Info
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 md:opacity-100 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
