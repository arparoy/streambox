import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center pt-16">
      <h1 className="font-[family-name:var(--font-display)] font-black text-foreground/[0.04] tracking-tighter relative select-none"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)', letterSpacing: '-0.06em' }}>
        404
        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] font-bold text-foreground text-3xl md:text-4xl" style={{ letterSpacing: '-0.03em' }}>
          Page Not Found
        </span>
      </h1>
      <p className="text-foreground/40 mt-8 max-w-md text-base">
        The movie or page you are looking for doesn&apos;t exist or has been removed.
      </p>
      <Link 
        href="/" 
        className="fill-hover mt-8 px-6 py-3 bg-primary text-white font-medium rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
