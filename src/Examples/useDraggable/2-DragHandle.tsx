import { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Coordinates, CSS } from '@dnd-kit/utilities';

import { DragHandleIcon, MoveIcon } from './Icons';
import Item, { ItemProps } from './Item';

export default function DragHandle() {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  return (
    <DndContext
      onDragEnd={event => {
        const {
          delta: { x, y },
        } = event;
        setCoordinates(prevCoords => ({
          x: prevCoords.x + x,
          y: prevCoords.y + y,
        }));
      }}
    >
      <DraggableItem style={{ top: y, left: x }} />
    </DndContext>
  );
}

function DraggableItem({ style }: ItemProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    attributes,
    transform,
    isDragging,
  } = useDraggable({
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
      className={`relative pr-2 py-3 ${
        isDragging ? 'shadow-dragging [--scale:1.06]' : ''
      }`}
    >
      <MoveIcon className="w-8 h-8" />
      <span>Draggable</span>

      <button
        className="touch-none self-stretch px-1 rounded-md hover:bg-gray-200/20 focus:bg-gray-200/20 focus:outline-none"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <DragHandleIcon className="w-4 h-4" />
      </button>
    </Item>
  );
}
