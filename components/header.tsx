'use client';

import Link from 'next/link';
import { Film, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

import ThemeToggle from './theme-toggle';

import { movies } from '@/lib/movies';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
      setIsSearchFocused(false);
    }
  };

  const searchResults = searchQuery.trim().length > 0 
    ? movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Film className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold tracking-tight">Stream<span className="text-primary">Box</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Home</Link>
              <Link href="/categories" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Categories</Link>
              <Link href="/favorites" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Favorites</Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <input
                  id="global-search"
                  type="text"
                  placeholder="Search movies... (Press '/')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="bg-card border border-border-subtle rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 transition-all placeholder:text-foreground/50"
                />
              </form>
              
              <AnimatePresence>
                {isSearchFocused && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border-subtle rounded-xl shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto custom-scrollbar"
                  >
                    {searchResults.length > 0 ? (
                      <div className="flex flex-col">
                        {searchResults.map(movie => (
                          <Link 
                            key={movie.id} 
                            href={`/movie/${movie.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-background transition-colors border-b border-border-subtle last:border-0"
                            onClick={() => {
                              setSearchQuery('');
                              setIsSearchFocused(false);
                            }}
                          >
                            <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden">
                              <Image 
                                src={movie.cover} 
                                alt={movie.title} 
                                fill 
                                referrerPolicy="no-referrer"
                                className="object-cover" 
                              />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                              <span className="font-medium text-sm truncate text-foreground">{movie.title}</span>
                              <span className="text-xs text-foreground/60">{movie.year} • {movie.quality}</span>
                            </div>
                          </Link>
                        ))}
                        <button 
                          onClick={handleSearch}
                          className="p-3 text-sm text-center text-primary font-medium hover:bg-background transition-colors"
                        >
                          View all results
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-foreground/60">
                        <div className="relative w-24 h-24 mb-3 opacity-80">
                          <Image 
                            src="/no_results.jpg"
                            alt="No results"
                            fill
                            className="object-contain rounded"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-sm font-medium">No results found</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground/80 hover:text-foreground p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border-subtle glassmorphism overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="bg-card border border-border-subtle rounded-lg py-2 pl-9 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-foreground/50"
                />
                
                <AnimatePresence>
                  {isSearchFocused && searchQuery.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border-subtle rounded-xl shadow-xl overflow-hidden z-50 max-h-64 overflow-y-auto custom-scrollbar"
                    >
                      {searchResults.length > 0 ? (
                        <div className="flex flex-col">
                          {searchResults.map(movie => (
                            <Link 
                              key={movie.id} 
                              href={`/movie/${movie.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-background transition-colors border-b border-border-subtle last:border-0"
                              onClick={() => {
                                setSearchQuery('');
                                setIsSearchFocused(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden">
                                <Image 
                                  src={movie.cover} 
                                  alt={movie.title} 
                                  fill 
                                  referrerPolicy="no-referrer"
                                  className="object-cover" 
                                />
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="font-medium text-sm truncate text-foreground">{movie.title}</span>
                                <span className="text-xs text-foreground/60">{movie.year} • {movie.quality}</span>
                              </div>
                            </Link>
                          ))}
                          <button 
                            onClick={handleSearch}
                            className="p-3 text-sm text-center text-primary font-medium hover:bg-background transition-colors"
                          >
                            View all results
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center text-foreground/60">
                          <div className="relative w-24 h-24 mb-3 opacity-80">
                            <Image 
                              src="/no_results.jpg"
                              alt="No results"
                              fill
                              className="object-contain rounded"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-sm font-medium">No results found</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-background rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/categories" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-background rounded-lg" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                <Link href="/favorites" className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-background rounded-lg" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
