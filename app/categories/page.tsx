import { getAllCategories, getMoviesByCategory } from '@/lib/movies';
import MovieCard from '@/components/movie-card';
import Link from 'next/link';

export const metadata = {
  title: 'Movie Categories - StreamBox',
  description: 'Browse movies by genre.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
      <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight mb-10 text-foreground"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
        Browse by <span className="text-primary text-glow">Categories</span>
      </h1>
      
      <div className="space-y-20">
        {categories.map((category) => {
          const catMovies = getMoviesByCategory(category).slice(0, 6);
          if (catMovies.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <h2 className="font-[family-name:var(--font-display)] font-bold text-2xl text-foreground" style={{ letterSpacing: '-0.03em' }}>
                  {category}
                </h2>
                <Link 
                  href={`/?search=&genre=${category}`}
                  className="text-sm text-primary hover:text-primary-hover transition-colors font-[family-name:var(--font-mono)] uppercase tracking-wider"
                >
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {catMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
