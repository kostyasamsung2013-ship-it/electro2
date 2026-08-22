import { useState } from "react";
import { useScrolled } from "../lib/motion";
import { PHONE_DISPLAY, PHONE_TEL } from "../lib/data";
import { IconMenu, IconPhone, IconX, Logo } from "../lib/icons";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#process", label: "Как мы работаем" },
  { href: "#guarantees", label: "Гарантии" },
  { href: "#projects", label: "Проекты" },
  { href: "#faq", label: "Вопросы" },
];

export default function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-white/10 py-2.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <Logo className="h-10 w-10 text-amber transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-display text-sm font-800 tracking-[0.18em] text-white">
            VOLTA<span className="text-amber">·</span>BLANCA
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="u-sweep text-[13px] font-600 tracking-wide text-mist transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={PHONE_TEL}
            className="group flex items-center gap-2 text-sm font-700 text-white"
          >
            <IconPhone className="h-4 w-4 text-amber transition-transform duration-300 group-hover:rotate-12" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-amber px-5 py-2.5 text-sm font-800 text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_0_28px_rgba(255,176,58,0.45)]"
          >
            Заявка
          </a>
        </div>

        <button
          aria-label="Меню"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-white/15 p-2 text-white lg:hidden"
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 pb-6 pt-3 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 font-display text-sm font-600 text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <a href={PHONE_TEL} className="text-sm font-700 text-amber">
              {PHONE_DISPLAY}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-amber px-5 py-2.5 text-sm font-800 text-ink"
            >
              Заявка
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
