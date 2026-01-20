
import React, { useState } from 'react';
import { CheckCircle2, Wand2, Loader2, Info } from 'lucide-react';
import { TattooStyle } from '../types';
import { BODY_AREAS, TATTOO_SIZES } from '../constants';
import { getTattooAdvice } from '../services/geminiService';

interface BookingViewProps {
  onSuccess: () => void;
}

const BookingView: React.FC<BookingViewProps> = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');
  const [formData, setFormData] = useState({
    style: TattooStyle.REALISM,
    size: TATTOO_SIZES[1],
    bodyArea: BODY_AREAS[0],
    date: '',
    time: '12:00',
    comment: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const askAI = async () => {
    if (!formData.comment) return;
    setLoading(true);
    const advice = await getTattooAdvice(formData.comment);
    setAiAdvice(advice || '');
    setLoading(false);
  };

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center animate-in zoom-in-95 duration-700">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-red-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(220,38,38,0.4)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-2 border-2 border-white/20 rounded-[2rem]"></div>
          <CheckCircle2 size={56} className="text-white relative z-10" />
        </div>
        <h2 className="text-5xl font-black italic mb-4 uppercase tracking-tighter leading-none">ORDER PLACED.</h2>
        <p className="text-white/40 mb-12 text-sm uppercase tracking-[0.2em] font-bold">
          Мастер свяжется с вами через зашифрованный канал Telegram.
        </p>
        <button 
          onClick={onSuccess}
          className="w-full bg-white text-black font-black py-6 rounded-[2rem] text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all hover:bg-neutral-100"
        >
          RETURN TO DASHBOARD
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 animate-in slide-in-from-bottom duration-500 pb-32">
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Configurator</h2>
          <span className="text-[10px] font-black text-white/30 tracking-[0.3em]">STAGE {step}/3</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-blue-600 to-red-600 transition-all duration-700 ease-out`} style={{ width: `${(step/3)*100}%` }}></div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">1. Техника исполнения</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(TattooStyle).map(s => (
                <button
                  key={s}
                  onClick={() => setFormData({...formData, style: s})}
                  className={`py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border transition-all ${
                    formData.style === s 
                      ? 'bg-red-600 text-white border-red-600 shadow-[0_10px_20px_rgba(220,38,38,0.3)]' 
                      : 'glass-panel text-white/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">2. Габариты (Размер)</label>
            <div className="space-y-3">
              {TATTOO_SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setFormData({...formData, size: s})}
                  className={`w-full py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest border transition-all px-8 flex justify-between items-center ${
                    formData.size === s 
                      ? 'bg-red-600 text-white border-red-600' 
                      : 'glass-panel text-white/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  {s}
                  {formData.size === s && <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_#fff]" />}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleNext} className="w-full bg-white text-black font-black py-6 rounded-[2rem] text-lg uppercase tracking-widest mt-6 shadow-xl active:scale-95 transition-all hover:bg-neutral-100">Продолжить</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">3. Зона установки (Место)</label>
            <div className="relative group">
              <select 
                value={formData.bodyArea}
                onChange={(e) => setFormData({...formData, bodyArea: e.target.value})}
                className="w-full glass-panel border-white/10 rounded-[1.5rem] py-6 px-8 text-white font-black uppercase tracking-widest appearance-none focus:outline-none focus:ring-1 focus:ring-red-600 transition-all group-hover:border-white/30"
              >
                {BODY_AREAS.map(a => <option key={a} value={a} className="bg-neutral-900">{a}</option>)}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 font-bold">▼</div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">4. Техническое задание (Идея)</label>
            <div className="relative group">
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({...formData, comment: e.target.value})}
                placeholder="Расскажите о концепте детали, масштабе или истории..."
                className="w-full glass-panel border-white/10 rounded-[2rem] py-8 px-8 text-white h-48 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 resize-none font-medium placeholder:text-white/10 group-hover:border-white/30"
              />
              <button 
                onClick={askAI}
                disabled={!formData.comment || loading}
                className="absolute bottom-6 right-6 flex items-center gap-2 text-[9px] font-black text-red-500 uppercase tracking-widest disabled:opacity-30 group"
              >
                {loading ? <Loader2 className="animate-spin" size={12} /> : <Wand2 size={12} className="group-hover:rotate-45 transition-transform" />}
                M-Advice AI
              </button>
            </div>
            {aiAdvice && (
              <div className="mt-8 glass-panel p-8 rounded-[2rem] border-red-600/20 text-xs italic text-red-100 leading-relaxed shadow-inner hover:border-red-600/40">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={14} className="text-red-600" />
                  <span className="font-black not-italic uppercase tracking-widest text-red-500">M-Performance Advice:</span>
                </div>
                {aiAdvice}
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button onClick={handleBack} className="w-1/3 glass-panel border-white/10 py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-white/10">Назад</button>
            <button onClick={handleNext} className="w-2/3 bg-white text-black font-black py-6 rounded-[2rem] text-lg uppercase tracking-widest shadow-xl hover:bg-neutral-100">Далее</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">5. Дата Сессии</label>
            <input 
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full glass-panel border-white/10 rounded-[1.5rem] py-6 px-8 text-white font-black focus:outline-none focus:ring-1 focus:ring-red-600 transition-all [color-scheme:dark] hover:border-white/30"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-white/30 mb-5 tracking-[0.4em]">6. Режим (Время)</label>
            <div className="grid grid-cols-3 gap-3">
              {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(t => (
                <button
                  key={t}
                  onClick={() => setFormData({...formData, time: t})}
                  className={`py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border transition-all ${
                    formData.time === t 
                      ? 'bg-red-600 text-white border-red-600 shadow-[0_10px_15px_rgba(220,38,38,0.2)]' 
                      : 'glass-panel text-white/40 border-white/10 hover:border-white/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2.5rem] border-white/5 space-y-4 shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
              <span className="text-white/30">Configuration Style</span>
              <span className="text-white">{formData.style}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
              <span className="text-white/30">Body Component</span>
              <span className="text-white">{formData.bodyArea}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
              <span className="text-white/30">Status</span>
              <span className="text-red-600 animate-pulse">Waiting Confirmation</span>
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!formData.date || loading}
            className="w-full bg-red-600 text-white font-black py-7 rounded-[2.5rem] text-xl uppercase tracking-widest flex items-center justify-center gap-4 disabled:opacity-30 shadow-[0_20px_40px_rgba(220,38,38,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'ЗАБРОНИРОВАТЬ'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingView;
