import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Music } from 'lucide-react';
import { WeddingData } from '../types/wedding';
import { andalusianAudio } from '../utils/audioPlayer';

interface RoyalEnvelopeProps {
  wedding: WeddingData;
  onOpen: () => void;
}

export const RoyalEnvelope: React.FC<RoyalEnvelopeProps> = ({ wedding, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = async () => {
    setIsOpening(true);
    try {
      await andalusianAudio.play();
    } catch {
      // Audio autoplay policy fallback
    }

    setTimeout(() => {
      setIsOpen(true);
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-[#25050B]/95 via-[#3D0A14]/95 to-[#1A0307] backdrop-blur-md overflow-hidden text-right"
          dir="rtl"
        >
          {/* Subtle starry / rose ambient dust */}
          <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#C47B91_1px,transparent_1px)] [background-size:32px_32px]" />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative w-full max-w-lg mx-auto"
          >
            {/* The Envelope Body */}
            <div className="relative bg-[#FDF8FA] rounded-3xl shadow-[0_25px_60px_-15px_rgba(74,14,23,0.5)] overflow-hidden border-2 border-[#E8C5D0] p-8 sm:p-12 text-center text-[#380C15]">
              {/* Bordeaux & Rose decorative inner borders */}
              <div className="absolute inset-2.5 rounded-2xl border border-[#800020]/30 pointer-events-none" />
              <div className="absolute inset-4 rounded-xl border border-[#C47B91]/30 pointer-events-none" />

              {/* Quranic Bismillah */}
              <p className="font-arabic text-2xl sm:text-3xl text-[#800020] mb-4 tracking-wide font-bold">
                {wedding.bismillahText}
              </p>

              {/* Envelope Monogram Wax Seal in Rich Velvet Burgundy */}
              <div className="my-6 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpen}
                  className="cursor-pointer relative w-24 h-24 rounded-full bg-gradient-to-br from-[#9B233A] via-[#800020] to-[#4A0E17] p-[3px] shadow-[0_8px_25px_rgba(128,0,32,0.5)] flex items-center justify-center group"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FDF8FA] to-[#F4E5EB] flex flex-col items-center justify-center border-2 border-[#C47B91]/60 shadow-inner">
                    <span className="font-arabic text-2xl font-bold tracking-wider text-[#800020] group-hover:scale-110 transition-transform">
                      {wedding.brideInitial} | {wedding.groomInitial}
                    </span>
                    <span className="text-[11px] font-cairo text-[#800020]/90 font-bold">
                      زفاف ملكي
                    </span>
                  </div>

                  {/* Pulsing rose-bordeaux ring */}
                  <div className="absolute -inset-1 rounded-full border border-[#C47B91] animate-ping opacity-40 pointer-events-none" />
                </motion.div>
              </div>

              {/* Invitation Heading */}
              <div className="space-y-2">
                <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase font-bold">
                  بطاقة دعوة لحفل زفاف
                </p>
                <h1 className="font-arabic text-4xl sm:text-5xl text-[#4A0E17] leading-relaxed font-bold">
                  {wedding.brideName} & {wedding.groomName}
                </h1>
                <p className="font-arabic text-lg text-[#733645] pt-1 font-semibold">
                  {wedding.formattedDateAr}
                </p>
                <p className="font-cairo text-xs text-[#800020]/90 font-semibold">
                  {wedding.venueName} • {wedding.venueCity}
                </p>
              </div>

              {/* Opening button */}
              <div className="mt-8 pt-4 flex flex-col items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="w-full max-w-xs py-3.5 px-6 rounded-full bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white font-cairo text-sm font-bold tracking-wider shadow-lg shadow-[#800020]/30 hover:shadow-xl hover:shadow-[#800020]/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isOpening ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-pink-200" />
                      <span>جاري فتح الدعوة...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-pink-200" />
                      <span>فتح بطاقة الدعوة</span>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-[#800020]/80 flex items-center gap-1.5 font-cairo font-semibold">
                  <Music className="w-3.5 h-3.5 text-[#800020]" />
                  <span>زفة فستانك الأبيض - حسين الجسمي</span>
                </p>
              </div>

              {/* Fast skip link */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  onOpen();
                }}
                className="mt-4 text-xs font-cairo text-[#800020]/70 hover:text-[#800020] underline decoration-dotted transition-colors cursor-pointer"
              >
                تخطي المقدمة والدخول مباشرة ←
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
