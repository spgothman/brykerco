-- Run in Supabase SQL Editor

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  message text not null,
  status text not null default 'new'
);

create index if not exists contact_submissions_created_at_idx
  on contact_submissions (created_at desc);

alter table contact_submissions enable row level security;

-- Service role bypasses RLS; no public policies required for server-side access.
