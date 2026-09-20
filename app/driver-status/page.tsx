'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DriverStatusPage() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);

    const { data, error: queryError } = await supabase
      .from('drivers')
      .select('full_name,status')
      .eq('phone', phone)
      .single();

    if (queryError || !data) {
      setError(queryError?.code === 'PGRST116' ? 'No application found for this phone number.' : queryError?.message || 'Unable to check application status.');
      setLoading(false);
      return;
    }

    setStatus(data.status);
    setLoading(false);
  };

  const statusMessage = status === 'pending'
    ? 'Your application is under review'
    : status === 'approved' || status === 'active'
      ? 'Congratulations! You are approved! Download the driver app / wait for assignments'
      : status === 'rejected'
        ? 'Sorry not approved'
        : 'Your application status is currently unavailable.';

  return <main className="bg-mist"><div className="container flex min-h-[620px] items-center justify-center py-16"><div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-soft"><p className="eyebrow mb-2">Driver portal</p><h1 className="text-3xl font-black tracking-[-.04em]">Check application status</h1><p className="mt-3 text-sm leading-6 text-slate-500">Enter the phone number used on your application.</p><form onSubmit={submit} className="mt-8"><label className="text-xs font-bold text-slate-600">Phone Number<input required type="tel" className="field mt-1.5" value={phone} onChange={event => setPhone(event.target.value)} placeholder="082 123 4567" /></label>{error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}{status && <div className="mt-5 rounded-xl bg-sky p-4 text-sm font-semibold text-brand"><CheckCircle2 className="mb-2 text-green-600" size={24} />{statusMessage}</div>}<button disabled={loading} className="btn btn-primary mt-6 w-full">{loading ? 'Checking status...' : 'Check status'} <ArrowUpRight size={17} /></button></form><p className="mt-6 text-center text-sm text-slate-500">Need to apply? <Link className="font-bold text-brand" href="/driver/signup">Apply to drive</Link></p></div></div></main>;
}
