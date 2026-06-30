import { Movie } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block h-full">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-card border border-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] group-hover:shadow-primary/20">
        <Image
          src={movie.cover}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-2 py-1 text-xs font-semibold bg-primary/90 text-white rounded-md backdrop-blur-sm shadow-sm">
            {movie.quality}
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-white">{movie.rating}</span>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-bold text-white line-clamp-1 mb-1 shadow-black drop-shadow-md">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="truncate">{movie.genre.join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
