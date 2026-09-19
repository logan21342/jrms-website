create extension if not exists pgcrypto;

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  vehicle text not null,
  area text not null,
  rating int default 5,
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  from_area text not null,
  to_area text,
  service_type text not null,
  description text,
  price int default 399,
  status text default 'pending',
  driver_id uuid references public.drivers(id),
  created_at timestamptz default now()
);

alter table public.bookings disable row level security;
alter table public.drivers disable row level security;
