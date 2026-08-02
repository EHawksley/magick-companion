/**
 * Sacred Observatory Layout
 * Left sidebar navigation (desktop) + bottom tab bar (mobile)
 * Dark theme, Cinzel display font, antique gold accents
 */
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { path: '/', label: 'Observatory', icon: '◎', description: 'Current hour & moon' },
  { path: '/ritual', label: 'Ritual', icon: '✦', description: 'Jupiter prayer & LBRP' },
  { path: '/planets', label: 'Planets', icon: '⊕', description: 'Seven classical planets' },
  { path: '/journal', label: 'Journal', icon: '✎', description: 'Ritual notes & AI feedback' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 min-h-screen border-r border-border bg-sidebar shrink-0 fixed left-0 top-0 bottom-0 z-20">
        {/* Logo */}
        <div className="px-5 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/magick-logo_6392b457.png"
              alt="Magick Companion"
              className="w-8 h-8 object-contain"
            />
            <div>
              <div className="font-display text-xs tracking-widest text-primary uppercase">Magick</div>
              <div className="font-display text-xs tracking-widest text-muted-foreground uppercase">Companion</div>
            </div>
          </div>
        </div>
        <div className="gold-rule mx-5 mb-5" />
        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group',
                    isActive
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  <span className={cn('text-base w-5 text-center', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')}>
                    {item.icon}
                  </span>
                  <div>
                    <div className={cn('text-sm font-medium', isActive ? 'text-primary' : '')}>
                      {item.label}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
        {/* Footer */}
        <div className="px-5 py-5">
          <div className="gold-rule mb-4" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Salt Lake City, UT<br />
            40.76°N · 111.89°W
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-sidebar border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={cn(
                  'flex flex-col items-center gap-1 px-3 py-1.5 rounded-md transition-all duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}>
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

