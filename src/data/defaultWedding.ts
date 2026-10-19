import { WeddingData, GuestbookEntry } from '../types/wedding';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  brideName: 'شيماء',
  groomName: 'مروان',
  brideInitial: 'ش',
  groomInitial: 'م',
  weddingDate: '2026-11-27',
  weddingTime: '19:00',
  formattedDateAr: 'الجمعة 27 نونبر 2026',
  formattedTimeAr: 'ابتداءً من الساعة 19:00',
  venueName: 'دار المرجان',
  venueCity: 'الدار البيضاء',
  venueAddress: 'دار المرجان، الدار البيضاء، المغرب',
  mapEmbedQuery: 'الدار البيضاء، دار المرجان',
  googleMapsUrl: 'https://maps.google.com/?q=Dar+El+Marjane+Casablanca',
  wazeUrl: 'https://waze.com/ul?q=Dar%20El%20Marjane%20Casablanca',
  whatsappPhone: '+212600000000',

  bismillahText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  quranVerseArabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  quranVerseSurah: 'سورة الروم - الآية 21',

  invitationTitle: 'ببالغ الفرح والسرور يسرنا أن ندعوكم لحضور حفل زفاف',
  invitationSubtext: 'حضوركم بجانبنا يزيد من بهجة وفرحة هذا اليوم المميز، ويسعدنا ويشرفنا كثيراً أن نتشارك هذه اللحظات الغالية معكم.',
  invitationClosing: 'يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا',

  dressCode: {
    title: 'اللباس التقليدي المغربي الفاخر',
    description: 'لإضفاء لمسة من الفخامة والأصالة المغربية على ليلتنا، ندعوكم لارتداء أجمل الأزياء التقليدية الأصيلة.',
    women: 'تكشيطة أو قفطان مغربي ملكي فاخر بألوان بهيجة وأنيقة',
    men: 'جلابة مغربية أصيلة (فاسية أو بيضاء)، جبادور راقٍ أو بدلة رسمية أنيقة',
    colorNotes: 'نرجو من ضيفاتنا العزيزات ترك اللونين الأبيض والعاجي خاصين بإطلالة العروس.',
  },
};

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'g1',
    author: 'عائلة العمراني',
    relationship: 'أصدقاء العائلة',
    message: 'ألف مبروك لعروسينا الغاليين شيماء ومروان! بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة.',
    date: 'منذ يوم',
  },
  {
    id: 'g2',
    author: 'ياسين وسارة',
    relationship: 'أقارب العروسين',
    message: 'فرحتنا لا توصف بزفافكما الميمون! نسأل الله أن يجعل أيامكم كلها أفراحاً ومسرات، نراكم بكل حب في دار المرجان!',
    date: 'منذ يومين',
  },
  {
    id: 'g3',
    author: 'الدكتور مهدي بناني',
    relationship: 'صديق الطفولة',
    message: 'ما شاء الله تبارك الرحمن، زواج مبارك سعيد وبالرفاه والبنين يا رب. ديما مجموعين في الخير.',
    date: 'منذ 3 أيام',
  },
];
