
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Zoom Effect */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2000"
          alt="Premium BBQ Steak"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-orange-500 font-bold tracking-[0.4em] uppercase text-sm mb-4 block">
            Vallecrosia Alta
          </span>
          <h1 className="text-6xl md:text-9xl font-serif font-black mb-6 leading-tight">
            L'Arte della <br />
            <span className="text-orange-600">Brace</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light italic">
            "Carne di eccellenza preparata con passione dal nostro chef macellaio pugliese."
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a 
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Salve,%20vorrei%20prenotare%20un%20tavolo`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl shadow-orange-900/20"
            >
              <MessageCircle size={20} />
              PRENOTA SU WHATSAPP
            </a>
            <a 
              href="#menu"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              SCOPRI IL MENU
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements (Embers) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
          animate={{ 
            y: "-10vh", 
            opacity: [0, 0.8, 0],
            rotate: 360
          }}
          transition={{ 
            duration: 4 + Math.random() * 4, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-orange-500 rounded-full blur-[1px] pointer-events-none z-10"
        />
      ))}

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-20"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
