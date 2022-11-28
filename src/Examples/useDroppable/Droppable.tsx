import { PropsWithChildren, useState } from 'react';
import {
  DndContext,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { MoveIcon } from '../useDraggable/Icons';
import Item, { ItemProps } from '../useDraggable/Item';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

export default function DroppableExample() {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const item = <DraggableItem />;

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      onDragEnd={event => {
        const { over } = event;
        setParent(over ? over.id : null);
      }}
    >
      <div className="flex items-center w-full max-w-4xl py-5">
        <span className="absolute">{!parent && item}</span>
        <div className="ml-64 grid grid-cols-2 gap-8 flex-1">
          {['A', 'B', 'C'].map(id => (
            <DroppableContainer key={id} id={id}>
              {parent === id && item}
            </DroppableContainer>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

function DraggableItem({ style }: ItemProps) {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: 'draggable',
    });

  return (
    <Item
      ref={setNodeRef}
      style={{
        transform: transform
          ? `${CSS.Translate.toString(transform)} scale(var(--scale))`
          : undefined,
        ...style,
      }}
      {...listeners}
      {...attributes}
      className={`relative z-20 ${
        isDragging ? 'shadow-dragging [--scale:1.06]' : ''
      }`}
    >
      <MoveIcon className="w-8 h-8" />
      <span>Draggable</span>
    </Item>
  );
}

function DroppableContainer({
  children,
  id,
}: PropsWithChildren<{ id: UniqueIdentifier }>) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative transition-all duration-300 bg-white border-2 rounded-lg min-h-[300px] flex justify-center items-center ${
        isOver ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-xl' : ''
      }`}
    >
      {children}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 only:-translate-y-1/2 text-3xl font-medium text-gray-400 transition-transform duration-300 only:scale-100 scale-75 translate-y-24">
        Droppable
      </span>
    </div>
  );
}
