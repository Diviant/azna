
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Star, MapPin, Quote, ShieldCheck, MessageCircle, GraduationCap } from 'lucide-react';
import { MASTER_INFO, REVIEWS, TELEGRAM_CHANNEL } from '../constants';

interface HomeViewProps {
  onStartBooking: () => void;
  onOpenPortfolio: () => void;
  onOpenEducation: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartBooking, onOpenPortfolio, onOpenEducation }) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTelegram = () => {
    window.open(TELEGRAM_CHANNEL, '_blank');
  };

  return (
    <div ref={containerRef} className="animate-in fade-in duration-700">
      {/* Cinematic Tattoo Hero with Parallax */}
      <div className="relative h-[75vh] w-full px-4 pt-4 overflow-hidden">
        <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
          <img 
            src={MASTER_INFO.avatar} 
            alt="AZNA Master" 
            style={{ transform: `translateY(${scrollY * 0.2}px) scale(1.1)` }}
            className="w-full h-full object-cover brightness-105 contrast-110 object-top parallax-target"
          />
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          
          {/* Dashboard HUD overlay */}
          <div className="absolute bottom-12 left-10 right-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-purple-600 shadow-[0_0_20px_#a855f7]"></span>
              <span className="text-[11px] font-black tracking-[0.6em] uppercase text-white/90">AZNA PERFORMANCE</span>
            </div>
            <h2 className="text-6xl font-black italic tracking-tighter mb-6 leading-[0.8] uppercase text-white drop-shadow-2xl">
              ТЮНИНГ <br/><span className="m-gradient-text">ТВОЕГО</span> <br/>ТЕЛА.
            </h2>
            <div className="flex gap-4">
              <div className="px-6 py-2.5 glass-panel rounded-full border-white/20 text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-purple-500" /> Стерильность 1.0
              </div>
              <div className="px-6 py-2.5 glass-panel rounded-full border-white/20 text-[11px] font-black uppercase tracking-widest text-pink-500">
                UFA STAGE 3
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-14">
        {/* Navigation Blocks */}
        <div className="grid grid-cols-1 gap-6">
          <button 
            onClick={onStartBooking}
            className="group relative h-28 bg-white rounded-[2.8rem] overflow-hidden active:scale-95 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white"></div>
            <div className="relative z-10 flex items-center justify-between px-12">
              <div className="flex flex-col items-start">
                <span className="text-[11px] font-black text-black/40 uppercase tracking-[0.2em]">Booking Now</span>
                <span className="text-black font-black text-3xl italic uppercase tracking-tighter">ЗАПИСАТЬСЯ</span>
              </div>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-xl">
                <ArrowRight size={32} className="text-white" />
              </div>
            </div>
          </button>
          
          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={onOpenPortfolio}
              className="group relative h-32 glass-panel rounded-[3rem] border-white/10 overflow-hidden active:bg-white/5 transition-all"
            >
              <img src="https://files.catbox.moe/p9p6m2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2000ms]" alt="Gallery" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10 flex flex-col items-center justify-center gap-1 h-full">
                <span className="text-white font-black uppercase tracking-tighter italic text-xl">РАБОТЫ</span>
                <span className="m-gradient-text text-[9px] font-black uppercase tracking-widest">ГАЛЕРЕЯ</span>
              </div>
            </button>
            <button 
              onClick={onOpenEducation}
              className="group h-32 glass-panel rounded-[3rem] border-white/10 flex flex-col items-center justify-center gap-2 active:bg-white/5 transition-all bg-gradient-to-br from-[#111] to-black"
            >
              <div className="w-12 h-12 bg-pink-600/10 rounded-full flex items-center justify-center border border-pink-600/30 shadow-[0_0_20px_rgba(236,72,153,0.25)] group-hover:scale-110 transition-transform">
                <GraduationCap size={24} className="text-pink-500" />
              </div>
              <span className="text-white font-black uppercase tracking-tighter italic text-lg">ACADEMY</span>
            </button>
          </div>
        </div>

        {/* Master Info */}
        <div className="glass-panel rounded-[3rem] p-10 border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-600/20 transition-all duration-700"></div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="relative">
              <img src={MASTER_INFO.avatar} className="w-28 h-28 rounded-[2.5rem] object-cover border border-white/20 shadow-2xl object-top group-hover:scale-105 transition-transform" alt="Master" />
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-2xl border-2 border-black shadow-xl">
                <Star size={16} fill="white" className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase italic tracking-tighter text-white">{MASTER_INFO.name}</h3>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest mt-1">Топ-мастер Уфы • {MASTER_INFO.experience}</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="h-2 w-36 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-purple-600 via-purple-400 to-pink-600 shadow-[0_0_15px_#ec4899]"></div>
                </div>
                <span className="text-[10px] font-black text-pink-500 tracking-widest uppercase">Elite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-8">
          <div className="flex items-end justify-between px-3">
            <h4 className="text-3xl font-black uppercase italic tracking-tighter">ОТЗЫВЫ</h4>
            <span className="text-[11px] font-bold m-gradient-text uppercase tracking-widest underline decoration-2 underline-offset-8">ВСЕ</span>
          </div>
          <div className="flex overflow-x-auto gap-6 no-scrollbar pb-8 -mx-2 px-2">
            {REVIEWS.map(review => (
              <div key={review.id} className="min-w-[310px] glass-panel p-8 rounded-[3.5rem] border-white/5 bg-[#030303]">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="font-black text-base uppercase tracking-widest text-white">{review.author}</span>
                    <div className="flex gap-1 mt-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#ec4899" className="text-pink-500" />)}
                    </div>
                  </div>
                  <Quote size={28} className="text-white/5" />
                </div>
                <p className="text-sm text-white/50 font-medium leading-relaxed italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-8 p-10 glass-panel rounded-[3.5rem] border-white/5 bg-gradient-to-r from-[#030303] to-black group">
          <div className="w-20 h-20 bg-purple-600/10 rounded-[2.5rem] flex items-center justify-center border border-purple-600/20 shadow-[0_0_25px_rgba(168,85,247,0.2)] group-hover:bg-purple-600/20 group-hover:scale-105 transition-all">
            <MapPin className="text-purple-500" size={36} />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">ЛОКАЦИЯ: УФА</h4>
            <p className="text-base font-bold text-white/90 leading-tight">{MASTER_INFO.location}</p>
          </div>
        </div>

        <div className="py-14 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-5 px-10 py-4 glass-panel rounded-full border-purple-600/40 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
            <div className="w-3 h-3 m-gradient-bg rounded-full animate-pulse shadow-[0_0_15px_#ec4899]"></div>
            <span className="text-xs font-black uppercase tracking-[0.5em] text-purple-500">M-ENGINE READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
