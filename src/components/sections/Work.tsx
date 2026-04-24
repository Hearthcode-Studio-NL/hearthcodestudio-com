export function Work() {
  return (
    <section id="work" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="mb-8">Work</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Current tooling — part product, part sketchbook for how the studio wants to work — lives on
        GitHub.
      </p>
      <a
        href="https://github.com/Hearthcode-Studio-NL/property-utility-mapper"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-raised)] p-6 transition hover:border-[color:var(--color-accent-gold)] hover:shadow-[var(--glow-subtle)] md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h3 className="text-[color:var(--color-accent-gold)]">property-utility-mapper</h3>
          <p className="mt-2 text-sm text-[color:var(--fg-2)]">
            A tool for mapping utilities across property records. In active development — public on
            GitHub.
          </p>
        </div>
        <span
          aria-hidden="true"
          className="text-xl text-[color:var(--color-accent-gold)] transition group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </section>
  );
}
