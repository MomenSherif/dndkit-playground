import * as React from 'react';
import { type SVGProps } from 'react';

export function MoveIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m176 112l80-80l80 80m-80.02-80l.02 448m-80-80l80 80l80-80m64-224l80 80l-80 80M112 176l-80 80l80 80m-80-80h448"
      ></path>
    </svg>
  );
}
