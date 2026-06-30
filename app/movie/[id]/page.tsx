import { getMovieById, movies } from '@/lib/movies';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Clock, Calendar, Disc, Globe, HardDrive, Download, Database } from 'lucide-react';
import RelatedMovies from '@/components/related-movies';
import MovieActions from '@/components/movie-actions';
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
  if (!movie) return { title: 'Not Found' };
  return {
    title: `Download ${movie.title} (${movie.year}) - StreamBox`,
    description: movie.description,
    openGraph: {
      images: [movie.cover],
    }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Cover */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
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

        {/* Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-foreground">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/80">
              <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 px-2.5 py-1 rounded-md font-medium border border-yellow-500/20">
                <Star className="w-4 h-4 fill-current" /> {movie.rating}
              </span>
              <span className="flex items-center gap-1.5 bg-background border-border-subtle px-2.5 py-1 rounded-md border">
                <Calendar className="w-4 h-4 text-foreground/50" /> {movie.year}
              </span>
              <span className="flex items-center gap-1.5 bg-background border-border-subtle px-2.5 py-1 rounded-md border">
                <Clock className="w-4 h-4 text-foreground/50" /> {movie.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-background border-border-subtle px-2.5 py-1 rounded-md border">
                <Disc className="w-4 h-4 text-foreground/50" /> {movie.quality}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre.map(g => (
              <span key={g} className="px-3 py-1 bg-background border border-border-subtle rounded-full text-sm hover:bg-white/10 transition-colors cursor-default text-foreground">
                {g}
              </span>
            ))}
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
            {movie.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
            <div>
              <span className="block text-sm text-foreground/50 mb-1">Director</span>
              <span className="font-medium text-foreground">{movie.director}</span>
            </div>
            <div>
              <span className="block text-sm text-foreground/50 mb-1">Language</span>
              <span className="flex items-center gap-2 font-medium text-foreground">
                <Globe className="w-4 h-4 text-foreground/50" /> {movie.language}
              </span>
            </div>
            <div>
              <span className="block text-sm text-foreground/50 mb-1">File Size</span>
              <span className="flex items-center gap-2 font-medium text-foreground">
                <HardDrive className="w-4 h-4 text-foreground/50" /> {movie.size}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block text-sm text-foreground/50 mb-1">Cast</span>
              <span className="font-medium text-foreground/80">{movie.cast.join(', ')}</span>
            </div>
          </div>
          
          <MovieActions movie={movie} />
        </div>
      </div>

      {/* Content Section: Downloads & Trailer */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Downloads */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glassmorphism p-6 rounded-2xl border border-border-subtle">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <Download className="w-5 h-5 text-primary" /> Download Links
            </h3>
            
            <div className="space-y-3">
              {movie.downloads.map((d, i) => (
                <a 
                  key={i} 
                  href={d.url}
                  className="flex items-center justify-between p-3 rounded-lg bg-card border border-border-subtle hover:bg-primary/10 hover:border-primary/50 transition-all group"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">Download {d.quality}</span>
                  <Download className="w-4 h-4 text-foreground/50 group-hover:text-primary" />
                </a>
              ))}
            </div>

            {movie.backupLinks && movie.backupLinks.length > 0 && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Backup Servers
                </h4>
                <div className="space-y-2">
                  {movie.backupLinks.map((b, i) => (
                    <a 
                      key={i}
                      href={b.url}
                      className="block p-2 text-sm rounded-md bg-card border border-border-subtle hover:bg-background text-foreground/80 transition-colors"
                    >
                      {b.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trailer */}
        <div className="lg:col-span-2">
          <div className="glassmorphism p-6 rounded-2xl border border-border-subtle h-full">
            <h3 className="text-xl font-bold mb-6 text-foreground">Official Trailer</h3>
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
                <span className="text-foreground/50">Trailer Not Available</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Movies */}
      <RelatedMovies currentMovieId={movie.id} genre={movie.genre} />
    </div>
  );
}
