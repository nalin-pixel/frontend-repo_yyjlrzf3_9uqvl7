import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/Tddl75W6Ij9Qp77j/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-28 lg:py-32">
        <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-rose-700">
                RTU Canteen • 24×7 Hostel Delivery
              </h1>
              <p className="mt-3 text-rose-800/80 text-lg">
                Fresh beverages and fast food delivered to your room anytime.
              </p>
              <p className="mt-2 text-rose-900 font-medium">
                20% off on orders above ₹299
              </p>
            </div>
            <div className="hidden md:block w-px h-24 bg-rose-300/60" />
            <ul className="grid grid-cols-2 gap-4 text-rose-900/90 text-sm">
              <li className="bg-white/70 rounded-xl px-4 py-3 shadow">Tea / Coffee — ₹10</li>
              <li className="bg-white/70 rounded-xl px-4 py-3 shadow">Cold Coffee — ₹30</li>
              <li className="bg-white/70 rounded-xl px-4 py-3 shadow">Banana Shake 1L — ₹90</li>
              <li className="bg-white/70 rounded-xl px-4 py-3 shadow">Patties — ₹20</li>
              <li className="bg-white/70 rounded-xl px-4 py-3 shadow">Cold Drink 2L — ₹100</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white" />
    </section>
  );
}
