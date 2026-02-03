
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, User, MessageCircle, AlertCircle } from 'lucide-react';

interface ReservationFormProps {
  info: any;
  openingHours: any;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ info, openingHours }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
  });

  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const availableTimeSlots = useMemo(() => {
    if (!formData.date || !openingHours) return [];
    
    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay().toString();
    const schedule = openingHours[dayOfWeek];

    if (!schedule || schedule.closed) return [];

    const slots: string[] = [];
    let current = schedule.open;
    const end = schedule.close;

    const addMinutes = (time: string, mins: number) => {
      const [h, m] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(h, m + mins, 0);
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    while (current < end) {
      slots.push(current);
      current = addMinutes(current, 30);
    }

    return slots;
  }, [formData.date, openingHours]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (!formData.date || !openingHours) return;

    const selectedDate = new Date(formData.date);
    const dayOfWeek = selectedDate.getDay().toString();
    const schedule = openingHours[dayOfWeek];

    if (!schedule || schedule.closed) {
      setError(`Siamo chiusi il ${schedule?.day || 'questo giorno'}. Ti aspettiamo negli altri giorni della settimana!`);
      setFormData(prev => ({ ...prev, time: '' }));
    } else {
      setError(null);
    }
  }, [formData.date, openingHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error || !formData.time) return;

    const formattedDate = formatDate(formData.date);
    const message = `Salve, vorrei prenotare un tavolo a nome *${formData.name}* per il giorno *${formattedDate}* alle ore *${formData.time}* per *${formData.guests}* persone.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${info.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="reservation" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/30 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] border border-zinc-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Prenotazione Rapida</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-6 uppercase tracking-tighter">Prenota il <br /><span className="text-orange-600">Tuo Tavolo</span></h2>
            <p className="text-zinc-500 text-lg font-medium">Seleziona data e ora tra le disponibilità effettive dell'Osteria.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block ml-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600" size={20} />
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Il tuo nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-2 border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-orange-600 transition-all font-bold placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block ml-2">Persone</label>
              <div className="relative">
                <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600" size={20} />
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-black/60 border-2 border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-orange-600 transition-all appearance-none cursor-pointer font-bold"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n} className="bg-zinc-900">{n} {n === 1 ? 'Persona' : 'Persone'}</option>
                  ))}
                  <option value="10+" className="bg-zinc-900">Più di 6 (Contattaci)</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block ml-2">Data</label>
              <div className="relative">
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600" size={20} />
                <input
                  required
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full bg-black/60 border-2 ${error ? 'border-red-500' : 'border-zinc-800'} rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-orange-600 transition-all font-bold [color-scheme:dark]`}
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 block ml-2">Orario</label>
              <div className="relative">
                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-600" size={20} />
                <select
                  required
                  name="time"
                  disabled={!!error || !formData.date}
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full bg-black/60 border-2 border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-white focus:outline-none focus:border-orange-600 transition-all appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed font-bold`}
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
                  className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-2xl flex items-center gap-4 text-sm font-bold"
                >
                  <AlertCircle size={24} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="md:col-span-2 mt-6">
              <motion.button
                whileHover={(!error && formData.time) ? { scale: 1.02 } : {}}
                whileTap={(!error && formData.time) ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!!error || !formData.time || !formData.name}
                className={`w-full ${(error || !formData.time || !formData.name) ? 'bg-zinc-800 cursor-not-allowed text-zinc-600' : 'bg-orange-600 hover:bg-orange-700 text-white shadow-[0_20px_40px_rgba(234,88,12,0.3)]'} py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all uppercase tracking-widest`}
              >
                <MessageCircle size={28} />
                {(error || !formData.date) ? 'DATA NON VALIDA' : !formData.time ? 'SCEGLI UN ORARIO' : 'PRENOTA VIA WHATSAPP'}
              </motion.button>
              <p className="text-center text-zinc-600 text-[10px] mt-6 uppercase tracking-[0.2em] font-bold">
                Riceverai conferma immediata via chat dal nostro staff.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationForm;
