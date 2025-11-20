import { useState } from 'react';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-rose-50 to-white text-rose-950">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-rose-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-extrabold text-rose-700 text-xl">RTU Canteen</div>
          <div className="text-rose-800">Cart: {cart.reduce((s,i)=>s+i.qty,0)} items</div>
        </div>
      </header>

      <Hero />
      <Menu onAdd={addToCart} />
      <Cart cart={cart} setCart={setCart} />

      <footer className="border-t border-rose-200 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-rose-700 flex flex-col sm:flex-row gap-2 justify-between">
          <span>24×7 delivery to RTU hostels</span>
          <span>Call support: +91-99999-99999</span>
        </div>
      </footer>
    </div>
  )
}

export default App
