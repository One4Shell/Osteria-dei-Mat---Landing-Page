
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, User, MessageCircle, AlertCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../constants';
import { openingHoursData } from '../opening_hours';

interface OpeningDay {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
  });

  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Genera gli slot orari ogni 30 minuti basandosi sull'orario di apertura
  const availableTimeSlots = useMemo(() => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay().toString() as keyof typeof openingHoursData;
    const schedule: OpeningDay = (openingHoursData as any)[dayOfWeek];

    if (schedule.closed) return [];

    const slots: string[] = [];
    let current = schedule.open;
    const end = schedule.close;

    // Funzione helper per aggiungere minuti a una stringa HH:mm
    const addMinutes = (time: string, mins: number) => {
      const [h, m] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(h, m + mins, 0);
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    while (current <= end) {
      slots.push(current);
      current = addMinutes(current, 30);
      // Evitiamo di prenotare esattamente all'orario di chiusura o dopo
      if (current >= end) break;
    }

    return slots;
  }, [formData.date]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    validateDate();
  }, [formData.date]);

  const validateDate = () => {
    if (!formData.date) return;

    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay().toString() as keyof typeof openingHoursData;
    const schedule: OpeningDay = (openingHoursData as any)[dayOfWeek];

    if (schedule.closed) {
      setError(`Siamo chiusi il ${schedule.day}. Ti aspettiamo negli altri giorni della settimana!`);
      setFormData(prev => ({ ...prev, time: '' }));
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error || !formData.time) return;

    const formattedDate = formatDate(formData.date);
    const message = `Salve, vorrei prenotare un tavolo a nome *${formData.name}* per il giorno *${formattedDate}* alle ore *${formData.time}* per *${formData.guests}* persone.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="reservation" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 shadow-2xl"
        >
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2 block">Prenotazione Rapida</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-4">Prenota il <span className="text-orange-600">Tuo Tavolo</span></h2>
            <p className="text-zinc-400">Seleziona data e ora tra le disponibilità effettive dell'Osteria.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600/50" size={18} />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Inserisci il tuo nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">Numero di Persone</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600/50" size={18} />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-600 transition-all appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n} className="bg-zinc-900">{n} {n === 1 ? 'Persona' : 'Persone'}</option>
                  ))}
                  <option value="10+" className="bg-zinc-900">Più di 10</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">Data</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600/50" size={18} />
                <input
                  required
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full bg-black/40 border ${error ? 'border-red-500' : 'border-zinc-800'} rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-600 transition-all [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">Orario</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600/50" size={18} />
                <select
                  required
                  name="time"
                  disabled={!!error || !formData.date}
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-600 transition-all appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <option value="" className="bg-zinc-900">Seleziona orario</option>
                  {availableTimeSlots.map(slot => (
                    <option key={slot} value={slot} className="bg-zinc-900">{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:col-span-2 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm"
                >
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="md:col-span-2 mt-4">
              <motion.button
                whileHover={(!error && formData.time) ? { scale: 1.02 } : {}}
                whileTap={(!error && formData.time) ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!!error || !formData.time || !formData.name}
                className={`w-full ${(error || !formData.time || !formData.name) ? 'bg-zinc-800 cursor-not-allowed text-zinc-500' : 'bg-orange-600 hover:bg-orange-700 text-white'} py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-900/20`}
              >
                <MessageCircle size={22} />
                {(error || !formData.date) ? 'DATA NON VALIDA' : !formData.time ? 'SCEGLI UN ORARIO' : 'INVIA PRENOTAZIONE SU WHATSAPP'}
              </motion.button>
              <p className="text-center text-zinc-600 text-[10px] mt-4 uppercase tracking-tighter">
                Il sistema mostra solo gli orari in cui la cucina è operativa.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationForm;
