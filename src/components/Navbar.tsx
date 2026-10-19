import React, { useState } from 'react';
import { Sliders, Menu, X } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface NavbarProps {
  wedding: WeddingData;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ wedding, onOpenCustomizer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'بطاقة الدعوة', href: '#invitation' },
    { label: 'العد التنازلي', href: '#compte-a-rebours' },
    { label: 'مكان الحفل', href: '#lieu' },
    { label: 'قواعد اللباس', href: '#dress-code' },
    { label: 'تأكيد الحضور', href: '#rsvp' },
    { label: 'دفتر التهاني', href: '#livre-dor' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FDF9FB]/90 backdrop-blur-md border-b border-[#E8C5D0] transition-all font-cairo" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#invitation" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9B233A] to-[#6B1D2F] p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-full bg-[#FDF9FB] flex items-center justify-center">
              <span className="font-arabic text-sm font-bold text-[#800020]">
                {wedding.brideInitial}|{wedding.groomInitial}
              </span>
            </div>
          </div>
          <span className="font-arabic text-2xl font-bold text-[#380C15] group-hover:text-[#800020] transition-colors">
            {wedding.brideName} & {wedding.groomName}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#733645]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#800020] transition-colors relative py-1 hover:border-b-2 hover:border-[#800020]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action button: Personnaliser / Modifier */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#800020] via-[#9B233A] to-[#6B1D2F] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-pink-200" />
            <span className="hidden sm:inline">تعديل معلومات الدعوة</span>
            <span className="sm:hidden">تعديل</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#733645] hover:text-[#380C15] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDF9FB] border-b border-[#E8C5D0] px-4 py-4 space-y-3 text-xs font-bold text-[#733645]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#E8C5D0]/50 hover:text-[#800020]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
