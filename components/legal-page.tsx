import type { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 min-h-screen">
      <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight mb-2 text-balance text-foreground"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
        {title}
      </h1>
      {updated && (
        <p className="text-sm text-foreground/30 mb-8 font-[family-name:var(--font-mono)]">Last updated: {updated}</p>
      )}
      <div className="space-y-6 text-foreground/50 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground/80 [&_h2]:mt-8 [&_h2]:font-[family-name:var(--font-display)] [&_a]:text-primary [&_a]:hover:underline">
        {children}
      </div>
    </div>
  );
}
