import { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setFeedback('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setFeedback('Email service is not configured. Add EmailJS env variables and try again.');
      return;
    }

    const formData = new FormData(form);
    const templateParams = {
      from_name: formData.get('name'),
      reply_to: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setStatus('success');
      setFeedback('Inquiry sent successfully. KR Trading will follow up shortly.');
      form.reset();
    } catch (error) {
      console.error('EmailJS send error:', error);
      setStatus('error');
      const reason = error?.text || error?.message || 'Unknown EmailJS error';
      setFeedback(`Failed to send inquiry: ${reason}`);
    }
  }

  return (
    <section id="contact" className="section-fade grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
      <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Contact</p>
        <h2 className="mt-1 font-display text-3xl text-brand-900">Request supply information</h2>
        <p className="mt-3 text-sm leading-6 text-brand-700">
          Share your business details and product requirements. Our team responds with availability, pricing context,
          and next-step coordination.
        </p>

        <div className="mt-5 space-y-3 text-sm text-brand-700">
          <p>
            <span className="font-semibold text-brand-900">Email:</span>{' '}
            <a href="mailto:info@krtradingbc.com" className="font-semibold text-brand-600 hover:text-brand-900">info@krtradingbc.com</a>
          </p>
          <p>
            <span className="font-semibold text-brand-900">Phone:</span>{' '}
            <a href="tel:+17782336554" className="font-semibold text-brand-600 hover:text-brand-900">778-233-6554</a>
          </p>
          <p><span className="font-semibold text-brand-900">Hours:</span> Monday to Friday, 8:00 AM - 5:00 PM (PT)</p>
        </div>

        <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
          KR Trading values relationships over transactions. We focus on dependable service and long-term customer outcomes.
        </div>
      </article>

      <article className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold text-brand-800">Your Name</label>
            <input
              id="name"
              name="name"
              required
              className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-brand-900 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-brand-800">Your Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-brand-900 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-semibold text-brand-800">Subject</label>
            <input
              id="subject"
              name="subject"
              required
              className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-brand-900 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold text-brand-800">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              className="w-full rounded-md border border-brand-100 px-3 py-2.5 text-brand-900 outline-none ring-brand-400 transition focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-md bg-pine px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>

          {feedback && (
            <p className={`text-sm font-semibold ${status === 'error' ? 'text-red-700' : 'text-pine'}`}>
              {feedback}
            </p>
          )}
        </form>
      </article>
    </section>
  );
}

export default Contact;
