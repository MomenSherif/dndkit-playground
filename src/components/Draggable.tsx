import { PropsWithChildren, type SVGProps } from 'react';
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export interface DraggableProps {
  id: UniqueIdentifier;
}

export default function Draggable({
  id,
  children,
}: PropsWithChildren<DraggableProps>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className="inline-flex items-center space-x-2 bg-white shadow-sm rounded px-2 py-1 text-gray-900"
    >
      {children}
      <button {...listeners} {...attributes} className="touch-none">
        <DragIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

const DragIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);
