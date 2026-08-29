'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Movie } from '@/lib/types';
import MovieCard from '@/components/movie-card';
import { motion } from 'motion/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, ChevronLeft, ChevronRight, LayoutGrid, List as ListIcon, X, SlidersHorizontal, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Image from 'next/image';

export default function MovieGrid({ initialMovies, categories, currentPage = 1 }: { initialMovies: Movie[], categories: string[], currentPage?: number }) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const router = useRouter();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);

  const [viewMode, setViewMode] = useLocalStorage<'grid' | 'list'>('viewMode', 'grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 12;

  // Extract unique years and qualities
  const years = useMemo(() => Array.from(new Set(initialMovies.map(m => m.year))).sort((a, b) => b - a), [initialMovies]);
  const qualities = useMemo(() => Array.from(new Set(initialMovies.map(m => m.quality))).sort(), [initialMovies]);

  // Reset to page 1 (home) when filters change, but skip the initial render
  // so that direct navigation to /pages/N is respected.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (currentPage !== 1) {
      router.push('/');
    }
  }, [selectedGenres, selectedYears, selectedQualities, searchParam, currentPage, router]);

  const pageHref = (page: number) => (page <= 1 ? '/' : `/pages/${page}`);

  const filteredMovies = useMemo(() => {
    let filtered = initialMovies;

    if (searchParam) {
      const q = searchParam.toLowerCase();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.toLowerCase().includes(q))
      );
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(m => m.genre.some(g => selectedGenres.includes(g)));
    }

    if (selectedYears.length > 0) {
      filtered = filtered.filter(m => selectedYears.includes(m.year));
    }

    if (selectedQualities.length > 0) {
      filtered = filtered.filter(m => selectedQualities.includes(m.quality));
    }

    // Sort by year newest first
    return filtered.sort((a, b) => b.year - a.year);
  }, [initialMovies, searchParam, selectedGenres, selectedYears, selectedQualities]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFilter = (value: any, state: any[], setState: (val: any[]) => void) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedQualities([]);
  };

  const hasActiveFilters = selectedGenres.length > 0 || selectedYears.length > 0 || selectedQualities.length > 0;

  const FilterGroup = ({ title, items, selected, onToggle }: { title: string, items: (string | number)[], selected: any[], onToggle: (v: any) => void }) => (
    <div className="space-y-2.5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/50">{title}</h4>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {items.map(item => {
          const isActive = selected.includes(item);
          return (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onToggle(item)}
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isActive ? 'bg-primary border-primary' : 'border-border-subtle group-hover:border-primary/50'}`}>
                {isActive && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-sm transition-colors ${isActive ? 'text-foreground font-medium' : 'text-foreground/60 group-hover:text-foreground'}`}>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-card border border-border-subtle px-4 py-2 rounded-lg text-sm text-foreground hover:bg-background transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </button>

        <div className="flex items-center gap-1 bg-card border border-border-subtle rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground/40 hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-foreground/40 hover:text-foreground'}`}
            aria-label="List view"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Filters */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-sidebar p-6 overflow-y-auto md:relative md:w-60 md:z-0 md:bg-sidebar md:rounded-xl md:border md:border-border-subtle md:p-5 md:translate-x-0 md:self-start md:top-4 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-foreground/60 hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-7">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" /> Filters
            </h3>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                Clear all
              </button>
            )}
          </div>

          <FilterGroup title="Genres" items={categories} selected={selectedGenres} onToggle={(v) => toggleFilter(v, selectedGenres, setSelectedGenres)} />
          <FilterGroup title="Release Year" items={years} selected={selectedYears} onToggle={(v) => toggleFilter(v, selectedYears, setSelectedYears)} />
          <FilterGroup title="Quality" items={qualities} selected={selectedQualities} onToggle={(v) => toggleFilter(v, selectedQualities, setSelectedQualities)} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="hidden md:flex justify-between items-center bg-card border border-border-subtle px-4 py-3 rounded-xl">
          <div className="text-foreground/60 text-sm">
            Showing <span className="font-semibold text-foreground">{filteredMovies.length}</span> movies
          </div>

          <div className="flex items-center gap-1 bg-background border border-border-subtle rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground/40 hover:text-foreground'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-foreground/40 hover:text-foreground'}`}
              aria-label="List view"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {searchParam && (
          <div className="text-lg text-foreground">
            Search results for: <span className="font-bold text-primary">&quot;{searchParam}&quot;</span>
          </div>
        )}

        {currentMovies.length > 0 ? (
          <motion.div
            layout
            className={viewMode === 'grid'
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              : "flex flex-col gap-4"
            }
          >
            {currentMovies.map((movie) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                key={movie.id}
              >
                <MovieCard movie={movie} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-card border border-border-subtle rounded-xl text-center px-4">
            <div className="relative w-48 h-48 mb-6 opacity-80">
              <Image
                src="/no_results.jpg"
                alt="No movies found"
                fill
                className="object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xl text-foreground/80 mb-2 font-semibold">No movies found</p>
            <p className="text-foreground/50 mb-6 max-w-md">We couldn&apos;t find any movies matching your current criteria. Try adjusting your filters or search term.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8 border-t border-border-subtle">
            {currentPage === 1 ? (
              <span className="p-2 rounded-lg bg-card border border-border-subtle opacity-40 cursor-not-allowed text-foreground">
                <ChevronLeft className="w-5 h-5" />
              </span>
            ) : (
              <Link
                href={pageHref(currentPage - 1)}
                aria-label="Previous page"
                className="p-2 rounded-lg bg-card border border-border-subtle hover:bg-background transition-colors text-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
            )}

            <div className="flex items-center gap-2">
              {(() => {
                const windowSize = 5;
                let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                let end = start + windowSize - 1;
                if (end > totalPages) {
                  end = totalPages;
                  start = Math.max(1, end - windowSize + 1);
                }
                return Array.from({ length: end - start + 1 }).map((_, i) => {
                  const page = start + i;
                  return (
                    <Link
                      key={page}
                      href={pageHref(page)}
                      className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-card border border-border-subtle hover:bg-background text-foreground'
                      }`}
                    >
                      {page}
                    </Link>
                  );
                });
              })()}
            </div>

            {currentPage >= totalPages ? (
              <span className="p-2 rounded-lg bg-card border border-border-subtle opacity-40 cursor-not-allowed text-foreground">
                <ChevronRight className="w-5 h-5" />
              </span>
            ) : (
              <Link
                href={pageHref(currentPage + 1)}
                aria-label="Next page"
                className="p-2 rounded-lg bg-card border border-border-subtle hover:bg-background transition-colors text-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
