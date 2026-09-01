'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { Movie } from '@/lib/types';
import { Heart, Share2, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MovieActions({ movie }: { movie: Movie }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>('recentlyViewed', []);
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!recentlyViewed.includes(movie.id)) {
      setRecentlyViewed(prev => [movie.id, ...prev].slice(0, 10));
    }
  }, [movie.id, recentlyViewed, setRecentlyViewed]);

  const isFavorite = favorites.includes(movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== movie.id));
    } else {
      setFavorites([...favorites, movie.id]);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareMovie = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Download ${movie.title}`,
          text: movie.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <button 
        onClick={toggleFavorite}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
          isFavorite && isMounted
            ? 'bg-primary/10 border-primary/30 text-primary' 
            : 'border-border-subtle hover:border-primary/30 hover:bg-white/[0.03] text-foreground/60'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite && isMounted ? 'fill-primary' : ''}`} />
        <span className="text-sm font-medium font-[family-name:var(--font-display)]">{isFavorite && isMounted ? 'Saved' : 'Add to Favorites'}</span>
      </button>

      <button 
        onClick={shareMovie}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle hover:border-primary/30 hover:bg-white/[0.03] text-foreground/60 transition-all"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium font-[family-name:var(--font-display)]">Share</span>
      </button>

      <button 
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle hover:border-primary/30 hover:bg-white/[0.03] text-foreground/60 transition-all"
      >
        <Copy className="w-4 h-4" />
        <span className="text-sm font-medium font-[family-name:var(--font-display)]">{isCopied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
