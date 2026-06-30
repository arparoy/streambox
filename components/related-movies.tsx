import { movies } from '@/lib/movies';
import MovieCard from '@/components/movie-card';

export default function RelatedMovies({ currentMovieId, genre }: { currentMovieId: string, genre: string[] }) {
  const related = movies
    .filter(m => m.id !== currentMovieId && m.genre.some(g => genre.includes(g)))
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">Related Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {related.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
