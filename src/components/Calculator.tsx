import { useMemo, useState, type CSSProperties } from "react";
import { prefersReduced, Reveal } from "../lib/motion";
import { IconSend, IconSnow, IconSunPanel } from "../lib/icons";

type Mode = "solar" | "ac";

const AC_MODELS = [
  { name: "Сплит 7000 BTU", upTo: 20, btu: "7 000", kwCool: "2,1", price: 690 },
  { name: "Сплит 9000 BTU", upTo: 26, btu: "9 000", kwCool: "2,6", price: 790 },
  { name: "Сплит 12000 BTU", upTo: 35, btu: "12 000", kwCool: "3,5", price: 940 },
  { name: "Сплит 18000 BTU", upTo: 50, btu: "18 000", kwCool: "5,3", price: 1390 },
  { name: "Сплит 24000 BTU", upTo: 70, btu: "24 000", kwCool: "7,0", price: 1790 },
  { name: "Мульти-сплит / канальный", upTo: 120, btu: "28 000+", kwCool: "8,2", price: 2490 },
];

function VbSlider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
  frost = false,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  frost?: boolean;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <label className="text-sm font-700 text-white">{label}</label>
        <span
          className={`font-display text-xl font-800 ${frost ? "text-frost" : "text-amber"}`}
        >
          {value.toLocaleString("ru-RU")}{" "}
          <span className="text-xs font-600 text-mist">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className={`vb-range ${frost ? "frost" : ""}`}
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <div className="mt-1.5 flex justify-between text-[11px] font-600 text-mist/70">
        <span>
          {min.toLocaleString("ru-RU")} {unit}
        </span>
        <span>
          {max.toLocaleString("ru-RU")} {unit}
        </span>
      </div>
    </div>
  );
}

function CheckToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-600 transition-all duration-300 ${
        checked
          ? "border-amber/60 bg-amber/10 text-white"
          : "border-white/12 bg-white/[0.04] text-mist hover:border-white/30"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? "border-amber bg-amber" : "border-mist/50"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-ink" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4.5 12.5 5 5L19.5 6.5" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function ResultRow({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/8 py-3 last:border-0">
      <span className="text-sm font-600 text-mist">{k}</span>
      <span
        className={`font-display text-right text-base font-700 sm:text-lg ${
          accent ? "text-amber" : "text-white"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("solar");
  const [kwh, setKwh] = useState(450);
  const [roof, setRoof] = useState(60);
  const [sunny, setSunny] = useState(true);
  const [area, setArea] = useState(32);
  const [west, setWest] = useState(false);

  const solar = useMemo(() => {
    const irradiance = 1650; // кВт·ч на кВт·ч установленной мощности в год, провинция Аликанте
    const reqKw = (kwh * 12) / irradiance;
    const panelW = 500;
    const maxByRoof = Math.max(4, Math.floor(roof / 2.4));
    const panels = Math.min(Math.ceil((reqKw * 1000) / panelW), maxByRoof);
    const kw = (panels * panelW) / 1000;
    const gen = Math.round(kw * irradiance * (sunny ? 1.06 : 0.93));
    const need = kwh * 12;
    const cover = Math.min(100, Math.round((gen / need) * 100));
    const selfUse = Math.min(gen, need);
    const savings = Math.round(selfUse * 0.19 + Math.max(0, gen - need) * 0.06);
    const cost = Math.round((kw * 1150) / 50) * 50;
    const subsidy = Math.round(kw * 600);
    const payback =
      savings > 0 ? Math.max(1, Math.round(((cost - subsidy) / savings) * 10) / 10) : 0;
    return { panels, kw, gen, cover, savings, cost, subsidy, payback, limited: panels >= maxByRoof && reqKw * 1000 > panels * panelW };
  }, [kwh, roof, sunny]);

  const ac = useMemo(() => {
    const need = area * (west ? 1.15 : 1);
    const model =
      AC_MODELS.find((m) => m.upTo >= need) ?? AC_MODELS[AC_MODELS.length - 1];
    return { model, install: 220 };
  }, [area, west]);

  const sendToForm = () => {
    const detail =
      mode === "solar"
        ? {
            service: "Солнечные панели",
            comment: `Расчёт с сайта: станция ~${solar.kw.toLocaleString("ru-RU")} кВт (${solar.panels} панелей), смета ~${solar.cost.toLocaleString("ru-RU")} €, потребление ${kwh} кВт·ч/мес.`,
          }
        : {
            service: "Кондиционеры",
            comment: `Расчёт с сайта: ${ac.model.name}, комната ${area} м², бюджет от ${(ac.model.price + ac.install).toLocaleString("ru-RU")} € под ключ.`,
          };
    window.dispatchEvent(new CustomEvent("vb:prefill", { detail }));
    document.getElementById("contact")?.scrollIntoView({
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  };

  return (
    <section id="calculator" className="relative overflow-hidden bg-deep py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-amber/8 blur-[130px]" />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-frost/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-amber">
                / калькулятор
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3.2rem)] font-800 uppercase leading-[1.08] text-white">
                Посчитайте сами —<br />
                <span className="text-frost">цифры честные</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-mist">
              Двигайте ползунки — расчёт обновляется мгновенно. Это ориентир по
              реальной инсоляции Аликанте; точную смету зафиксируем после
              бесплатного замера.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="grid overflow-hidden rounded-2xl border border-white/12 bg-panel lg:grid-cols-2">
            {/* controls */}
            <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="flex rounded-full border border-white/12 bg-ink/60 p-1.5">
                {(
                  [
                    { id: "solar", label: "Солнечная станция", Icon: IconSunPanel },
                    { id: "ac", label: "Кондиционер", Icon: IconSnow },
                  ] as const
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 font-display text-[11px] font-700 uppercase tracking-wide transition-all duration-300 sm:text-xs ${
                      mode === id
                        ? id === "solar"
                          ? "bg-amber text-ink shadow-lg"
                          : "bg-frost text-ink shadow-lg"
                        : "text-mist hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-7">
                {mode === "solar" ? (
                  <>
                    <VbSlider
                      label="Потребление электричества"
                      unit="кВт·ч/мес"
                      min={150}
                      max={1500}
                      step={25}
                      value={kwh}
                      onChange={setKwh}
                    />
                    <VbSlider
                      label="Площадь крыши"
                      unit="м²"
                      min={20}
                      max={200}
                      step={5}
                      value={roof}
                      onChange={setRoof}
                    />
                    <CheckToggle
                      checked={sunny}
                      onChange={setSunny}
                      label="Крыша южная, без тени от деревьев и соседей"
                    />
                  </>
                ) : (
                  <>
                    <VbSlider
                      label="Площадь комнаты"
                      unit="м²"
                      min={12}
                      max={120}
                      step={1}
                      value={area}
                      onChange={setArea}
                      frost
                    />
                    <CheckToggle
                      checked={west}
                      onChange={setWest}
                      label="Западная или южная сторона — сильно греется с обеда"
                    />
                    <div className="rounded-lg border border-frost/25 bg-frost/6 px-4 py-3 text-sm leading-relaxed text-mist">
                      Считаем с запасом +15% на панорамные окна и жару Коста-Бланки
                      (+38 °C в июле — не редкость).
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* results */}
            <div className="relative bg-ink/50 p-7 sm:p-10">
              {mode === "solar" ? (
                <div key="solar-r">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-700 uppercase tracking-[0.2em] text-mist">
                        Рекомендуемая станция
                      </p>
                      <p className="mt-1 font-display text-4xl font-800 text-amber sm:text-5xl">
                        {solar.kw.toLocaleString("ru-RU")} кВт
                      </p>
                    </div>
                    <p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-1.5 font-display text-sm font-700 text-amber">
                      {solar.panels} панелей
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs font-700">
                      <span className="text-mist">Покрытие потребления</span>
                      <span className="text-amber">{solar.cover}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="vb-bar h-full rounded-full bg-gradient-to-r from-ember to-amber"
                        style={{ width: `${solar.cover}%` }}
                      />
                    </div>
                    {solar.limited && (
                      <p className="mt-2 text-xs font-600 text-ember">
                        Крыша ограничивает количество панелей — добавим батарею.
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <ResultRow
                      k="Выработка в год"
                      v={`${solar.gen.toLocaleString("ru-RU")} кВт·ч`}
                    />
                    <ResultRow
                      k="Экономия в год"
                      v={`≈ ${solar.savings.toLocaleString("ru-RU")} €`}
                      accent
                    />
                    <ResultRow
                      k="Смета под ключ"
                      v={`≈ ${solar.cost.toLocaleString("ru-RU")} €`}
                    />
                    <ResultRow
                      k="Субсидия Next Generation EU"
                      v={`−${solar.subsidy.toLocaleString("ru-RU")} €`}
                    />
                    <ResultRow
                      k="Окупаемость"
                      v={`≈ ${solar.payback.toLocaleString("ru-RU")} ${solar.payback === 1 ? "год" : solar.payback < 5 ? "года" : "лет"}`}
                      accent
                    />
                  </div>
                </div>
              ) : (
                <div key="ac-r">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-700 uppercase tracking-[0.2em] text-mist">
                        Рекомендуемая модель
                      </p>
                      <p className="mt-1 font-display text-2xl font-800 text-frost sm:text-3xl">
                        {ac.model.name}
                      </p>
                    </div>
                    <p className="rounded-md border border-frost/40 bg-frost/10 px-3 py-1.5 font-display text-sm font-700 text-frost">
                      {ac.model.btu} BTU
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-xs font-700">
                      <span className="text-mist">Запас по площади</span>
                      <span className="text-frost">до {ac.model.upTo} м²</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="vb-bar h-full rounded-full bg-frost"
                        style={{ width: `${Math.min(100, (area / ac.model.upTo) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <ResultRow k="Холодопроизводительность" v={`${ac.model.kwCool} кВт`} />
                    <ResultRow k="Оборудование" v={`от ${ac.model.price.toLocaleString("ru-RU")} €`} />
                    <ResultRow k="Стандартный монтаж" v={`от ${ac.install} €`} />
                    <ResultRow
                      k="Под ключ"
                      v={`от ${(ac.model.price + ac.install).toLocaleString("ru-RU")} €`}
                      accent
                    />
                    <ResultRow k="Монтаж" v="1 день, 2–3 часа" />
                  </div>
                </div>
              )}

              <button
                onClick={sendToForm}
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-display text-xs font-800 uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber hover:shadow-[0_10px_36px_rgba(255,176,58,0.35)] sm:text-sm"
              >
                Получить точную смету
                <IconSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-3 text-center text-[11px] font-600 text-mist/70">
                Расчёт пришлётся в форму заявки — не нужно ничего переписывать.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
