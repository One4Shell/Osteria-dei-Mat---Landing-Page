
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { LOGO_URL } from '../constants'

interface HeroProps {
  info: any;
}

const Hero: React.FC<HeroProps> = ({ info }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth springs for high-end feel
  const smoothY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // 3D Parallax & Zoom Transform Logic
  const yBg = useTransform(smoothY, [0, 1], ["0%", "30%"]);
  const scaleBg = useTransform(smoothY, [0, 1], [1, 1.4]);
  const logoRotate = useTransform(smoothY, [0, 1], [0, 15]);
  const logoY = useTransform(smoothY, [0, 1], [0, -200]);
  const textY = useTransform(smoothY, [0, 1], [0, -350]);
  const opacityOverlay = useTransform(smoothY, [0, 0.8], [0.3, 0.95]);

  return (
    <section ref={containerRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black perspective-container">
      {/* Background Layer with Zoom-Scroll */}
      <motion.div
        style={{ scale: scaleBg, y: yBg }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          style={{ opacity: opacityOverlay }}
          className="absolute inset-0 bg-black z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-[11]" />
        <img
          src="./public/images/hero.jpg"
          alt="Premium BBQ Steak"
          className="w-full h-full object-cover grayscale-[30%] contrast-[1.1] brightness-[0.6]"
        />
      </motion.div>

      {/* Cinematic Ember Field */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: "110vh",
              x: Math.random() * 100 + "vw",
              opacity: 0,
              scale: Math.random() * 0.4 + 0.2
            }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
              x: (Math.random() * 100) + (Math.random() * 30 - 15) + "vw"
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute w-1.5 h-1.5 bg-orange-500 rounded-full blur-[3px] shadow-[0_0_20px_#f97316]"
          />
        ))}
      </div>

      {/* Floating 3D Content Wrapper */}
      <motion.div
        style={{ y: textY }}
        className="relative z-30 text-center px-6"
      >
        {/* The Hero Logo - Floating & Rotating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateY: logoRotate, y: logoY }}
          className="relative mb-0 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-600/30 blur-[100px] rounded-full scale-100 group-hover:bg-orange-600/50 transition-colors" />
            <img
              src={LOGO_URL}
              alt="Osteria dei Mat Top Hat"
              className="w-48 md:w-80 h-auto relative z-10 drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              style={{
                filter: 'invert(50%) sepia(85%) saturate(2500%) hue-rotate(345deg) brightness(110%) contrast(110%)'
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-[1px] w-12 md:w-24 bg-orange-600/50" />
            <span className="text-orange-500 font-black tracking-[1em] uppercase text-[10px] md:text-xs">
              Vallecrosia Alta
            </span>
            <div className="h-[1px] w-12 md:w-24 bg-orange-600/50" />
          </div>

          <h1 className="text-6xl md:text-[8rem] font-serif font-black mb-8 leading-[0.85] tracking-tighter uppercase">
            <span className="block text-white opacity-90">Osteria</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-orange-400 via-orange-600 to-orange-900 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">Dei Mat</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-3xl text-zinc-400 max-w-4xl mx-auto mb-16 font-serif italic tracking-tight"
          >
            "Solo tagli pregiati, selezionati con cura e frollati a regola d'arte."
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Decorative Parallax Accents */}
      <motion.div
        style={{ y: useTransform(smoothY, [0, 1], [0, -100]) }}
        className="absolute left-16 bottom-24 hidden lg:flex flex-col gap-8 items-center z-30"
      >
        <div className="h-48 w-[1px] bg-gradient-to-t from-orange-600 to-transparent" />
        <span className="[writing-mode:vertical-lr] text-orange-600/50 uppercase tracking-[1em] text-[10px] font-black">VALLECROSIA 2026</span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 z-30 cursor-pointer flex flex-col items-center gap-2"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase font-black tracking-widest">Esplora</span>
        <ChevronDown size={40} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
