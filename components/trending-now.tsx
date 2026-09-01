import { movies } from '@/lib/movies';
import MovieCard from '@/components/movie-card';
import { Flame } from 'lucide-react';

export default function TrendingNow() {
  const trendingMovies = movies.filter(m => m.trending);

  if (trendingMovies.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <Flame className="w-5 h-5 text-primary" />
        <h2 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight text-foreground text-2xl"
          style={{ letterSpacing: '-0.03em' }}>
          Trending <span className="text-primary">Now</span>
        </h2>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 snap-x custom-scrollbar">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="w-[150px] sm:w-auto shrink-0 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
