'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const wa = 'https://wa.me/27788868252';
const nav = [['Home','/'],['Services','/#services'],['How It Works','/#how-it-works'],['Pricing','/#pricing'],['Contact','/#contact']];

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
    <div className="container flex h-[72px] items-center justify-between gap-6">
      <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg font-black text-white">J</span><span className="text-xl font-black tracking-[-.04em] text-brand">JRMS<span className="text-slate-300">.</span></span></Link>
      <nav className={`${open ? 'absolute left-0 right-0 top-[72px] flex border-b border-slate-100 bg-white p-5 shadow-lg' : 'hidden'} flex-col gap-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        {nav.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-brand">{label}</Link>)}
        <Link href="/driver" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-brand">Driver Login</Link>
        <Link href="/admin" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-brand">Admin</Link>
      </nav>
      <div className="flex items-center gap-3"><a href={wa} target="_blank" rel="noreferrer" className="btn btn-primary hidden text-sm sm:inline-flex">Book on WhatsApp <ArrowUpRight size={16} /></a><button aria-label="Toggle menu" className="rounded-lg p-2 text-brand md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    </div>
  </header>;
}
