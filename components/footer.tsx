import Link from 'next/link';
import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-text mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Film className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">Stream<span className="text-primary">Box</span></span>
            </Link>
            <p className="text-sm text-footer-text/60 leading-relaxed">
              Your ultimate destination for downloading high-quality movies for free. Explore our vast collection today.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-footer-text/50">Quick Links</h3>
            <ul className="space-y-2 text-sm text-footer-text/70">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/favorites" className="hover:text-primary transition-colors">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-footer-text/50">Legal</h3>
            <ul className="space-y-2 text-sm text-footer-text/70">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-primary transition-colors">DMCA</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-footer-text/50">Contact</h3>
            <ul className="space-y-2 text-sm text-footer-text/70">
              <li><a href="mailto:arparoycollection@gmail.com" className="hover:text-primary transition-colors">arparoycollection@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-footer-text/50">
            &copy; {new Date().getFullYear()} StreamBox. All rights reserved.
          </p>
          <p className="text-xs text-footer-text/40 max-w-xl text-center md:text-right">
            Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
          </p>
        </div>
      </div>
    </footer>
  );
}
