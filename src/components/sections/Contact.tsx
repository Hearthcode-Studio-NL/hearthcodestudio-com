export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 pb-32">
      <h2 className="mb-8">Start a conversation</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Email is the best way in. Expect a reply within a day or two — usually sooner, occasionally
        slower when something non-trivial is in flight.
      </p>
      <a
        href="mailto:info@hearthcodestudio.com"
        className="font-heading inline-block text-2xl text-[color:var(--color-accent-gold)] md:text-3xl"
      >
        info@hearthcodestudio.com
      </a>
    </section>
  );
}
