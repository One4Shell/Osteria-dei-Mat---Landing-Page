
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif font-black mb-8">Dove <span className="text-orange-600">Trovaci</span></h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="bg-zinc-900 p-4 rounded-xl text-orange-600 border border-zinc-800">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1 uppercase tracking-wider">Indirizzo</h4>
                <p className="text-zinc-400">{RESTAURANT_INFO.address}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-zinc-900 p-4 rounded-xl text-orange-600 border border-zinc-800">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1 uppercase tracking-wider">Telefono</h4>
                <p className="text-zinc-400">{RESTAURANT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-zinc-900 p-4 rounded-xl text-orange-600 border border-zinc-800">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1 uppercase tracking-wider">Orari</h4>
                <p className="text-zinc-400">Mar - Dom: 19:30 - 23:30</p>
                <p className="text-zinc-500 text-sm">Chiuso il Lunedì</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
             <a href="#" className="p-4 bg-zinc-900 rounded-full text-zinc-400 hover:text-orange-500 border border-zinc-800 transition-all">
                <Instagram size={24} />
             </a>
             <a href="#" className="p-4 bg-zinc-900 rounded-full text-zinc-400 hover:text-orange-500 border border-zinc-800 transition-all">
                <Facebook size={24} />
             </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 h-[400px] md:h-full shadow-2xl border border-zinc-800"
        >
           {/* Placeholder for Google Map - real iframe would go here */}
           <div className="w-full h-full bg-zinc-900 relative flex items-center justify-center p-10 text-center">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')] bg-cover grayscale" />
              <div className="relative z-10">
                <MapPin size={64} className="mx-auto text-orange-600 mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4">Ci trovi a Vallecrosia Alta</h3>
                <p className="text-zinc-500 mb-6">Piazza del Popolo, 5</p>
                <a 
                  href="https://maps.google.com/?q=Piazza+del+Popolo,+5,+18019+Vallecrosia+Alta"
                  target="_blank"
                  className="bg-zinc-800 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold transition-all"
                >
                  APRI IN GOOGLE MAPS
                </a>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
