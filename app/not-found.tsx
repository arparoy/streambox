import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-black text-white/5 tracking-tighter relative">
        404
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white drop-shadow-lg">
          Page Not Found
        </span>
      </h1>
      <p className="text-gray-400 mt-6 max-w-md">
        The movie or page you are looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/" 
        className="mt-8 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
