
import React, { useState, useEffect } from 'react';
import { Plus, Users, LayoutDashboard, Trash2, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { TattooStyle } from '../types';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'portfolio'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  
  // Form State for new portfolio item
  const [newWork, setNewWork] = useState({
    imageUrl: '',
    style: TattooStyle.REALISM,
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBookings(JSON.parse(localStorage.getItem('azna_bookings') || '[]'));
    setPortfolio(JSON.parse(localStorage.getItem('azna_portfolio') || '[]'));
  };

  const addWork = () => {
    if (!newWork.imageUrl) return;
    const work = { id: Date.now().toString(), ...newWork };
    const updated = [work, ...portfolio];
    localStorage.setItem('azna_portfolio', JSON.stringify(updated));
    setPortfolio(updated);
    setNewWork({ imageUrl: '', style: TattooStyle.REALISM, description: '' });
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    localStorage.setItem('azna_bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  const deleteWork = (id: string) => {
    const updated = portfolio.filter(p => p.id !== id);
    localStorage.setItem('azna_portfolio', JSON.stringify(updated));
    setPortfolio(updated);
  };

  return (
    <div className="p-8 animate-in slide-in-from-right duration-500 pb-32">
      <div className="flex flex-col gap-2 mb-10 px-2">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Админ Панель</h2>
        <div className="h-1.5 w-32 m-gradient-bg rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-2">M-PERFORMANCE CONTROL CENTER</p>
      </div>

      {/* Admin Nav */}
      <div className="flex gap-4 mb-10 px-2">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`flex-1 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all ${activeTab === 'bookings' ? 'm-gradient-bg text-black font-black' : 'glass-panel text-white/40 border-white/10'}`}
        >
          <Users size={18} />
          <span className="text-[10px] uppercase tracking-widest">Записи</span>
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`flex-1 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all ${activeTab === 'portfolio' ? 'm-gradient-bg text-black font-black' : 'glass-panel text-white/40 border-white/10'}`}
        >
          <LayoutDashboard size={18} />
          <span className="text-[10px] uppercase tracking-widest">Контент</span>
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Список заявок ({bookings.length})</h3>
            <button onClick={loadData} className="text-[8px] font-black text-pink-500 uppercase tracking-widest">Обновить</button>
          </div>
          
          {bookings.length === 0 ? (
            <div className="glass-panel p-20 rounded-[3rem] text-center border-dashed border-white/5">
              <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Заявок пока нет</span>
            </div>
          ) : (
            bookings.map(b => (
              <div key={b.id} className="glass-panel p-8 rounded-[3rem] border-white/10 relative group overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-black m-gradient-text uppercase tracking-widest block mb-1">{b.date} / {b.time}</span>
                    <h4 className="text-xl font-bold uppercase tracking-tight">{b.clientName}</h4>
                  </div>
                  <button onClick={() => deleteBooking(b.id)} className="p-3 bg-purple-600/10 rounded-xl text-purple-600 hover:bg-purple-600 hover:text-white transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Стиль</span>
                    <span className="text-xs font-bold uppercase">{b.style}</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Зона</span>
                    <span className="text-xs font-bold uppercase">{b.bodyArea}</span>
                  </div>
                </div>
                
                {b.comment && (
                  <div className="p-6 bg-black/40 rounded-2xl border border-white/5 italic text-sm text-white/50 mb-6">
                    "{b.comment}"
                  </div>
                )}

                <div className="flex gap-2">
                   <button className="flex-1 py-4 glass-panel border-green-600/30 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2">
                      <CheckCircle size={14} /> Подтвердить
                   </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-12">
          {/* Add New Work Form */}
          <div className="glass-panel p-10 rounded-[3.5rem] border-white/10">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-4">
              <Plus className="text-purple-500" /> Добавить работу
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-3">URL Изображения</label>
                <input 
                  type="text" 
                  value={newWork.imageUrl}
                  onChange={(e) => setNewWork({...newWork, imageUrl: e.target.value})}
                  placeholder="https://files.catbox.moe/..."
                  className="w-full glass-panel border-white/10 rounded-2xl py-5 px-6 text-sm focus:border-purple-600 transition-all outline-none"
                />
              </div>

              <div>
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-3">Стиль</label>
                <select 
                  value={newWork.style}
                  onChange={(e) => setNewWork({...newWork, style: e.target.value as TattooStyle})}
                  className="w-full glass-panel border-white/10 rounded-2xl py-5 px-6 text-sm outline-none appearance-none"
                >
                  {Object.values(TattooStyle).map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-3">Описание</label>
                <input 
                  type="text" 
                  value={newWork.description}
                  onChange={(e) => setNewWork({...newWork, description: e.target.value})}
                  placeholder="Напр: Змея на плече"
                  className="w-full glass-panel border-white/10 rounded-2xl py-5 px-6 text-sm outline-none"
                />
              </div>

              <button 
                onClick={addWork}
                className="w-full bg-white text-black font-black py-6 rounded-[2rem] text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                ОПУБЛИКОВАТЬ В ПОРТФОЛИО
              </button>
            </div>
          </div>

          {/* Current Custom Works */}
          <div className="space-y-6">
            <h3 className="text-xl font-black italic uppercase tracking-tighter px-2">Ваши публикации ({portfolio.length})</h3>
            <div className="grid grid-cols-2 gap-4">
              {portfolio.map(p => (
                <div key={p.id} className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 shadow-lg aspect-[3/4]">
                  <img src={p.imageUrl} className="w-full h-full object-cover" alt="Portfolio" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <button 
                    onClick={() => deleteWork(p.id)}
                    className="absolute top-4 right-4 p-3 bg-pink-600 rounded-xl shadow-xl hover:scale-110 transition-transform"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest block mb-1">{p.style}</span>
                    <p className="text-xs font-bold uppercase truncate">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {portfolio.length === 0 && (
              <p className="text-center text-white/20 text-[10px] font-bold uppercase py-10">Пользовательские работы отсутствуют</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
