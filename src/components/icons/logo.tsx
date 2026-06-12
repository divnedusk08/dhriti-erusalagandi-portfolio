import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 28"
      width="280"
      height="28"
      aria-label="Dhriti Erusalagandi Logo"
      className="h-6 w-auto transition-transform duration-300"
      {...props}
    >
      <text
        x="0"
        y="21"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="22"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="-0.01em"
      >
        Dhriti Erusalagandi
      </text>
    </svg>
  );
}
