import Image from 'next/image';

export function Hero() {
  return (
    <section
      id="top"
      className="hc-grain relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-20 text-center"
    >
      <h1 className="m-0 leading-none">
        <Image
          src="/brand/logo.png"
          alt="HearthCode Studio"
          width={1024}
          height={1024}
          priority
          sizes="(min-width: 1024px) 512px, (min-width: 640px) 60vw, 72vw"
          className="h-auto w-[clamp(16rem,55vw,32rem)]"
        />
      </h1>

      <p className="font-ornament mt-6 text-2xl text-[color:var(--fg-2)] italic md:text-3xl">
        Digital craft, deeply rooted.
      </p>

      <p className="mt-6 max-w-xl text-base text-[color:var(--fg-2)] md:text-lg">
        Apps, websites, and IT advisory — built for clients who want digital work done thoughtfully.
      </p>

      <a
        href="mailto:info@hearthcodestudio.com?subject=Hello%20HearthCode"
        className="bg-primary mt-10 inline-flex items-center rounded-lg px-8 py-4 font-semibold text-[color:var(--fg-on-gold)] shadow-[var(--glow-flame)] transition hover:shadow-[0_0_32px_rgba(255,140,66,0.6),0_0_56px_rgba(255,140,66,0.32)] focus-visible:shadow-[0_0_32px_rgba(255,140,66,0.6),0_0_56px_rgba(255,140,66,0.32)]"
      >
        Start a conversation
      </a>
    </section>
  );
}
