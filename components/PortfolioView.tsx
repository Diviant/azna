
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import { TattooStyle } from '../types';

const PortfolioView: React.FC = () => {
  const [filter, setFilter] = useState<TattooStyle | 'Все'>('Все');
  const [scrollY, setScrollY] = useState(0);
  const [combinedData, setCombinedData] = useState(PORTFOLIO_DATA);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Load custom works from admin
    const customWorks = JSON.parse(localStorage.getItem('azna_portfolio') || '[]');
    setCombinedData([...customWorks, ...PORTFOLIO_DATA]);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = filter === 'Все' 
    ? combinedData 
    : combinedData.filter(item => item.style === filter);

  const styles = ['Все', ...Object.values(TattooStyle)];

  return (
    <div className="p-6 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col gap-2 mb-10 px-2">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Экспозиция</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-600 via-purple-400 to-pink-600 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-2">Лучшие работы студии AZNA</p>
      </div>
      
      {/* Dynamic Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-8 px-2">
        {styles.map(style => (
          <button
            key={style}
            onClick={() => setFilter(style as any)}
            className={`whitespace-nowrap px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              filter === style 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_10px_20px_rgba(168,85,247,0.4)]' 
                : 'glass-panel text-white/40 border-white/10 hover:border-white/30'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Luxury Performance Grid with Parallax */}
      <div className="grid grid-cols-1 gap-12">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="relative group rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl glass-panel p-3">
            <div className="relative aspect-square rounded-[2.8rem] overflow-hidden bg-black">
              <img 
                src={item.imageUrl} 
                alt={item.description} 
                style={{ 
                    transform: `translateY(${(scrollY - (index * 400)) * 0.05}px) scale(1.15)` 
                }}
                className="w-full h-full object-cover transition-transform duration-75 parallax-target opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-70"></div>
              <div className="absolute bottom-10 left-10 right-10 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                <span className="text-[10px] font-black m-gradient-text uppercase tracking-[0.4em] mb-2 block">Performance Art</span>
                <p className="text-2xl font-bold text-white italic tracking-tighter uppercase drop-shadow-lg">{item.description}</p>
              </div>
            </div>
            <div className="px-8 py-6 flex justify-between items-center bg-black/40 rounded-b-[2.8rem] group-hover:bg-black/20 transition-colors">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Style Class</span>
                <span className="text-sm font-bold uppercase text-white tracking-widest">{item.style}</span>
              </div>
              <div className="flex gap-0.5 group-hover:scale-110 transition-transform">
                 {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#ec4899" className="text-pink-500" />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-[3rem] border-dashed border-white/10 mx-2">
          <p className="uppercase font-black tracking-widest text-white/10">Данные не найдены</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioView;
