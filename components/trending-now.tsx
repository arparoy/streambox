import { movies } from '@/lib/movies';
import MovieCard from '@/components/movie-card';
import { Flame } from 'lucide-react';

export default function TrendingNow() {
  const trendingMovies = movies.filter(m => m.trending);

  if (trendingMovies.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-6 border-b border-border-subtle pb-4">
        <Flame className="w-8 h-8 text-primary fill-primary/20" />
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Trending <span className="text-primary">Now</span>
        </h2>
      </div>
      
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 snap-x">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="w-[160px] sm:w-auto shrink-0 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
