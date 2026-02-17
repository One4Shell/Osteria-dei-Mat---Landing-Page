
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Thermometer, Zap, Award, Target } from 'lucide-react';
import { LOGO_URL } from '../constants';

const ProductSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.45], [0, 1]);

  return (
    <section className="py-40 bg-black relative overflow-hidden">
      {/* Decorative Parallax Background Element */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2000')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Visual & 3D Cards */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative"
            >
              <div className="absolute -top-6 -left-6 bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
                <Thermometer className="text-white" size={32} />
              </div>
              <h4 className="text-2xl font-serif font-bold text-orange-500 mb-4 ml-8">Frollatura Dry Age</h4>
              <p className="text-zinc-400 leading-relaxed">
                Le nostre carni riposano in celle a temperatura e umidità controllate per un periodo che va dai 45 ai 90 giorni. Questo processo naturale rompe le fibre e concentra i sapori, regalando note di nocciola e burro.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative lg:ml-12"
            >
              <div className="absolute -top-6 -left-6 bg-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg -rotate-12 border border-orange-600/30">
                <Target className="text-orange-500" size={32} />
              </div>
              <h4 className="text-2xl font-serif font-bold text-white mb-4 ml-8">Selezione Etica</h4>
              <p className="text-zinc-400 leading-relaxed">
                Collaboriamo solo con piccoli allevamenti che rispettano il benessere animale. Selezioniamo capi con una marezzatura (intramuscular fat) superiore alla media per garantire una scioglievolezza unica.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-orange-600 font-black uppercase tracking-[0.5em] text-[10px]"
            >
              Il Metodo "Mat"
            </motion.span>
            <h2 className="text-6xl md:text-8xl font-serif font-black mt-6 mb-10 leading-none uppercase tracking-tighter">
              L'Alchimia <br />
              <span className="text-orange-500">del Fuoco</span>
            </h2>

            <div className="h-1 w-32 bg-orange-600 mb-12" />

            <p className="text-zinc-300 text-xl leading-relaxed mb-10 font-light italic">
              "Un bravo macellaio sa che la carne è viva anche dopo il taglio. Va ascoltata, aspettata e infine domata dalla brace."
            </p>

            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-orange-500">
                  <Zap size={24} />
                  <span className="font-black uppercase tracking-widest text-xs">Shock Termico</span>
                </div>
                <p className="text-zinc-500 text-sm">Tecnica di sigillatura immediata per preservare i succhi interni della carne, creando una crosta (reazione di Maillard) perfetta.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-orange-500">
                  <Award size={24} />
                  <span className="font-black uppercase tracking-widest text-xs">Origine Protetta</span>
                </div>
                <p className="text-zinc-500 text-sm">Dal cuore e della passione arrivano i segreti della lavorazione, fusi con l'innovazione dei tagli internazionali.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Floating Image Accent */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0.4, 0.7], [100, -100]) }}
        className="absolute top-1/4 right-0 w-64 h-64 opacity-20 pointer-events-none hidden xl:block"
      >
        <img src={LOGO_URL} className="w-full h-full object-contain rotate-45" alt="Meat slice" />
      </motion.div>
    </section>
  );
};

export default ProductSection;
