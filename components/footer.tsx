import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-text mt-24 border-t border-border-subtle">
      {/* Anamorphic glow line at top */}
      <div className="anamorphic-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold tracking-tight font-[family-name:var(--font-display)]" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
                Stream<span className="text-primary">Box</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/40 leading-relaxed max-w-sm">
              Your ultimate destination for downloading high-quality movies for free. Explore our vast collection today.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-foreground/30 font-[family-name:var(--font-mono)]">Quick Links</h3>
            <ul className="space-y-3 text-sm text-foreground/50">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/favorites" className="hover:text-primary transition-colors">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-foreground/30 font-[family-name:var(--font-mono)]">Legal</h3>
            <ul className="space-y-3 text-sm text-foreground/50">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-primary transition-colors">DMCA</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/30 font-[family-name:var(--font-mono)]">
            &copy; {new Date().getFullYear()} StreamBox
          </p>
          <p className="text-xs text-foreground/20 max-w-xl text-center md:text-right">
            This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  );
}
