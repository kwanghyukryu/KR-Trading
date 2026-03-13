import { useState } from 'react';

const questions = [
  {
    question: 'Do you provide pricing lists?',
    answer: 'Yes. We provide current pricing during quote response based on live market conditions.'
  },
  {
    question: 'Which businesses do you serve?',
    answer: 'Food service providers, wholesalers, grocery retailers, and restaurants across Metro Vancouver.'
  },
  {
    question: 'How fast do you respond?',
    answer: 'Most new inquiries are acknowledged within one business day.'
  }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-fade rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">FAQ</p>
      <h2 className="mt-1 font-display text-3xl text-brand-900">Common questions</h2>

      <div className="mt-5 space-y-3">
        {questions.map((q, index) => {
          const isOpen = openIndex === index;
          return (
            <article key={q.question} className="rounded-xl border border-brand-100 bg-sand">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              >
                <span className="font-semibold text-brand-900">{q.question}</span>
                <span className="text-sm font-semibold text-brand-500">{isOpen ? '−' : '+'}</span>
              </button>
              <div className={`faq-panel ${isOpen ? 'open' : ''}`}>
                <div>
                  <p className="px-4 pb-4 text-sm leading-6 text-brand-700">{q.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
