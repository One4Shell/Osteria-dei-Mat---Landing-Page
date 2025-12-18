
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../constants';

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-black">Cosa Dicono <br /><span className="text-orange-600">di Noi</span></h2>
          </div>
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">
            <div className="text-5xl font-black text-orange-500 mb-2">{RESTAURANT_INFO.rating}</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f97316" className="text-orange-500" />)}
            </div>
            <p className="text-zinc-500 text-sm uppercase font-bold">{RESTAURANT_INFO.reviewCount} Recensioni Google</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800 relative group"
            >
              <Quote className="absolute top-6 right-6 text-zinc-800 group-hover:text-orange-900 transition-colors" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="#f97316" className="text-orange-500" />)}
              </div>
              <p className="text-zinc-300 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div>
                <p className="font-bold text-white">{review.author}</p>
                <p className="text-zinc-600 text-xs uppercase font-bold tracking-widest">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
