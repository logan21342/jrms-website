'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const normalizePhone = value => { const digits = value.replace(/\D/g, ''); if (digits.startsWith('0')) return `+27${digits.slice(1)}`; return digits.startsWith('27') ? `+${digits}` : value.trim(); };

export default function DriverLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  useEffect(() => { if (new URLSearchParams(window.location.search).get('status') === 'pending') setError('Waiting for approval'); }, []);
  const submit = async event => { event.preventDefault(); setLoading(true); setError(''); const { data, error: loginError } = await supabase.auth.signInWithPassword({ phone: normalizePhone(phone), password }); if (loginError) { setError(loginError.message); setLoading(false); return; } const { data: driver, error: driverError } = await supabase.from('drivers').select('status').eq('id', data.user.id).single(); if (driverError || driver?.status !== 'active') { await supabase.auth.signOut(); setError('Waiting for approval'); setLoading(false); return; } router.push('/driver/dashboard'); };
  return <main className="bg-mist"><div className="container flex min-h-[620px] items-center justify-center py-16"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft"><div className="mb-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand"><Truck /></div><p className="eyebrow mb-2">Driver portal</p><h1 className="text-3xl font-black tracking-[-.04em]">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Sign in to view your assigned bookings.</p></div><label className="mb-1.5 block text-xs font-bold text-slate-600">Phone Number</label><input required className="field mb-4" value={phone} onChange={event => setPhone(event.target.value)} placeholder="082 123 4567" /><label className="mb-1.5 block text-xs font-bold text-slate-600">Password</label><input required type="password" className="field" value={password} onChange={event => setPassword(event.target.value)} />{error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}<button disabled={loading} className="btn btn-primary mt-6 w-full">{loading ? 'Signing in...' : 'Log in'} <ArrowUpRight size={17} /></button><p className="mt-6 text-center text-sm text-slate-500">New driver? <Link className="font-bold text-brand" href="/driver/signup">Apply to drive</Link></p></form></div></main>;
}