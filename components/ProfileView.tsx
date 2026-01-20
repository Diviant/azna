
import React from 'react';
import { Calendar, Clock, MapPin, Bell, Info, ShieldAlert } from 'lucide-react';

const ProfileView: React.FC = () => {
  return (
    <div className="p-8 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase">Бортовой Журнал</h2>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-white to-red-600 rounded-full"></div>
      </div>

      {/* High-End Session Display */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6 px-2">
          <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">Active Mission</label>
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
        </div>
        
        <div className="glass-panel border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
          {/* Carbon accent */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rotate-45 group-hover:bg-white/10 transition-all"></div>
          
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 glass-panel border-red-600/30 rounded-full text-[8px] font-black text-red-500 uppercase tracking-widest mb-6">
              Processing...
            </div>
            <h3 className="text-3xl font-black italic mb-8 uppercase tracking-tighter leading-tight">Project Wolf: <br/><span className="text-white/40">Sleeve Part 1</span></h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 glass-panel rounded-2xl flex items-center justify-center border-white/5">
                  <Calendar size={18} className="text-white/40" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Launch Date</span>
                  <span className="text-sm font-bold uppercase tracking-wider">24 Октября, 2024</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 glass-panel rounded-2xl flex items-center justify-center border-white/5">
                  <Clock size={18} className="text-white/40" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Time Limit</span>
                  <span className="text-sm font-bold uppercase tracking-wider">14:00 (4h Session)</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-12 bg-white/5 border border-white/10 py-5 rounded-[2rem] text-[10px] font-black text-red-600 uppercase tracking-widest hover:bg-red-600/10 hover:border-red-600/30 transition-all">
              Abort Session
            </button>
          </div>
        </div>
      </div>

      {/* Control Systems */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-4 block px-2">Settings & Logistics</label>
        
        <button className="w-full flex items-center justify-between p-6 glass-panel rounded-[2rem] border-white/5 hover:bg-white/5 transition-all">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-600/20">
              <Bell size={20} className="text-red-600" />
            </div>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block">Alert System</span>
              <span className="text-sm font-bold uppercase">Уведомления</span>
            </div>
          </div>
          <span className="px-3 py-1 glass-panel rounded-full text-[8px] font-black text-green-500 border-green-500/20">ACTIVE</span>
        </button>

        <button className="w-full flex items-center justify-between p-6 glass-panel rounded-[2rem] border-white/5 hover:bg-white/5 transition-all">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-600/20">
              <Info size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/20 block">Maintenance</span>
              <span className="text-sm font-bold uppercase">Правила ухода</span>
            </div>
          </div>
          <div className="w-8 h-8 flex items-center justify-center glass-panel rounded-full">
            <span className="text-white/20">→</span>
          </div>
        </button>
      </div>

      <div className="mt-20 flex flex-col items-center gap-4 opacity-10">
        <div className="h-px w-20 bg-white"></div>
        <p className="text-[9px] font-black uppercase tracking-[0.8em]">SYSTEM-X5-M-INKFLOW</p>
      </div>
    </div>
  );
};

export default ProfileView;
