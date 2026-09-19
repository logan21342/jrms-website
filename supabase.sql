create extension if not exists pgcrypto;

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text,
  phone text unique,
  email text,
  id_number text,
  car_model text,
  car_plate text,
  password_hash text,
  status text default 'pending' check (status in ('pending', 'approved', 'active')),
  total_earnings numeric default 0,
  total_trips int default 0,
  name text,
  vehicle text,
  area text,
  rating numeric default 5
);

alter table public.drivers add column if not exists full_name text;
alter table public.drivers add column if not exists email text;
alter table public.drivers add column if not exists id_number text;
alter table public.drivers add column if not exists car_model text;
alter table public.drivers add column if not exists car_plate text;
alter table public.drivers add column if not exists password_hash text;
alter table public.drivers add column if not exists status text default 'pending';
alter table public.drivers add column if not exists total_earnings numeric default 0;
alter table public.drivers add column if not exists total_trips int default 0;
alter table public.drivers add column if not exists name text;
alter table public.drivers add column if not exists vehicle text;
alter table public.drivers add column if not exists area text;
alter table public.drivers add column if not exists rating numeric default 5;
update public.drivers set full_name = coalesce(full_name, name), car_model = coalesce(car_model, vehicle) where full_name is null or car_model is null;
alter table public.drivers alter column total_earnings set default 0;
alter table public.drivers alter column total_trips set default 0;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  from_area text not null,
  to_area text,
  service_type text not null,
  description text,
  price int default 399,
  fare_amount numeric default 399,
  booking_date timestamptz default now(),
  status text default 'pending',
  driver_id uuid references public.drivers(id),
  created_at timestamptz default now()
);

alter table public.bookings add column if not exists fare_amount numeric default 399;
alter table public.bookings add column if not exists booking_date timestamptz default now();
update public.bookings set fare_amount = coalesce(fare_amount, price), booking_date = coalesce(booking_date, created_at) where fare_amount is null or booking_date is null;

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(id),
  week_start date not null,
  week_end date not null,
  gross_fare numeric not null default 0,
  platform_fee numeric not null default 0,
  driver_pay numeric not null default 0,
  status text not null default 'unpaid' check (status in ('unpaid', 'paid')),
  paid_at timestamptz,
  created_at timestamptz default now(),
  unique (driver_id, week_start, week_end)
);

alter table public.bookings disable row level security;
alter table public.drivers disable row level security;
alter table public.payouts disable row level security;
