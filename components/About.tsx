
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart } from 'lucide-react';

interface AboutProps {
  info: any;
}

const About: React.FC<AboutProps> = ({ info }) => {
  return (
    <section id="about" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative z-10 border border-zinc-800">
            <img
              src="./images/first.webp"
              alt="Butcher Chef at work"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Faux 3D Floating Badge */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -right-12 bg-orange-600 p-10 rounded-[2rem] z-20 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-8 border-zinc-950 max-w-[240px]"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="white" className="text-white" />)}
            </div>
            <p className="text-white font-black text-base uppercase tracking-wider leading-tight">
              {info.rating}/5 eccellenza certificata
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">Passione</span>
          <h2 className="text-5xl md:text-8xl font-serif font-black mt-6 mb-12 leading-none uppercase tracking-tighter">
            Dalla Bottega <br /><span className="text-orange-600">alla Tavola</span>
          </h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-12 font-medium">
            Situato nel cuore pulsante di Vallecrosia Alta, il nostro ristorante nasce dall'amore e dall'arte della macelleria. Ogni taglio di carne viene selezionato personalmente dal nostro Chef Macellaio.
          </p>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="bg-orange-600/10 p-5 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">Qualità Superiore</h4>
                <p className="text-zinc-500 text-base leading-relaxed max-w-sm">Carni certificate, frollate con cura per esaltarne il sapore naturale e la tenerezza.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="bg-orange-600/10 p-5 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <Heart size={32} />
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">La carne</h4>
                <p className="text-zinc-500 text-base leading-relaxed max-w-sm">I sapori delle materie prime incontrano la tecnica del barbecue moderno in un connubio unico.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
