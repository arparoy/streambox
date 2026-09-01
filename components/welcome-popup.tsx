'use client';

import { useState, useEffect } from 'react';
import { X, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1800);
    return () => clearTimeout(timer);
  }, []);

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
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md glassmorphism border border-border-subtle rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Cobalt glow accent */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] opacity-30" style={{ background: 'radial-gradient(circle, #2E5BFF, transparent 70%)' }} />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-foreground/30 hover:text-foreground transition-colors p-1 rounded-full hover:bg-white/5 z-10"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-8 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 border border-primary/20" style={{ boxShadow: '0 0 20px var(--color-primary-glow)' }}>
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>

              <h2 id="welcome-popup-title" className="font-[family-name:var(--font-display)] font-bold text-xl text-foreground text-balance" style={{ letterSpacing: '-0.03em' }}>
                We do not store any files
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-foreground/50 text-pretty">
                StreamBox does not host, upload, or store any content on its servers. All
                links and media are provided by third-party sources and are indexed for
                convenience only.
              </p>

              <div className="w-full h-px bg-border-subtle my-6" />

              <p className="text-sm font-medium text-foreground">
                Join our community on Discord!
              </p>
              <p className="mt-1 text-xs text-foreground/40 text-pretty">
                Get updates, request titles, and chat with other members.
              </p>

              <a
                href="https://discord.com/invite/AYEsSG9TVm"
                target="_blank"
                rel="noopener noreferrer"
                className="fill-hover mt-5 inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-semibold text-sm rounded-full py-3 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join Discord
              </a>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 text-xs text-foreground/30 hover:text-foreground transition-colors font-[family-name:var(--font-mono)] uppercase tracking-wider"
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
