function Home() {
  return (
    <section id="home" className="section-fade overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
      <div className="grid items-stretch lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-7 sm:p-10">
          <p className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Fresh Produce | Reliable Supply | Trusted Distribution
          </p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight text-brand-900 sm:text-5xl">
            Dependable wholesale produce for service-focused operations
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-600">
            KR Trading supports food businesses across Metro Vancouver with quality produce, predictable delivery windows,
            and clear communication from sourcing to final handoff.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">
              Browse Product Categories
            </a>
            <a href="#contact" className="rounded-md border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Request A Quote
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-brand-100 bg-sand p-4">
              <p className="font-display text-2xl text-brand-900">24hr</p>
              <p className="text-sm text-brand-600">Typical response time for new inquiries</p>
            </div>
            <div className="rounded-xl border border-brand-100 bg-sand p-4">
              <p className="font-display text-2xl text-brand-900">Metro</p>
              <p className="text-sm text-brand-600">Vancouver-focused distribution coverage</p>
            </div>
            <div className="rounded-xl border border-brand-100 bg-sand p-4">
              <p className="font-display text-2xl text-brand-900">Traceable</p>
              <p className="text-sm text-brand-600">Documentation and sourcing visibility</p>
            </div>
          </div>
        </div>

        <div className="image-mask relative min-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80"
            alt="Wholesale produce crates ready for distribution"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-5 left-5 right-5 z-10 rounded-xl border border-white/20 bg-brand-900/75 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-[0.12em] text-saffron">Operational Priority</p>
            <p className="mt-1 text-sm">Minimize delivery friction so restaurants and retailers stay stocked without interruption.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
