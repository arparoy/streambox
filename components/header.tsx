'use client';

import Link from 'next/link';
import { Film, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

import { movies } from '@/lib/movies';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/random', label: 'Random' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glassmorphism border-b border-border-subtle' : 'bg-gradient-to-b from-black/60 to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <Film className="w-6 h-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6" style={{ transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }} />
                <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-display)]" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
                  Stream<span className="text-primary">Box</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input
                    id="global-search"
                    type="text"
                    placeholder="Search...  /"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="bg-white/[0.03] border border-border-subtle rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] w-56 transition-all placeholder:text-foreground/30 font-[family-name:var(--font-mono)]"
                  />
                </form>

                <AnimatePresence>
                  {isSearchFocused && searchQuery.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 glassmorphism border border-border-subtle rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto custom-scrollbar"
                    >
                      {searchResults.length > 0 ? (
                        <div className="flex flex-col">
                          {searchResults.map(movie => (
                            <Link
                              key={movie.id}
                              href={`/movie/${movie.id}`}
                              className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-colors border-b border-border-subtle last:border-0"
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
                                <span className="text-xs text-foreground/40 font-[family-name:var(--font-mono)]">{movie.year} · {movie.quality}</span>
                              </div>
                            </Link>
                          ))}
                          <button
                            onClick={handleSearch}
                            className="p-3 text-sm text-center text-primary font-medium hover:bg-white/[0.04] transition-colors"
                          >
                            View all results
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center text-foreground/40">
                          <span className="text-sm font-medium">No results found</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors p-2"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
                <span className="text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider">Menu</span>
              </button>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-foreground/80 hover:text-foreground p-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Top bar */}
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Film className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold tracking-tight font-[family-name:var(--font-display)]" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
                  Stream<span className="text-primary">Box</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground/60 hover:text-foreground p-2 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu items — staggered entrance */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-display)] font-extrabold tracking-tight text-foreground/30 hover:text-foreground transition-colors duration-300"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" style={{ boxShadow: '0 0 20px var(--color-primary-glow)' }} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12"
            >
              <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/[0.03] border border-border-subtle rounded-full py-3 pl-12 pr-4 text-base w-full focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] text-foreground placeholder:text-foreground/30 font-[family-name:var(--font-mono)]"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
