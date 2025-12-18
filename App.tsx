
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from './constants';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black min-h-screen text-white selection:bg-orange-600 selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        
        {/* Parallax Mid-Section (The Art of Meat) */}
        <section className="h-[60vh] relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-fixed bg-cover bg-center grayscale brightness-50 contrast-125"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000")' }}
          />
          <div className="absolute inset-0 fire-gradient opacity-60" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center"
          >
            <h2 className="text-4xl md:text-7xl font-serif font-black uppercase tracking-tighter">
              Frollatura <span className="text-orange-600">&</span> Passione
            </h2>
            <p className="text-xl md:text-2xl mt-4 font-light tracking-[0.2em] italic text-zinc-300">
              L'eccellenza che si scioglie in bocca
            </p>
          </motion.div>
        </section>

        <About />
        <Menu />
        
        {/* High-quality Meat Callout */}
        <section className="py-20 bg-orange-600 text-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <h3 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-center md:text-left">
              Vuoi gustare <br />la migliore scottona?
            </h3>
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Salve,%20vorrei%20prenotare%20un%20tavolo`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl flex items-center gap-3"
            >
              <MessageCircle />
              RISERVA IL TUO POSTO
            </a>
          </div>
        </section>

        <Reviews />
        <Contact />
      </main>

      <footer className="py-12 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold tracking-tighter text-white">
              OSTERIA <span className="text-orange-600">DEI</span> MAT
            </span>
          </div>
          <p className="text-zinc-600 text-sm">
            © 2024 Osteria dei Mat. Vallecrosia Alta. Tutti i diritti riservati.
          </p>
          <div className="flex gap-4">
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-3 bg-zinc-900 rounded-full border border-zinc-800 hover:text-orange-500 transition-colors">
                <ArrowUp size={20} />
             </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button (Mobile Persistent CTA) */}
      <a 
        href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Salve,%20vorrei%20prenotare%20un%20tavolo`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-green-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
      >
        <MessageCircle size={32} color="white" />
      </a>
    </div>
  );
};

export default App;
