import type { ComponentType } from "react";
import { Reveal, useCountUp } from "../lib/motion";
import { docs, steps, stats } from "../lib/data";
import {
  IconDoc,
  IconLicense,
  IconShield,
  IconStamp,
} from "../lib/icons";

const docIcons: Record<string, ComponentType<{ className?: string }>> = {
  license: IconLicense,
  shield: IconShield,
  doc: IconDoc,
  stamp: IconStamp,
};

function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div ref={ref} className="group px-6 py-8 text-center transition-colors duration-300 hover:bg-white/[0.03] sm:px-4">
      <p className="font-display text-4xl font-800 text-amber transition-transform duration-300 group-hover:-translate-y-1 sm:text-5xl">
        {v.toLocaleString("ru-RU")}
        <span className="text-2xl sm:text-3xl">{suffix}</span>
      </p>
      <p className="mx-auto mt-3 max-w-[190px] text-xs font-600 leading-relaxed text-mist">
        {label}
      </p>
    </div>
  );
}

export default function Journey() {
  return (
    <div className="relative bg-foam text-ink">
      {/* PROCESS — sticky two column */}
      <section id="process" className="relative overflow-hidden py-24 lg:py-32">
        <p
          className="text-outline-mist pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap font-display text-[clamp(4rem,12vw,11rem)] font-900 uppercase leading-none opacity-40"
          aria-hidden="true"
        >
          процесс · процесс
        </p>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-ember">
                  / как мы работаем
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3rem)] font-800 uppercase leading-[1.08]">
                  Пять шагов —<br />
                  и ни одним больше
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
                  Вы общаетесь с одним инженером от заявки до гарантийного
                  талона. Никаких «мастер приедет, там посмотрим» — цена и сроки
                  фиксируются до начала работ.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 inline-flex items-center gap-4 rounded-xl border-2 border-ink bg-white px-5 py-4 shadow-[6px_6px_0_#ffb03a]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-ember" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 12.5 9 18 20.5 6" />
                  </svg>
                  <p className="text-sm font-700 leading-snug">
                    Выезд замерщика — бесплатно
                    <span className="block text-xs font-600 text-ink/60">
                      Аликанте · Бенидорм · Торревьеха, 24–48 ч
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative space-y-5">
              <span className="absolute bottom-6 left-[27px] top-6 hidden w-px bg-ink/15 sm:block" aria-hidden="true" />
              {steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 90}>
                  <div className="group relative flex gap-6 rounded-xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[8px_8px_0_rgba(255,176,58,0.55)] sm:p-7">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-foam font-display text-base font-800 transition-colors duration-300 group-hover:bg-amber">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-700">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section id="guarantees" className="relative border-t border-ink/10 pb-24 pt-20 lg:pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-ember">
                  / официально — значит официально
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3rem)] font-800 uppercase leading-[1.08]">
                  Бумаги, которые мы <span className="text-ember">показываем первыми</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-5">
              <p className="text-base leading-relaxed text-ink/70">
                Копии лицензии и страховки высылаем до подписания договора —
                проверяйте в реестрах. Все документы на испанском, общение — на
                русском.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {docs.map((d, i) => {
              const Icon = docIcons[d.icon];
              return (
                <Reveal key={d.title} delay={i * 90}>
                  <div className="group h-full rounded-xl border-2 border-ink bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[10px_10px_0_rgba(83,215,232,0.6)]">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-amber transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-display text-xs font-700 uppercase tracking-[0.2em] text-ink/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-700 leading-snug">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 font-display text-[11px] font-600 uppercase leading-relaxed tracking-wide text-ember">
                      {d.es}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{d.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* stats band */}
          <Reveal delay={120}>
            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink">
                  <StatBlock {...s} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
