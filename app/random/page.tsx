'use client';

import Image from 'next/image';
import { ExternalLink, Shuffle } from 'lucide-react';
import { useMemo } from 'react';
import { motion } from 'motion/react';

import randomData from '@/data/random.json';

export default function RandomPage() {
  const covers: string[] = (randomData.covers ?? []).filter(Boolean);
  const links: string[] = (randomData.links ?? []).filter(Boolean);

  // Pick a random cover on every load/refresh.
  const cover = useMemo(() => {
    if (covers.length === 0) return '/placeholder.svg';
    return covers[Math.floor(Math.random() * covers.length)];
  }, [covers]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
      {/* Cover banner */}
      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-10">
        <Image
          src={cover}
          alt="Random cover"
          fill
          priority
          referrerPolicy="no-referrer"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3">
          <Shuffle className="w-7 h-7 text-primary" />
          <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight text-balance text-3xl sm:text-4xl" style={{ letterSpacing: '-0.04em' }}>
            Random <span className="text-primary text-glow">Links</span>
          </h1>
        </div>
      </div>

      {/* Link buttons */}
      {links.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((url, index) => (
            <motion.a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fill-hover flex items-center justify-between gap-3 bg-card border border-border-subtle rounded-xl px-5 py-4 hover:border-primary/40 transition-colors group"
            >
              <span className="flex items-center gap-3 font-medium text-foreground group-hover:text-white transition-colors font-[family-name:var(--font-display)]">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0 font-[family-name:var(--font-mono)]">
                  {index + 1}
                </span>
                Link {index + 1}
              </span>
              <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-white transition-colors shrink-0" />
            </motion.a>
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/30 py-12 font-[family-name:var(--font-mono)] text-sm">No links available yet.</p>
      )}
    </div>
  );
}
