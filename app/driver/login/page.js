'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DriverLoginPage() {
  const router = useRouter();
  const [name, setName] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const submit = async event => { event.preventDefault(); setLoading(true); setError(''); const { data: driver, error: driverError } = await supabase.from('drivers').select('*').eq('full_name', name.trim()).eq('status', 'approved').single(); if (driverError || !driver) { alert('Driver not found or not approved yet'); setLoading(false); return; } const { data: bookings, error: bookingError } = await supabase.from('bookings').select('*').eq('driver_id', driver.id); if (bookingError) { setError(bookingError.message); setLoading(false); return; } localStorage.setItem('driver', JSON.stringify(driver)); localStorage.setItem('driverBookings', JSON.stringify(bookings || [])); router.push('/driver/dashboard'); };
  return <main className="bg-mist"><div className="container flex min-h-[620px] items-center justify-center py-16"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft"><div className="mb-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand"><Truck /></div><p className="eyebrow mb-2">Driver portal</p><h1 className="text-3xl font-black tracking-[-.04em]">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Sign in to view your assigned bookings.</p></div><label className="mb-1.5 block text-xs font-bold text-slate-600">Driver name or phone</label><input required className="field" value={name} onChange={event => setName(event.target.value)} placeholder="Enter your name or phone" />{error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}<button disabled={loading} className="btn btn-primary mt-6 w-full">{loading ? 'Signing in...' : 'Log in'} <ArrowUpRight size={17} /></button><p className="mt-6 text-center text-sm text-slate-500">New driver? <Link className="font-bold text-brand" href="/driver/signup">Apply to drive</Link></p></form></div></main>;
}