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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh] space-y-16">
      {/* Favorites */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            Your <span className="text-primary">Favorites</span>
          </h1>
        </div>

        {favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border-subtle rounded-xl">
            <Heart className="w-10 h-10 text-foreground/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No favorites yet</h2>
            <p className="text-foreground/70">Save movies you want to watch later by clicking the heart icon.</p>
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      {recentMovies.length > 0 && (
        <div className="border-t border-border-subtle pt-12">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-foreground/60" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground/90">
              Recently Viewed
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
