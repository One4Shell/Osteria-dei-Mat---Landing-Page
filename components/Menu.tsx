
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from '../constants';

const Menu: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'meat' | 'traditional' | 'antipasti'>('all');

  const filteredItems = filter === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filter);

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'meat', label: 'Dalla Brace' },
    { id: 'traditional', label: 'Tradizione' },
    { id: 'antipasti', label: 'Antipasti' },
  ];

  return (
    <section id="menu" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-black mb-4 uppercase">Il Nostro <span className="text-orange-600">Menu</span></h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-8" />
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-6 py-2 rounded-full border transition-all uppercase text-xs font-bold tracking-widest ${
                  filter === cat.id 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-900/40' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-orange-600/30">
                    <span className="text-orange-500 font-bold">{item.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
