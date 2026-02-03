
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import ReservationForm from './components/ReservationForm';
import { MessageCircle, ArrowUp, Flame } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [openingHours, setOpeningHours] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Lifting hooks to the top level to avoid conditional hook calls
  const parallaxScale = useTransform(scrollYProgress, [0.1, 0.5], [1.1, 1.4]);
  const parallaxY = useTransform(scrollYProgress, [0.1, 0.5], [0, 150]);

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
        // Minimum delay for aesthetic loading
        setTimeout(() => setLoading(false), 1500);
      }
    };
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[999]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame size={80} className="text-orange-600 mb-6 drop-shadow-[0_0_30px_rgba(234,88,12,0.6)]" />
        </motion.div>
        <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-orange-600"
          />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.5em] text-orange-500/50">Osteria dei Mat</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.8)]"
        style={{ scaleX }}
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[90] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Navbar />
      
      <main className="relative">
        <Hero info={data.restaurantInfo} />
        
        {/* Cinematic Parallax Section */}
        <section className="h-[80vh] relative overflow-hidden flex items-center justify-center">
          <motion.div 
            style={{
              scale: parallaxScale,
              y: parallaxY,
            }}
            className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.3]"
            transition={{ type: 'spring', stiffness: 30 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2000" 
              className="w-full h-full object-cover"
              alt="Fire background"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-sm mb-6 block">Il Segreto è nella Brace</span>
            <h2 className="text-6xl md:text-9xl font-serif font-black uppercase tracking-tighter leading-none mb-8">
              Frollatura <span className="text-orange-600 italic">&</span><br />Eccellenza
            </h2>
            <div className="flex justify-center items-center gap-6">
               <div className="h-[1px] w-20 bg-orange-600" />
               <p className="text-xl md:text-2xl font-light tracking-[0.2em] italic text-zinc-300">
                L'arte pugliese in Vallecrosia
               </p>
               <div className="h-[1px] w-20 bg-orange-600" />
            </div>
          </motion.div>
        </section>

        <About info={data.restaurantInfo} />
        
        <Menu items={data.menuItems} />
        
        <div className="relative py-32 bg-zinc-950 flex justify-center overflow-hidden border-y border-zinc-900">
           <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="relative z-10 text-center max-w-2xl px-6"
           >
             <h3 className="text-4xl font-serif italic text-zinc-200 mb-10 leading-relaxed">
               "Non è solo carne, è un'emozione che brucia lentamente."
             </h3>
             <a 
               href="#reservation" 
               className="inline-block bg-orange-600 text-white px-12 py-5 rounded-full font-black tracking-widest hover:bg-white hover:text-black transition-all uppercase shadow-[0_0_40px_rgba(234,88,12,0.3)]"
             >
               Prenota ora l'esperienza
             </a>
           </motion.div>
        </div>

        <ReservationForm info={data.restaurantInfo} openingHours={openingHours} />

        <Reviews reviews={data.reviews} info={data.restaurantInfo} />
        
        <Contact info={data.restaurantInfo} />
      </main>

      <footer className="py-24 bg-black border-t border-zinc-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 items-center text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <Flame size={24} className="text-orange-600" />
              <span className="text-3xl font-serif font-bold tracking-tighter text-white">
                OSTERIA <span className="text-orange-600">DEI</span> MAT
              </span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              L'eccellenza della carne alla brace nel cuore del borgo medievale di Vallecrosia Alta. Sapori autentici della Puglia.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
             <h4 className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Navigazione</h4>
             <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <a href="#home" className="text-zinc-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Home</a>
                <a href="#about" className="text-zinc-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Chi Siamo</a>
                <a href="#menu" className="text-zinc-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Menu</a>
                <a href="#reservation" className="text-zinc-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Prenota</a>
             </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
             <motion.button 
               whileHover={{ y: -5, scale: 1.1 }}
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
               className="group p-5 bg-zinc-900 rounded-full border border-zinc-800 hover:border-orange-600 transition-all shadow-xl"
             >
                <ArrowUp size={24} className="text-orange-600" />
             </motion.button>
             <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em]">
                © 2026 Osteria dei Mat. Handmade Excellence.
             </p>
          </div>
        </div>
      </footer>

      {/* Persistent Mobile Action */}
      <AnimatePresence>
        <motion.a 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          href={`https://wa.me/${data.restaurantInfo.whatsapp}?text=Salve,%20vorrei%20prenotare%20un%20tavolo`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[100] bg-green-600 p-5 rounded-full shadow-[0_0_30px_rgba(22,163,74,0.4)] md:hidden flex items-center justify-center animate-pulse"
        >
          <MessageCircle size={28} color="white" />
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default App;
