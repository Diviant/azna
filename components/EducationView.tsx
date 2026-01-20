
import React from 'react';
import { GraduationCap, CheckCircle, Clock, Wallet, ArrowRight, Zap } from 'lucide-react';
import { EDUCATION_COURSES } from '../constants';

const EducationView: React.FC = () => {
  return (
    <div className="p-8 animate-in slide-in-from-bottom duration-500 pb-32">
      <div className="flex flex-col gap-2 mb-10 px-2">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">Academy</h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-2">СТАНЬ ЧАСТЬЮ M-TEAM</p>
      </div>

      <div className="space-y-10">
        {EDUCATION_COURSES.map(course => (
          <div key={course.id} className="glass-panel rounded-[3rem] p-10 border-white/5 relative overflow-hidden group">
            {/* HUD Elements */}
            <div className="absolute top-8 right-10">
               <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                 course.level === 'Elite' ? 'bg-purple-600/20 border-purple-600 text-purple-500' :
                 course.level === 'Pro' ? 'bg-pink-600/20 border-pink-600 text-pink-500' :
                 'bg-white/10 border-white/20 text-white/40'
               }`}>
                 {course.level} Level
               </div>
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">{course.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{course.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3">
                <Clock size={16} className="m-gradient-text" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{course.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Wallet size={16} className="m-gradient-text" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{course.price}</span>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 block">Программа:</span>
              {course.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full m-gradient-bg"></div>
                  <span className="text-xs font-bold uppercase tracking-wide text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full h-20 m-gradient-bg rounded-[2rem] flex items-center justify-between px-10 active:scale-95 transition-all group-hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)]">
              <span className="text-black font-black uppercase italic tracking-tighter text-xl">ХОЧУ ОБУЧЕНИЕ</span>
              <ArrowRight size={24} className="text-black group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Why Us Section */}
      <div className="mt-16 glass-panel rounded-[3rem] p-10 border-white/5 bg-gradient-to-br from-black to-[#080808]">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 glass-panel rounded-2xl flex items-center justify-center border-purple-600/30">
            <Zap className="text-purple-500" size={32} />
          </div>
          <h4 className="text-2xl font-black italic uppercase tracking-tighter">ПОЧЕМУ МЫ?</h4>
        </div>
        <p className="text-xs text-white/40 leading-loose italic">
          Я не учу рисовать. Я учу создавать искусство, которое остается на коже навсегда. 
          8 лет опыта в M-Performance Tattooing теперь доступны тебе. Никакой воды, только хардкорная практика и авторские фишки.
        </p>
      </div>
    </div>
  );
};

export default EducationView;
