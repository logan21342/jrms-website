'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, LogOut, Truck, Wallet } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function DriverDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    if (!loggedIn) return;

    const loadJobs = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, drivers(rating)')
        .not('driver_id', 'is', null)
        .order('created_at', { ascending: false });

      if (error) {
        setDataError(error.message);
        return;
      }

      setJobs(data.map(job => ({ ...job, rating: job.drivers?.rating || 0 })));
    };

    loadJobs();
  }, [loggedIn]);

  const completedJobs = jobs.filter(job => job.status === 'done');
  const monthlyPayout = jobs.reduce((sum, job) => sum + Math.round((job.price || 0) * 0.85), 0);
  const averageRating = jobs.length ? jobs.reduce((sum, job) => sum + (job.rating || 0), 0) / jobs.length : 0;
  if (!loggedIn) return <main className="bg-mist"><div className="container flex min-h-[620px] items-center justify-center py-16"><form onSubmit={e => { e.preventDefault(); if (email === 'driver@jrms.co.za' && password === 'Jrms2026!') { setLoggedIn(true); setLoginError(''); } else setLoginError('Incorrect driver email or password.'); }} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft"><div className="mb-8"><div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-brand"><Truck /></div><p className="eyebrow mb-2">Driver portal</p><h1 className="text-3xl font-black tracking-[-.04em]">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Log in to see your jobs and earnings. Supabase Auth can be connected here when ready.</p></div><label className="mb-1.5 block text-xs font-bold text-slate-600">Email</label><input required type="email" className="field mb-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /><label className="mb-1.5 block text-xs font-bold text-slate-600">Password</label><input required type="password" className="field" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />{loginError && <p className="mt-3 text-sm font-semibold text-red-600">{loginError}</p>}<button className="btn btn-primary mt-6 w-full">Log in <ArrowUpRight size={17} /></button></form></div></main>;
  return <main className="bg-mist"><div className="container py-12"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2">Driver portal</p><h1 className="text-4xl font-black tracking-[-.045em]">Good morning.</h1><p className="mt-2 text-sm text-slate-500">Here is your workday at a glance.</p></div><button onClick={() => setLoggedIn(false)} className="flex items-center gap-2 self-start text-sm font-bold text-slate-500"><LogOut size={16} /> Log out</button></div>{dataError && <p className="mt-5 text-sm font-semibold text-red-600">{dataError}</p>}<div className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-brand p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-200">This month</p><p className="mt-3 text-4xl font-black">R{monthlyPayout.toLocaleString()}</p><p className="mt-2 flex items-center gap-2 text-sm text-blue-100"><Wallet size={16} /> Your 85% payout</p></div><div className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed jobs</p><p className="mt-3 text-4xl font-black text-ink">{completedJobs.length}</p><p className="mt-2 text-sm text-slate-500">{completedJobs.length ? 'Jobs completed' : 'No completed jobs yet'}</p></div><div className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rating</p><p className="mt-3 text-4xl font-black text-ink">{averageRating.toFixed(1)}<span className="text-lg text-slate-400">/5</span></p><p className="mt-2 text-sm text-slate-500">From {jobs.filter(job => job.rating).length} client ratings</p></div></div><div className="mt-10 rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-black">My jobs</h2><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{jobs.filter(job => job.status !== 'done').length} upcoming</span></div><div className="mt-5 divide-y divide-slate-100">{jobs.length === 0 ? <div className="rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center"><p className="font-bold text-ink">No jobs yet</p><p className="mt-2 text-sm text-slate-500">New jobs will appear here when they are assigned.</p></div> : jobs.map(job => <div key={job.id} className="py-4"><p className="font-bold">{job.service_type}</p><p className="mt-1 text-sm text-slate-500">{job.from_area}{job.to_area ? ` to ${job.to_area}` : ''}</p><p className="mt-1 text-xs font-bold uppercase text-brand">{job.status}</p></div>)}</div></div></div></main>;
}
