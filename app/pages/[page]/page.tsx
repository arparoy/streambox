import { Suspense } from 'react';
import { redirect, notFound } from 'next/navigation';
import { movies, getAllCategories } from '@/lib/movies';
import MovieGrid from '@/components/movie-grid';

const ITEMS_PER_PAGE = 12;

export function generateStaticParams() {
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export default async function PaginatedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = Number(page);

  if (!/^\d+$/.test(page) || !Number.isInteger(pageNum) || pageNum < 1) {
    notFound();
  }

  // Page 1 lives at the home route to avoid duplicate content.
  if (pageNum === 1) {
    redirect('/');
  }

  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
      <div className="mb-12">
        <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight mb-4 text-foreground"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
          Latest <span className="text-primary text-glow">Releases</span>
        </h1>
        <p className="text-foreground/40 text-base max-w-2xl">
          Browse page {pageNum} of our curated collection of high quality movie downloads.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-xl shimmer" />}>
        <MovieGrid initialMovies={movies} categories={categories} currentPage={pageNum} />
      </Suspense>
    </div>
  );
}
