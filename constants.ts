import { Medal, Shield, Star, Award, Crown, GraduationCap, Users, Heart, Flag, BookOpen, Scale, Radio, Sprout, Anchor, Baby, UserCheck, History } from 'lucide-react';
import { Level, NavItem, SymbolFigure, AgeGroup, ProgramPillar } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'vision', label: 'الرؤية' },
  { id: 'symbols', label: 'الرموز' },
  { id: 'levels', label: 'المستويات' },
  { id: 'student-consultant', label: 'فضاء 6-17 سنة' }, // Children & Teens
  { id: 'youth-consultant', label: 'فضاء 18-39 سنة' }, // Youth
  { id: 'parents-consultant', label: 'فضاء 40-59 سنة' }, // Adults/Parents
  { id: 'seniors-consultant', label: 'فضاء +60 سنة' }, // Seniors/Wise
  { id: 'program', label: 'البرنامج' },
  { id: 'dashboard', label: 'الإحصائيات' },
  { id: 'consultant', label: 'المستشار العام' },
];

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "مشعل القدوة",
    description: "الأساس الذي تُبنى عليه بقية المستويات. يجسد القيم الأخلاقية والوطنية في سلوكه اليومي.",
    criteria: ["السمعة الطيبة", "الالتزام بالقوانين", "المشاركة المجتمعية", "التأثير الإيجابي"],
    award: "وسام مشعل القدوة",
    presenter: "مدير المؤسسة",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: Star
  },
  {
    id: 2,
    title: "مشعل السفير",
    description: "ينتقل من الالتزام الذاتي إلى تمثيل القيم والدفاع عنها في محيطه الاجتماعي.",
    criteria: ["التمثيل المشرف", "نشر التوعية", "التواصل الفعال", "الانضباط والمسؤولية"],
    award: "وسام مشعل السفير",
    presenter: "رئيس البلدية",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Flag
  },
  {
    id: 3,
    title: "مشعل القائد",
    description: "القائد الميداني لفريق المشاعل، ينسق الجهود ويقود المبادرات.",
    criteria: ["مهارات القيادة", "التخطيط والتنفيذ", "التأثير المجتمعي", "القيادة التربوية"],
    award: "وسام مشعل القائد",
    presenter: "والي الولاية",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    icon: Award
  },
  {
    id: 4,
    title: "مشعل الرائد",
    description: "الفاعل الوطني الذي يسهم في صياغة البرامج الكبرى والإشراف الاستراتيجي.",
    criteria: ["الريادة الميدانية", "التخطيط الوطني", "التوجيه والإشراف", "التمثيل الوطني"],
    award: "وسام مشعل الرائد",
    presenter: "والي الولاية / جهة عليا",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Medal
  },
  {
    id: 5,
    title: "مشعل الحكيم",
    description: "الضمير الوطني الحي، المرجع للقادة والمشاعل في مسار النهضة.",
    criteria: ["الريادة الوطنية", "الإرشاد والتوجيه", "الحكمة والاتزان", "العطاء المستمر"],
    award: "درع مشعل الحكيم",
    presenter: "رئيس الجمهورية",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Crown
  }
];

export const SYMBOLS_DATA: SymbolFigure[] = [
  {
    name: "الأمير عبد القادر",
    title: "مشعل المقاومة والكرامة",
    description: "جسّد أسمى معاني البطولة والعلم والإنسانية، وحوّل الجهاد من معركة أرض إلى معركة قيم.",
    category: "historical"
  },
  {
    name: "الشيخ عبد الحميد بن باديس",
    title: "مشعل النهضة التربوية",
    description: "أيقظ الضمير الجزائري بالكلمة والعلم، وأعاد للغة والهوية روحها.",
    category: "historical"
  },
  {
    name: "الشهيد ديدوش مراد",
    title: "مشعل الشباب والوعي",
    description: "رمز الشباب الواعي وإيمان الجيل الجديد بالتحرير والتجديد. صاحب مقولة 'سيأتي بعدنا جيل يحمل مشعل الثورة'.",
    category: "historical"
  },
  {
    name: "العربي بن مهيدي",
    title: "مشعل الإيمان بالوطن",
    description: "المثال في الثبات تحت التعذيب والإصرار على المبادئ.",
    category: "historical"
  },
  {
    name: "المعلم الجزائري",
    title: "مشعل القيم الأول",
    description: "الامتداد الحي لرسالة بن باديس، يزرع القيم في عقول الأجيال.",
    category: "contemporary"
  },
  {
    name: "الجيش الأبيض والأمني",
    title: "رموز التضحية",
    description: "الأطباء ورجال الحماية والجيش الذين يجسدون الفداء في خدمة الوطن.",
    category: "contemporary"
  }
];

export const AGE_GROUPS: AgeGroup[] = [
  {
    range: "6-10 سنوات",
    title: "الأطفال",
    vision: "إشراك الأطفال في رحلة الوعي بالقيم الوطنية والأخلاقية منذ الصغر.",
    goals: ["غرس الصدق والتعاون", "تعزيز الانتماء الوطني", "الوقاية من التنمر", "احترام البيئة وقوانين المرور"],
    color: "bg-pink-50 border-pink-200 text-pink-800"
  },
  {
    range: "11-17 سنة",
    title: "المراهقون",
    vision: "تكوين جيل مراهق واعٍ، قادر على التفكير النقدي والمبادرة.",
    goals: ["تنمية الفكر النقدي", "الوقاية من الآفات", "تعزيز التماسك الأسري", "مهارات التكنولوجيا"],
    color: "bg-orange-50 border-orange-200 text-orange-800"
  },
  {
    range: "18-24 سنة",
    title: "الشباب اليافعون",
    vision: "إعداد جيل شاب قادر على تحمل المسؤولية والقيادة.",
    goals: ["تطوير القيادة المجتمعية", "الإعداد للحياة الأسرية", "الاستقلال المالي", "العمل التطوعي"],
    color: "bg-green-50 border-green-200 text-green-800"
  },
  {
    range: "25-59 سنة",
    title: "البالغون",
    vision: "عمود المجتمع، يجمع بين التماسك الأسري والمسؤولية المجتمعية.",
    goals: ["القيادة المجتمعية", "حماية القيم", "التوجيه الأسري", "الفاعلية الاقتصادية"],
    color: "bg-blue-50 border-blue-200 text-blue-800"
  },
  {
    range: "+60 سنة",
    title: "كبار السن والحكماء",
    vision: "حراس التراث القيمي والتاريخي للأمة ومصدر الحكمة.",
    goals: ["نقل الخبرة الوطنية", "الإرشاد والتوجيه", "حفظ الذاكرة", "المشورة الاستراتيجية"],
    color: "bg-slate-50 border-slate-200 text-slate-800"
  }
];

export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    title: "دعم المؤسسات التربوية",
    content: "تقديم دورات تدريبية للمدراء والأساتذة، وتوفير محتوى إلكتروني قيمي، لتمكين المدارس كمراكز لنشر الوعي الوطني.",
    icon: GraduationCap
  },
  {
    title: "دعم الجمعيات الوطنية",
    content: "تحويل قيادات الجمعيات إلى مشاعل، وتقديم ورش عمل لتعزيز المناعة القيمية والعمل التطوعي المنظم.",
    icon: Users
  },
  {
    title: "المراكز الثقافية والرياضية",
    content: "دمج القيم في الأنشطة الترفيهية والرياضية، وتعزيز روح الفريق والانتماء الوطني لدى الشباب.",
    icon: Heart
  },
  {
    title: "المراكز الإصلاحية",
    content: "برامج تأهيلية قيمية لإعادة دمج الأفراد في المجتمع كأشخاص مسؤولين وملتزمين بالقيم.",
    icon: Scale
  },
  {
    title: "الإعلام والتعبئة",
    content: "توفير دعم إعلامي مكثف، وتسليط الضوء على قصص النجاح لتعزيز الوعي المجتمعي.",
    icon: Radio
  },
  {
    title: "الاستدامة",
    content: "ضمان انتقال القيم عبر الأجيال، وتعزيز ثقافة المسؤولية واليقظة كأساس للحماية والبناء.",
    icon: Sprout
  },
  {
    title: "الحماية القانونية",
    content: "آليات قانونية لضمان ممارسة المشاعل لمهامهم السامية وحماية المشروع من التدخلات.",
    icon: Shield
  }
];

export const STATS_DATA = [
  { name: 'أطفال', value: 4000, fill: '#006233' }, // Algeria Green
  { name: 'مراهقون', value: 3000, fill: '#D21034' }, // Algeria Red
  { name: 'شباب', value: 2000, fill: '#F0Fdf4' }, // White (represented as light green for visibility)
  { name: 'كبار السن', value: 1000, fill: '#1F2937' },
];

export const KPI_DATA = [
  { month: 'يناير', initiatives: 40, impact: 2400 },
  { month: 'فبراير', initiatives: 55, impact: 3200 },
  { month: 'مارس', initiatives: 80, impact: 4500 },
  { month: 'أبريل', initiatives: 65, impact: 3800 },
  { month: 'مايو', initiatives: 90, impact: 5100 },
  { month: 'يونيو', initiatives: 120, impact: 6800 },
];