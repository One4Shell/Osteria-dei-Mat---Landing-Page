
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { LOGO_URL } from '../constants'


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative w-12 h-12 overflow-hidden rounded-full border border-orange-500/30 group-hover:border-orange-500 transition-colors">
            <img 
              src={LOGO_URL} 
              alt="Osteria dei Mat Logo" 
              className="w-full h-full object-cover scale-150 transition-transform duration-500 group-hover:scale-[1.7]"
              style={{ 
                filter: 'invert(50%) sepia(90%) saturate(1500%) hue-rotate(345deg) brightness(100%) contrast(105%)'
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-black tracking-tighter text-white leading-none">
              OSTERIA <span className="text-orange-600">DEI</span> MAT
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Vallecrosia Alta</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 hover:text-orange-500 transition-all relative group"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-orange-600 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 hover:bg-zinc-800 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-zinc-800"
          >
            <div className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="text-2xl font-serif font-black tracking-tight text-zinc-200 hover:text-orange-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
