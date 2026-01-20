
import React, { useState, useEffect } from 'react';
import { Home, Image as ImageIcon, Calendar, User, ChevronLeft } from 'lucide-react';
import HomeView from './components/HomeView';
import PortfolioView from './components/PortfolioView';
import BookingView from './components/BookingView';
import ProfileView from './components/ProfileView';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
      };
    };
  }
}

type View = 'home' | 'portfolio' | 'booking' | 'profile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [history, setHistory] = useState<View[]>(['home']);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#000000');
      window.Telegram.WebApp.setBackgroundColor('#000000');
    }
  }, []);

  const navigate = (view: View) => {
    setHistory(prev => [...prev, view]);
    setActiveView(view);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevView = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setActiveView(prevView);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden selection:bg-red-600">
      {/* Premium Navigation Header */}
      <header className="px-6 py-5 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex items-center gap-4">
          {history.length > 1 && (
            <button onClick={goBack} className="w-10 h-10 flex items-center justify-center glass-panel rounded-full border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} className="text-white" />
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="text-xl font-black italic tracking-[0.2em] leading-none uppercase">AZNATATTOO</h1>
            <span className="text-[8px] font-bold text-red-600 tracking-[0.4em] uppercase mt-1">UFA PERFORMANCE</span>
          </div>
        </div>
        <div className="px-3 py-1 glass-panel rounded-full border-green-500/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase">ЗАПУЩЕНО</span>
        </div>
      </header>

      {/* Main Control Unit */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {activeView === 'home' && <HomeView onStartBooking={() => navigate('booking')} onOpenPortfolio={() => navigate('portfolio')} />}
        {activeView === 'portfolio' && <PortfolioView />}
        {activeView === 'booking' && <BookingView onSuccess={() => navigate('home')} />}
        {activeView === 'profile' && <ProfileView />}
      </main>

      {/* iDrive-Inspired Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 glass-panel rounded-[2.5rem] flex justify-around items-center px-4 z-50 border-white/10 ring-1 ring-white/5">
        <NavButton active={activeView === 'home'} onClick={() => navigate('home')} icon={<Home size={22} />} label="ГЛАВНАЯ" />
        <NavButton active={activeView === 'portfolio'} onClick={() => navigate('portfolio')} icon={<ImageIcon size={22} />} label="РАБОТЫ" />
        <div className="w-px h-8 bg-white/10"></div>
        <NavButton active={activeView === 'booking'} onClick={() => navigate('booking')} icon={<Calendar size={22} />} label="ЗАПИСЬ" />
        <NavButton active={activeView === 'profile'} onClick={() => navigate('profile')} icon={<User size={22} />} label="КАБИНЕТ" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-500 ${active ? 'text-white' : 'text-white/20'}`}
  >
    <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-600/30' : ''}`}>
      {icon}
    </div>
    <span className={`text-[8px] font-bold uppercase tracking-widest transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
  </button>
);

export default App;
