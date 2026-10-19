import React, { useState } from 'react';
import { BookHeart, Send, Heart, Sparkles } from 'lucide-react';
import { GuestbookEntry } from '../types/wedding';
import { INITIAL_GUESTBOOK } from '../data/defaultWedding';

export const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook_entries_ar');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_GUESTBOOK;
  });

  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      author: author.trim(),
      relationship: relationship.trim() || 'ضيف كريم',
      message: message.trim(),
      date: 'الآن',
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('wedding_guestbook_entries_ar', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthor('');
    setRelationship('');
    setMessage('');
  };

  return (
    <section id="livre-dor" className="py-20 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center space-y-2 mb-14">
          <p className="font-cairo text-xs tracking-widest text-[#800020] uppercase flex items-center justify-center gap-2 font-bold">
            <BookHeart className="w-3.5 h-3.5 text-[#800020]" />
            <span>تهاني وتبريكات الأهل والأحباب</span>
          </p>
          <h2 className="font-arabic text-3xl sm:text-4xl text-[#380C15] font-bold">
            دفتر التهاني والتبريكات
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#800020] to-[#C47B91] mx-auto rounded-full mt-3" />
          <p className="font-arabic text-base text-[#733645] max-w-md mx-auto pt-1">
            شاركونا أصدق الدعوات وأطيب الأمنيات لشيماء ومروان في بداية مسيرتهما الزوجية المباركة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Write message form - 2 cols */}
          <div className="lg:col-span-2">
            <div className="bg-[#FDF9FB] rounded-3xl p-6 border border-[#E8C5D0] shadow-sm sticky top-24 font-cairo">
              <h3 className="font-arabic text-2xl font-bold text-[#380C15] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#800020]" />
                <span>ترك كلمة تهنئة للعروسين</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#733645] font-bold mb-1">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: خالتك فاطمة"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                  />
                </div>

                <div>
                  <label className="block text-[#733645] font-bold mb-1">
                    صلة القرابة أو المعرفة
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: من العائلة، صديق العريس..."
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                  />
                </div>

                <div>
                  <label className="block text-[#733645] font-bold mb-1">
                    رسالة التهنئة والدعاء *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="بارك الله لكما وجمع بينكما في خير..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8C5D0] text-sm text-[#380C15] focus:outline-none focus:ring-2 focus:ring-[#800020]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white font-cairo text-xs font-bold tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>نشر في دفتر التهاني</span>
                </button>
              </form>
            </div>
          </div>

          {/* Messages list - 3 cols */}
          <div className="lg:col-span-3 space-y-4 font-cairo">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#FDF9FB] rounded-2xl p-5 sm:p-6 border border-[#E8C5D0] shadow-sm relative group hover:border-[#800020] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-arabic text-xl font-bold text-[#380C15]">
                      {entry.author}
                    </h4>
                    {entry.relationship && (
                      <span className="font-cairo text-xs text-[#800020] font-bold">
                        {entry.relationship}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#800020]">
                    <span className="text-xs text-[#733645]/80 font-cairo">{entry.date}</span>
                    <Heart className="w-3.5 h-3.5 fill-[#800020]" />
                  </div>
                </div>

                <p className="font-arabic text-base sm:text-lg text-[#58111A] leading-relaxed pt-2">
                  « {entry.message} »
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
