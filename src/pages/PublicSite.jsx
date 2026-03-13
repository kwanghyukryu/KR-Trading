import { useEffect, useMemo, useState } from 'react';
import Home from '../sections/home.jsx';
import About from '../sections/about.jsx';
import Products from '../sections/products.jsx';
import Operations from '../sections/operations.jsx';
import Faq from '../sections/faq.jsx';
import Contact from '../sections/contact.jsx';
import { apiRequest } from '../lib/api.js';

function PublicSite() {
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadInventory() {
      try {
        const data = await apiRequest('/api/inventory');
        if (!ignore) {
          setInventory(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to load inventory:', error);
        }
      }
    }

    loadInventory();
    return () => {
      ignore = true;
    };
  }, []);

  const inventoryByName = useMemo(() => {
    const map = {};
    inventory.forEach((item) => {
      map[item.name] = item.quantity;
    });
    return map;
  }, [inventory]);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Operations', href: '#operations' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-app text-brand-900">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3 font-display text-2xl leading-none tracking-tight text-brand-900">
            <span className="grid h-10 w-10 place-content-center rounded-md bg-brand-600 text-sm font-bold text-white">KR</span>
            KR Trading
          </a>

          <button
            className="rounded-md border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-brand-600 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>

          <ul
            className={`${
              open ? 'flex' : 'hidden'
            } absolute right-4 top-16 w-52 flex-col rounded-lg border border-brand-100 bg-white p-2 shadow-soft md:static md:flex md:w-auto md:flex-row md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50 hover:text-brand-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/admin.html" className="block rounded px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50 hover:text-brand-900">
                Admin
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl space-y-6 py-8">
        <Home />
        <About />
        <Products inventoryByName={inventoryByName} />
        <Operations />
        <Faq />
        <Contact />
      </main>

      <footer className="mt-8 border-t border-brand-100 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-wrap items-center justify-between gap-3 py-6 text-sm text-brand-600">
          <p>KR Trading. Fresh produce wholesale distribution in Metro Vancouver.</p>
          <div className="flex gap-5">
            <a className="hover:text-brand-900" href="#products">Products</a>
            <a className="hover:text-brand-900" href="#operations">Operations</a>
            <a className="hover:text-brand-900" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicSite;
