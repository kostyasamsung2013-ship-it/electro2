import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "../lib/motion";
import {
  ADDRESS,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WA_LINK,
} from "../lib/data";
import {
  IconCheck,
  IconClock,
  IconMapPin,
  IconPhone,
  IconSend,
  IconWhatsApp,
  Logo,
} from "../lib/icons";

const SERVICE_OPTIONS = [
  "Электромонтажные работы",
  "Кондиционеры",
  "Солнечные панели",
  "Комплексный проект",
  "Другое / не знаю",
];

const CITY_OPTIONS = [
  "Аликанте",
  "Бенидорм",
  "Торревьеха",
  "Эльче",
  "Санта-Пола",
  "Ориуэла-Коста",
  "Другой город Коста-Бланки",
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [city, setCity] = useState(CITY_OPTIONS[0]);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<{ service: string; comment: string }>).detail;
      if (!d) return;
      const match = SERVICE_OPTIONS.find((s) => d.service.includes(s.split(" ")[0]));
      setService(match ?? d.service);
      setComment(d.comment);
      setSent(false);
    };
    window.addEventListener("vb:prefill", handler);
    return () => window.removeEventListener("vb:prefill", handler);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 6;
    if (!ok) {
      setError(true);
      window.setTimeout(() => setError(false), 550);
      return;
    }
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-white/15 bg-ink/60 px-4 py-3.5 text-sm font-600 text-white placeholder:text-mist/60 outline-none transition-all duration-300 focus:border-amber focus:bg-ink focus:shadow-[0_0_0_4px_rgba(255,176,58,0.12)]";

  return (
    <section id="contact" className="relative overflow-hidden bg-deep py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-[460px] w-[620px] rounded-full bg-amber/8 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-display text-xs font-700 uppercase tracking-[0.3em] text-amber">
                / заявка
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,4vw,3.2rem)] font-800 uppercase leading-[1.08] text-white">
                Расскажите о задаче —<br />
                <span className="text-amber">смету вернём завтра</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
                Перезвоним в течение 15 минут в рабочее время. Если удобнее —
                пишите в WhatsApp: там же пришлём примеры смет и лицензию.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 space-y-4">
                <a
                  href={PHONE_TEL}
                  className="group flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/60 hover:bg-amber/8"
                >
                  <IconPhone className="h-5 w-5 shrink-0 text-amber" />
                  <span>
                    <span className="block font-display text-lg font-700 text-white">
                      {PHONE_DISPLAY}
                    </span>
                    <span className="text-xs font-600 text-mist">
                      звонок по Испании бесплатный
                    </span>
                  </span>
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-wa/60 hover:bg-wa/8"
                >
                  <IconWhatsApp className="h-5 w-5 shrink-0 text-wa" />
                  <span>
                    <span className="block font-display text-lg font-700 text-white">
                      WhatsApp
                    </span>
                    <span className="text-xs font-600 text-mist">
                      отвечаем за 10 минут, 9:00–21:00
                    </span>
                  </span>
                </a>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4">
                    <IconMapPin className="h-5 w-5 text-frost" />
                    <p className="mt-2 text-xs font-600 leading-relaxed text-mist">
                      {ADDRESS}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4">
                    <IconClock className="h-5 w-5 text-frost" />
                    <p className="mt-2 text-xs font-600 leading-relaxed text-mist">
                      Пн–Сб · 9:00–20:00
                      <br />
                      аварийная электрика — 24/7
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={200}>
              <div className="rounded-2xl border border-white/12 bg-panel p-7 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:p-10">
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="rise-check flex h-20 w-20 items-center justify-center rounded-full border-2 border-wa bg-wa/10">
                      <IconCheck className="h-9 w-9 text-wa" />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-800 uppercase text-white">
                      Заявка улетела!
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                      {name.trim() || "Спасибо"}! Перезвоним на{" "}
                      <span className="font-700 text-white">{phone}</span> в
                      течение 15 минут в рабочее время. Если срочно — WhatsApp
                      быстрее всего.
                    </p>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-wa px-6 py-3.5 font-display text-xs font-800 uppercase tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <IconWhatsApp className="h-4 w-4" /> Написать сейчас
                    </a>
                  </div>
                ) : (
                  <form onSubmit={submit} className={error ? "shake" : ""} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-700 uppercase tracking-wider text-mist">
                          Ваше имя *
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Например, Сергей"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-700 uppercase tracking-wider text-mist">
                          Телефон *
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+34 ___ ___ ___"
                          inputMode="tel"
                          className={`${inputCls} ${error && phone.replace(/\D/g, "").length < 6 ? "border-ember" : ""}`}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-700 uppercase tracking-wider text-mist">
                          Что нужно сделать
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className={`${inputCls} appearance-none`}
                        >
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-panel">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-700 uppercase tracking-wider text-mist">
                          Город
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className={`${inputCls} appearance-none`}
                        >
                          {CITY_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-panel">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-2 block text-xs font-700 uppercase tracking-wider text-mist">
                          Комментарий
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          placeholder="Например: двухкомнатная квартира, нужна проводка под ключ и кондиционер в спальню…"
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="mt-4 rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm font-600 text-ember">
                        Проверьте имя и телефон — иначе мы не сможем перезвонить.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-amber px-6 py-4 font-display text-sm font-800 uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_44px_rgba(255,176,58,0.4)]"
                    >
                      Отправить заявку
                      <IconSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </button>
                    <p className="mt-4 text-center text-[11px] font-600 leading-relaxed text-mist/70">
                      Нажимая кнопку, вы соглашаетесь на обработку данных (RGPD).
                      Никакого спама — только ответ по вашему вопросу.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-3">
              <Logo className="h-10 w-10 text-amber" />
              <span className="font-display text-sm font-800 tracking-[0.18em] text-white">
                VOLTA<span className="text-amber">·</span>BLANCA
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              Электромонтаж, кондиционеры и солнечные панели на Коста-Бланке.
              Официально: licencia de instalador, seguro de responsabilidad
              civil, boletín eléctrico (CIE) и гарантия по договору.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-3 font-display text-xs font-700 uppercase tracking-wide text-white transition-all duration-300 hover:border-wa hover:text-wa"
            >
              <IconWhatsApp className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-xs font-700 uppercase tracking-[0.2em] text-amber">
              Услуги
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-600 text-mist">
              {[
                "Электромонтажные работы",
                "Установка кондиционеров",
                "Солнечные панели под ключ",
                "Зарядки для электромобилей",
                "Аварийный электрик 24/7",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="u-sweep transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-display text-xs font-700 uppercase tracking-[0.2em] text-amber">
              Города
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-600 text-mist">
              {["Аликанте", "Бенидорм", "Торревьеха", "Эльче", "Дения и Хавея"].map((s) => (
                <li key={s}>
                  <a href="#cities" className="u-sweep transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-display text-xs font-700 uppercase tracking-[0.2em] text-amber">
              Контакты
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-600 leading-relaxed text-mist">
              <li>
                <a href={PHONE_TEL} className="u-sweep text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="u-sweep hover:text-white">
                  {EMAIL}
                </a>
              </li>
              <li className="text-mist/80">{ADDRESS}</li>
              <li className="text-mist/80">Пн–Сб · 9:00–20:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[11px] font-600 text-mist/60 md:flex-row md:items-center">
          <p>
            © 2026 Volta Blanca S.L. · NIF B-54812397 · Registro Industrial de la
            Comunitat Valenciana
          </p>
          <p>Hecho en Alicante · Costa Blanca · {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Написать в WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-lg bg-ink/90 px-4 py-2 text-xs font-700 text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Ответим за 10 минут
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-wa text-ink shadow-[0_10px_30px_rgba(35,192,94,0.45)] transition-transform duration-300 group-hover:scale-110">
        <span className="pulse-ring absolute inset-0 rounded-full bg-wa" />
        <IconWhatsApp className="relative h-7 w-7" />
      </span>
    </a>
  );
}
