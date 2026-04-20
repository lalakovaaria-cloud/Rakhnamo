import { NextRequest, NextResponse } from "next/server";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { localizeScholarship } from "@/lib/types";

type Lang = "ru" | "en" | "tg";

const LANG_LABELS: Record<Lang, {
  field: string; gender: string; female: string; male: string;
  country: string; fullScholarship: string; yes: string; no: string;
  gpa: string; instruction: string; responseInstruction: string;
}> = {
  ru: {
    field: "Желаемая специальность",
    gender: "Пол", female: "Девушка", male: "Парень",
    country: "Желаемая страна",
    fullScholarship: "Нужна полная стипендия", yes: "Да", no: "Нет",
    gpa: "Средний балл",
    instruction: "Ты эксперт по стипендиям для абитуриентов из Таджикистана. Выбери ОДНУ наиболее подходящую стипендию из списка и объясни выбор.\nОтветь ТОЛЬКО валидным JSON без markdown:\n{\"scholarshipId\": <число>, \"reason\": \"<2-3 предложения почему эта стипендия подходит>\"}",
    responseInstruction: "Объяснение должно быть на русском языке.",
  },
  en: {
    field: "Desired field of study",
    gender: "Gender", female: "Female", male: "Male",
    country: "Desired country",
    fullScholarship: "Needs full scholarship", yes: "Yes", no: "No",
    gpa: "GPA",
    instruction: "You are an expert on scholarships for applicants from Tajikistan. Choose ONE most suitable scholarship from the list and explain your choice.\nReply ONLY with valid JSON without markdown:\n{\"scholarshipId\": <number>, \"reason\": \"<2-3 sentences why this scholarship fits>\"}",
    responseInstruction: "The reason must be written in English.",
  },
  tg: {
    field: "Ихтисоси дилхоҳ",
    gender: "Ҷинс", female: "Духтар", male: "Писар",
    country: "Кишвари дилхоҳ",
    fullScholarship: "Стипендияи пурра лозим аст", yes: "Бале", no: "Не",
    gpa: "Баҳои миёна",
    instruction: "Шумо мутахассис дар соҳаи стипендияҳо барои аризадиҳандагони Тоҷикистон ҳастед. Як стипендияи мувофиқтаринро аз рӯйхат интихоб кунед ва интихобро шарҳ диҳед.\nФАҚАТ JSON-и дуруст бидуни markdown ҷавоб диҳед:\n{\"scholarshipId\": <рақам>, \"reason\": \"<2-3 ҷумла чаро ин стипендия мувофиқ аст>\"}",
    responseInstruction: "Шарҳ бояд бо забони тоҷикӣ бошад.",
  },
};

const GENDER_MAP: Record<string, keyof typeof LANG_LABELS["ru"]> = {
  female: "female",
  male: "male",
};

export async function POST(req: NextRequest) {
  const { answers, lang = "ru" } = await req.json() as { answers: Record<string, string>; lang: Lang };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
  }

  const L = LANG_LABELS[lang] ?? LANG_LABELS.ru;

  const genderKey = GENDER_MAP[answers.gender] ?? "male";
  const genderLabel = L[genderKey] as string;
  const scholarshipLabel = answers.fullScholarship === "yes" ? L.yes : L.no;

  const scholarshipList = SCHOLARSHIPS.map((s) => {
    const loc = localizeScholarship(s, lang);
    return { id: loc.id, title: loc.title, institution: loc.institution, desc: loc.desc, type: loc.type, category: loc.category };
  });

  const prompt = `${L.instruction}

${L.responseInstruction}

Student profile:
- ${L.field}: ${answers.field}
- ${L.gender}: ${genderLabel}
- ${L.country}: ${answers.country}
- ${L.fullScholarship}: ${scholarshipLabel}
- ${L.gpa}: ${answers.gpa}

Available scholarships:
${JSON.stringify(scholarshipList, null, 2)}`;

  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.2 },
  });

  let geminiRes: Response | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 1000 * attempt));
    geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body }
    );
    if (geminiRes.status !== 503) break;
  }

  if (!geminiRes!.ok) {
    const errBody = await geminiRes!.text().catch(() => "");
    console.error("[match-scholarship] Gemini error", geminiRes!.status, errBody);
    return NextResponse.json({ error: "Gemini API error" }, { status: 502 });
  }

  const geminiData = await geminiRes!.json();
  const text: string = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  let scholarshipId: number = SCHOLARSHIPS[0].id;
  let reason = "";

  try {
    const parsed = JSON.parse(text.trim());
    scholarshipId = parsed.scholarshipId;
    reason = parsed.reason;
  } catch (e) {
    console.error("[match-scholarship] JSON parse error. Text:", text, e);
  }

  const matched = SCHOLARSHIPS.find((s) => s.id === scholarshipId) ?? SCHOLARSHIPS[0];

  return NextResponse.json({ scholarship: matched, reason, answers });
}
