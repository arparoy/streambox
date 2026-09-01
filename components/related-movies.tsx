import { movies } from '@/lib/movies';
import MovieCard from '@/components/movie-card';

export default function RelatedMovies({ currentMovieId, genre }: { currentMovieId: string, genre: string[] }) {
  const related = movies
    .filter(m => m.id !== currentMovieId && m.genre.some(g => genre.includes(g)))
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-2xl text-foreground" style={{ letterSpacing: '-0.03em' }}>
          Related <span className="text-primary">Movies</span>
        </h2>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {related.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
