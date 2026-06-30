'use client';

import { useState, useMemo, useEffect } from 'react';
import { Movie } from '@/lib/types';
import MovieCard from '@/components/movie-card';
import { MovieCardSkeleton } from '@/components/movie-card-skeleton';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Filter, ChevronLeft, ChevronRight, LayoutGrid, List as ListIcon, X, SlidersHorizontal, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function MovieGrid({ initialMovies, categories }: { initialMovies: Movie[], categories: string[] }) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useLocalStorage<'grid' | 'list'>('viewMode', 'grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 12;

  // Extract unique years and qualities
  const years = useMemo(() => Array.from(new Set(initialMovies.map(m => m.year))).sort((a, b) => b - a), [initialMovies]);
  const qualities = useMemo(() => Array.from(new Set(initialMovies.map(m => m.quality))).sort(), [initialMovies]);

  useEffect(() => {
    // Simulate processing time for skeleton loader
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchParam, selectedGenres, selectedYears, selectedQualities, currentPage, viewMode]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenres, selectedYears, selectedQualities, searchParam]);

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

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-card border border-border-subtle px-4 py-2 rounded-lg text-foreground hover:bg-background transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
        
        <div className="flex items-center gap-1 bg-background border border-border-subtle rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}
            aria-label="List view"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Filters */}
      <AnimatePresence>
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border-subtle p-6 overflow-y-auto md:relative md:w-64 md:z-0 md:bg-transparent md:border-r-0 md:p-0 md:block md:translate-x-0 ${isSidebarOpen ? 'block' : 'hidden'}`}
          >
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-foreground/70 hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" /> Filters
                </h3>
                {(selectedGenres.length > 0 || selectedYears.length > 0 || selectedQualities.length > 0) && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              {/* Genres */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground/80">Genres</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {categories.map(genre => (
                    <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedGenres.includes(genre) ? 'bg-primary border-primary' : 'border-border-subtle group-hover:border-primary/50'}`}>
                        {selectedGenres.includes(genre) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Years */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground/80">Release Year</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {years.map(year => (
                    <label key={year} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedYears.includes(year) ? 'bg-primary border-primary' : 'border-border-subtle group-hover:border-primary/50'}`}>
                        {selectedYears.includes(year) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{year}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground/80">Quality</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {qualities.map(quality => (
                    <label key={quality} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedQualities.includes(quality) ? 'bg-primary border-primary' : 'border-border-subtle group-hover:border-primary/50'}`}>
                        {selectedQualities.includes(quality) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{quality}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="hidden md:flex justify-between items-center bg-card border border-border-subtle p-4 rounded-xl">
          <div className="text-foreground/70 text-sm">
            Showing <span className="font-semibold text-foreground">{filteredMovies.length}</span> movies
          </div>
          
          <div className="flex items-center gap-1 bg-background border border-border-subtle rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-foreground/50 hover:text-foreground'}`}
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

        {/* Grid / List with Skeleton Support */}
        {isLoading ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            : "flex flex-col gap-4"
          }>
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <MovieCardSkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : currentMovies.length > 0 ? (
          <motion.div 
            layout
            className={viewMode === 'grid' 
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "flex flex-col gap-4"
            }
          >
            {currentMovies.map((movie) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                key={movie.id}
              >
                <MovieCard movie={movie} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-card border border-border-subtle rounded-xl">
            <p className="text-xl text-foreground/60 mb-4">No movies found matching your criteria.</p>
            <button 
              onClick={clearFilters}
              className="text-primary hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-8 border-t border-border-subtle">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-card border border-border-subtle hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-primary text-white' 
                      : 'bg-card border border-border-subtle hover:bg-background text-foreground'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-card border border-border-subtle hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
