import { Suspense } from 'react';
import { movies, getAllCategories } from '@/lib/movies';
import MovieGrid from '@/components/movie-grid';
import FeaturedSlider from '@/components/featured-slider';

export default function Home() {
  const categories = getAllCategories();
  
  // Get latest 5 movies for the featured slider
  const featuredMovies = [...movies].sort((a, b) => b.year - a.year).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <FeaturedSlider movies={featuredMovies} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Latest <span className="text-primary">Releases</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Download the most anticipated movies of the year in high quality. Enjoy a seamless viewing experience with our curated collection.
        </p>
      </div>
      
      <Suspense fallback={<div className="animate-pulse h-96 bg-dark-card rounded-xl"></div>}>
        <MovieGrid initialMovies={movies} categories={categories} />
      </Suspense>
    </div>
  );
}
