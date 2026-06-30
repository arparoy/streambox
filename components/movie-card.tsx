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
        className="group flex flex-row gap-4 bg-card border border-border-subtle rounded-xl overflow-hidden hover:bg-white/5 transition-all p-3"
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
            <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center gap-1 bg-black/30 dark:bg-black/60 px-2 py-1 rounded-md border border-border-subtle shrink-0">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-foreground">{movie.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-foreground/60 mt-1 mb-2">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {movie.duration}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2 hidden sm:flex">
            {movie.genre.map(g => (
              <span key={g} className="px-2 py-0.5 bg-background border border-border-subtle rounded-md text-[10px] text-foreground/80">
                {g}
              </span>
            ))}
          </div>

          <p className="text-sm text-foreground/70 line-clamp-2 mt-auto hidden sm:block">
            {movie.description}
          </p>
          
          <div className="mt-auto sm:hidden">
             <span className="px-2 py-1 text-[10px] font-semibold bg-primary/90 text-white rounded-md backdrop-blur-sm">
              {movie.quality}
            </span>
          </div>
        </div>
        
        <div className="hidden sm:flex flex-col items-end justify-between shrink-0 ml-4">
          <span className="px-2 py-1 text-xs font-semibold bg-primary/90 text-white rounded-md backdrop-blur-sm shadow-sm">
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
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-border-subtle transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:group-hover:shadow-primary/20 bg-black">
        <Image
          src={movie.cover}
          alt={movie.title}
          fill
          className={`object-cover transition-opacity duration-500 ${isHovered && youtubeId ? 'opacity-0' : 'group-hover:scale-105 opacity-100'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />
        
        {isHovered && youtubeId && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}&playsinline=1`}
            className="absolute inset-0 w-full h-full object-cover scale-[1.3] pointer-events-none"
            allow="autoplay; encrypted-media"
          />
        )}

        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${isHovered && youtubeId ? 'opacity-60' : 'opacity-80 group-hover:opacity-100'}`} />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2 py-1 text-xs font-semibold bg-primary/90 text-white rounded-md backdrop-blur-sm shadow-sm">
            {movie.quality}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-white">{movie.rating}</span>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-bold text-white line-clamp-1 mb-1 shadow-black drop-shadow-md">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="truncate">{movie.genre.join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
