export interface WeddingData {
  brideName: string;
  groomName: string;
  brideInitial: string;
  groomInitial: string;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:MM
  formattedDateAr: string; // e.g. "الجمعة 27 نونبر 2026"
  formattedTimeAr: string; // e.g. "ابتداءً من الساعة 19:00"
  venueName: string;
  venueCity: string;
  venueAddress: string;
  mapEmbedQuery: string;
  googleMapsUrl: string;
  wazeUrl: string;
  whatsappPhone: string; // e.g. "+212600000000"
  
  // Texts
  bismillahText: string;
  quranVerseArabic: string;
  quranVerseSurah: string;
  
  invitationTitle: string;
  invitationSubtext: string;
  invitationClosing: string;
  
  dressCode: {
    title: string;
    description: string;
    women: string;
    men: string;
    colorNotes: string;
  };
}

export interface RsvpResponse {
  id: string;
  fullName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message?: string;
  submittedAt: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  relationship?: string;
  date: string;
}
