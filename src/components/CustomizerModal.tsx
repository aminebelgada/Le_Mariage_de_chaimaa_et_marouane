import React, { useState } from 'react';
import { X, Sliders, Check, RotateCcw, Share2, Sparkles, Calendar, MapPin, Heart, Phone } from 'lucide-react';
import { WeddingData } from '../types/wedding';
import { DEFAULT_WEDDING_DATA } from '../data/defaultWedding';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  wedding: WeddingData;
  onSave: (updated: WeddingData) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  wedding,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<WeddingData>({ ...wedding });
  const [copiedLink, setCopiedLink] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const handleDateChange = (dateStr: string) => {
    if (!dateStr) return;
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    const daysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const monthsAr = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
      'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'
    ];
    const dayName = daysAr[dateObj.getDay()] || 'الجمعة';
    const monthName = monthsAr[parseInt(m) - 1] || 'نونبر';
    const formatted = `${dayName} ${parseInt(d)} ${monthName} ${y}`;

    setFormData((prev) => ({
      ...prev,
      weddingDate: dateStr,
      formattedDateAr: formatted,
    }));
  };

  const handleTimeChange = (timeStr: string) => {
    setFormData((prev) => ({
      ...prev,
      weddingTime: timeStr,
      formattedTimeAr: `ابتداءً من الساعة ${timeStr}`,
    }));
  };

  const handleBrideNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      brideName: val,
      brideInitial: val.trim() ? val.trim()[0] : 'ش',
    }));
  };

  const handleGroomNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      groomName: val,
      groomInitial: val.trim() ? val.trim()[0] : 'م',
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSuccessNotice(true);
    setTimeout(() => {
      setSuccessNotice(false);
      onClose();
    }, 1200);
  };

  const generateShareableLink = () => {
    const params = new URLSearchParams();
    params.set('bride', formData.brideName);
    params.set('groom', formData.groomName);
    params.set('date', formData.weddingDate);
    params.set('time', formData.weddingTime);
    params.set('venue', formData.venueName);
    params.set('city', formData.venueCity);
    if (formData.whatsappPhone) params.set('wa', formData.whatsappPhone);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-2xl bg-[#FDF9FB] rounded-3xl border-2 border-[#E8C5D0] shadow-2xl p-6 sm:p-8 text-[#380C15] my-8 font-cairo">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full hover:bg-pink-100 text-[#733645] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2 text-[#800020]">
            <Sliders className="w-5 h-5 text-[#800020]" />
            <span className="font-cairo text-xs font-bold uppercase tracking-wider">
              لوحة التخصيص السريعة
            </span>
          </div>
          <h3 className="font-arabic text-2xl sm:text-3xl font-bold text-[#380C15]">
            تعديل معلومات وتفاصيل حفل الزفاف
          </h3>
          <p className="text-xs text-[#733645]">
            يمكنكم تغيير أسماء العروسين، التاريخ، التوقيت، والقاعة بكل سهولة وفق رغبتكم.
          </p>
        </div>

        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-pink-100 border border-pink-300 text-[#800020] text-xs flex items-center gap-2 font-bold">
            <Check className="w-4 h-4 text-[#800020]" />
            <span>تم حفظ التعديلات بنجاح وتحديث الموقع!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section: Mariés */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/80 border border-[#E8C5D0]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#800020]">
              <Heart className="w-4 h-4 text-[#800020]" />
              <span>أسماء العروسين</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  اسم العروس
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => handleBrideNameChange(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.brideInitial}
                    onChange={(e) => setFormData({ ...formData, brideInitial: e.target.value })}
                    title="الحرف الأولي للمونوغرام"
                    className="w-12 text-center font-bold px-2 py-2 rounded-xl bg-[#FDF9FB] border border-[#E8C5D0] text-sm text-[#800020]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  اسم العريس
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) => handleGroomNameChange(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                  />
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.groomInitial}
                    onChange={(e) => setFormData({ ...formData, groomInitial: e.target.value })}
                    title="الحرف الأولي للمونوغرام"
                    className="w-12 text-center font-bold px-2 py-2 rounded-xl bg-[#FDF9FB] border border-[#E8C5D0] text-sm text-[#800020]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Date & Heure */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/80 border border-[#E8C5D0]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#800020]">
              <Calendar className="w-4 h-4 text-[#800020]" />
              <span>تاريخ وتوقيت الزفاف</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  تاريخ الزفاف
                </label>
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                />
                <span className="text-xs text-[#800020] font-arabic mt-1 block font-semibold">
                  الصيغة: {formData.formattedDateAr}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  ساعة بدء الاستقبال
                </label>
                <input
                  type="time"
                  required
                  value={formData.weddingTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                />
                <span className="text-xs text-[#733645] font-arabic mt-1 block">
                  {formData.formattedTimeAr}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Lieu */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/80 border border-[#E8C5D0]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#800020]">
              <MapPin className="w-4 h-4 text-[#800020]" />
              <span>مكان الحفل والمدينة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  اسم القاعة أو الفيلا
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      venueName: e.target.value,
                      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(
                        e.target.value + ' ' + formData.venueCity
                      )}`,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#733645] mb-1">
                  المدينة
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueCity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      venueCity: e.target.value,
                      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(
                        formData.venueName + ' ' + e.target.value
                      )}`,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#733645] mb-1">
                رقم الواتساب لتلقي تأكيدات الحضور RSVP
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#800020] absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="+212600000000"
                  value={formData.whatsappPhone}
                  onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:ring-2 focus:ring-[#800020]/40"
                />
              </div>
              <span className="text-[11px] text-[#733645] mt-1 block">
                سيتمكن الضيوف من إرسال ردودهم مباشرة إلى هذا الرقم بنقرة واحدة عبر الواتساب.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={generateShareableLink}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#800020] text-[#800020] text-xs font-bold hover:bg-[#F7EBEF] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">تم نسخ الرابط!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>نسخ رابط مخصص لمشاركته</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData({ ...DEFAULT_WEDDING_DATA });
                  onReset();
                }}
                title="استرجاع المعلومات الافتراضية"
                className="px-3 py-2.5 rounded-xl border border-neutral-300 text-neutral-600 text-xs hover:bg-neutral-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>الافتراضي</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-300 transition-colors cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white text-xs font-bold tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-pink-200" />
                <span>تطبيق التعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
