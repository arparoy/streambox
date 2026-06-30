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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        Browse by <span className="text-primary">Categories</span>
      </h1>
      
      <div className="space-y-16">
        {categories.map((category) => {
          const catMovies = getMoviesByCategory(category).slice(0, 6);
          if (catMovies.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold">{category}</h2>
                <Link 
                  href={`/?search=&genre=${category}`}
                  className="text-sm text-primary hover:underline"
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
