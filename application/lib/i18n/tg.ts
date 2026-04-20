import type { TranslationKey } from "./ru";

const tg: Partial<Record<TranslationKey, string>> = {
  // Welcome
  "welcome.title": "Хуш омадед!",
  "welcome.subtitle": "Роҳнамои шумо дар соҳаи таҳсил ва стипендияҳо",
  "welcome.start": "Оғоз кунед",

  // NameModal
  "modal.name.title": "Номи шумо чист?",
  "modal.name.subtitle": "Барои нигоҳ доштани пешрафт ном ворид кунед",
  "modal.name.placeholder": "Номи шумо",
  "modal.name.button": "Идома додан",

  // AppHeader
  "header.greeting": "Салом, {name} 👋",

  // Home — filters
  "home.filter.all": "Ҳама",
  "home.filter.foreign": "Хориҷӣ",
  "home.filter.local": "Маҳаллӣ",

  // Home — search
  "home.search.placeholder": "Ҷустуҷӯи стипендияҳо...",

  // Home — cards
  "home.myApplications": "Аризаҳои ман",
  "home.card.details": "Тафсилот",
  "home.card.deadline": "Мӯҳлати ариза",
  "home.card.daysLeft": "Рӯз боқӣ мондааст",
  "home.apply": "АРИЗА ПЕШНИҲОД КУНЕД",
  "home.applied": "✓ Ариза пешниҳод шуд",
  "home.withdraw": "Бозпас гирифтан",

  // Home — modal tabs
  "home.tab.docs": "Ҳуҷҷатҳо",
  "home.tab.files": "Файлҳо",
  "home.tab.stages": "Пешрафт",

  // Home — stages
  "home.stages.title": "Марҳилаҳои пешниҳод",
  "home.stages.next": "Ба марҳилаи навбатӣ →",
  "home.stages.current": "Марҳилаи ҷорӣ",

  // Home — apply-first messages
  "home.docs.applyFirst": "Ариза диҳед, то ҳуҷҷатҳоро қайд кунед",
  "home.files.applyFirst": "Ариза диҳед, то файлҳоро қайд кунед",
  "home.stages.applyFirst": "Ариза диҳед, то пешрафтро пайгирӣ кунед",

  // Home — file status
  "home.file.uploaded": "✓ Бор карда шуд",
  "home.file.upload": "Бор кардан",

  // Home — help block
  "home.help.title": "Барои пешниҳод кӯмак лозим аст?",
  "home.help.subtitle": "Тарифро интихоб кунед — мо дар ҳар қадам ёрӣ медиҳем",
  "home.plan.recommended": "Тавсия медиҳем",
  "home.plan.choose": "Интихоб кунед",

  // Plan features
  "plan.starter.f1": "Санҷиши мутобиқати ҳуҷҷатҳо",
  "plan.starter.f2": "Намунаҳои мактуби ангезавӣ",
  "plan.starter.f3": "Дастурамал оид ба пешниҳоди ариза",
  "plan.starter.f4": "Дастгирӣ дар чат",
  "plan.pro.f1": "Ҳама чизи Starter",
  "plan.pro.f2": "Мантори шахсӣ то пешниҳоди ҳуҷҷатҳо",
  "plan.pro.f3": "Санҷиши эссе ва мактуби ангезавӣ",
  "plan.pro.f4": "Омодагӣ ба мусоҳиба бо комиссияи қабул",
  "plan.choose.telegram": "Интихоб кунед {name} → Telegram",

  // ApplicationCard
  "app.card.open": "Аризаро кушоед →",

  // Application [id] page
  "app.notFound": "Ариза ёфт нашуд",
  "app.myApp": "Аризаи ман",
  "app.progress": "Пешрафти пешниҳод",
  "app.nextStage": "Ба марҳилаи навбатӣ →",
  "app.tab.stages": "Марҳилаҳо",
  "app.tab.docs": "Ҳуҷҷатҳо",
  "app.tab.files": "Файлҳо",
  "app.currentStage": "Марҳилаи ҷорӣ",
  "app.docs.count": "{done} аз {total} омода",
  "app.files.count": "{done} аз {total} бор карда шуд",
  "app.withdraw": "Аризаро бозпас гирифтан",
  "app.file.uploaded": "✓ Бор карда шуд",
  "app.file.upload": "Бор кардан",

  // Scholarship [id] page
  "scholarship.notFound": "Стипендия ёфт нашуд",
  "scholarship.pageTitle": "Стипендия",
  "scholarship.deadline": "Мӯҳлати пешниҳод",
  "scholarship.days": "рӯз",
  "scholarship.docs": "Ҳуҷҷатҳои зарурӣ",
  "scholarship.files": "Файлҳо барои бор кардан",
  "scholarship.apply": "Ариза пешниҳод кунед",
  "scholarship.applied": "✓ Ариза пешниҳод шуд",
  "scholarship.withdraw": "Аризаро бозпас гирифтан",
  "scholarship.helpTitle": "Барои пешниҳод кӯмак лозим аст?",
  "scholarship.helpSubtitle": "Тарифро интихоб кунед — мо дар ҳар қадам ёрӣ медиҳем",

  // ScholarshipCard
  "card.details": "Тафсилот →",
  "card.days.one": "рӯз",
  "card.days.few": "рӯз",
  "card.days.many": "рӯз",

  // Scholarships page
  "scholarships.title": "Стипендияҳо",

  // Deadlines page
  "deadlines.title": "Мӯҳлатҳо",
  "deadlines.subtitle": "Аз рӯи наздиктарин мӯҳлат",

  // Profile page
  "profile.myApplications": "Аризаҳои ман",
  "profile.noApplications": "Шумо ҳанӯз ариза пешниҳод накардаед",
  "profile.findScholarships": "Ёфтани стипендияҳо",
  "profile.noProfile": "Профил сохта нашудааст",
  "profile.createProfile": "Профил сохтан",
  "profile.edit": "Тағйир додан",

  // Roadmap page
  "roadmap.title": "Нақшаи роҳ",
  "roadmap.step1.title": "Интихоби самт",
  "roadmap.step1.desc": "Ихтисос ва донишгоҳи худро муайян кунед",
  "roadmap.step1.month": "Сентябр",
  "roadmap.step2.title": "Тайёр кардани ҳуҷҷатҳо",
  "roadmap.step2.desc": "Ҳамаи ҳуҷҷат ва маълумотномаҳои зарурӣро ҷамъ кунед",
  "roadmap.step2.month": "Октябр",
  "roadmap.step3.title": "Озмунҳои забонӣ",
  "roadmap.step3.desc": "IELTS, TOEFL ё дигар имтиҳонҳои талаботиро супоред",
  "roadmap.step3.month": "Ноябр",
  "roadmap.step4.title": "Пешниҳоди ариза",
  "roadmap.step4.desc": "Саволномаҳоро пур кунед ва ҳуҷҷатҳоро ба донишгоҳҳо фиристед",
  "roadmap.step4.month": "Декабр",
  "roadmap.step5.title": "Мусоҳиба",
  "roadmap.step5.desc": "Бо комиссияи қабул мусоҳиба гузаред",
  "roadmap.step5.month": "Январ",
  "roadmap.step6.title": "Гирифтани виза",
  "roadmap.step6.desc": "Пас аз қабул шудан визаи донишҷӯӣ расмӣ кунед",
  "roadmap.step6.month": "Феврал",
  "roadmap.step7.title": "Омодагӣ ба сафар",
  "roadmap.step7.desc": "Манзил, чипта буронед ва ашёи худро тайёр кунед",
  "roadmap.step7.month": "Март",

  // Onboarding
  "onboarding.step": "Савол {current} аз {total}",
  "onboarding.back": "← Бозгашт",
  "onboarding.next": "Идома →",
  "onboarding.loading.title": "Стипендия меҷӯем...",
  "onboarding.loading.subtitle": "Gemini AI профили шуморо таҳлил мекунад",
  "onboarding.error": "Тавсия гирифта нашуд. Лутфан дубора кӯшиш кунед.",
  "onboarding.q1.question": "Кадом ихтисосро омӯхтан мехоҳед?",
  "onboarding.q1.placeholder": "Масалан: IT, тиб, иқтисод...",
  "onboarding.q2.question": "Шумо духтар ҳастед?",
  "onboarding.q2.opt1": "Бале",
  "onboarding.q2.opt2": "Не",
  "onboarding.q3.question": "Дар кадом кишвар таҳсил кардан мехоҳед?",
  "onboarding.q3.opt1": "Тоҷикистон",
  "onboarding.q3.opt2": "Русия",
  "onboarding.q3.opt3": "Чин",
  "onboarding.q3.opt4": "Аврупо",
  "onboarding.q3.opt5": "Ҳар кишваре",
  "onboarding.q4.question": "Оё стипендияи пурра лозим аст?",
  "onboarding.q4.opt1": "Бале, хеле муҳим аст",
  "onboarding.q4.opt2": "Не, қисман ҳам мешавад",
  "onboarding.q5.question": "Баҳои миёнаи шумо чанд аст?",
  "onboarding.q5.opt1": "Аъло (5.0)",
  "onboarding.q5.opt2": "Хуб (4.0–4.9)",
  "onboarding.q5.opt3": "Қаноатбахш (3.0–3.9)",

  // Recommendation page
  "rec.title": "Стипендияи шумо",
  "rec.subtitle": "Аз ҷониби Gemini AI интихоб шуд",
  "rec.why": "Чаро ин стипендия?",
  "rec.apply": "Ариза пешниҳод кунед",
  "rec.applied": "✓ Ариза пешниҳод шуд",
  "rec.plans.title": "Чӣ тавр амал кардан мехоҳед?",
  "rec.plans.subtitle": "Тарифро интихоб кунед",
  "rec.free.f1": "Рӯйхати ҳуҷҷатҳои зарурӣ",
  "rec.free.f2": "Мӯҳлати пешниҳоди ариза",
  "rec.free.f3": "Маълумоти асосӣ дар бораи стипендия",
  "rec.deadline.label": "Мӯҳлат",
  "rec.deadline.days": "{n} рӯз боқӣ мондааст",
  "rec.docs.label": "Ҳуҷҷатҳои зарурӣ",
  "rec.files.label": "Файлҳо барои бор кардан",
  "rec.skip": "Гузаштан ба менюи асосӣ",

  // Language switcher
  "lang.ru": "РУ",
  "lang.en": "EN",
  "lang.tg": "ТЧ",
};

export default tg;
