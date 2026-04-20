import type { TranslationKey } from "./ru";

const en: Partial<Record<TranslationKey, string>> = {
  // Welcome
  "welcome.title": "Welcome!",
  "welcome.subtitle": "Your guide to education and scholarships",
  "welcome.start": "Get Started",

  // NameModal
  "modal.name.title": "What's your name?",
  "modal.name.subtitle": "Enter your name to save progress",
  "modal.name.placeholder": "Your name",
  "modal.name.button": "Continue",

  // AppHeader
  "header.greeting": "Hello, {name} 👋",

  // Home — filters
  "home.filter.all": "All",
  "home.filter.foreign": "International",
  "home.filter.local": "Local",

  // Home — search
  "home.search.placeholder": "Search scholarships...",

  // Home — cards
  "home.myApplications": "My Applications",
  "home.card.details": "View Details",
  "home.card.deadline": "Application deadline",
  "home.card.daysLeft": "Days remaining",
  "home.apply": "APPLY NOW",
  "home.applied": "✓ Applied",
  "home.withdraw": "Withdraw",

  // Home — modal tabs
  "home.tab.docs": "Documents",
  "home.tab.files": "Files",
  "home.tab.stages": "Progress",

  // Home — stages
  "home.stages.title": "Submission Stages",
  "home.stages.next": "Proceed to next stage →",
  "home.stages.current": "Current stage",

  // Home — apply-first messages
  "home.docs.applyFirst": "Apply to start tracking documents",
  "home.files.applyFirst": "Apply to start tracking files",
  "home.stages.applyFirst": "Apply to track your progress",

  // Home — file status
  "home.file.uploaded": "✓ Uploaded",
  "home.file.upload": "Upload",

  // Home — help block
  "home.help.title": "Need help applying?",
  "home.help.subtitle": "Choose a plan — we'll help at every step",
  "home.plan.recommended": "Recommended",
  "home.plan.choose": "Choose",

  // Plan features
  "plan.starter.f1": "Document compliance check",
  "plan.starter.f2": "Motivation letter templates",
  "plan.starter.f3": "Application submission guide",
  "plan.starter.f4": "Chat support",
  "plan.pro.f1": "Everything from Starter",
  "plan.pro.f2": "Personal mentor until submission",
  "plan.pro.f3": "Essay and motivation letter review",
  "plan.pro.f4": "Interview preparation with admissions board",
  "plan.choose.telegram": "Choose {name} → Telegram",

  // ApplicationCard
  "app.card.open": "Open application →",

  // Application [id] page
  "app.notFound": "Application not found",
  "app.myApp": "My Application",
  "app.progress": "Submission progress",
  "app.nextStage": "Go to next stage →",
  "app.tab.stages": "Stages",
  "app.tab.docs": "Documents",
  "app.tab.files": "Files",
  "app.currentStage": "Current stage",
  "app.docs.count": "{done} of {total} ready",
  "app.files.count": "{done} of {total} uploaded",
  "app.withdraw": "Withdraw application",
  "app.file.uploaded": "✓ Uploaded",
  "app.file.upload": "Upload",

  // Scholarship [id] page
  "scholarship.notFound": "Scholarship not found",
  "scholarship.pageTitle": "Scholarship",
  "scholarship.deadline": "Deadline",
  "scholarship.days": "days",
  "scholarship.docs": "Required documents",
  "scholarship.files": "Files to upload",
  "scholarship.apply": "Apply Now",
  "scholarship.applied": "✓ Applied",
  "scholarship.withdraw": "Withdraw application",
  "scholarship.helpTitle": "Need help with applying?",
  "scholarship.helpSubtitle": "Choose a plan — we'll help at every step",

  // ScholarshipCard
  "card.details": "Details →",
  "card.days.one": "day",
  "card.days.few": "days",
  "card.days.many": "days",

  // Scholarships page
  "scholarships.title": "Scholarships",

  // Deadlines page
  "deadlines.title": "Deadlines",
  "deadlines.subtitle": "Sorted by nearest deadline",

  // Profile page
  "profile.myApplications": "My Applications",
  "profile.noApplications": "You haven't applied yet",
  "profile.findScholarships": "Find Scholarships",
  "profile.noProfile": "No profile created",
  "profile.createProfile": "Create Profile",
  "profile.edit": "Edit",

  // Roadmap page
  "roadmap.title": "Roadmap",
  "roadmap.step1.title": "Choose a Direction",
  "roadmap.step1.desc": "Determine your specialty and target university",
  "roadmap.step1.month": "September",
  "roadmap.step2.title": "Prepare Documents",
  "roadmap.step2.desc": "Gather all required documents and certificates",
  "roadmap.step2.month": "October",
  "roadmap.step3.title": "Language Tests",
  "roadmap.step3.desc": "Take IELTS, TOEFL or other required exams",
  "roadmap.step3.month": "November",
  "roadmap.step4.title": "Submit Application",
  "roadmap.step4.desc": "Complete forms and send documents to universities",
  "roadmap.step4.month": "December",
  "roadmap.step5.title": "Interview",
  "roadmap.step5.desc": "Attend an interview with the admissions committee",
  "roadmap.step5.month": "January",
  "roadmap.step6.title": "Get a Visa",
  "roadmap.step6.desc": "Apply for a student visa after admission",
  "roadmap.step6.month": "February",
  "roadmap.step7.title": "Prepare to Depart",
  "roadmap.step7.desc": "Book accommodation, tickets and pack your things",
  "roadmap.step7.month": "March",

  // Onboarding
  "onboarding.step": "Question {current} of {total}",
  "onboarding.back": "← Back",
  "onboarding.next": "Next →",
  "onboarding.loading.title": "Finding your scholarship...",
  "onboarding.loading.subtitle": "Gemini AI is analyzing your profile",
  "onboarding.error": "Could not get a recommendation. Please try again.",
  "onboarding.q1.question": "What field do you want to study?",
  "onboarding.q1.placeholder": "E.g.: IT, medicine, economics...",
  "onboarding.q2.question": "Are you a girl?",
  "onboarding.q2.opt1": "Yes",
  "onboarding.q2.opt2": "No",
  "onboarding.q3.question": "Which country do you want to study in?",
  "onboarding.q3.opt1": "Tajikistan",
  "onboarding.q3.opt2": "Russia",
  "onboarding.q3.opt3": "China",
  "onboarding.q3.opt4": "Europe",
  "onboarding.q3.opt5": "Any country",
  "onboarding.q4.question": "Do you need a full scholarship?",
  "onboarding.q4.opt1": "Yes, very important",
  "onboarding.q4.opt2": "No, partial is fine too",
  "onboarding.q5.question": "What is your GPA?",
  "onboarding.q5.opt1": "Excellent (5.0)",
  "onboarding.q5.opt2": "Good (4.0–4.9)",
  "onboarding.q5.opt3": "Satisfactory (3.0–3.9)",

  // Recommendation page
  "rec.title": "Your Scholarship",
  "rec.subtitle": "Matched by Gemini AI",
  "rec.why": "Why this scholarship?",
  "rec.apply": "Apply Now",
  "rec.applied": "✓ Applied",
  "rec.plans.title": "How do you want to proceed?",
  "rec.plans.subtitle": "Choose a plan",
  "rec.free.f1": "List of required documents",
  "rec.free.f2": "Application deadline",
  "rec.free.f3": "Basic scholarship information",
  "rec.deadline.label": "Deadline",
  "rec.deadline.days": "{n} days left",
  "rec.docs.label": "Required documents",
  "rec.files.label": "Files to upload",
  "rec.skip": "Skip, go to main menu",

  // Language switcher
  "lang.ru": "RU",
  "lang.en": "EN",
  "lang.tg": "TG",
};

export default en;
