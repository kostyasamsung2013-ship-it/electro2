import { useState } from "react";
import { Reveal } from "../lib/motion";
import { faqs, reviews, WA_LINK } from "../lib/data";
import { IconPlus, IconStar, IconWhatsApp } from "../lib/icons";

function Stars() {
  return (
    <span className="flex gap-1 text-amber">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className="h-4 w-4" />
      ))}
    </span>
  );
}

export default function Trust() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <div>
      {/* REVIEWS — light */}
      <section id="reviews" className="relative bg-foam py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-ember">
                    / отзывы
                  </p>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3rem)] font-800 uppercase leading-[1.08]">
                    Нас советуют <span className="text-ember">соседям</span>
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-7 inline-flex items-center gap-4 rounded-xl border-2 border-ink bg-white px-6 py-5 shadow-[6px_6px_0_#53d7e8]">
                    <p className="font-display text-5xl font-800">4,9</p>
                    <div>
                      <Stars />
                      <p className="mt-1.5 text-xs font-600 leading-snug text-ink/60">
                        214 отзывов · Google Maps
                        <br />и WhatsApp-рекомендации
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <p className="mt-7 max-w-sm text-sm leading-relaxed text-ink/70">
                    Больше половины новых клиентов приходят «от соседа». На
                    Коста-Бланке репутация решает — поэтому мы скорее
                    переделаем, чем оставим как есть.
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {reviews.map((r, i) => (
                  <Reveal key={r.name} delay={(i % 2) * 100}>
                    <figure className="group flex h-full flex-col rounded-xl border-2 border-ink bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_rgba(255,138,61,0.55)]">
                      <div className="flex items-center justify-between">
                        <Stars />
                        <span className="rounded-full bg-foam px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-ink/60">
                          {r.service}
                        </span>
                      </div>
                      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                        «{r.text}»
                      </blockquote>
                      <figcaption className="mt-5 border-t border-ink/10 pt-4">
                        <p className="font-display text-sm font-700">{r.name}</p>
                        <p className="mt-0.5 text-xs font-600 text-ink/50">{r.place}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — dark */}
      <section id="faq" className="relative overflow-hidden bg-ink py-24 lg:py-32">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-frost/6 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-amber">
                  / частые вопросы
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3rem)] font-800 uppercase leading-[1.08] text-white">
                  Спрашивают <span className="text-amber">до заявки</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-sm leading-relaxed text-mist">
                  Не нашли свой вопрос? Напишите в WhatsApp — отвечает инженер,
                  а не бот, обычно в течение 10 минут в рабочее время.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-wa px-6 py-3.5 font-display text-xs font-800 uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(35,192,94,0.4)]"
                >
                  <IconWhatsApp className="h-4 w-4" /> Спросить в WhatsApp
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-white/10 rounded-2xl border border-white/12 bg-white/[0.03]">
                {faqs.map((f, i) => {
                  const open = openIdx === i;
                  return (
                    <Reveal key={f.q} delay={i * 60}>
                      <div>
                        <button
                          onClick={() => setOpenIdx(open ? -1 : i)}
                          className="group flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-8"
                          aria-expanded={open}
                        >
                          <span
                            className={`font-display text-sm font-600 leading-snug transition-colors sm:text-base ${
                              open ? "text-amber" : "text-white group-hover:text-amber"
                            }`}
                          >
                            {f.q}
                          </span>
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
                              open
                                ? "rotate-45 border-amber bg-amber text-ink"
                                : "border-white/20 text-mist group-hover:border-amber group-hover:text-amber"
                            }`}
                          >
                            <IconPlus className="h-4 w-4" />
                          </span>
                        </button>
                        <div className={`acc-body ${open ? "open" : ""}`}>
                          <div className="acc-inner">
                            <p className="px-6 pb-6 text-sm leading-relaxed text-mist sm:px-8">
                              {f.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
