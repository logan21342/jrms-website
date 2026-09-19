import Link from 'next/link';
import { MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  return <footer className="bg-[#10233d] text-white"><div className="container grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
    <div><div className="mb-4 text-2xl font-black tracking-[-.05em]">JRMS<span className="text-blue-300">.</span></div><p className="max-w-xs text-sm leading-7 text-slate-300">Cape Town's trusted moves & junk platform - Strandfontein based, serving all Cape Town.</p><a href="https://wa.me/27788868252" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lime-300"><MessageCircle size={17} /> 078 886 8252</a></div>
    <div><h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Company</h3><div className="grid gap-3 text-sm text-slate-300"><Link href="/#services">Services</Link><Link href="/#how-it-works">How it works</Link><Link href="/#pricing">Pricing</Link><Link href="/driver-agreement">Drive with JRMS</Link></div></div>
    <div><h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Areas we cover</h3><p className="flex gap-2 text-sm leading-7 text-slate-300"><MapPin size={17} className="mt-1 shrink-0 text-blue-300" />Strandfontein, Mitchells Plain, Khayelitsha, Muizenberg, CBD, Northern Suburbs</p></div>
  </div><div className="border-t border-white/10"><div className="container flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 JRMS. Built for Cape Town.</span><div className="flex gap-4"><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/driver-agreement">Driver agreement</Link></div></div></div></footer>;
}
