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

export function DragHandleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25ZM10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Zm5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0ZM5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
