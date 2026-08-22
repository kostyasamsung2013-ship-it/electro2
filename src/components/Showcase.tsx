import { Img, Reveal } from "../lib/motion";
import { cities, projects, WA_LINK } from "../lib/data";
import { IconArrowUpRight, IconMapPin, IconWhatsApp } from "../lib/icons";

export default function Showcase() {
  return (
    <div className="relative bg-ink">
      {/* PROJECTS */}
      <section id="projects" className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[560px] rounded-full bg-ember/7 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal>
                <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-amber">
                  / свежие объекты
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3.2rem)] font-800 uppercase leading-[1.08] text-white">
                  Что мы уже включили<br />
                  <span className="text-amber">на этом побережье</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 font-display text-xs font-700 uppercase tracking-wide text-white transition-all duration-300 hover:border-amber hover:text-amber"
              >
                <IconWhatsApp className="h-4 w-4" />
                Ещё кейсы — в WhatsApp
                <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="space-y-16">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={80}>
                <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/12 lg:col-span-7 ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Img
                      src={p.img}
                      alt={p.title}
                      className="h-[300px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:h-[380px]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-xs font-700 text-white backdrop-blur-sm">
                      <IconMapPin className="h-3.5 w-3.5 text-amber" />
                      {p.place}
                    </div>
                    <span className="absolute right-4 top-4 font-display text-5xl font-800 text-outline opacity-80">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-amber/35 bg-amber/8 px-3 py-1 text-[11px] font-700 uppercase tracking-wider text-amber"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 font-display text-xl font-700 leading-snug text-white sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
                      {p.text}
                    </p>
                    <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/12 bg-white/[0.04]">
                      {p.metrics.map((m) => (
                        <div key={m.k} className="px-3 py-4 text-center sm:px-4">
                          <p className="font-display text-sm font-800 text-amber sm:text-base">
                            {m.v}
                          </p>
                          <p className="mt-1 text-[10px] font-700 uppercase tracking-wider text-mist">
                            {m.k}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="cities" className="relative border-t border-white/8 bg-deep py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-frost">
                  / география
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-800 uppercase leading-[1.1] text-white">
                  Вся Коста-Бланка —<br />
                  <span className="text-frost">от Дении до Ориуэлы</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-5 text-sm leading-relaxed text-mist">
                  Офис и склад — в Аликанте. В Торревьеху и Бенидорм выезжаем
                  ежедневно, северное побережье — по расписанию 3–4 раза в
                  неделю. Аварийные вызовы по электрике — 24/7.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <div className="mt-7 flex items-center gap-3 rounded-xl border border-frost/30 bg-frost/8 px-5 py-4">
                  <IconMapPin className="h-6 w-6 shrink-0 text-frost" />
                  <p className="text-sm font-700 leading-snug text-white">
                    Не нашли свой город?
                    <span className="block text-xs font-600 text-mist">
                      Скорее всего, мы туда уже ездили — спросите.
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {cities.map((c, i) => (
                  <Reveal key={c.name} delay={(i % 6) * 60}>
                    <div className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:bg-amber/6">
                      <span className="flex items-center gap-2.5 text-sm font-700 text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-frost transition-all duration-300 group-hover:scale-150 group-hover:bg-amber" />
                        {c.name}
                      </span>
                      <span className="shrink-0 text-[11px] font-600 text-mist transition-colors group-hover:text-amber">
                        {c.time}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
