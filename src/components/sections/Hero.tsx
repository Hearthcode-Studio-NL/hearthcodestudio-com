export function Hero() {
  return (
    <section
      id="top"
      className="hc-grain relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-20 text-center"
    >
      <h1
        className="hc-wordmark"
        style={{ ['--hc-wordmark-size' as string]: 'clamp(3rem, 9vw, 6rem)' }}
      >
        <span className="hc-wordmark__primary">HearthCode</span>
        <span className="hc-wordmark__rule">
          <span>Studio</span>
        </span>
      </h1>

      <p className="font-ornament mt-8 text-2xl text-[color:var(--fg-2)] italic md:text-3xl">
        Digital craft, deeply rooted.
      </p>

      <p className="mt-6 max-w-xl text-base text-[color:var(--fg-2)] md:text-lg">
        Apps, websites, and IT advisory — built for clients who want digital work done thoughtfully.
      </p>

      <a
        href="mailto:hallo@hearthcodestudio.com?subject=Hello%20HearthCode"
        className="bg-primary mt-12 inline-flex items-center rounded-lg px-8 py-4 font-semibold text-[color:var(--fg-on-gold)] shadow-[var(--glow-flame)] transition hover:shadow-[0_0_32px_rgba(255,140,66,0.6),0_0_56px_rgba(255,140,66,0.32)] focus-visible:shadow-[0_0_32px_rgba(255,140,66,0.6),0_0_56px_rgba(255,140,66,0.32)]"
      >
        Start a conversation
      </a>
    </section>
  );
}
