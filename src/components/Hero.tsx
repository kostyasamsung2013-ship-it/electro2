import { Img, Reveal, useLive, useScramble } from "../lib/motion";
import { IMG, marqueeCities, WA_LINK } from "../lib/data";
import {
  IconBolt,
  IconCheck,
  IconShield,
  IconSnow,
  IconSunPanel,
  IconWhatsApp,
} from "../lib/icons";

function LiveDashboard() {
  const gen = useLive(4.6, 0.5);
  const use_ = useLive(1.2, 0.25);
  const exportKw = Math.max(0, Math.round((gen - use_) * 10) / 10);
  const selfPct = Math.min(100, Math.round((use_ / gen) * 100));

  return (
    <div className="w-[300px] rounded-xl border border-white/12 bg-ink/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:w-[340px]">
      <div className="flex items-center justify-between">
        <p className="font-display text-[10px] font-600 uppercase tracking-[0.22em] text-mist">
          Дом в Торревьехе
        </p>
        <span className="flex items-center gap-1.5 text-[10px] font-700 uppercase tracking-widest text-wa">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-wa" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
          </span>
          онлайн
        </span>
      </div>

      <div className="mt-4 space-y-3.5">
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-600 text-mist">Солнечные панели</span>
            <span className="font-display text-lg font-700 text-amber">
              {gen.toFixed(1)} кВт
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="vb-bar h-full rounded-full bg-amber"
              style={{ width: `${Math.min(96, gen * 11)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-600 text-mist">Потребление дома</span>
            <span className="font-display text-lg font-700 text-white">
              {use_.toFixed(1)} кВт
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="vb-bar h-full rounded-full bg-frost"
              style={{ width: `${selfPct}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
          <span className="text-xs font-600 text-mist">Кондиционер · гостиная</span>
          <span className="flex items-center gap-1.5 text-xs font-800 text-frost">
            <IconSnow className="h-3.5 w-3.5" /> 21 °C
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-xs font-600 text-mist">Экспорт в сеть i-DE</span>
          <span className="font-display text-sm font-700 text-wa">
            +{exportKw.toFixed(1)} кВт
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const l1 = useScramble("ТОК, ХОЛОД", 150, 800);
  const l2 = useScramble("И СОЛНЦЕ", 550, 800);
  const l3 = useScramble("КОСТА-БЛАНКИ", 950, 1000);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-amber/12 blur-[140px]" />
        <div className="absolute -left-44 top-1/3 h-[520px] w-[520px] rounded-full bg-frost/8 blur-[130px]" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.16]"
          aria-hidden="true"
        >
          <path
            d="M-20 180 H 420 L 520 300 H 900"
            fill="none"
            stroke="#FFB03A"
            strokeWidth="1.5"
            strokeDasharray="10 14"
            className="dashflow"
          />
          <path
            d="M-20 640 H 300 L 380 560 H 1500"
            fill="none"
            stroke="#53D7E8"
            strokeWidth="1.5"
            strokeDasharray="6 16"
            className="dashflow"
            style={{ animationDuration: "11s" }}
          />
          <path
            d="M 700 -20 V 200 L 820 320 V 800"
            fill="none"
            stroke="#FFB03A"
            strokeWidth="1"
            strokeDasharray="4 18"
            className="dashflow"
            style={{ animationDuration: "14s" }}
          />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {["Лицензия установщика", "CIE / boletín", "Гарантия 5 лет"].map(
                (t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full border border-amber/30 bg-amber/8 px-3.5 py-1.5 text-[11px] font-700 uppercase tracking-[0.14em] text-amber"
                  >
                    <IconCheck className="h-3 w-3" /> {t}
                  </span>
                ),
              )}
            </div>
          </Reveal>

          <h1 className="mt-7 font-display font-800 uppercase leading-[1.04] tracking-tight">
            <span className="block text-[clamp(2rem,5.4vw,4.4rem)] text-white">
              {l1}
            </span>
            <span className="block text-[clamp(2rem,5.4vw,4.4rem)] text-white">
              {l2}
            </span>
            <span className="text-outline block text-[clamp(2rem,5.4vw,4.4rem)]">
              {l3}
            </span>
          </h1>

          <Reveal delay={200}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
              Электромонтаж, кондиционеры и солнечные панели под ключ —{" "}
              <span className="font-700 text-white">официально, по лицензии</span>{" "}
              и с гарантией, прописанной в договоре. Аликанте, Бенидорм,
              Торревьежа и вся Коста-Бланка.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="group inline-flex items-center gap-3 rounded-full bg-amber px-7 py-4 font-display text-sm font-700 uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_40px_rgba(255,176,58,0.4)]"
              >
                Рассчитать проект
                <IconBolt className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 font-display text-sm font-600 uppercase tracking-wide text-white transition-all duration-300 hover:border-wa hover:bg-wa/10 hover:text-wa"
              >
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: IconBolt, label: "Электромонтаж", href: "#services" },
                { icon: IconSnow, label: "Кондиционеры", href: "#services" },
                { icon: IconSunPanel, label: "Солнечные панели", href: "#services" },
              ].map(({ icon: I, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:bg-amber/8"
                >
                  <I className="h-5 w-5 text-amber transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-700 text-white">{label}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={540}>
            <div className="mt-9 flex items-center gap-3 border-l-2 border-amber/60 pl-4">
              <IconShield className="h-5 w-5 shrink-0 text-amber" />
              <p className="text-sm leading-snug text-mist">
                Страховка ответственности{" "}
                <span className="font-700 text-white">600 000 €</span> · работаем
                по договору с factura и IVA ·{" "}
                <span className="font-700 text-white">русскоязычная команда</span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal delay={250} className="relative">
            {/* sun ring */}
            <svg
              viewBox="0 0 200 200"
              className="spin-slow pointer-events-none absolute -right-8 -top-10 h-40 w-40 text-amber/50"
              aria-hidden="true"
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 10"
              />
              <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
            </svg>

            <div className="relative overflow-hidden rounded-2xl border border-white/12 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <Img
                src={IMG.villa}
                alt="Вилла с солнечными панелями на Коста-Бланке"
                eager
                className="kenburns h-[420px] w-full object-cover sm:h-[500px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-ink/80 px-4 py-2 text-[11px] font-700 uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                Ла-Зения · станция 8,4 кВт
              </div>
            </div>

            <div className="floaty absolute -bottom-8 -left-3 sm:-left-10">
              <LiveDashboard />
            </div>

            <div className="floaty-slow absolute -right-2 top-16 hidden rounded-lg border border-frost/30 bg-ink/85 px-4 py-3 backdrop-blur-sm sm:block">
              <p className="font-display text-2xl font-800 text-frost">320</p>
              <p className="text-[11px] font-600 uppercase tracking-wider text-mist">
                солнечных дней в году
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CitiesMarquee() {
  const row = [...marqueeCities, ...marqueeCities];
  return (
    <div className="marquee relative overflow-hidden border-y-2 border-ink bg-amber py-3.5">
      <div className="marquee-track flex w-max items-center gap-8">
        {row.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="flex items-center gap-8 font-display text-sm font-700 uppercase tracking-[0.2em] text-ink"
          >
            {c}
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-ink/70">
              <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6L6 0z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
