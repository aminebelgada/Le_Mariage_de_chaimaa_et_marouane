import React, { useState, useEffect } from 'react';
import { WeddingData } from './types/wedding';
import { DEFAULT_WEDDING_DATA } from './data/defaultWedding';
import { RoyalEnvelope } from './components/RoyalEnvelope';
import { Navbar } from './components/Navbar';
import { InvitationCard } from './components/InvitationCard';
import { Countdown } from './components/Countdown';
import { VenueLocation } from './components/VenueLocation';
import { DressCode } from './components/DressCode';
import { RsvpForm } from './components/RsvpForm';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { MusicFloatingButton } from './components/MusicFloatingButton';
import { MoroccanZelligeBorder } from './components/MoroccanOrnaments';
import { Sliders } from 'lucide-react';

const STORAGE_WEDDING_KEY = 'custom_wedding_data_ar_v1';

export default function App() {
  const [wedding, setWedding] = useState<WeddingData>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const brideParam = urlParams.get('bride');
      const groomParam = urlParams.get('groom');
      const dateParam = urlParams.get('date');
      const timeParam = urlParams.get('time');
      const venueParam = urlParams.get('venue');
      const cityParam = urlParams.get('city');
      const waParam = urlParams.get('wa');

      if (brideParam || groomParam || dateParam) {
        const base = { ...DEFAULT_WEDDING_DATA };
        if (brideParam) {
          base.brideName = brideParam;
          base.brideInitial = brideParam[0];
        }
        if (groomParam) {
          base.groomName = groomParam;
          base.groomInitial = groomParam[0];
        }
        if (dateParam) {
          base.weddingDate = dateParam;
          const [y, m, d] = dateParam.split('-');
          const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
          const daysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
          const monthsAr = [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
            'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'
          ];
          base.formattedDateAr = `${daysAr[dateObj.getDay()] || 'الجمعة'} ${parseInt(d)} ${monthsAr[parseInt(m) - 1] || 'نونبر'} ${y}`;
        }
        if (timeParam) {
          base.weddingTime = timeParam;
          base.formattedTimeAr = `ابتداءً من الساعة ${timeParam}`;
        }
        if (venueParam) base.venueName = venueParam;
        if (cityParam) base.venueCity = cityParam;
        if (waParam) base.whatsappPhone = waParam;
        return base;
      }

      try {
        const local = localStorage.getItem(STORAGE_WEDDING_KEY);
        if (local) {
          return JSON.parse(local);
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_WEDDING_DATA;
  });

  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  useEffect(() => {
    document.title = `دعوة زفاف ${wedding.brideName} & ${wedding.groomName} | زفاف ملكي مغربي`;
  }, [wedding.brideName, wedding.groomName]);

  const handleSaveCustomization = (updated: WeddingData) => {
    setWedding(updated);
    try {
      localStorage.setItem(STORAGE_WEDDING_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetCustomization = () => {
    setWedding(DEFAULT_WEDDING_DATA);
    try {
      localStorage.removeItem(STORAGE_WEDDING_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF2F5] text-[#380C15] flex flex-col relative selection:bg-[#C47B91]/30 selection:text-[#4A0E17] font-sans" dir="rtl">
      {/* Interactive Royal Envelope Opening Experience */}
      {!hasOpenedEnvelope && (
        <RoyalEnvelope
          wedding={wedding}
          onOpen={() => setHasOpenedEnvelope(true)}
        />
      )}

      {/* Floating Personalization Quick Access Button */}
      <div className="fixed top-20 left-4 z-40 print:hidden">
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="px-3.5 py-2 rounded-full bg-[#FDF9FB] border-2 border-[#800020] text-[#800020] text-xs font-cairo font-bold shadow-lg hover:bg-[#F7EBEF] hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          title="تعديل معلومات الدعوة (الأسماء، التاريخ، المكان)"
        >
          <Sliders className="w-4 h-4 text-[#800020]" />
          <span className="hidden sm:inline">تعديل معلومات الدعوة</span>
          <span className="sm:hidden">تعديل</span>
        </button>
      </div>

      {/* Navigation Header */}
      <Navbar
        wedding={wedding}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      <main className="flex-1">
        {/* Quranic Verse & Islamic Blessing Banner */}
        <section className="pt-12 pb-6 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="font-arabic text-3xl sm:text-4xl text-[#800020] font-bold tracking-wide">
              {wedding.bismillahText}
            </p>

            <MoroccanZelligeBorder className="max-w-xs mx-auto" />

            <div className="space-y-2 py-2">
              <p className="font-arabic text-2xl sm:text-3xl text-[#380C15] leading-loose max-w-2xl mx-auto font-bold">
                « {wedding.quranVerseArabic} »
              </p>
              <span className="font-cairo text-xs text-[#800020] tracking-widest block font-bold">
                {wedding.quranVerseSurah}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Section: Exact Replica of Invitation Card */}
        <section id="invitation" className="relative scroll-mt-20">
          <InvitationCard
            wedding={wedding}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        </section>

        {/* Real-time Countdown Timer */}
        <Countdown wedding={wedding} />

        {/* Reception Venue & Directions */}
        <VenueLocation wedding={wedding} />

        {/* Dress Code Guidelines */}
        <DressCode wedding={wedding} />

        {/* RSVP Confirmation */}
        <RsvpForm wedding={wedding} />

        {/* Guestbook & Wishes */}
        <Guestbook />
      </main>

      {/* Royal Moroccan Footer */}
      <Footer wedding={wedding} />

      {/* Floating Audio Player with Hussain Al Jassmi - Fostanek El Abyad */}
      <MusicFloatingButton />

      {/* Customization Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        wedding={wedding}
        onSave={handleSaveCustomization}
        onReset={handleResetCustomization}
      />
    </div>
  );
}
