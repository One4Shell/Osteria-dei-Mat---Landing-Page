
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface HeroProps {
  info: any;
}

const Hero: React.FC<HeroProps> = ({ info }) => {
  const { scrollY } = useScroll();
  
  // High-performance Parallax Interpolations
  const yBg = useTransform(scrollY, [0, 1000], [0, 450]);
  const yText = useTransform(scrollY, [0, 1000], [0, -250]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1.05, 1.6]);
  const opacityOverlay = useTransform(scrollY, [0, 800], [0.4, 1]);
  const blurBg = useTransform(scrollY, [0, 1000], [0, 15]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Layer */}
      <motion.div 
        style={{ scale: scaleBg, y: yBg, filter: `blur(${blurBg}px)` }}
        className="absolute inset-0 z-0 origin-center"
      >
        <motion.div 
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-black z-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[11]" />
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000"
          alt="Premium BBQ Steak"
          className="w-full h-full object-cover grayscale-[20%] brightness-[0.7]"
        />
      </motion.div>

      {/* Ember Particles Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: "110vh", 
              x: Math.random() * 100 + "vw", 
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.8, 0],
              x: (Math.random() * 100) + (Math.random() * 20 - 10) + "vw"
            }}
            transition={{ 
              duration: 4 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full blur-[2px] shadow-[0_0_15px_#f97316]"
          />
        ))}
      </div>

      {/* Floating 3D Text Content */}
      <motion.div 
        style={{ y: yText }}
        className="relative z-30 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 bg-orange-600/60" />
            <span className="text-orange-500 font-bold tracking-[0.8em] uppercase text-[10px]">
              Vallecrosia Alta
            </span>
            <div className="h-[1px] w-16 bg-orange-600/60" />
          </div>

          <h1 className="text-7xl md:text-[12rem] font-serif font-black mb-6 leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
            OSTERIA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 drop-shadow-[0_0_40px_rgba(234,88,12,0.4)]">DEI MAT</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-3xl text-zinc-300 max-w-4xl mx-auto mb-16 font-light italic tracking-tight"
          >
            "Dove la carne incontra il fuoco e la tradizione pugliese si fa arte."
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(234,88,12,0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#reservation"
              className="group bg-orange-600 text-white px-12 py-6 rounded-full font-black text-lg flex items-center gap-4 transition-all"
            >
              <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
              PRENOTA ORA
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              href="#menu"
              className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-12 py-6 rounded-full font-black text-lg transition-all"
            >
              IL NOSTRO MENU
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Accents */}
      <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-6 items-center z-30">
        <div className="h-40 w-[1px] bg-gradient-to-t from-orange-600 to-transparent" />
        <span className="[writing-mode:vertical-lr] text-orange-600 uppercase tracking-[0.8em] text-[10px] font-black">PUGLIA 2026</span>
      </div>

      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 z-30 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={48} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
