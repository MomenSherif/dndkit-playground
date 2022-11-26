import { type PropsWithChildren } from 'react';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

export interface DroppableProps {
  id: UniqueIdentifier;
}

export default function Droppable({
  id,
  children,
}: PropsWithChildren<DroppableProps>) {
  const { isOver, setNodeRef } = useDroppable({
    id,
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
