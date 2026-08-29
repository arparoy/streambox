'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Show on every page load / refresh (no persistence)
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Lock body scroll while open and allow closing with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-popup-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md bg-card border border-border-subtle rounded-xl shadow-xl overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors p-1 rounded-full hover:bg-background"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>

              <h2 id="welcome-popup-title" className="text-xl font-bold text-foreground text-balance">
                We do not store any files
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-foreground/60 text-pretty">
                StreamBox does not host, upload, or store any content on its servers. All
                links and media are provided by third-party sources and are indexed for
                convenience only.
              </p>

              <div className="w-full h-px bg-border-subtle my-6" />

              <p className="text-sm font-medium text-foreground">
                Join our community on Discord!
              </p>
              <p className="mt-1 text-xs text-foreground/50 text-pretty">
                Get updates, request titles, and chat with other members.
              </p>

              <a
                href="https://discord.com/invite/AYEsSG9TVm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white font-medium text-sm rounded-full py-3 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join Discord
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 text-xs text-foreground/40 hover:text-foreground transition-colors"
              >
                Continue to site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
