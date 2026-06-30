'use client';

import { useState, useMemo, useEffect } from 'react';
import { Movie } from '@/lib/types';
import MovieCard from '@/components/movie-card';
import { motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MovieGrid({ initialMovies, categories }: { initialMovies: Movie[], categories: string[] }) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, selectedLanguage, searchParam]);

  const languages = ['All', 'English', 'Spanish', 'French', 'Korean', 'Japanese'];

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

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(m => m.genre.includes(selectedGenre));
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(m => m.language === selectedLanguage);
    }
    
    // Sort by year newest first
    return filtered.sort((a, b) => b.year - a.year);
  }, [initialMovies, searchParam, selectedGenre, selectedLanguage]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-dark-card border border-white/5 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="font-medium">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <select 
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="All">All Genres</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            {languages.map(l => (
              <option key={l} value={l}>{l === 'All' ? 'All Languages' : l}</option>
            ))}
          </select>
        </div>
      </div>

      {searchParam && (
        <div className="text-lg">
          Search results for: <span className="font-bold text-primary">"{searchParam}"</span>
          <span className="text-gray-400 text-sm ml-2">({filteredMovies.length} found)</span>
        </div>
      )}

      {/* Grid */}
      {currentMovies.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {currentMovies.map((movie) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-dark-card border border-white/5 rounded-xl">
          <p className="text-xl text-gray-400">No movies found matching your criteria.</p>
          <button 
            onClick={() => {
              setSelectedGenre('All');
              setSelectedLanguage('All');
              // Would need router to clear search param easily, simplified here
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-8 border-t border-white/5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-dark-card border border-white/5 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    : 'bg-dark-card border border-white/5 hover:bg-white/5'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-dark-card border border-white/5 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
