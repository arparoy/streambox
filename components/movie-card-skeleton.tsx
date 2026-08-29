export function MovieCardSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-row gap-4 bg-card border border-border-subtle rounded-lg overflow-hidden p-3 animate-pulse">
        <div className="relative w-24 sm:w-32 aspect-[2/3] shrink-0 rounded-md bg-background" />
        <div className="flex flex-col flex-1 py-1 space-y-3">
          <div className="flex justify-between items-start gap-2">
            <div className="h-6 bg-background rounded-md w-1/2" />
            <div className="w-12 h-6 bg-background rounded-md shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 bg-background rounded-md" />
            <div className="w-1 h-1 rounded-full bg-border-subtle" />
            <div className="w-16 h-4 bg-background rounded-md" />
          </div>
          <div className="flex gap-1.5 hidden sm:flex">
            <div className="w-16 h-5 bg-background rounded-md" />
            <div className="w-12 h-5 bg-background rounded-md" />
          </div>
          <div className="space-y-2 mt-auto hidden sm:block">
            <div className="h-4 bg-background rounded-md w-full" />
            <div className="h-4 bg-background rounded-md w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border-subtle">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-2 right-2 w-10 h-5 bg-border-subtle rounded" />
      </div>
      <div className="mt-2.5 space-y-1.5">
        <div className="h-4 bg-background rounded w-3/4" />
        <div className="flex justify-between">
          <div className="h-3 bg-background rounded w-10" />
          <div className="h-3 bg-background rounded w-8" />
        </div>
      </div>
    </div>
  );
}
