import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-border)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 text-sm text-[color:var(--fg-3)] md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p>© 2026 HearthCode Studio</p>
          <p>
            <abbr title="Kamer van Koophandel">KvK</abbr>: 42047881 ·{' '}
            <abbr title="Belasting over de Toegevoegde Waarde">BTW</abbr>: NL005456707B34
          </p>
        </div>
        <ul className="flex gap-6">
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/toegankelijkheidsverklaring">Toegankelijkheid</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
