import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="top"
      className="hc-grain relative flex flex-col items-center px-6 pt-0 pb-12 text-center md:pb-16"
    >
      <h1 className="m-0 leading-none">
        <Image
          src="/brand/logo.png"
          alt="HearthCode Studio"
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1024px) 512px, (min-width: 640px) 60vw, 72vw"
          className="aspect-[5/4] w-[clamp(16rem,55vw,32rem)] object-cover"
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
        className={[
          'mt-8 inline-flex items-center rounded-lg px-8 py-4',
          'bg-[color:var(--color-bg-primary)] text-[color:var(--color-accent-gold)] no-underline',
          'font-semibold tracking-wide',
          'ring-1 ring-[color:var(--color-accent-gold)] transition',
          'hover:no-underline hover:shadow-[var(--glow-flame)]',
          'focus-visible:no-underline focus-visible:shadow-[var(--glow-flame)] focus-visible:outline-none',
        ].join(' ')}
      >
        Start a conversation
      </a>
    </section>
  );
}
