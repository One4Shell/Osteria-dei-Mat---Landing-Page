
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MenuCard = ({ item }: { item: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative bg-zinc-900/40 backdrop-blur-md rounded-[2rem] overflow-hidden border border-zinc-800/50 group h-full"
    >
      <div 
        style={{ transform: "translateZ(80px)" }}
        className="h-64 overflow-hidden relative"
      >
        <motion.img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute top-6 right-6 bg-orange-600 px-5 py-2 rounded-full shadow-2xl">
          <span className="text-white font-black text-lg">{item.price}</span>
        </div>
      </div>
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="p-8"
      >
        <h3 className="text-2xl font-serif font-black mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight">
          {item.name}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed font-medium">
          {item.description}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const Menu: React.FC<{ items: any[] }> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    return ['Tutti', ...uniqueCategories];
  }, [items]);

  const filteredItems = useMemo(() => {
    return activeCategory === 'Tutti' 
      ? items 
      : items.filter(item => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <section id="menu" className="py-32 bg-black relative perspective-container overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-orange-900/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block"
          >
            Esperienza Gastronomica
          </motion.span>
          <h2 className="text-6xl md:text-8xl font-serif font-black mb-12 uppercase tracking-tighter">
            Il Nostro <span className="text-orange-600">Menu</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-4 rounded-full border-2 transition-all duration-500 uppercase text-[10px] font-black tracking-[0.2em] ${
                  activeCategory === cat 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-[0_15px_30px_rgba(234,88,12,0.4)] scale-110' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-32">
            <p className="text-zinc-600 italic text-xl">Nessun piatto trovato in questa categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
