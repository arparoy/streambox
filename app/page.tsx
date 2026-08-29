import { Suspense } from 'react';
import { movies, getAllCategories } from '@/lib/movies';
import MovieGrid from '@/components/movie-grid';
import FeaturedSlider from '@/components/featured-slider';
import TrendingNow from '@/components/trending-now';

export default function Home() {
  const categories = getAllCategories();
  
  // Get latest 5 movies for the featured slider
  const featuredMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FeaturedSlider movies={featuredMovies} />

      <TrendingNow />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground">
          Latest <span className="text-primary">Releases</span>
        </h1>
        <p className="text-foreground/50 text-sm max-w-2xl">
          Download the most anticipated movies of the year in high quality. Enjoy a seamless viewing experience with our curated collection.
        </p>
      </div>
      
      <Suspense fallback={<div className="animate-pulse h-96 bg-card border border-border-subtle rounded-xl"></div>}>
        <MovieGrid initialMovies={movies} categories={categories} />
      </Suspense>
    </div>
  );
}
