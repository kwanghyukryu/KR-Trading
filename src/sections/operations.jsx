const steps = [
  {
    title: '1. Requirement Intake',
    text: 'Capture SKU needs, cadence, and delivery window.'
  },
  {
    title: '2. Sourcing & Coordination',
    text: 'Confirm supply and align route timing with your operation.'
  },
  {
    title: '3. Delivery & Follow-up',
    text: 'Deliver, confirm handoff, and review upcoming requirements.'
  }
];

function Operations() {
  return (
    <section id="operations" className="section-fade grid gap-4 lg:grid-cols-[1fr_1fr]">
      <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Operations</p>
        <h2 className="mt-1 font-display text-3xl text-brand-900">How KR Trading works</h2>
        <div className="mt-5 space-y-3">
          {steps.map((step) => (
            <div key={step.title} className="card-lift timeline-step rounded-xl border border-brand-100 bg-sand p-4">
              <h3 className="font-semibold text-brand-900">{step.title}</h3>
              <p className="mt-1 text-sm text-brand-700">{step.text}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Client Confidence</p>
        <h2 className="mt-1 font-display text-3xl text-brand-900">What customers expect</h2>
        <div className="mt-5 rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4 text-sm leading-6 text-brand-700">
          "Communication is clear, delivery timing is consistent, and planning is easier."
          <p className="mt-3 font-semibold text-brand-900">Food Service Client, Metro Vancouver</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="card-lift rounded-xl border border-brand-100 bg-sand p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-brand-500">Coverage</p>
            <p className="mt-1 text-sm text-brand-800">Metro Vancouver and surrounding service corridors.</p>
          </div>
          <div className="card-lift rounded-xl border border-brand-100 bg-sand p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-brand-500">Communication</p>
            <p className="mt-1 text-sm text-brand-800">Quote and order follow-ups by email and phone.</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Operations;
