import Link from 'next/link';

const navLinkStyle = { textDecoration: 'none' };

const navLinkClass = [
  'text-[color:var(--color-accent-gold)] no-underline',
  'transition',
  'hover:no-underline hover:[text-shadow:0_0_16px_rgba(212,165,116,1),0_0_32px_rgba(212,165,116,0.6),0_0_48px_rgba(212,165,116,0.3)]',
  'focus-visible:no-underline focus-visible:[text-shadow:0_0_16px_rgba(212,165,116,1),0_0_32px_rgba(212,165,116,0.6),0_0_48px_rgba(212,165,116,0.3)] focus-visible:outline-none',
].join(' ');

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label="HearthCode Studio — home"
          className="hc-wordmark transition hover:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))] focus-visible:[filter:drop-shadow(0_0_18px_rgba(212,165,116,0.95))_drop-shadow(0_0_36px_rgba(212,165,116,0.5))] focus-visible:outline-none"
          style={{ ['--hc-wordmark-size' as string]: '1.75rem' }}
        >
          <span className="hc-wordmark__primary">HearthCode</span>
          <span className="hc-wordmark__rule">
            <span>Studio</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-10 text-base">
            <li>
              <a href="#approach" className={navLinkClass} style={navLinkStyle}>
                Approach
              </a>
            </li>
            <li>
              <a href="#work" className={navLinkClass} style={navLinkStyle}>
                Work
              </a>
            </li>
            <li>
              <a href="#contact" className={navLinkClass} style={navLinkStyle}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
