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

export function DragVerticalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.75 7.25a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Zm-.97 4.85a.75.75 0 0 1 0 1.06l-2.25 2.25l-.53.53l-.53-.53l-2.25-2.25a.75.75 0 1 1 1.06-1.06L8 13.82l1.72-1.72a.75.75 0 0 1 1.06 0ZM6 8a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 8ZM1 8a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 1 8Zm9.78-5.28a.75.75 0 1 1-1.06 1.06L8 2.06L6.28 3.78a.75.75 0 0 1-1.06-1.06L7.47.47L8-.06l.53.53l2.25 2.25Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function DragHorizontalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.25 4.25a.75.75 0 0 0 1.5 0v-2.5a.75.75 0 0 0-1.5 0v2.5Zm4.91.97a.75.75 0 0 1 1.06 0l2.25 2.25L16 8l-.53.53l-2.25 2.25a.75.75 0 0 1-1.06-1.06L13.88 8l-1.72-1.72a.75.75 0 0 1 0-1.06ZM8 10a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 1.5 0v2.5A.75.75 0 0 1 8 10Zm0 5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 1.5 0v2.5A.75.75 0 0 1 8 15ZM2.78 5.22a.75.75 0 0 1 1.06 1.06L2.12 8l1.72 1.72a.75.75 0 1 1-1.06 1.06L.53 8.53L0 8l.53-.53l2.25-2.25Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
