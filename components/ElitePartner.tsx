import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Star } from 'lucide-react';

const ElitePartner: React.FC = () => {
    return (
        <section className="py-32 bg-zinc-950 relative overflow-hidden border-y border-zinc-900/50">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 relative"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="h-[1px] w-12 bg-zinc-800" />
                            <div className="mx-4 flex items-center gap-2">
                                <Star className="text-orange-500 fill-orange-500" size={14} />
                                <Star className="text-orange-500 fill-orange-500" size={18} />
                                <Star className="text-orange-500 fill-orange-500" size={14} />
                            </div>
                            <div className="h-[1px] w-12 bg-zinc-800" />
                        </div>

                        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-4 tracking-tight">
                            Partner <span className="text-orange-600">Elitaria</span>
                        </h2>

                        <div className="inline-block px-4 py-1.5 border border-orange-600/30 rounded-full bg-orange-600/5 backdrop-blur-sm">
                            <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em]">
                                Dal 2022
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-16 w-full mt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-zinc-900/20 p-8 rounded-3xl border border-white/5 hover:border-orange-600/20 transition-all group"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                                    <Award className="text-orange-500" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Qualità Certificata</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                Standard d'eccellenza riconosciuti a livello internazionale per la selezione e frollatura.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-zinc-900/30 p-8 rounded-3xl border border-orange-600/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Star size={120} className="text-orange-600" />
                            </div>
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-2xl bg-orange-600 shadow-[0_10px_30px_rgba(234,88,12,0.3)]">
                                    <ShieldCheck className="text-white" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Partner Ufficiale</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                Un legame indissolubile con i migliori fornitori per garantire tracciabilità totale e trasparenza.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-zinc-900/20 p-8 rounded-3xl border border-white/5 hover:border-orange-600/20 transition-all group"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:scale-110 transition-transform">
                                    <Star className="text-orange-500" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Tradizione Futura</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                Rinnoviamo ogni giorno il patto con l'eccellenza, guardando alle radici ma puntando alle stelle.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 opacity-30"
                    >
                        <p className="font-serif italic text-zinc-500">Elitaria Srl è un'azienda italiana specializzata nella selezione, importazione e distribuzione di carni bovine di alta qualità, destinata principalmente a ristoranti di eccellenza. Fondata nel 2007, ma con radici nella distribuzione alimentare fin dagli anni '80, l'azienda si concentra sulla ricerca di razze pregiate provenienti da tutto il mondo, valorizzando la storia e le particolarità di ogni animale.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ElitePartner;
