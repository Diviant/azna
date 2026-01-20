
import React, { useState, useEffect } from 'react';
import { Home, Image as ImageIcon, Calendar, User, ChevronLeft, ShieldCheck, GraduationCap } from 'lucide-react';
import HomeView from './components/HomeView';
import PortfolioView from './components/PortfolioView';
import BookingView from './components/BookingView';
import ProfileView from './components/ProfileView';
import AdminView from './components/AdminView';
import EducationView from './components/EducationView';

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

type View = 'home' | 'portfolio' | 'booking' | 'profile' | 'admin' | 'education';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [history, setHistory] = useState<View[]>(['home']);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [pin, setPin] = useState('');

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

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    if (newClicks >= 3) {
      setShowAdminAuth(true);
      setLogoClicks(0);
    } else {
      setLogoClicks(newClicks);
      setTimeout(() => setLogoClicks(0), 1000);
    }
  };

  const verifyPin = () => {
    if (pin === '1337') {
      navigate('admin');
      setShowAdminAuth(false);
      setPin('');
    } else {
      setPin('');
      alert('ACCESS DENIED');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden selection:bg-purple-600">
      {/* Admin Auth Modal */}
      {showAdminAuth && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
          <div className="w-full glass-panel p-10 rounded-[3rem] border-purple-600/30 text-center max-w-xs">
            <ShieldCheck size={48} className="text-purple-500 mx-auto mb-6 animate-pulse" />
            <h3 className="text-xl font-black italic uppercase mb-6 tracking-tighter">Enter M-Code</h3>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 text-center text-2xl font-black tracking-[1em] focus:outline-none focus:border-purple-600 mb-6"
              autoFocus
              maxLength={4}
            />
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setShowAdminAuth(false)} className="py-4 glass-panel rounded-2xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
              <button onClick={verifyPin} className="py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Login</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Navigation Header */}
      <header className="px-6 py-5 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/5">
        <div className="flex items-center gap-4">
          {history.length > 1 && (
            <button onClick={goBack} className="w-10 h-10 flex items-center justify-center glass-panel rounded-full border-white/10 active:scale-90 transition-transform">
              <ChevronLeft size={20} className="text-white" />
            </button>
          )}
          <div className="flex flex-col" onClick={handleLogoClick}>
            <h1 className="text-xl font-black italic tracking-[0.2em] leading-none uppercase select-none">AZNATATTOO</h1>
            <span className="text-[8px] font-bold m-gradient-text tracking-[0.4em] uppercase mt-1 select-none">UFA PERFORMANCE</span>
          </div>
        </div>
        <div className="px-3 py-1 glass-panel rounded-full border-green-500/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase">ЗАПУЩЕНО</span>
        </div>
      </header>

      {/* Main Control Unit */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {activeView === 'home' && <HomeView onStartBooking={() => navigate('booking')} onOpenPortfolio={() => navigate('portfolio')} onOpenEducation={() => navigate('education')} />}
        {activeView === 'portfolio' && <PortfolioView />}
        {activeView === 'booking' && <BookingView onSuccess={() => navigate('home')} />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'admin' && <AdminView />}
        {activeView === 'education' && <EducationView />}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 glass-panel rounded-[2.5rem] flex justify-around items-center px-2 z-50 border-white/10 ring-1 ring-white/5">
        <NavButton active={activeView === 'home'} onClick={() => navigate('home')} icon={<Home size={20} />} label="ГЛАВНАЯ" />
        <NavButton active={activeView === 'portfolio'} onClick={() => navigate('portfolio')} icon={<ImageIcon size={20} />} label="РАБОТЫ" />
        <NavButton active={activeView === 'education'} onClick={() => navigate('education')} icon={<GraduationCap size={20} />} label="УЧЕБА" />
        <NavButton active={activeView === 'booking'} onClick={() => navigate('booking')} icon={<Calendar size={20} />} label="ЗАПИСЬ" />
        <NavButton active={activeView === 'profile'} onClick={() => navigate('profile')} icon={<User size={20} />} label="КАБИНЕТ" />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-500 flex-1 ${active ? 'text-white' : 'text-white/20'}`}
  >
    <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-purple-600/20 shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-purple-600/30' : ''}`}>
      {icon}
    </div>
    <span className={`text-[7px] font-bold uppercase tracking-widest transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
  </button>
);

export default App;
