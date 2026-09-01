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
    <>
      {/* Full-bleed hero — no container padding */}
      <FeaturedSlider movies={featuredMovies} />

      {/* Content sections with generous spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <TrendingNow />

        {/* Anamorphic divider */}
        <div className="anamorphic-line my-16" />

        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight mb-3 text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}>
            Latest <span className="text-primary text-glow">Releases</span>
          </h1>
          <p className="text-foreground/40 text-base max-w-2xl">
            Download the most anticipated movies of the year in high quality. Enjoy a seamless viewing experience with our curated collection.
          </p>
        </div>
        
        <Suspense fallback={<div className="h-96 rounded-xl shimmer" />}>
          <MovieGrid initialMovies={movies} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
