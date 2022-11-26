import { useMemo, useState } from 'react';
import {
  DndContext,
  useDraggable,
  type Modifiers as DndModifiers,
} from '@dnd-kit/core';
import { Coordinates, CSS } from '@dnd-kit/utilities';

import {
  DragHandleIcon,
  DragHorizontalIcon,
  DragVerticalIcon,
  MoveIcon,
} from './Icons';
import Item, { ItemProps } from './Item';

export type Axis = 'vertical' | 'horizontal';

export default function Modifiers({
  modifiers,
  axis,
}: {
  modifiers?: DndModifiers;
  axis?: Axis;
}) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  return (
    <DndContext
      modifiers={modifiers}
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
      <DraggableItem style={{ top: y, left: x }} axis={axis} />
    </DndContext>
  );
}

function DraggableItem({ style, axis }: ItemProps & { axis?: Axis }) {
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

  const Icon = useMemo(() => {
    if (axis === 'vertical') return DragVerticalIcon;
    else if (axis === 'horizontal') return DragHorizontalIcon;
    return MoveIcon;
  }, [axis]);

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
      <Icon className="w-8 h-8" />
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
