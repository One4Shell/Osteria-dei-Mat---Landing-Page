
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface ReviewsProps {
  reviews: any[];
  info: any;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, info }) => {
  return (
    <section id="reviews" className="py-32 bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter">Cosa Dicono <br /><span className="text-orange-600">di Noi</span></h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 text-center backdrop-blur-xl shadow-2xl"
          >
            <div className="text-6xl font-black text-orange-500 mb-3">{info.rating}</div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="#f97316" className="text-orange-500" />)}
            </div>
            <p className="text-zinc-500 text-xs uppercase font-black tracking-[0.3em]">{info.reviewCount} Recensioni Google</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-zinc-900/30 p-10 rounded-[2rem] border border-zinc-800/50 relative group hover:border-orange-600/30 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 text-zinc-800 group-hover:text-orange-900/40 transition-colors" size={50} />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, idx) => <Star key={idx} size={16} fill="#f97316" className="text-orange-500" />)}
              </div>
              <p className="text-zinc-300 italic mb-8 leading-relaxed text-lg font-medium">"{review.text}"</p>
              <div className="flex flex-col gap-1">
                <p className="font-black text-white text-xl">{review.author}</p>
                <p className="text-zinc-600 text-xs uppercase font-black tracking-[0.2em]">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
