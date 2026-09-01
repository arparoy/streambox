import { getMovieById, movies } from '@/lib/movies';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Clock, Calendar, Disc, Globe, HardDrive } from 'lucide-react';
import RelatedMovies from '@/components/related-movies';
import MovieActions from '@/components/movie-actions';
import DownloadSection from '@/components/download-section';
import { Metadata } from 'next';

// Generate static paths for all movies
export function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = getMovieById(id);
  
  if (!movie) {
    return {
      title: 'Movie Not Found - StreamBox',
      description: 'The requested movie could not be found.',
    };
  }

  return {
    title: `${movie.title} (${movie.year}) | Download Free on StreamBox`,
    description: movie.description,
    openGraph: {
      title: `${movie.title} (${movie.year}) - StreamBox`,
      description: movie.description,
      url: `/movie/${movie.id}`,
      siteName: 'StreamBox',
      images: [
        {
          url: movie.cover,
          width: 800,
          height: 1200,
          alt: `${movie.title} Poster`,
        },
      ],
      locale: 'en_US',
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} (${movie.year}) | Download Free`,
      description: movie.description,
      images: [movie.cover],
    },
  };
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  // Extract YouTube ID for iframe
  const youtubeId = movie.youtubeTrailer?.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];

  return (
    <div className="pt-16">
      {/* Backdrop hero — full-bleed cinematic still */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={movie.cover}
          alt={movie.title}
          fill
          className="object-cover opacity-40"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        {/* Two-pane split: Cover + Info */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Cover */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-border-subtle" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
              <Image
                src={movie.cover}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Info — scrollable panel */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="font-[family-name:var(--font-display)] font-extrabold tracking-tight mb-3 text-foreground"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em' }}>
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-md font-medium border border-primary/20 font-[family-name:var(--font-mono)]">
                  <Star className="w-4 h-4 fill-current" /> {movie.rating}
                </span>
                <span className="flex items-center gap-1.5 text-foreground/50 px-2.5 py-1 rounded-md border border-border-subtle font-[family-name:var(--font-mono)]">
                  <Calendar className="w-4 h-4" /> {movie.year}
                </span>
                <span className="flex items-center gap-1.5 text-foreground/50 px-2.5 py-1 rounded-md border border-border-subtle font-[family-name:var(--font-mono)]">
                  <Clock className="w-4 h-4" /> {movie.duration}
                </span>
                <span className="flex items-center gap-1.5 text-foreground/50 px-2.5 py-1 rounded-md border border-border-subtle font-[family-name:var(--font-mono)]">
                  <Disc className="w-4 h-4" /> {movie.quality}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre.map(g => (
                <span key={g} className="px-3 py-1 bg-white/[0.03] border border-border-subtle rounded-full text-xs text-foreground/50 font-[family-name:var(--font-mono)] uppercase tracking-wider">
                  {g}
                </span>
              ))}
            </div>

            <p className="text-base text-foreground/60 leading-relaxed max-w-3xl whitespace-pre-wrap">
              {movie.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
              <div>
                <span className="block text-xs text-foreground/30 mb-1 font-[family-name:var(--font-mono)] uppercase tracking-wider">Director</span>
                <span className="font-medium text-foreground/80">{movie.director}</span>
              </div>
              <div>
                <span className="block text-xs text-foreground/30 mb-1 font-[family-name:var(--font-mono)] uppercase tracking-wider">Language</span>
                <span className="flex items-center gap-2 font-medium text-foreground/80">
                  <Globe className="w-4 h-4 text-foreground/30" /> {movie.language}
                </span>
              </div>
              <div>
                <span className="block text-xs text-foreground/30 mb-1 font-[family-name:var(--font-mono)] uppercase tracking-wider">File Size</span>
                <span className="flex items-center gap-2 font-medium text-foreground/80">
                  <HardDrive className="w-4 h-4 text-foreground/30" /> {movie.size}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="block text-xs text-foreground/30 mb-1 font-[family-name:var(--font-mono)] uppercase tracking-wider">Cast</span>
                <span className="font-medium text-foreground/60">{movie.cast.join(', ')}</span>
              </div>
            </div>
            
            <MovieActions movie={movie} />
          </div>
        </div>

        {/* Anamorphic divider */}
        <div className="anamorphic-line my-16" />

        {/* Content Section: Downloads & Trailer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Downloads */}
          <DownloadSection movie={movie} />

          {/* Trailer */}
          <div className="lg:col-span-2">
            <div className="glassmorphism p-6 rounded-2xl border border-border-subtle h-full">
              <h3 className="text-xl font-bold mb-6 text-foreground font-[family-name:var(--font-display)]">Official Trailer</h3>
              {youtubeId ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-subtle bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={`${movie.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full aspect-video rounded-xl bg-card border border-border-subtle flex items-center justify-center">
                  <span className="text-foreground/30 font-[family-name:var(--font-mono)] text-sm">Trailer Not Available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Movies */}
        <RelatedMovies currentMovieId={movie.id} genre={movie.genre} />
      </div>
    </div>
  );
}
