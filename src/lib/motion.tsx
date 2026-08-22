import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* Scroll-reveal wrapper */
export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`rv ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* Count-up when visible */
export function useCountUp(target: number, duration = 1700) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return { ref, value };
}

/* Scramble-decode text */
const SCRAMBLE_CHARS = "ВОЛЬТАБЛАНКE01/▮·+=";
export function useScramble(text: string, delay = 0, durationMs = 950) {
  const [out, setOut] = useState(() =>
    prefersReduced() ? text : text.replace(/[^\s,]/g, "·"),
  );
  useEffect(() => {
    if (prefersReduced()) {
      setOut(text);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / durationMs);
        const revealed = Math.floor(p * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " " || ch === "," || ch === ".") {
            s += ch;
            continue;
          }
          s +=
            i < revealed
              ? ch
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setOut(p >= 1 ? text : s);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, durationMs]);
  return out;
}

/* Live jittering value (dashboard feel) */
export function useLive(base: number, variance: number, interval = 2300) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (prefersReduced()) return;
    const id = window.setInterval(() => {
      const next = base + (Math.random() * 2 - 1) * variance;
      setV(Math.round(next * 10) / 10);
    }, interval);
    return () => window.clearInterval(id);
  }, [base, variance, interval]);
  return v;
}

const FALLBACK_IMG =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#10304d'/><stop offset='1' stop-color='#081422'/></linearGradient></defs><rect width='800' height='600' fill='url(#g)'/><g stroke='#FFB03A' stroke-opacity='0.4' fill='none' stroke-dasharray='7 9'><path d='M-20 140H310l90 100h440'/><path d='M-20 430H220l90-90h530'/></g><circle cx='640' cy='130' r='70' fill='none' stroke='#FFB03A' stroke-opacity='0.35' stroke-dasharray='4 9'/><path d='M420 170l-100 160h78l-22 160 118-195h-76l2-125z' fill='#FFB03A' fill-opacity='0.55'/></svg>`,
  );

/* Image with graceful fallback */
export function Img({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <img
      src={broken ? FALLBACK_IMG : src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => setBroken(true)}
    />
  );
}

/* Header scrolled state */
export function useScrolled(threshold = 14) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
