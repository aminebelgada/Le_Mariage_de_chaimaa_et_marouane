import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface DressCodeProps {
  wedding: WeddingData;
}

export const DressCode: React.FC<DressCodeProps> = ({ wedding }) => {
  return (
    <section id="dress-code" className="py-20 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center space-y-2 mb-14">
          <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase flex items-center justify-center gap-2 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
            <span>قواعد اللباس</span>
          </p>
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#380C15] font-bold">
            {wedding.dressCode.title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#800020] to-[#C47B91] mx-auto rounded-full mt-3" />
          <p className="font-arabic text-base text-[#733645] max-w-xl mx-auto pt-1 leading-relaxed">
            {wedding.dressCode.description}
          </p>
        </div>

        {/* 2 Cards: Dames & Messieurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* للسيدات */}
          <div className="bg-[#FDF9FB] rounded-3xl p-7 border border-[#E8C5D0] shadow-sm relative overflow-hidden flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#F4D9E2] border border-[#C47B91] flex items-center justify-center text-[#800020] mb-4">
              <Sparkles className="w-7 h-7 text-[#800020]" />
            </div>
            <span className="font-cairo text-xs font-bold tracking-wider text-[#800020]">
              للسيدات الأفاضل
            </span>
            <h4 className="font-arabic text-2xl font-bold text-[#380C15] mt-1 mb-3">
              التكشيطة والقفطان المغربي
            </h4>
            <p className="text-xs sm:text-sm text-[#733645] font-cairo leading-relaxed">
              {wedding.dressCode.women}
            </p>
          </div>

          {/* للرجال */}
          <div className="bg-[#FDF9FB] rounded-3xl p-7 border border-[#E8C5D0] shadow-sm relative overflow-hidden flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#F4D9E2] border border-[#C47B91] flex items-center justify-center text-[#800020] mb-4">
              <Sparkles className="w-7 h-7 text-[#800020]" />
            </div>
            <span className="font-cairo text-xs font-bold tracking-wider text-[#800020]">
              للسادة الكرام
            </span>
            <h4 className="font-arabic text-2xl font-bold text-[#380C15] mt-1 mb-3">
              الجلابة المغربية أو البدلة الرسمية
            </h4>
            <p className="text-xs sm:text-sm text-[#733645] font-cairo leading-relaxed">
              {wedding.dressCode.men}
            </p>
          </div>
        </div>

        {/* Note on colors */}
        <div className="mt-8 max-w-lg mx-auto text-center p-4 rounded-2xl bg-white/80 border border-[#E8C5D0] text-xs font-cairo text-[#733645]">
          <p className="flex items-center justify-center gap-1.5 font-bold text-[#800020]">
            <Heart className="w-3.5 h-3.5 fill-[#800020]" />
            <span>ملاحظة لطيفة</span>
          </p>
          <p className="mt-1">{wedding.dressCode.colorNotes}</p>
        </div>
      </div>
    </section>
  );
};
