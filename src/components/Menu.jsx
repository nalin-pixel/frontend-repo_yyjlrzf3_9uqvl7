import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function Menu({ onAdd }) {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/menu`);
        if (!res.ok) throw new Error('Failed to load menu');
        const data = await res.json();
        setMenu(data);
      } catch (e) {
        setError(e.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) return <div className="p-6">Loading menu...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-rose-900 mb-4">Menu</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-rose-800 mb-2">Beverages</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {menu?.beverages?.map((item) => (
              <button key={item.name} onClick={() => onAdd(item)} className="text-left bg-rose-50 hover:bg-rose-100 transition rounded-xl p-4 border border-rose-200">
                <div className="font-medium text-rose-900">{item.name} {item.size ? `• ${item.size}` : ''}</div>
                <div className="text-rose-700">₹{item.price}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-rose-800 mb-2">Fast Food</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {menu?.fast_food?.map((item) => (
              <button key={item.name} onClick={() => onAdd(item)} className="text-left bg-rose-50 hover:bg-rose-100 transition rounded-xl p-4 border border-rose-200">
                <div className="font-medium text-rose-900">{item.name} {item.size ? `• ${item.size}` : ''}</div>
                <div className="text-rose-700">₹{item.price}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-6 text-rose-800/80">{menu?.note}</p>
    </section>
  );
}
