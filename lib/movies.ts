import moviesData from '@/data/movies.json';
import { Movie } from './types';

/**
 * Normalizes a cover value into something `next/image` accepts.
 * - Absolute URLs (http://, https://) are kept as-is.
 * - Protocol-relative URLs (//host/...) are kept as-is.
 * - Data URIs are kept as-is.
 * - Everything else is treated as a local path and gets a leading slash
 *   (e.g. "movies/arparoy.jpg" -> "/movies/arparoy.jpg").
 */
function normalizeCover(cover: string): string {
  if (!cover) return '/placeholder.svg';
  const value = cover.trim();
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) {
    return value;
  }
  return value.startsWith('/') ? value : `/${value}`;
}

export const movies: Movie[] = (moviesData as Movie[]).map((m) => ({
  ...m,
  cover: normalizeCover(m.cover),
}));

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
