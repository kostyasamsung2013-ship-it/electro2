interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconBolt({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M13.5 2 5 13.5h6L10.5 22 19 10.5h-6L13.5 2Z" />
    </svg>
  );
}

export function IconSnow({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2v20M4 6l16 12M20 6 4 18" />
      <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M2.8 9.4l3-.5.5-3M21.2 14.6l-3 .5-.5 3M2.8 14.6l3 .5.5 3M21.2 9.4l-3-.5-.5-3" />
    </svg>
  );
}

export function IconSunPanel({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M12 1.8v1.6M6.6 3.6l1.1 1.1M17.4 3.6l-1.1 1.1M3.8 8h1.6M18.6 8h1.6" />
      <path d="m5.5 21 2-7h9l2 7H5.5ZM8.3 14l-.8 7M15.7 14l.8 7M6.2 17.5h11.6" />
    </svg>
  );
}

export function IconShield({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10v-6L12 2.5Z" />
      <path d="m8.8 11.8 2.3 2.3 4.3-4.6" />
    </svg>
  );
}

export function IconLicense({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m9.8 9.2 1.7 1.7 2.9-3.2" />
      <path d="m8.5 13.7-1.7 7 5.2-2.6 5.2 2.6-1.7-7" />
    </svg>
  );
}

export function IconDoc({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 2.8h8l4 4v14.4H6V2.8Z" />
      <path d="M14 2.8v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </svg>
  );
}

export function IconStamp({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="9" strokeDasharray="4 3" />
      <path d="M12 7v6.2M12 16.8v.2" />
    </svg>
  );
}

export function IconPhone({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5.5 3.5h4l1.5 4.5-2.2 1.6a12.5 12.5 0 0 0 5.6 5.6l1.6-2.2 4.5 1.5v4c0 .8-.7 1.6-1.5 1.5C10.6 19.4 4.6 13.4 4 5c-.1-.8.7-1.5 1.5-1.5Z" />
    </svg>
  );
}

export function IconWhatsApp({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M8.8 8.8c-.3 1.8 3.4 6 5.9 5.9.9 0 1.5-.6 1.5-1.2l-1.7-1.1-1 .7c-1-.4-2.2-1.6-2.5-2.5l.8-.9-1.1-1.7c-.6 0-1.7.2-1.9.8Z" />
    </svg>
  );
}

export function IconCheck({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m4.5 12.5 5 5L19.5 6.5" />
    </svg>
  );
}

export function IconArrowRight({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6.5 17.5 17.5 6.5m0 0H8.7m8.8 0v8.8" />
    </svg>
  );
}

export function IconMapPin({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21.5s-7-6.4-7-11.5a7 7 0 0 1 14 0c0 5.1-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </svg>
  );
}

export function IconStar({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
      <path d="m12 2.6 2.8 6 6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.8 3.2 1.3-6.5-4.9-4.5 6.6-.8 2.8-6Z" />
    </svg>
  );
}

export function IconPlus({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconEuro({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M17.5 5.8A7 7 0 0 0 6.8 8.4a7.3 7.3 0 0 0 0 7.2 7 7 0 0 0 10.7 2.6M4 10.4h9M4 13.6h8" />
    </svg>
  );
}

export function IconLeaf({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M19.5 4.5c-9 0-14 5-14 11 0 2.2 1.8 4 4 4 6 0 10-6.5 10-15Z" />
      <path d="M5.5 19.5C9 14 13 10 17 7.5" />
    </svg>
  );
}

export function IconGauge({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4.5 18.5a9 9 0 1 1 15 0" />
      <path d="m12 14 4-5" />
      <circle cx="12" cy="14.5" r="1.6" />
    </svg>
  );
}

export function IconHome({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m3.5 11 8.5-7 8.5 7M6 9.5v11h12v-11" />
      <path d="M10 20.5v-6h4v6" />
    </svg>
  );
}

export function IconWrench({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M20.5 6.5a5 5 0 0 1-6.6 6.2l-7 7a2 2 0 1 1-2.8-2.8l7-7A5 5 0 0 1 17.3 3l-2.6 2.7 2.6 2.6 2.7-2.6c.4.2.5.5.5.8Z" />
    </svg>
  );
}

export function IconSend({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M21 3.5 3.5 10.2l6.6 2.7L13 19.5 21 3.5Z" />
      <path d="m10.1 12.9 4.3-4.3" />
    </svg>
  );
}

export function IconMenu({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" />
    </svg>
  );
}

export function IconX({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="m5.5 5.5 13 13m0-13-13 13" />
    </svg>
  );
}

/* Brand logo: bolt inside a dashed sun-ring */
export function Logo({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <circle
        cx="24"
        cy="24"
        r="17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeDasharray="5 4"
        opacity="0.85"
      />
      <path
        d="M26.5 10 15 27h8l-2.5 11L34 21h-8l.5-11Z"
        fill="currentColor"
      />
    </svg>
  );
}
