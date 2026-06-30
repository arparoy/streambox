import moviesData from '@/data/movies.json';
import { Movie } from './types';

export const movies: Movie[] = moviesData as Movie[];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((m) => m.id === id);
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  movies.forEach((m) => m.genre.forEach((g) => categories.add(g)));
  return Array.from(categories).sort();
}

export function getMoviesByCategory(category: string): Movie[] {
  return movies.filter((m) => m.genre.includes(category));
}

export function searchMovies(query: string): Movie[] {
  const q = query.toLowerCase();
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.cast.some((c) => c.toLowerCase().includes(q)) ||
      m.genre.some((g) => g.toLowerCase().includes(q))
  );
}
