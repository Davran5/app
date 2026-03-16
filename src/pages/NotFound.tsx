import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  const statusItems = [
    t.notFound.cards.diagnostics,
    t.notFound.cards.dispatch,
    t.notFound.cards.recovery,
  ];

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#f3efe6]">
      <section className="relative flex min-h-0 flex-1 items-center overflow-hidden py-8 lg:py-14">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,12,14,0.04),transparent_45%,rgba(36,77,133,0.08))]" />
        <div className="absolute right-[-8%] top-[-12%] h-[280px] w-[280px] rounded-full bg-[#244d85]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-4%] h-[220px] w-[220px] rounded-full bg-[#c5a059]/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1360px] px-6 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#244d85]/15 bg-[#244d85]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#244d85]">
              <Wrench size={14} />
              {t.notFound.badge}
            </div>

            <div className="mx-auto mt-5 max-w-2xl">
              <p className="font-display text-[56px] font-semibold leading-none text-[#244d85] md:text-[90px]">
                404
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-[1.02] text-[#0B0C0E] md:text-5xl">
                {t.notFound.title}
              </h1>
              <div className="mx-auto mt-5 h-px w-20 bg-[linear-gradient(90deg,rgba(197,160,89,0),rgba(197,160,89,0.9),rgba(197,160,89,0))]" />
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600 md:text-base md:leading-7">
                {t.notFound.description}
              </p>
            </div>

            <div className="mt-7 grid w-full max-w-lg grid-cols-2 gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#244d85] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d3f6e] md:text-sm"
              >
                <ArrowLeft size={16} />
                {t.notFound.primaryAction}
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#244d85]/15 bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0B0C0E] transition hover:border-[#244d85]/35 hover:text-[#244d85] md:text-sm"
              >
                {t.notFound.secondaryAction}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mx-auto mt-7 grid w-full max-w-3xl grid-cols-3 gap-2 md:gap-3">
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[96px] flex-col justify-between rounded-[22px] border border-black/5 bg-white/90 px-3 py-4 text-center shadow-[0_14px_30px_rgba(15,23,42,0.05)] backdrop-blur md:min-h-[108px] md:px-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 md:text-[11px]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-xs font-semibold leading-5 text-[#0B0C0E] md:text-sm md:leading-6">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
