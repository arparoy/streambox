'use client';

import { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';
import { useState, useRef } from 'react';

export default function MovieCard({ movie, viewMode = 'grid' }: { movie: Movie, viewMode?: 'grid' | 'list' }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 600);
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
        className="group flex flex-row gap-4 bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-primary/30 transition-all p-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-24 sm:w-32 aspect-[2/3] shrink-0 rounded-md overflow-hidden bg-black">
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
            <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 bg-background border border-border-subtle px-2 py-1 rounded-md shrink-0">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-foreground">{movie.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground/50 mt-1 mb-2">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2 hidden sm:flex">
            {movie.genre.map(g => (
              <span key={g} className="px-2 py-0.5 bg-background border border-border-subtle rounded-md text-[10px] text-foreground/60">
                {g}
              </span>
            ))}
          </div>

          <p className="text-sm text-foreground/60 mt-auto hidden sm:line-clamp-3">
            {movie.description}
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end justify-between shrink-0 ml-4">
          <span className="px-2 py-1 text-xs font-semibold bg-primary text-white rounded-md">
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
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border-subtle transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 bg-black">
        <Image
          src={movie.cover}
          alt={movie.title}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered && youtubeId ? 'opacity-0' : 'group-hover:scale-105 opacity-100'}`}
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

        {/* Thin top accent line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

        {/* Quality badge */}
        <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-black/70 text-white rounded backdrop-blur-sm z-10">
          {movie.quality}
        </span>
      </div>

      <div className="mt-2.5 px-0.5">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-foreground/50">{movie.year}</span>
          <span className="flex items-center gap-1 text-xs text-foreground/60">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
