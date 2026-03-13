import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api.js';

const TOKEN_KEY = 'kr_admin_token';
const ADMIN_KEY = 'kr_admin_email';

function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem(ADMIN_KEY) || '');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [inventory, setInventory] = useState([]);
  const [draft, setDraft] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(token);

  async function loadInventory(activeToken = token) {
    setLoading(true);
    try {
      const data = await apiRequest('/api/inventory', {
        headers: activeToken ? { Authorization: `Bearer ${activeToken}` } : {}
      });
      setInventory(data);
      setDraft(Object.fromEntries(data.map((item) => [item.id, String(item.quantity)])));
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      loadInventory();
    }
  }, [isLoggedIn]);

  const grouped = useMemo(() => {
    const groups = {};
    inventory.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [inventory]);

  async function handleLogin(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const result = await apiRequest('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify(loginForm)
      });
      setToken(result.token);
      setAdminEmail(result.admin.email);
      localStorage.setItem(TOKEN_KEY, result.token);
      localStorage.setItem(ADMIN_KEY, result.admin.email);
      setLoginForm({ email: '', password: '' });
      setStatus({ type: 'success', message: 'Login successful.' });
      loadInventory(result.token);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  async function handleSave(productId) {
    const draftKey = String(productId);
    const rawQuantity = String(draft[draftKey] ?? '').trim();
    const quantity = rawQuantity === '' ? Number.NaN : Number.parseInt(rawQuantity, 10);

    if (!Number.isInteger(quantity) || quantity < 0) {
      setStatus({ type: 'error', message: 'Quantity must be a non-negative number.' });
      return;
    }

    setStatus({ type: '', message: '' });
    try {
      const updated = await apiRequest(`/api/inventory/${productId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity })
      });
      setInventory((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setDraft((prev) => ({ ...prev, [draftKey]: String(updated.quantity) }));
      setStatus({ type: 'success', message: `Updated ${updated.name} quantity to ${updated.quantity}.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken('');
    setAdminEmail('');
    setInventory([]);
    setDraft({});
    setStatus({ type: '', message: '' });
  }

  return (
    <div className="min-h-screen bg-app px-4 py-10 text-brand-900 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-500">Admin Panel</p>
            <h1 className="font-display text-4xl">Inventory Management</h1>
          </div>
          <a href="/" className="rounded-md border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Back to Website
          </a>
        </div>

        {!isLoggedIn ? (
          <section className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-2xl">Admin Login</h2>
            <form onSubmit={handleLogin} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="admin-email" className="mb-1 block text-sm font-semibold text-brand-800">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-md border border-brand-100 px-3 py-2.5 outline-none ring-brand-400 focus:ring-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="admin-password" className="mb-1 block text-sm font-semibold text-brand-800">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full rounded-md border border-brand-100 px-3 py-2.5 outline-none ring-brand-400 focus:ring-2"
                />
              </div>
              <button type="submit" className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">
                Sign In
              </button>
            </form>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-brand-700">Logged in as <span className="font-semibold text-brand-900">{adminEmail}</span></p>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              >
                Logout
              </button>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-brand-100 bg-white p-6 text-sm text-brand-700">Loading inventory...</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <article key={category} className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-2xl text-brand-900">{category}</h3>
                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="grid items-center gap-3 rounded-xl border border-brand-100 bg-sand p-3 sm:grid-cols-[1fr_140px_auto]">
                        <div>
                          <p className="font-semibold text-brand-900">{item.name}</p>
                          <p className="text-xs text-brand-600">Updated: {new Date(item.updated_at).toLocaleString()}</p>
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={draft[item.id] ?? ''}
                          onChange={(e) => setDraft((prev) => ({ ...prev, [item.id]: e.target.value }))}
                          className="w-full rounded-md border border-brand-100 px-3 py-2 outline-none ring-brand-400 focus:ring-2"
                        />
                        <button
                          type="button"
                          onClick={() => handleSave(item.id)}
                          className="rounded-md bg-pine px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
                        >
                          Save
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
              ))
            )}
          </section>
        )}

        {status.message && (
          <p className={`mt-4 rounded-md border px-4 py-3 text-sm font-semibold ${status.type === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-emerald-300 bg-emerald-50 text-emerald-700'}`}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
