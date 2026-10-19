import React, { useState } from 'react';
import { MapPin, Navigation, Car, Copy, Check, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface VenueLocationProps {
  wedding: WeddingData;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({ wedding }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${wedding.venueName}، ${wedding.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="lieu" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#F7EBEF]/50 to-transparent" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center space-y-2 mb-14">
          <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase flex items-center justify-center gap-2 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#800020]" />
            <span>موقع الحفل</span>
          </p>
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#380C15] font-bold">
            {wedding.venueName}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#800020] to-[#C47B91] mx-auto rounded-full mt-3" />
          <p className="font-arabic text-lg text-[#733645] pt-1">
            {wedding.venueCity}، المملكة المغربية
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#FDF9FB] rounded-3xl p-6 sm:p-10 border border-[#E8C5D0] shadow-[0_10px_30px_rgba(107,29,47,0.12)] relative overflow-hidden">
          {/* Corner ornaments */}
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#800020]" />
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#800020]" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#800020]" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#800020]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Right Column: Venue Info (RTL) */}
            <div className="space-y-6">
              <div>
                <h3 className="font-cairo text-xs font-bold tracking-wider text-[#800020] mb-1">
                  قاعة الحفلات والأعراس
                </h3>
                <h4 className="font-arabic text-2xl sm:text-3xl font-bold text-[#380C15]">
                  {wedding.venueName}
                </h4>
                <p className="text-sm text-[#733645] font-cairo mt-1">
                  {wedding.venueAddress}
                </p>
              </div>

              {/* Practical amenities */}
              <div className="space-y-3 pt-2 text-xs font-cairo text-[#58111A]">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-[#E8C5D0]">
                  <Car className="w-5 h-5 text-[#800020] shrink-0" />
                  <div>
                    <span className="font-bold text-[#380C15] block">موقف سيارات خاص ومحروس</span>
                    <span className="text-neutral-500">يتوفر موقف سيارات مجاني ومحروس مع خدمة ركن السيارات عند مدخل القاعة.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-[#E8C5D0]">
                  <Navigation className="w-5 h-5 text-[#800020] shrink-0" />
                  <div>
                    <span className="font-bold text-[#380C15] block">الاستقبال والضيافة</span>
                    <span className="text-neutral-500">استقبال الضيوف والأسر الكريمة {wedding.formattedTimeAr} بالشاي المغربي الملكي والحلويات الفاسية.</span>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-wrap gap-3 pt-2 font-cairo text-xs">
                <a
                  href={wedding.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white hover:opacity-95 shadow-md flex items-center gap-2 font-bold transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>خرائط Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={wedding.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#800020] text-[#800020] hover:bg-[#F7EBEF] shadow-sm flex items-center gap-2 font-bold transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#800020]" />
                  <span>تطبيق Waze</span>
                </a>

                <button
                  onClick={copyAddress}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-[#733645] hover:bg-neutral-50 shadow-sm flex items-center gap-2 font-bold transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">تم نسخ العنوان</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#800020]" />
                      <span>نسخ العنوان</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Left Column: Visual Map / Directions Preview */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8C5D0] shadow-inner h-64 sm:h-72 bg-[#F5E6EC] flex flex-col items-center justify-center text-center p-6">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9FB]/90 to-[#F5E6EC]/90" />

              <div className="relative z-10 space-y-3 max-w-xs">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#800020] to-[#6B1D2F] text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-7 h-7" />
                </div>
                <h4 className="font-arabic text-xl font-bold text-[#380C15]">
                  {wedding.venueName}
                </h4>
                <p className="text-xs text-[#733645] font-cairo">
                  {wedding.venueCity}، المغرب
                </p>
                <a
                  href={wedding.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-cairo text-[#800020] font-bold underline decoration-solid hover:text-[#4A0E17] pt-2"
                >
                  <span>فتح مسار الطريق المباشر</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
