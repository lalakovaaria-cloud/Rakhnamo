-- ============================================================
-- Rakhnamo — Supabase / PostgreSQL schema
-- Generated from application/lib/types.ts
-- Run in Supabase SQL Editor to initialise the database.
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── Users ────────────────────────────────────────────────────
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  city        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Scholarships (seed data) ─────────────────────────────────
create table if not exists scholarships (
  id           serial primary key,
  type         text not null check (type in ('Стипендия', 'Дедлайн')),
  title        text not null,
  description  text not null,
  institution  text not null,
  deadline_at  timestamptz,               -- actual deadline datetime
  documents    text[]  not null default '{}',
  required_files jsonb not null default '[]',
  created_at   timestamptz not null default now()
);

-- ── Scholarship seed data ────────────────────────────────────
-- deadline_at is set relative to a reference date; adjust as needed.
insert into scholarships (id, type, title, description, institution, deadline_at, documents, required_files) values
(1, 'Стипендия', 'Полная стипендия Оксфордского университета',
 'Подайте заявку на полную стипендию Оксфордского университета. Покрывает обучение, проживание и расходы на жизнь.',
 'Оксфордский университет',
 now() + interval '14 days',
 array['Личное эссе','Рекомендательное письмо','Академическая выписка','Резюме'],
 '[{"icon":"📄","name":"kopiya_pasporta.pdf"},{"icon":"💰","name":"finansovaya_spravka.pdf"},{"icon":"🌐","name":"yazykovoy_sertifikat.pdf"}]'
),
(2, 'Дедлайн', 'Заявки на исследовательскую программу MIT',
 'Подайте заявку на летнюю исследовательскую программу MIT до истечения срока.',
 'MIT',
 now() + interval '6 days',
 array['Исследовательское предложение','Академическая выписка','Рекомендательное письмо'],
 '[{"icon":"📄","name":"kopiya_pasporta.pdf"},{"icon":"📝","name":"issledovatelskoe_predlozhenie.pdf"},{"icon":"🎓","name":"akademicheskaya_vypiska.pdf"}]'
),
(3, 'Стипендия', 'Программа Erasmus+',
 'Учёба в Европе с полным финансированием. Открыто для всех специальностей из университетов Центральной Азии.',
 'Erasmus+',
 now() + interval '30 days',
 array['Мотивационное письмо','Академическая выписка','Языковой сертификат','Резюме'],
 '[{"icon":"📄","name":"kopiya_pasporta.pdf"},{"icon":"✉️","name":"motivatsionnoe_pismo.pdf"},{"icon":"🌐","name":"yazykovoy_sertifikat.pdf"}]'
),
(4, 'Дедлайн', 'Подача документов в МГУ',
 'Последний день для отправки всех необходимых документов в Московский государственный университет.',
 'МГУ',
 now() + interval '2 days',
 array['Аттестат / Диплом','Фотографии 3×4','Медицинская справка'],
 '[{"icon":"📄","name":"kopiya_pasporta.pdf"},{"icon":"🎓","name":"attestat.pdf"},{"icon":"🏥","name":"meditsinskaya_spravka.pdf"}]'
),
(5, 'Стипендия', 'Грант Правительства Китая',
 'Полное покрытие обучения в ведущих университетах Китая. Открыто для всех специальностей.',
 'Правительство Китая',
 now() + interval '45 days',
 array['Личное эссе','Академическая выписка','Медицинская форма','Языковой сертификат'],
 '[{"icon":"📄","name":"kopiya_pasporta.pdf"},{"icon":"🎓","name":"akademicheskaya_vypiska.pdf"},{"icon":"🏥","name":"meditsinskaya_forma.pdf"},{"icon":"🌐","name":"yazykovoy_sertifikat.pdf"}]'
)
on conflict (id) do nothing;

-- ── Applications ─────────────────────────────────────────────
create table if not exists applications (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references users(id) on delete cascade,
  scholarship_id  integer not null references scholarships(id) on delete cascade,
  stage_index     smallint not null default 0 check (stage_index between 0 and 3),
  checked_docs    text[]  not null default '{}',
  uploaded_files  text[]  not null default '{}',
  applied_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, scholarship_id)
);

-- ── Saved / bookmarks ────────────────────────────────────────
create table if not exists saved_scholarships (
  user_id        uuid    not null references users(id) on delete cascade,
  scholarship_id integer not null references scholarships(id) on delete cascade,
  saved_at       timestamptz not null default now(),
  primary key (user_id, scholarship_id)
);

-- ── Auto-update updated_at ────────────────────────────────────
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger users_updated_at      before update on users      for each row execute function touch_updated_at();
create trigger applications_updated_at before update on applications for each row execute function touch_updated_at();

-- ── Row Level Security ────────────────────────────────────────
alter table users              enable row level security;
alter table applications       enable row level security;
alter table saved_scholarships enable row level security;

-- Users can only read/write their own row
create policy "users: own row" on users
  using (auth.uid() = id) with check (auth.uid() = id);

-- Applications: own only
create policy "applications: own" on applications
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Saved: own only
create policy "saved: own" on saved_scholarships
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Scholarships: public read
create policy "scholarships: public read" on scholarships
  for select using (true);
