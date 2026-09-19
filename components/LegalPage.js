import Link from 'next/link';

export default function LegalPage({ eyebrow, title, updated, intro, sections }) {
  return <main className="bg-mist"><div className="container max-w-4xl py-16 sm:py-24"><Link href="/" className="text-sm font-bold text-brand">← Back to JRMS</Link><div className="mt-12"><p className="eyebrow mb-3">{eyebrow}</p><h1 className="text-4xl font-black tracking-[-.045em] text-ink sm:text-5xl">{title}</h1><p className="mt-4 text-sm font-semibold text-slate-500">{updated}</p></div><div className="prose-copy mt-12 rounded-2xl bg-white p-7 shadow-sm sm:p-12"><p>{intro}</p>{sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div></div></main>;
}
