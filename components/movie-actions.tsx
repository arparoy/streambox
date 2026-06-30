'use client';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { Movie } from '@/lib/types';
import { Heart, Share2, Download, Copy, PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MovieActions({ movie }: { movie: Movie }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<string[]>('recentlyViewed', []);
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Add to recently viewed
    if (!recentlyViewed.includes(movie.id)) {
      setRecentlyViewed(prev => [movie.id, ...prev].slice(0, 10)); // Keep last 10
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
            ? 'bg-primary/10 border-primary text-primary' 
            : 'border-white/10 hover:bg-white/5 text-gray-300'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorite && isMounted ? 'fill-primary' : ''}`} />
        <span className="text-sm font-medium">{isFavorite && isMounted ? 'Saved to Favorites' : 'Add to Favorites'}</span>
      </button>

      <button 
        onClick={shareMovie}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Share</span>
      </button>

      <button 
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-300 transition-colors"
      >
        <Copy className="w-4 h-4" />
        <span className="text-sm font-medium">{isCopied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
}
