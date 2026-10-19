import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface CountdownProps {
  wedding: WeddingData;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ wedding }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetString = `${wedding.weddingDate}T${wedding.weddingTime}:00`;
      const targetTime = new Date(targetString).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingDate, wedding.weddingTime]);

  const units = [
    { label: 'أيام', value: timeLeft.days },
    { label: 'ساعات', value: timeLeft.hours },
    { label: 'دقائق', value: timeLeft.minutes },
    { label: 'ثواني', value: timeLeft.seconds },
  ];

  return (
    <section id="compte-a-rebours" className="py-16 px-4 bg-gradient-to-b from-transparent via-[#F7EBEF]/60 to-transparent" dir="rtl">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section title */}
        <div className="space-y-2 mb-10">
          <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase flex items-center justify-center gap-2 font-bold">
            <Clock className="w-3.5 h-3.5 text-[#800020]" />
            <span>العد التنازلي</span>
          </p>
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#380C15] font-bold">
            اليوم المنتظر يقترب
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#800020] to-[#C47B91] mx-auto rounded-full mt-3" />
        </div>

        {timeLeft.isPast ? (
          <div className="p-8 rounded-3xl bg-[#FDF9FB] border border-[#E8C5D0] max-w-md mx-auto shadow-md">
            <CalendarCheck className="w-10 h-10 text-[#800020] mx-auto mb-3" />
            <h3 className="font-arabic text-2xl text-[#380C15] font-bold">
              حان موعد الفرح اليوم!
            </h3>
            <p className="text-sm text-[#733645] font-cairo mt-2 font-medium">
              اللهم بارك لعروسينا واجعل أيامهما كلها سعادة وهناء!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {units.map((unit, index) => (
              <div
                key={index}
                className="relative bg-[#FDF9FB] rounded-2xl p-5 sm:p-6 border border-[#E8C5D0] shadow-[0_8px_20px_-6px_rgba(107,29,47,0.18)] flex flex-col items-center justify-center group hover:scale-[1.02] transition-transform"
              >
                {/* Burgundy corner accent */}
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#800020]" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#800020]" />

                <span className="font-arabic text-4xl sm:text-5xl font-bold text-[#800020] tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="font-cairo text-xs font-bold text-[#733645] mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-base font-arabic text-[#733645] font-bold">
          موعدنا بإذن الله يوم {wedding.formattedDateAr} {wedding.formattedTimeAr} في {wedding.venueName}، {wedding.venueCity}
        </p>
      </div>
    </section>
  );
};
