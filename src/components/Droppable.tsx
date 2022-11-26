import { type PropsWithChildren } from 'react';
import { useDroppable } from '@dnd-kit/core';

export interface DroppableProps {}

export default function Droppable({
  children,
}: PropsWithChildren<DroppableProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <div
      ref={setNodeRef}
      style={{ color: isOver ? 'green' : undefined }}
      className="border w-40 h-40 rounded grid place-items-center"
    >
      {children}
    </div>
  );
}
