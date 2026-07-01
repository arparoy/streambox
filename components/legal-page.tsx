import type { ReactNode } from 'react';

interface LegalPageProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-2 text-balance">
        {title}
      </h1>
      {updated && (
        <p className="text-sm text-foreground/50 mb-8">Last updated: {updated}</p>
      )}
      <div className="space-y-6 text-foreground/70 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground/90 [&_h2]:mt-8 [&_a]:text-primary [&_a]:hover:underline">
        {children}
      </div>
    </div>
  );
}
