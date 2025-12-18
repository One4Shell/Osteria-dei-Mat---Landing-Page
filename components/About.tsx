
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <img 
              src="https://img.freepik.com/free-photo/confident-chef-wearing-uniform-presenting-fresh-steak-before-cooking-looking-camera-restaurant-kitchen_613910-18931.jpg?semt=ais_hybrid&w=740&q=80" 
              alt="Butcher Chef at work" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Faux 3D Floating Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-10 -right-10 bg-orange-600 p-8 rounded-2xl z-20 shadow-2xl border-4 border-zinc-950 max-w-[200px]"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="white" />)}
            </div>
            <p className="text-white font-bold text-sm uppercase tracking-wider">
              {RESTAURANT_INFO.rating}/5 eccellenza certificata
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Passione Pugliese</span>
          <h2 className="text-4xl md:text-6xl font-serif font-black mt-4 mb-8">
            Dalla Bottega <br /><span className="text-orange-600">alla Tavola</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            Situato nel cuore pulsante di Vallecrosia Alta, il nostro ristorante nasce dall'amore per le radici pugliesi e l'arte della macelleria. Ogni taglio di carne viene selezionato personalmente dal nostro Chef Macellaio, garantendo una tracciabilità totale e una qualità senza compromessi.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-600/10 p-3 rounded-lg text-orange-600">
                <ShieldCheck />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Qualità Superiore</h4>
                <p className="text-zinc-500">Carni certificate, frollate con cura per esaltarne il sapore naturale.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-600/10 p-3 rounded-lg text-orange-600">
                <Heart />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Cucina Pugliese</h4>
                <p className="text-zinc-500">I sapori del sud incontrano la tecnica del barbecue moderno.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
