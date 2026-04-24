import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-bg-primary)]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label="HearthCode Studio — home"
          className="hc-wordmark"
          style={{ ['--hc-wordmark-size' as string]: '1.5rem' }}
        >
          <span className="hc-wordmark__primary">HearthCode</span>
          <span className="hc-wordmark__rule">
            <span>Studio</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-8 text-sm">
            <li>
              <a href="#approach">Approach</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
