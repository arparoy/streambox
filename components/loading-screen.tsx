'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film } from 'lucide-react';

// High-end, colorful splash shown on the initial app load, then fades out.
// Lives in the root layout so it only mounts once (not on client navigations).
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Floating colorful gradient orbs */}
          <motion.div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '15%', left: '10%' }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)', bottom: '10%', right: '5%' }}
            animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)', top: '40%', right: '20%' }}
            animate={{ x: [0, 30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Spinner + brand mark */}
          <div className="relative flex flex-col items-center gap-6">
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, #6366f1, #ec4899, #f59e0b, #22d3ee, #6366f1)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-[3px] rounded-full bg-background" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Film className="w-7 h-7 text-primary" />
                </motion.div>
              </div>
            </div>

            <motion.span
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              StreamBox
            </motion.span>

            {/* Indeterminate gradient progress bar */}
            <div className="w-40 h-1 rounded-full bg-foreground/10 overflow-hidden">
              <motion.div
                className="h-full w-1/2 rounded-full"
                style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
