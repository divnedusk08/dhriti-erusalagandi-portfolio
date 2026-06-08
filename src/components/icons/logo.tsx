import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 28"
      width="280"
      height="28"
      aria-label="Dhriti Erusalagandi Logo"
      className="h-7 w-auto transition-transform duration-300 hover:scale-105"
      {...props}
    >
      <text
        x="0"
        y="22"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontSize="26"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        Dhriti Erusalagandi
      </text>
    </svg>
  );
}
