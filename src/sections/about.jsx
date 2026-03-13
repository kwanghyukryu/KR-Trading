function About() {
  return (
    <section id="about" className="section-fade grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-500">About KR Trading</p>
        <h2 className="mt-2 font-display text-3xl text-brand-900">A wholesale partner built on consistency</h2>
        <p className="mt-4 leading-7 text-brand-700">
          KR Trading is a fresh produce wholesale distribution company based in Metro Vancouver, serving food service businesses,
          restaurants, wholesalers, and grocery retailers throughout the region.
        </p>
        <p className="mt-4 leading-7 text-brand-700">
          Our team prioritizes timing, product condition, and operational clarity because even small supply disruptions can affect day-to-day execution.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-100 bg-sand p-4">
            <h3 className="font-semibold text-brand-900">Our Commitment</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-brand-700">
              <li>Fair and transparent pricing</li>
              <li>Dependable service levels</li>
              <li>Responsible sourcing practices</li>
              <li>Documentation and traceability</li>
            </ul>
          </div>
          <div className="rounded-xl border border-brand-100 bg-sand p-4">
            <h3 className="font-semibold text-brand-900">Who We Serve</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-brand-700">
              <li>Food service providers</li>
              <li>Wholesalers</li>
              <li>Grocery retailers</li>
              <li>Restaurants</li>
            </ul>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="image-mask overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
            alt="Fresh vegetables arranged for wholesale distribution"
            className="h-72 w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Relationship-first model</p>
          <p className="mt-2 text-sm leading-6 text-brand-700">
            KR Trading values long-term partnerships over one-time transactions and scales alongside customer demand planning.
          </p>
        </div>
      </article>
    </section>
  );
}

export default About;
