import { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function Cart({ cart, setCart }) {
  const [placing, setPlacing] = useState(false);
  const [msg, setMsg] = useState('');

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const discount = subtotal > 299 ? +(subtotal * 0.2).toFixed(2) : 0;
    const total = +(subtotal - discount).toFixed(2);
    return { subtotal, discount, total };
  }, [cart]);

  const updateQty = (name, delta) => {
    setCart(prev => prev.map(i => i.name === name ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const removeItem = (name) => setCart(prev => prev.filter(i => i.name !== name));

  const [form, setForm] = useState({ customer_name: '', hostel_block: '', room_number: '', phone: '', notes: '' });

  const placeOrder = async () => {
    try {
      setPlacing(true);
      setMsg('');
      const items = cart.map(i => ({ name: i.name, unit_price: i.price, quantity: i.qty }));
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to place order');
      setMsg(`Order placed! ID: ${data.order_id}. Total ₹${data.total}`);
      setCart([]);
    } catch (e) {
      setMsg(e.message || 'Error');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-bold text-rose-900 mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-rose-700">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {cart.map(item => (
              <div key={item.name} className="flex items-center justify-between bg-white rounded-xl p-4 border border-rose-200">
                <div>
                  <div className="font-medium text-rose-900">{item.name}</div>
                  <div className="text-rose-700 text-sm">₹{item.price} × {item.qty} = ₹{item.price * item.qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item.name, -1)} className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200">-</button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.name, 1)} className="px-3 py-1 rounded-lg bg-rose-100 hover:bg-rose-200">+</button>
                  <button onClick={() => removeItem(item.name)} className="ml-3 px-3 py-1 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 h-fit">
            <div className="space-y-1 text-rose-900">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal}</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="text-green-700">-₹{totals.discount}</span></div>
              <div className="border-t border-rose-200 my-2" />
              <div className="flex justify-between font-semibold"><span>Total</span><span>₹{totals.total}</span></div>
            </div>
            <div className="mt-4 space-y-2">
              <input className="w-full rounded-lg border border-rose-200 px-3 py-2" placeholder="Your Name" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} />
              <input className="w-full rounded-lg border border-rose-200 px-3 py-2" placeholder="Hostel Block" value={form.hostel_block} onChange={e => setForm({ ...form, hostel_block: e.target.value })} />
              <input className="w-full rounded-lg border border-rose-200 px-3 py-2" placeholder="Room Number" value={form.room_number} onChange={e => setForm({ ...form, room_number: e.target.value })} />
              <input className="w-full rounded-lg border border-rose-200 px-3 py-2" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <textarea className="w-full rounded-lg border border-rose-200 px-3 py-2" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              <button disabled={placing || cart.length===0 || !form.customer_name || !form.phone} onClick={placeOrder} className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-lg py-2 font-medium disabled:opacity-50">
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>
              {msg && <div className="text-sm text-rose-800 mt-2">{msg}</div>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
