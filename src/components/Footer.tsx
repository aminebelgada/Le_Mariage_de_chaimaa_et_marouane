import React from 'react';
import { Heart } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface FooterProps {
  wedding: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ wedding }) => {
  return (
    <footer className="py-16 px-4 bg-[#25050B] text-[#E8C5D0] border-t border-[#4A0E17] text-center relative overflow-hidden" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Monogram Seal in Footer */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#9B233A] via-[#800020] to-[#4A0E17] p-[1.5px] mx-auto shadow-md">
          <div className="w-full h-full rounded-full bg-[#25050B] flex items-center justify-center">
            <span className="font-arabic text-base font-bold text-[#E8C5D0]">
              {wedding.brideInitial} | {wedding.groomInitial}
            </span>
          </div>
        </div>

        {/* Hadith / Traditional Blessing */}
        <div className="space-y-2">
          <p className="font-arabic text-3xl sm:text-4xl text-[#F4D0DB] leading-relaxed font-bold">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className="font-arabic text-base text-[#C47B91] max-w-md mx-auto">
            « جعل الله أيامكما عامرة بالمودة والسكينة والمحبة الدائمة. »
          </p>
        </div>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C47B91] to-transparent mx-auto" />

        <div className="space-y-1">
          <h4 className="font-arabic text-3xl sm:text-4xl text-[#F4D0DB] font-bold">
            {wedding.brideName} & {wedding.groomName}
          </h4>
          <p className="font-arabic text-base text-[#A86475]">
            {wedding.formattedDateAr} • {wedding.venueCity}
          </p>
        </div>

        <p className="text-xs font-cairo text-[#8C4656] flex items-center justify-center gap-1.5 pt-4">
          <span>صُممت هذه الدعوة بكل حب لمشاركتكم هذه الفرحة الملكية الميمونة</span>
          <Heart className="w-3.5 h-3.5 fill-[#C47B91] text-[#C47B91]" />
        </p>
      </div>
    </footer>
  );
};
