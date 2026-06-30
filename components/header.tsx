'use client';

import Link from 'next/link';
import { Film, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    }
  };

  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Film className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold tracking-tight">Stream<span className="text-primary">Box</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/categories" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Categories</Link>
              <Link href="/favorites" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Favorites</Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="global-search"
                type="text"
                placeholder="Search movies... (Press '/')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64 transition-all placeholder:text-gray-500"
              />
            </form>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
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
            className="md:hidden border-t border-white/5 glassmorphism overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </form>
              <nav className="flex flex-col gap-2">
                <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/categories" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>Categories</Link>
                <Link href="/favorites" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
