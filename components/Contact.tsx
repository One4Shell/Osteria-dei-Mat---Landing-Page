
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Infinity, Facebook } from 'lucide-react';

interface ContactProps {
  info: any;
}

const Contact: React.FC<ContactProps> = ({ info }) => {
  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-serif font-black mb-16 uppercase tracking-tighter leading-none">Dove <br /><span className="text-orange-600">Trovarci</span></h2>
          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="bg-zinc-900 p-5 rounded-2xl text-orange-600 border border-zinc-800 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xl">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">Indirizzo</h4>
                <p className="text-zinc-400 text-lg">{info.address}</p>
              </div>
            </div>

            <div className="flex gap-8 group">
              <div className="bg-zinc-900 p-5 rounded-2xl text-orange-600 border border-zinc-800 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xl">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">Telefono</h4>
                <p className="text-zinc-400 text-lg">{info.phone}</p>
              </div>
            </div>

            <div className="flex gap-8 group">
              <div className="bg-zinc-900 p-5 rounded-2xl text-orange-600 border border-zinc-800 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xl">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="font-black text-2xl mb-2 uppercase tracking-tight">Orari</h4>
                <p className="text-zinc-400 text-lg font-medium">Mer - Dom: 19:30 - 23:30</p>
                <p className="text-orange-600/70 text-sm font-bold uppercase tracking-widest mt-1">Chiuso il Lunedì e il martedì</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <motion.a whileHover={{ y: -5 }} href="https://www.tripadvisor.com/Restaurant_Review-g26867601-d28123744-Reviews-Osteria_Dei_Mat-Vallecrosia_Alta_Province_of_Imperia_Liguria.html" className="p-5 bg-zinc-900 rounded-full text-zinc-400 hover:text-orange-500 border border-zinc-800 hover:border-orange-600 transition-all shadow-lg">
              <Infinity size={28} />
            </motion.a>
            <motion.a whileHover={{ y: -5 }} href="https://www.facebook.com/people/Osteria-dei-Mat/61561326031174/" className="p-5 bg-zinc-900 rounded-full text-zinc-400 hover:text-orange-500 border border-zinc-800 hover:border-orange-600 transition-all shadow-lg">
              <Facebook size={28} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 h-[500px] md:h-[650px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-zinc-800 relative group"
        >
          <div className="w-full h-full bg-zinc-900 relative flex items-center justify-center p-12 text-center">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')] bg-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            <div className="relative z-10 group-hover:scale-110 transition-transform duration-700">
              <div className="bg-orange-600 p-8 rounded-full inline-block mb-10 shadow-[0_0_60px_rgba(234,88,12,0.6)]">
                <MapPin size={48} className="text-white" />
              </div>
              <h3 className="text-4xl font-serif font-black mb-6 uppercase tracking-tighter">Ci trovi a Vallecrosia Alta</h3>
              <p className="text-zinc-400 text-xl mb-12 font-medium">Piazza del Popolo, 5</p>
              <a
                href="https://maps.app.goo.gl/RKaAt6WC6B7e233v5"
                target="_blank"
                className="bg-white text-black hover:bg-orange-600 hover:text-white px-10 py-5 rounded-full text-sm font-black tracking-widest transition-all shadow-2xl uppercase"
              >
                APRI MAPS
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
