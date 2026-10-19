import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings2, Sparkles } from 'lucide-react';
import { andalusianAudio } from '../utils/audioPlayer';

export const MusicFloatingButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [volume, setVolume] = useState(0.75);
  const [currentMode, setCurrentMode] = useState<'youtube' | 'synth' | 'custom'>('youtube');

  useEffect(() => {
    const unsub = andalusianAudio.subscribe(() => {
      setIsPlaying(andalusianAudio.getIsPlaying());
    });
    return unsub;
  }, []);

  const togglePlay = () => {
    const newState = andalusianAudio.toggle();
    setIsPlaying(newState);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    andalusianAudio.setVolume(newVol);
  };

  const selectTrackMode = (mode: 'youtube' | 'synth') => {
    setCurrentMode(mode);
    andalusianAudio.setMode(mode);
  };

  const applyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setCurrentMode('custom');
    andalusianAudio.setMode('custom', customUrl.trim());
    setShowSettings(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 font-cairo" dir="rtl">
      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-2 w-80 bg-[#FDF9FB] rounded-2xl p-4 border border-[#E8C5D0] shadow-2xl text-[#380C15] text-xs space-y-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8C5D0]">
            <span className="font-bold text-[#800020] flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#800020]" />
              <span>إعدادات الموسيقى والزفة</span>
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-[#733645] hover:text-[#380C15] font-bold px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Mode Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#733645]">
              اختيار الأغنية / الموسيقى :
            </label>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => selectTrackMode('youtube')}
                className={`p-2 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  currentMode === 'youtube'
                    ? 'bg-[#800020] text-white border-[#800020]'
                    : 'bg-white text-[#380C15] border-[#E8C5D0]'
                }`}
              >
                <div>
                  <span className="font-bold block">زفة فستانك الأبيض</span>
                  <span className={`text-[10px] block ${currentMode === 'youtube' ? 'text-pink-100' : 'text-[#800020]'}`}>
                    حسين الجسمي (خطوة ورا خطوة)
                  </span>
                </div>
                {currentMode === 'youtube' && <Sparkles className="w-4 h-4 text-pink-200" />}
              </button>

              <button
                type="button"
                onClick={() => selectTrackMode('synth')}
                className={`p-2 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                  currentMode === 'synth'
                    ? 'bg-[#800020] text-white border-[#800020]'
                    : 'bg-white text-[#380C15] border-[#E8C5D0]'
                }`}
              >
                <div>
                  <span className="font-bold block">معزوفة أندلسية مغربية</span>
                  <span className={`text-[10px] block ${currentMode === 'synth' ? 'text-pink-100' : 'text-[#800020]'}`}>
                    تقاسيم عود هادئة للأعراس
                  </span>
                </div>
                {currentMode === 'synth' && <Sparkles className="w-4 h-4 text-pink-200" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-[#733645] mb-1 font-bold">
              مستوى الصوت ({Math.round(volume * 100)}%)
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-[#800020] cursor-pointer"
            />
          </div>

          <form onSubmit={applyCustomUrl} className="space-y-1.5 pt-1">
            <label className="block text-[11px] text-[#733645] font-bold">
              رابط صوت MP3 مخصص (اختياري)
            </label>
            <input
              type="url"
              placeholder="https://...song.mp3"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E8C5D0] text-[11px]"
            />
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-[#800020] text-white font-bold hover:bg-[#6B1D2F] transition-colors cursor-pointer"
              >
                تطبيق الرابط
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Main Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-lg transition-all cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white border-[#E8C5D0] shadow-[#800020]/35'
              : 'bg-[#FDF9FB] text-[#800020] border-[#800020] hover:bg-[#F7EBEF]'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Animated Sound Wave Bars */}
              <div className="flex items-end gap-[3px] h-4">
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.1s] h-3" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.3s] h-4" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.2s] h-2.5" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:0.4s] h-3.5" />
              </div>
              <span className="font-cairo text-xs font-bold">
                الموسيقى شغّالة
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#800020]" />
              <span className="font-cairo text-xs font-bold">
                تشغيل الزفة
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          title="إعدادات الصوت"
          className="w-9 h-9 rounded-full bg-[#FDF9FB] border border-[#800020] text-[#800020] flex items-center justify-center shadow-md hover:bg-[#F7EBEF] transition-colors cursor-pointer"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
