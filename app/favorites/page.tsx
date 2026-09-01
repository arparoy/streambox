'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { movies } from '@/lib/movies';
import MovieCard from '@/components/movie-card';
import { Heart, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites] = useLocalStorage<string[]>('favorites', []);
  const [recentlyViewed] = useLocalStorage<string[]>('recentlyViewed', []);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));
  const recentMovies = recentlyViewed.map(id => movies.find(m => m.id === id)).filter(Boolean) as typeof movies;

  if (!isMounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen space-y-20">
      {/* Favorites */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Heart className="w-7 h-7 text-primary fill-primary" style={{ filter: 'drop-shadow(0 0 8px var(--color-primary-glow))' }} />
          <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
            Your <span className="text-primary text-glow">Favorites</span>
          </h1>
        </div>

        {favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-border-subtle rounded-2xl">
            <Heart className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold mb-2 text-foreground/60">No favorites yet</h2>
            <p className="text-foreground/30 text-sm">Save movies you want to watch later by clicking the heart icon.</p>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      {recentMovies.length > 0 && (
        <div className="border-t border-border-subtle pt-16">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-6 h-6 text-foreground/40" />
            <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-foreground/80" style={{ letterSpacing: '-0.03em' }}>
              Recently Viewed
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {recentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
