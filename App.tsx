
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import ReservationForm from './components/ReservationForm';
import ProductSection from './components/ProductSection';
import ElitePartner from './components/ElitePartner';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { LOGO_URL } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [openingHours, setOpeningHours] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const parallaxScale = useTransform(scrollYProgress, [0.1, 0.5], [1.2, 1.8]);
  const parallaxY = useTransform(scrollYProgress, [0.1, 0.5], [0, 200]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resData, resHours] = await Promise.all([
          fetch('./restaurant_data.json').then(res => res.json()),
          fetch('./opening_hours.json').then(res => res.json())
        ]);
        setData(resData);
        setOpeningHours(resHours);
      } catch (err) {
        console.error("Error loading restaurant data:", err);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white overflow-x-hidden font-sans">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative mb-12"
            >
              <div className="absolute inset-0 bg-orange-600 blur-[80px] opacity-40 animate-pulse" />
              <img
                src={LOGO_URL}
                alt="Loading..."
                className="w-32 h-32 md:w-48 md:h-48 relative z-10"
                style={{ filter: 'invert(50%) sepia(85%) saturate(2500%) hue-rotate(345deg)' }}
              />
            </motion.div>
            <div className="w-48 md:w-64 h-[1px] bg-zinc-800 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-orange-600"
              />
            </div>
            <p className="mt-8 text-[10px] text-center font-black uppercase tracking-[1em] text-orange-600/80 animate-pulse">Inizializzando l'Eccellenza</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[1000] origin-left bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,1)]"
        style={{ scaleX }}
      />
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-[900] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar />

      <main className="relative">
        <Hero info={data?.restaurantInfo} />

        <section className="h-[90vh] relative overflow-hidden flex items-center justify-center">
          <motion.div
            style={{ scale: parallaxScale, y: parallaxY }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img
              src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2400"
              className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.2]"
              alt="Fire background"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20" />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-30 text-center px-6"
          >
            <span className="text-orange-500 font-black uppercase tracking-[0.6em] text-xs md:text-sm mb-10 block">Il Nostro Mantra</span>
            <h2 className="text-6xl md:text-[10rem] font-serif font-black uppercase tracking-tighter leading-none mb-12">
              Brace <span className="text-orange-600 italic">&</span><br />Passione
            </h2>
          </motion.div>
        </section>

        {data && (
          <>
            <About info={data.restaurantInfo} />
            <ProductSection />
            <ElitePartner />
            <Menu items={data.menuItems} />

            <div className="relative py-48 bg-zinc-950 flex justify-center overflow-hidden border-y border-zinc-900">
              <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center max-w-4xl px-6"
              >
                <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-16 leading-tight">
                  "Non è solo un pasto, è un rituale celebrato tra le fiamme."
                </h3>
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
                  href="#reservation"
                  className="inline-block bg-orange-600 text-white px-20 py-7 rounded-full font-black tracking-[0.2em] transition-all uppercase shadow-[0_30px_60px_rgba(234,88,12,0.3)] text-lg"
                >
                  PRENOTA IL TUO POSTO
                </motion.a>
              </motion.div>
            </div>

            <ReservationForm info={data.restaurantInfo} openingHours={openingHours} />
            <Reviews reviews={data.reviews} info={data.restaurantInfo} />
            <Contact info={data.restaurantInfo} />
          </>
        )}
      </main>

      <footer className="py-32 bg-black border-t border-zinc-900 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-24 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                className="w-12 h-12"
                style={{ filter: 'invert(50%) sepia(85%) saturate(2500%) hue-rotate(345deg)' }}
              />
              <span className="text-4xl font-serif font-black tracking-tighter text-white">
                OSTERIA <span className="text-orange-600">DEI</span> MAT
              </span>
            </div>
            <p className="text-zinc-500 text-lg max-w-sm leading-relaxed font-medium">
              L'eccellenza della carne alla brace nel borgo medievale di Vallecrosia Alta.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
          </div>

          <div className="flex flex-col items-center md:items-end gap-12">
            <motion.button
              whileHover={{ y: -10, scale: 1.1, backgroundColor: '#f97316', color: '#ffffff' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group p-8 bg-zinc-900 rounded-full border border-zinc-800 transition-all shadow-2xl text-orange-600"
            >
              <ArrowUp size={32} />
            </motion.button>
            <div className="text-right">
              <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.4em]">
                © 2026 Osteria dei Mat.
              </p>
              <p className="text-zinc-800 text-[8px] uppercase tracking-[0.2em] font-bold mt-2">Vallecrosia Alta, Italia</p>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        <motion.a
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          href={`https://wa.me/${data?.restaurantInfo.whatsapp}?text=Salve,%20vorrei%20prenotare%20un%20tavolo`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-10 right-10 z-[100] bg-green-600 p-6 rounded-full shadow-[0_20px_50px_rgba(22,163,74,0.4)] md:hidden flex items-center justify-center animate-pulse"
        >
          <MessageCircle size={32} color="white" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default App;
