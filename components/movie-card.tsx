'use client';

import { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Film } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export default function MovieCard({ movie, viewMode = 'grid' }: { movie: Movie, viewMode?: 'grid' | 'list' }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  const youtubeId = movie.youtubeTrailer?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];

  if (viewMode === 'list') {
    return (
      <Link
        href={`/movie/${movie.id}`}
        className="group flex flex-row gap-4 bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 p-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-24 sm:w-32 aspect-[2/3] shrink-0 rounded-lg overflow-hidden bg-black">
          <Image
            src={movie.cover}
            alt={movie.title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered && youtubeId ? 'opacity-0' : 'group-hover:scale-105'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            referrerPolicy="no-referrer"
          />
          {isHovered && youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}&playsinline=1`}
              className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none"
              allow="autoplay; encrypted-media"
            />
          )}
        </div>

        <div className="flex flex-col flex-1 py-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors font-[family-name:var(--font-display)]">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 bg-white/[0.04] border border-border-subtle px-2 py-1 rounded-md shrink-0">
              <Star className="w-3 h-3 text-primary fill-primary" />
              <span className="text-xs font-medium text-foreground font-[family-name:var(--font-mono)]">{movie.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground/40 mt-1 mb-2 font-[family-name:var(--font-mono)]">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2 hidden sm:flex">
            {movie.genre.map(g => (
              <span key={g} className="px-2 py-0.5 bg-white/[0.03] border border-border-subtle rounded-md text-[10px] text-foreground/40 font-[family-name:var(--font-mono)] uppercase tracking-wider">
                {g}
              </span>
            ))}
          </div>

          <p className="text-sm text-foreground/50 mt-auto hidden sm:line-clamp-2">
            {movie.description}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end justify-between shrink-0 ml-4">
          <span className="px-2.5 py-1 text-xs font-semibold bg-primary text-white rounded-md font-[family-name:var(--font-mono)] uppercase tracking-wider">
            {movie.quality}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border-subtle transition-colors duration-300 group-hover:border-primary/30"
      >
        <Image
          src={movie.cover}
          alt={movie.title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered && youtubeId ? 'opacity-0' : 'group-hover:scale-110 opacity-100'}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          referrerPolicy="no-referrer"
        />

        {isHovered && youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}&playsinline=1`}
            className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none"
            allow="autoplay; encrypted-media"
          />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Hover metadata reveal — "Shadow Play" */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="flex items-center gap-3 text-xs font-[family-name:var(--font-mono)] text-foreground/60 mb-2">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-primary fill-primary" /> {movie.rating}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}</span>
          </div>
          <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">{movie.description}</p>
        </div>

        {/* Top accent glow line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 z-10" style={{ boxShadow: '0 0 12px var(--color-primary-glow)' }} />

        {/* Quality badge */}
        <span className="absolute top-2.5 right-2.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider bg-black/60 text-white rounded-md backdrop-blur-sm z-10 font-[family-name:var(--font-mono)] border border-white/10">
          {movie.quality}
        </span>
      </motion.div>

      <div className="mt-3 px-0.5">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors font-[family-name:var(--font-display)]">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-foreground/40 font-[family-name:var(--font-mono)]">{movie.year}</span>
          <span className="flex items-center gap-1 text-xs text-foreground/50 font-[family-name:var(--font-mono)]">
            <Star className="w-3 h-3 text-primary fill-primary" />
            {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
