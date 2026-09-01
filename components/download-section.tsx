'use client';

import { useState, useEffect } from 'react';
import { Download, Database, ArrowDownToLine, Clock } from 'lucide-react';
import { Movie } from '@/lib/types';
import { motion, AnimatePresence } from 'motion/react';

export default function DownloadSection({ movie }: { movie: Movie }) {
  const [activeDownload, setActiveDownload] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [isReady, setIsReady] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (activeDownload && countdown > 0 && !isReady) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (activeDownload && countdown === 0 && !isReady) {
      setIsReady(true);
    }
    
    return () => clearTimeout(timer);
  }, [activeDownload, countdown, isReady]);

  const handleDownloadClick = (url: string, id: string) => {
    if (activeDownload === id && isReady) {
      return;
    }
    
    setActiveDownload(id);
    setCountdown(10);
    setIsReady(false);
    setActiveUrl(url);
  };

  const renderDownloadButton = (label: string, url: string, id: string, icon: React.ReactNode) => {
    const isActive = activeDownload === id;
    
    return (
      <div key={id} className="relative">
        {!isActive ? (
          <button 
            onClick={() => handleDownloadClick(url, id)}
            className="fill-hover w-full flex items-center justify-between p-3.5 rounded-lg bg-card border border-border-subtle hover:border-primary/40 transition-all group"
          >
            <span className="font-medium text-foreground group-hover:text-white transition-colors font-[family-name:var(--font-display)]">{label}</span>
            <div className="text-foreground/40 group-hover:text-white transition-colors">
              {icon}
            </div>
          </button>
        ) : (
          <div className="w-full overflow-hidden rounded-lg bg-card border border-primary/40 relative" style={{ boxShadow: '0 0 16px var(--color-primary-glow)' }}>
            <AnimatePresence mode="wait">
              {!isReady ? (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col p-3.5"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-medium text-foreground font-[family-name:var(--font-display)]">Preparing...</span>
                    <span className="font-bold text-primary flex items-center gap-1 font-[family-name:var(--font-mono)]">
                      <Clock className="w-4 h-4" /> {countdown}s
                    </span>
                  </div>
                  <div className="w-full h-1 bg-background rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      style={{ boxShadow: '0 0 8px var(--color-primary-glow)' }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${((10 - countdown) / 10) * 100}%` }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <a 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-primary/10 hover:bg-primary/20 transition-colors w-full"
                  >
                    <span className="font-bold text-primary font-[family-name:var(--font-display)]">Click here to Download</span>
                    <ArrowDownToLine className="w-5 h-5 text-primary animate-bounce" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  };

  if (isInitialLoading) {
    return (
      <div className="lg:col-span-1 space-y-8">
        <div className="glassmorphism p-6 rounded-2xl border border-border-subtle">
          <div className="h-7 w-48 shimmer rounded mb-6" />
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full h-12 rounded-lg shimmer"></div>
            ))}
          </div>
          {movie.backupLinks && movie.backupLinks.length > 0 && (
            <div className="mt-8">
              <div className="h-5 w-36 shimmer rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="w-full h-12 rounded-lg shimmer"></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Download Vault */}
      <div className="glassmorphism p-6 rounded-2xl border border-border-subtle relative overflow-hidden">
        {/* Cobalt glow accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-20" style={{ background: 'radial-gradient(circle, #2E5BFF, transparent 70%)' }} />
        
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground font-[family-name:var(--font-display)] relative">
          <Download className="w-5 h-5 text-primary" /> Download Vault
        </h3>
        
        <div className="space-y-3 relative">
          {movie.downloads.map((d, i) => 
            renderDownloadButton(`Download ${d.quality}`, d.url, `main-${i}`, <Download className="w-4 h-4" />)
          )}
        </div>

        {movie.backupLinks && movie.backupLinks.length > 0 && (
          <div className="mt-8 relative">
            <h4 className="text-xs font-semibold text-foreground/30 uppercase tracking-wider mb-4 flex items-center gap-2 font-[family-name:var(--font-mono)]">
              <Database className="w-4 h-4" /> Backup Servers
            </h4>
            <div className="space-y-3">
              {movie.backupLinks.map((b, i) => 
                renderDownloadButton(b.name, b.url, `backup-${i}`, <Database className="w-4 h-4" />)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
