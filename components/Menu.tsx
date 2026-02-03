
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MenuCard = ({ item }: { item: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Dynamic Reflection
  const lightX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "120%"]);
  const lightY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "120%"]);

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative bg-zinc-900/60 backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/5 group h-full shadow-2xl"
    >
      {/* 3D Content Container */}
      <div style={{ transform: "translateZ(60px)" }} className="relative">
        <div className="h-72 overflow-hidden relative">
          <motion.img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
          <div className="absolute bottom-6 right-6 bg-orange-600 px-6 py-2 rounded-full shadow-2xl">
            <span className="text-white font-black text-xl tracking-tighter">{item.price}</span>
          </div>
        </div>

        <div style={{ transform: "translateZ(40px)" }} className="p-10">
          <h3 className="text-3xl font-serif font-black mb-4 group-hover:text-orange-500 transition-colors uppercase tracking-tight leading-tight">
            {item.name}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed font-medium mb-4">
            {item.description}
          </p>
          <div className="w-12 h-1 bg-orange-600/30 rounded-full group-hover:w-full transition-all duration-500" />
        </div>
      </div>

      {/* Dynamic Lighting Overlay */}
      <motion.div 
        style={{
          background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.08) 0%, transparent 70%)`,
        }}
        className="absolute inset-0 pointer-events-none z-20"
      />
      
      {/* Glossy Border Mask */}
      <div className="absolute inset-0 border border-white/10 rounded-[3rem] pointer-events-none z-30" />
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
    <section id="menu" className="py-40 bg-black relative perspective-container overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-1/4 w-[800px] h-[800px] bg-orange-900/10 blur-[200px] rounded-full" />
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-zinc-900/40 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-500 font-black uppercase tracking-[0.8em] text-[10px] mb-8 block"
          >
            L'arte della frollatura
          </motion.span>
          <h2 className="text-7xl md:text-[9rem] font-serif font-black mb-16 uppercase tracking-tighter leading-[0.8]">
            <span className="text-white opacity-20">Selezione</span><br />
            <span className="text-orange-600 italic">Chef Macellaio</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-12 py-5 rounded-full border-2 transition-all duration-700 uppercase text-[10px] font-black tracking-[0.4em] ${
                  activeCategory === cat 
                    ? 'bg-orange-600 border-orange-600 text-white shadow-[0_20px_50px_rgba(234,88,12,0.4)] scale-110' 
                    : 'border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white backdrop-blur-md'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-40">
            <p className="text-zinc-600 italic text-2xl font-serif">Nessun piatto trovato in questa selezione.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
