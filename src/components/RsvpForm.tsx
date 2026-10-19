import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, HeartHandshake, Send, Users, MessageSquareHeart, Phone, User, Check, X, Sparkles } from 'lucide-react';
import { WeddingData, RsvpResponse } from '../types/wedding';

interface RsvpFormProps {
  wedding: WeddingData;
}

const STORAGE_KEY = 'wedding_rsvp_responses';

export const RsvpForm: React.FC<RsvpFormProps> = ({ wedding }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rsvpList, setRsvpList] = useState<RsvpResponse[]>([]);
  const [showOrganizerList, setShowOrganizerList] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRsvpList(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#800020', '#9B233A', '#6B1D2F', '#C47B91', '#E8C5D0', '#FFFFFF'],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newResponse: RsvpResponse = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      message: message.trim(),
      submittedAt: new Date().toLocaleDateString('ar-MA', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newResponse, ...rsvpList];
    setRsvpList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (attending === 'yes') {
      triggerConfetti();
    }
    setIsSubmitted(true);
  };

  const sendWhatsAppConfirmation = () => {
    const text = `السلام عليكم ورحمة الله!\nمعكم: ${fullName}.\n\nأؤكد لكم حضوري لحفل زفاف *${wedding.brideName} & ${wedding.groomName}* :\n- الحالة: ${attending === 'yes' ? '✅ نعم، حاضر(ة) بكل سرور وفرحة' : '❌ للأسف أعتذر عن الحضور'}\n${attending === 'yes' ? `- عدد الأشخاص: ${guestCount}\n` : ''}- رقم الهاتف: ${phone}\n${message ? `- تبريكات: "${message}"\n` : ''}\nألف مبروك وبالرفاه والبنين إن شاء الله! ✨🤍`;
    window.open(`https://api.whatsapp.com/send?phone=${wedding.whatsappPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const totalGuests = rsvpList
    .filter((r) => r.attending === 'yes')
    .reduce((sum, r) => sum + r.guestCount, 0);

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#F7EBEF] to-transparent" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center space-y-2 mb-12">
          <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase flex items-center justify-center gap-2 font-bold">
            <HeartHandshake className="w-3.5 h-3.5 text-[#800020]" />
            <span>تأكيد الحضور</span>
          </p>
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#380C15] font-bold">
            شاركونا فرحة العمر
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#800020] to-[#C47B91] mx-auto rounded-full mt-3" />
          <p className="font-arabic text-base text-[#733645] max-w-md mx-auto pt-1 leading-relaxed">
            يرجى تأكيد حضوركم الكريم لمساعدتنا على حسن الاستقبال وتنظيم هذه الليلة المميزة على أكمل وجه.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-[#FDF9FB] rounded-3xl p-6 sm:p-10 border border-[#E8C5D0] shadow-[0_10px_35px_rgba(107,29,47,0.18)] relative overflow-hidden">
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#800020]" />
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#800020]" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#800020]" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#800020]" />

          {/* Toggle between RSVP Form & Organizer view */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-xl bg-white p-1 border border-[#E8C5D0] text-xs font-cairo font-bold">
              <button
                type="button"
                onClick={() => setShowOrganizerList(false)}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  !showOrganizerList ? 'bg-[#800020] text-white shadow-sm' : 'text-[#733645] hover:text-[#380C15]'
                }`}
              >
                استمارة الحضور
              </button>
              <button
                type="button"
                onClick={() => setShowOrganizerList(true)}
                className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  showOrganizerList ? 'bg-[#800020] text-white shadow-sm' : 'text-[#733645] hover:text-[#380C15]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>قائمة التأكيدات ({rsvpList.length})</span>
              </button>
            </div>
          </div>

          {!showOrganizerList ? (
            isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-arabic text-3xl font-bold text-[#380C15]">
                  شكراً جزيلاً {fullName}!
                </h3>
                <p className="text-sm text-[#733645] font-cairo max-w-sm mx-auto font-medium">
                  {attending === 'yes'
                    ? `تم تسجيل حضوركم الكريم بنجاح (${guestCount} فرد). نسعد جداً برؤيتكم بيننا!`
                    : 'شكراً لإعلامنا، سنفتقد وجودكم ونتمنى لكم دوام الصحة والعافية.'}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={sendWhatsAppConfirmation}
                    className="px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold font-cairo hover:bg-[#20ba5a] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال التأكيد عبر الواتساب للعروسين</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-3 rounded-full bg-white border border-[#E8C5D0] text-[#733645] text-xs font-bold font-cairo hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    تسجيل رد آخر
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-cairo">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#733645] mb-1.5">
                    الاسم واللقب الكريم *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#800020] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: عائلة الفاسي / يوسف"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-[#380C15] text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#733645] mb-1.5">
                    رقم الهاتف / الواتساب
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#800020] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="مثال: 0612345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-[#380C15] text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                    />
                  </div>
                </div>

                {/* Attending Status */}
                <div>
                  <label className="block text-xs font-bold text-[#733645] mb-2">
                    هل ستشرفوننا بحضوركم؟ *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        attending === 'yes'
                          ? 'bg-[#800020] text-white border-[#800020] shadow-sm'
                          : 'bg-white text-[#733645] border-[#E8C5D0] hover:border-[#800020]'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>نعم، بكل سرور وفرحة</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                        attending === 'no'
                          ? 'bg-[#58111A] text-white border-[#58111A] shadow-sm'
                          : 'bg-white text-[#733645] border-[#E8C5D0] hover:border-[#58111A]'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      <span>للأسف نعتذر لظرف طارئ</span>
                    </button>
                  </div>
                </div>

                {/* Number of guests (if yes) */}
                {attending === 'yes' && (
                  <div>
                    <label className="block text-xs font-bold text-[#733645] mb-1.5">
                      عدد الأفراد المدعوين
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                            guestCount === num
                              ? 'bg-[#800020] text-white border-[#800020]'
                              : 'bg-white text-[#733645] border-[#E8C5D0]'
                          }`}
                        >
                          {num} {num === 1 ? 'فرد' : 'أفراد'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Message */}
                <div>
                  <label className="block text-xs font-bold text-[#733645] mb-1.5">
                    دعوة طيبة أو كلمة تهنئة للعروسين
                  </label>
                  <div className="relative">
                    <MessageSquareHeart className="w-4 h-4 text-[#800020] absolute right-3.5 top-3" />
                    <textarea
                      rows={3}
                      placeholder="أطيب التهاني وأصدق التبريكات لشيماء ومروان..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-[#380C15] text-sm focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white font-cairo text-sm font-bold tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-pink-200" />
                  <span>تأكيد الحضور الآن</span>
                </button>
              </form>
            )
          ) : (
            /* Organizer View */
            <div className="space-y-4 font-cairo">
              <div className="p-4 rounded-xl bg-white border border-[#E8C5D0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#733645] block font-semibold">إجمالي الضيوف المؤكدين</span>
                  <span className="font-arabic text-3xl font-bold text-[#800020]">{totalGuests} شخص</span>
                </div>
                <div className="text-left">
                  <span className="text-xs text-[#733645] block font-semibold">عدد الردود</span>
                  <span className="font-arabic text-xl font-bold text-[#380C15]">{rsvpList.length}</span>
                </div>
              </div>

              {rsvpList.length === 0 ? (
                <p className="text-center text-xs text-neutral-500 py-6">
                  لا توجد أي ردود مسجلة حتى الآن.
                </p>
              ) : (
                <div className="max-h-72 overflow-y-auto space-y-2 pl-1">
                  {rsvpList.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white border border-[#E8C5D0] text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#380C15] block">{item.fullName}</span>
                        <span className="text-neutral-500 text-[11px]">
                          {item.phone || 'بدون هاتف'} • {item.submittedAt}
                        </span>
                        {item.message && (
                          <p className="text-[#800020] italic mt-1 text-[11px]">« {item.message} »</p>
                        )}
                      </div>
                      <div className="text-left shrink-0">
                        {item.attending === 'yes' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                            <Check className="w-3 h-3" />
                            {item.guestCount} أفراد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-bold text-[11px]">
                            <X className="w-3 h-3" />
                            معتذر
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
