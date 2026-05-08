import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="top"
      className="hc-grain relative flex flex-col items-center px-6 pt-0 pb-12 text-center md:pb-16"
    >
      <h1 className="m-0 leading-none">
        <Image
          src="/brand/logo-full-default.svg"
          alt="HearthCode Studio"
          width={1097}
          height={1097}
          priority
          unoptimized
          className="h-auto w-[clamp(16rem,55vw,32rem)]"
        />
      </h1>

      <p className="font-ornament -mt-2 text-2xl text-[color:var(--fg-2)] italic md:text-3xl">
        Digital craft, deeply rooted.
      </p>

      <p className="mt-6 max-w-xl text-base text-[color:var(--fg-2)] md:text-lg">
        Apps, websites, and IT advisory — built for clients who want digital work done thoughtfully.
      </p>

      <a
        href="mailto:info@hearthcodestudio.com?subject=Hello%20HearthCode"
        style={{ textDecoration: 'none' }}
        className={[
          'mt-8 inline-flex items-center rounded-lg px-8 py-4',
          'bg-[color:var(--color-bg-primary)] text-[color:var(--color-accent-gold)]',
          'font-semibold tracking-wide [text-decoration:none!important]',
          'ring-1 ring-[color:var(--color-accent-gold)] transition',
          'hover:shadow-[var(--glow-flame)] hover:[text-decoration:none!important]',
          'focus-visible:shadow-[var(--glow-flame)] focus-visible:outline-none focus-visible:[text-decoration:none!important]',
        ].join(' ')}
      >
        Start a conversation
      </a>
    </section>
  );
}
