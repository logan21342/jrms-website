'use client';

import { useEffect, useState } from 'react';
import { LogOut, Truck, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function DriverDashboard() {
  const router = useRouter();
  const [driver, setDriver] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const storedDriver = localStorage.getItem('driver');
      if (!storedDriver) { router.replace('/driver/login'); return; }
      const driverData = JSON.parse(storedDriver);
      const { data: bookingData, error: bookingError } = await supabase.from('bookings').select('*').eq('driver_id', driverData.id).in('status', ['assigned', 'completed']).order('created_at', { ascending: false });
      if (bookingError) { if (mounted) setError(bookingError.message); return; }
      if (mounted) { setDriver(driverData); setBookings(bookingData || []); }
    };
    load();
    return () => { mounted = false; };
  }, [router]);

  const completeJob = async booking => {
    const { error: bookingError } = await supabase.from('bookings').update({ status: 'completed' }).eq('id', booking.id);
    if (bookingError) { setError(bookingError.message); return; }
    const { error: payoutError } = await supabase.from('payouts').insert({ booking_id: booking.id, driver_id: driver.id, driver_name: driver.full_name, amount: booking.price || 500, status: 'pending' });
    if (payoutError) { setError(payoutError.message); return; }
    alert(`Job Completed - Payout Created R${booking.price || 500}`);
    const { data: bookingData, error: reloadError } = await supabase.from('bookings').select('*').eq('driver_id', driver.id).in('status', ['assigned', 'completed']).order('created_at', { ascending: false });
    if (reloadError) setError(reloadError.message); else setBookings(bookingData || []);
  };

  const logout = () => { localStorage.removeItem('driver'); localStorage.removeItem('driverBookings'); router.replace('/driver/login'); };
  if (!driver) return <main className="bg-mist"><div className="container flex min-h-[620px] items-center justify-center py-16"><p className="text-sm text-slate-500">Loading your dashboard...</p></div></main>;
  return <main className="bg-mist"><div className="container py-12">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow mb-2">Driver portal</p><h1 className="text-4xl font-black tracking-[-.045em]">Welcome, {driver.full_name || driver.name}.</h1><p className="mt-2 text-sm text-slate-500">Your assigned work and earnings.</p></div><button onClick={logout} className="flex items-center gap-2 self-start text-sm font-bold text-slate-500"><LogOut size={16} /> Log out</button></div>
    {error && <p className="mt-5 text-sm font-semibold text-red-600">{error}</p>}
    <div className="mt-10 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-brand p-6 text-white"><p className="text-xs font-bold uppercase tracking-wider text-blue-200">Total earnings</p><p className="mt-3 text-4xl font-black">R{Number(driver.total_earnings || 0).toLocaleString()}</p><p className="mt-2 flex items-center gap-2 text-sm text-blue-100"><Wallet size={16} /> Your earnings</p></div><div className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total trips</p><p className="mt-3 text-4xl font-black text-ink">{driver.total_trips || 0}</p><p className="mt-2 text-sm text-slate-500">Completed trips</p></div><div className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Vehicle</p><p className="mt-3 text-2xl font-black text-ink">{driver.car_model || driver.vehicle || 'Not listed'}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><Truck size={16} /> {driver.car_plate || 'Plate not listed'}</p></div></div>
    <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-black">My bookings</h2>{bookings.length === 0 ? <p className="mt-5 rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center text-sm text-slate-500">No bookings assigned to you yet.</p> : <div className="mt-5 divide-y divide-slate-100">{bookings.map(booking => <div key={booking.id} className="flex flex-col justify-between gap-2 py-5 sm:flex-row"><div><p className="font-bold">{booking.from_area}{booking.to_area ? ` to ${booking.to_area}` : ''}</p><p className="mt-1 text-sm text-slate-500">{booking.service_type} · {booking.name}</p></div><div className="flex flex-col items-start gap-2 text-left sm:items-end sm:text-right"><p className="font-black">R{Number(booking.price || 0).toLocaleString()}</p>{booking.status === 'assigned' ? <button onClick={() => completeJob(booking)} className="btn btn-primary px-3 py-2 text-xs">Complete Job</button> : <p className="text-xs font-bold uppercase text-slate-400">{booking.status}</p>}</div></div>)}</div>}</section>
  </div></main>;
}