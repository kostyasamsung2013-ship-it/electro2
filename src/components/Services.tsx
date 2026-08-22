import type { ComponentType } from "react";
import { Reveal } from "../lib/motion";
import { services, type Accent } from "../lib/data";
import {
  IconArrowUpRight,
  IconBolt,
  IconCheck,
  IconSnow,
  IconSunPanel,
} from "../lib/icons";

const iconFor: Record<string, ComponentType<{ className?: string }>> = {
  electro: IconBolt,
  ac: IconSnow,
  solar: IconSunPanel,
};

const accentFor: Record<
  Accent,
  { card: string; text: string; chip: string; watermark: string; btn: string }
> = {
  amber: {
    card: "border-amber/30 bg-[#0e2740]",
    text: "text-amber",
    chip: "border-amber/40 bg-amber/10 text-amber",
    watermark: "text-amber/6",
    btn: "bg-amber text-ink hover:bg-white",
  },
  frost: {
    card: "border-frost/30 bg-[#0b2c34]",
    text: "text-frost",
    chip: "border-frost/40 bg-frost/10 text-frost",
    watermark: "text-frost/6",
    btn: "bg-frost text-ink hover:bg-white",
  },
  ember: {
    card: "border-ember/30 bg-[#2c1a10]",
    text: "text-ember",
    chip: "border-ember/40 bg-ember/10 text-ember",
    watermark: "text-ember/6",
    btn: "bg-ember text-ink hover:bg-white",
  },
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber/6 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-amber">
                / услуги
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3.2rem)] font-800 uppercase leading-[1.08] text-white">
                Три направления —<br />
                <span className="text-amber">один договор</span> и одна лицензия
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-mist">
              Не нужно искать трёх подрядчиков и стыковать их между собой.
              Электрика, климат и солнце проектируются вместе: один щит, одна
              трасса, одна ответственность — наша. Более{" "}
              <span className="font-700 text-white">1 800 объектов</span> на
              Коста-Бланке с 2012 года.
            </p>
          </Reveal>
        </div>

        {/* sticky stacked cards */}
        <div className="relative">
          {services.map((s, i) => {
            const A = accentFor[s.accent];
            const Icon = iconFor[s.id];
            return (
              <article
                key={s.id}
                className={`svc-card overflow-hidden rounded-2xl border ${A.card} shadow-[0_-14px_50px_rgba(0,0,0,0.45)] ${
                  i < services.length - 1 ? "mb-8" : ""
                }`}
                style={{ top: `calc(88px + ${i * 22}px)`, zIndex: i + 1 }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 hidden opacity-100 lg:block">
                  <Icon className={`h-64 w-64 ${A.watermark}`} />
                </div>

                <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
                  <div className="lg:col-span-4">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-5xl font-800 text-outline">
                        {s.num}
                      </span>
                      <span
                        className={`rounded-full border px-4 py-1.5 font-display text-[10px] font-700 uppercase tracking-[0.18em] ${A.chip}`}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-700 uppercase leading-tight text-white sm:text-[1.7rem]">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-4 inline-flex items-center gap-2 rounded-md border ${A.chip} px-4 py-2 font-display text-sm font-700`}
                    >
                      {s.price}
                    </p>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
                      {s.desc}
                    </p>

                    <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {s.includes.map((inc) => (
                        <li
                          key={inc}
                          className="group flex items-start gap-3 text-sm leading-snug text-white/90"
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${A.chip}`}
                          >
                            <IconCheck className="h-3 w-3" />
                          </span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            {inc}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
                      <a
                        href="#contact"
                        className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-display text-xs font-700 uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${A.btn}`}
                      >
                        Запросить смету
                        <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <p className="text-xs leading-relaxed text-mist">
                        <span className="font-700 text-white/80">{s.note}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
