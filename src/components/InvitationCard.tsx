import React, { useRef, useState } from 'react';
import { Share2, Download, Calendar, Copy, Check, Heart, ExternalLink, Printer } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface InvitationCardProps {
  wedding: WeddingData;
  onOpenCustomizer?: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ wedding }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`حفل زفاف ${wedding.brideName} ومروان`);
    const details = encodeURIComponent(
      `يسرنا دعوتكم لحفل زفاف ${wedding.brideName} ومروان في ${wedding.venueName}، ${wedding.venueCity}. ${wedding.invitationSubtext}`
    );
    const location = encodeURIComponent(`${wedding.venueName}، ${wedding.venueCity}`);
    
    const cleanDate = wedding.weddingDate.replace(/-/g, '');
    const cleanTime = wedding.weddingTime.replace(/:/g, '') + '00';
    const startIso = `${cleanDate}T${cleanTime}`;
    const endIso = `${cleanDate}T235959`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const downloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mariage Royale Maroc//AR',
      'BEGIN:VEVENT',
      `SUMMARY:حفل زفاف ${wedding.brideName} و ${wedding.groomName}`,
      `DESCRIPTION:${wedding.invitationSubtext}`,
      `LOCATION:${wedding.venueName}، ${wedding.venueCity}`,
      `DTSTART:${wedding.weddingDate.replace(/-/g, '')}T${wedding.weddingTime.replace(/:/g, '')}00`,
      `DTEND:${wedding.weddingDate.replace(/-/g, '')}T235959`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Zafaf_${wedding.brideName}_${wedding.groomName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareWhatsApp = () => {
    const text = `💍 *دعوة لحفل زفاف ملكي*\n\nببالغ الفرح والسرور، يسعدنا ويشرفنا دعوتكم لحضور حفل زفافنا البهيج :\n\n✨ *${wedding.brideName} & ${wedding.groomName}*\n\n📅 *الموعد :* ${wedding.formattedDateAr}\n⏰ *التوقيت :* ${wedding.formattedTimeAr}\n📍 *المكان :* ${wedding.venueName}، ${wedding.venueCity}\n\nنرجو تأكيد حضوركم عبر الرابط التالي :\n${window.location.href}\n\nمرحباً بكم ودمتم للأفراح عنواناً! 🤍`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyInvitationText = () => {
    const text = `${wedding.invitationTitle} ${wedding.brideName} & ${wedding.groomName}\n\nالموعد: ${wedding.formattedDateAr} ${wedding.formattedTimeAr}\nالمكان: ${wedding.venueName}، ${wedding.venueCity}\n\n${wedding.invitationSubtext}\n\n${wedding.invitationClosing}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printCard = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8" dir="rtl">
      {/* Outer Card Container in Blush & Rose with Burgundy Border */}
      <div
        ref={cardRef}
        id="wedding-invitation-card"
        className="relative bg-[#FDF9FB] rounded-[30px] shadow-[0_20px_60px_-15px_rgba(107,29,47,0.3)] p-6 sm:p-12 text-center text-[#380C15] border-2 border-[#E8C5D0] overflow-hidden"
      >
        {/* Soft Parchment Rose Texture */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C47B91_0.75px,transparent_0.75px)] [background-size:20px_20px] pointer-events-none" />

        {/* Floral Bouquet Illustrations - Dusty Rose, Burgundy & Blush (Top Right) */}
        <div className="absolute -top-6 -right-6 w-48 sm:w-60 h-48 sm:h-60 pointer-events-none opacity-90 select-none -scale-x-100">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.9">
              {/* Burgundy & olive leaves */}
              <path d="M20 70 C40 30, 80 40, 75 75 C60 90, 30 85, 20 70 Z" fill="#6B1D2F" opacity="0.45" />
              <path d="M50 30 C70 10, 110 30, 95 60 C80 75, 55 60, 50 30 Z" fill="#800020" opacity="0.35" />
              <path d="M10 110 C30 85, 70 105, 60 135 C40 145, 15 130, 10 110 Z" fill="#586650" opacity="0.5" />
              {/* Rich Rose & Burgundy Roses */}
              <circle cx="70" cy="70" r="38" fill="#FBF0F4" stroke="#E8C5D0" strokeWidth="1.5" />
              <circle cx="68" cy="68" r="28" fill="#F4D9E2" stroke="#D89BAE" strokeWidth="1" />
              <circle cx="67" cy="67" r="18" fill="#E7A8BA" stroke="#800020" strokeWidth="1" />
              <path d="M58 65 C62 55, 75 55, 77 65 C70 72, 60 70, 58 65 Z" fill="#800020" opacity="0.75" />
              {/* Delicate blush blossoms */}
              <circle cx="110" cy="45" r="4.5" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="120" cy="55" r="3" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="95" cy="20" r="3" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="105" cy="28" r="5" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="45" cy="115" r="4" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="35" cy="130" r="4.5" fill="#FFFFFF" stroke="#C47B91" />
            </g>
          </svg>
        </div>

        {/* Floral Bouquet Illustrations (Bottom Left) */}
        <div className="absolute -bottom-6 -left-6 w-48 sm:w-60 h-48 sm:h-60 pointer-events-none opacity-90 select-none -scale-y-100">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.9">
              <path d="M20 70 C40 30, 80 40, 75 75 C60 90, 30 85, 20 70 Z" fill="#6B1D2F" opacity="0.45" />
              <path d="M50 30 C70 10, 110 30, 95 60 C80 75, 55 60, 50 30 Z" fill="#800020" opacity="0.35" />
              <path d="M10 110 C30 85, 70 105, 60 135 C40 145, 15 130, 10 110 Z" fill="#586650" opacity="0.5" />
              <circle cx="70" cy="70" r="38" fill="#FBF0F4" stroke="#E8C5D0" strokeWidth="1.5" />
              <circle cx="68" cy="68" r="28" fill="#F4D9E2" stroke="#D89BAE" strokeWidth="1" />
              <circle cx="67" cy="67" r="18" fill="#E7A8BA" stroke="#800020" strokeWidth="1" />
              <path d="M58 65 C62 55, 75 55, 77 65 C70 72, 60 70, 58 65 Z" fill="#800020" opacity="0.75" />
              <circle cx="110" cy="45" r="4.5" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="120" cy="55" r="3" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="95" cy="20" r="3" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="105" cy="28" r="5" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="45" cy="115" r="4" fill="#FFFFFF" stroke="#C47B91" />
              <circle cx="35" cy="130" r="4.5" fill="#FFFFFF" stroke="#C47B91" />
            </g>
          </svg>
        </div>

        {/* The Exact Arch Frame in Rich Bordeaux & Rose Border */}
        <div className="relative border-2 border-[#800020]/75 rounded-[24px] p-6 sm:p-10 z-10">
          {/* Subtle inner double rose border */}
          <div className="absolute inset-2 border border-[#C47B91]/40 rounded-[20px] pointer-events-none" />

          {/* Moroccan Arabesque Filigree Medallions on Left and Right borders */}
          <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 w-7 h-10 bg-[#FDF9FB] flex items-center justify-center">
            <svg viewBox="0 0 24 32" className="w-6 h-8 text-[#800020] fill-current">
              <path d="M12 2 C8 6, 2 10, 2 16 C2 22, 8 26, 12 30 C16 26, 22 22, 22 16 C22 10, 16 6, 12 2 Z" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-7 h-10 bg-[#FDF9FB] flex items-center justify-center">
            <svg viewBox="0 0 24 32" className="w-6 h-8 text-[#800020] fill-current">
              <path d="M12 2 C8 6, 2 10, 2 16 C2 22, 8 26, 12 30 C16 26, 22 22, 22 16 C22 10, 16 6, 12 2 Z" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Monogram Section : ش | م in Burgundy */}
          <div className="flex flex-col items-center justify-center pt-2 mb-3">
            <div className="flex items-center justify-center gap-3 text-[#800020]">
              <span className="font-arabic text-3xl sm:text-4xl font-bold tracking-wider">
                {wedding.brideInitial}
              </span>
              <div className="w-[1.5px] h-9 bg-gradient-to-b from-[#C47B91]/30 via-[#800020] to-[#C47B91]/30" />
              <span className="font-arabic text-3xl sm:text-4xl font-bold tracking-wider">
                {wedding.groomInitial}
              </span>
            </div>

            {/* Rose leaf branch */}
            <div className="w-24 h-4 mt-1 flex items-center justify-center text-[#800020]">
              <svg viewBox="0 0 80 16" fill="none" className="w-24 h-4">
                <path d="M5 8 Q40 5 75 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M25 7 C26 4 32 4 33 7 C31 10 26 10 25 7 Z" fill="currentColor" />
                <path d="M48 7 C49 4 55 4 56 7 C54 10 49 10 48 7 Z" fill="currentColor" />
                <circle cx="40" cy="8" r="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Invitation Intro Header */}
          <div className="my-4">
            <p className="font-arabic text-base sm:text-lg text-[#58111A] font-bold leading-relaxed">
              {wedding.invitationTitle}
            </p>
          </div>

          {/* The Couple Names in Velvet Burgundy Calligraphy */}
          <div className="my-5 space-y-1">
            <h2 className="font-ruqaa text-5xl sm:text-6xl text-[#6B1D2F] leading-[1.25] drop-shadow-sm font-bold">
              {wedding.brideName}
            </h2>
            <div className="font-arabic text-2xl sm:text-3xl text-[#800020] leading-none py-1 font-bold">
              &
            </div>
            <h2 className="font-ruqaa text-5xl sm:text-6xl text-[#6B1D2F] leading-[1.25] drop-shadow-sm font-bold">
              {wedding.groomName}
            </h2>
          </div>

          {/* Delicate Rose Heart Divider */}
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="w-12 h-[1px] bg-[#C47B91]/60" />
            <Heart className="w-3.5 h-3.5 text-[#800020] fill-[#800020]" />
            <div className="w-12 h-[1px] bg-[#C47B91]/60" />
          </div>

          {/* Warm Guest Subtext */}
          <div className="max-w-md mx-auto space-y-1.5 text-[#58111A] font-arabic text-base sm:text-lg leading-relaxed mb-8">
            <p>{wedding.invitationSubtext}</p>
          </div>

          {/* 3 Columns in Burgundy & Rose */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 pt-4 border-t border-[#800020]/25 relative my-6">
            {/* Column 1: Date */}
            <div className="flex flex-col items-center justify-center text-center px-2">
              <span className="font-cairo text-xs text-[#733645] font-bold">
                تاريخ الحفل
              </span>
              <span className="font-arabic text-base sm:text-lg font-bold text-[#380C15] mt-0.5">
                {wedding.formattedDateAr}
              </span>
            </div>

            {/* Column 2: Heure */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:border-x sm:border-[#800020]/30 py-2 sm:py-0 border-y sm:border-y-0 border-[#800020]/15">
              <span className="font-cairo text-xs text-[#733645] font-bold">
                التوقيت
              </span>
              <span className="font-arabic text-base sm:text-lg font-bold text-[#800020] mt-0.5">
                {wedding.formattedTimeAr}
              </span>
            </div>

            {/* Column 3: Lieu */}
            <div className="flex flex-col items-center justify-center text-center px-2">
              <span className="font-arabic text-base sm:text-lg font-bold text-[#380C15]">
                {wedding.venueName}
              </span>
              <span className="font-cairo text-xs text-[#733645] mt-0.5 font-semibold">
                {wedding.venueCity}
              </span>
            </div>
          </div>

          {/* Moroccan 8-pointed star rosette */}
          <div className="flex justify-center my-4 text-[#800020]">
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current">
              <polygon points="10,0 12.5,7.5 20,10 12.5,12.5 10,20 7.5,12.5 0,10 7.5,7.5" />
            </svg>
          </div>

          {/* Closing invitation statement */}
          <div className="space-y-1">
            <p className="font-arabic text-base sm:text-lg text-[#58111A] font-bold">
              {wedding.invitationClosing}
            </p>
            <div className="pt-2 flex justify-center text-[#800020]">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action Bar with Bordeaux & Rose accents */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-cairo text-xs">
        <button
          onClick={shareWhatsApp}
          className="px-4 py-2.5 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-md flex items-center gap-2 font-bold transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>مشاركة عبر واتساب</span>
        </button>

        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-full bg-[#FDF9FB] border border-[#800020] text-[#800020] hover:bg-[#F7EBEF] shadow-sm flex items-center gap-2 font-bold transition-all"
        >
          <Calendar className="w-4 h-4 text-[#800020]" />
          <span>تقويم Google</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        <button
          onClick={downloadIcs}
          className="px-4 py-2.5 rounded-full bg-[#FDF9FB] border border-[#800020] text-[#800020] hover:bg-[#F7EBEF] shadow-sm flex items-center gap-2 font-bold transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#800020]" />
          <span>تقويم Apple (.ics)</span>
        </button>

        <button
          onClick={copyInvitationText}
          className="px-4 py-2.5 rounded-full bg-[#FDF9FB] border border-[#C47B91] text-[#800020] hover:bg-[#F7EBEF] shadow-sm flex items-center gap-2 font-bold transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">تم نسخ النص!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#800020]" />
              <span>نسخ نص الدعوة</span>
            </>
          )}
        </button>

        <button
          onClick={printCard}
          className="px-4 py-2.5 rounded-full bg-white border border-[#E8C5D0] text-[#733645] hover:bg-neutral-50 shadow-sm flex items-center gap-2 font-bold transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>طباعة الدعوة</span>
        </button>
      </div>
    </div>
  );
};
