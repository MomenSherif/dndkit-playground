import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay,
  useDndContext,
  useDraggable,
  type DraggableAttributes,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { CSS, type Coordinates } from '@dnd-kit/utilities';

import { DragHandleIcon, MoveIcon } from './Icons';

export default function DragOverlayExample() {
  const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
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
      <DraggableOverlay />
    </DndContext>
  );
}

// Presentational Item
type ItemProps = {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  attributes?: DraggableAttributes;
  listeners?: Record<string, Function> | undefined;
} & ComponentPropsWithoutRef<'div'>;

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { setActivatorNodeRef, attributes, listeners, className = '', ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={`relative inline-flex items-center space-x-3 bg-gray-900 text-white text-3xl p-4 rounded-md ${className}`}
      {...props}
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
    </div>
  ),
);

function DraggableItem({
  className = '',
  ...props
}: ComponentPropsWithoutRef<typeof Item>) {
  const { setNodeRef, setActivatorNodeRef, listeners, attributes, isDragging } =
    useDraggable({
      id: 'draggable',
    });

  return (
    <Item
      ref={setNodeRef}
      className={`${isDragging ? 'opacity-50' : ''} ${className}`}
      setActivatorNodeRef={setActivatorNodeRef}
      listeners={listeners}
      attributes={attributes}
      {...props}
    />
  );
}

function DraggableOverlay() {
  const { active } = useDndContext();

  return createPortal(
    <DragOverlay
    // dropAnimation={{
    //   keyframes({ transform }) {
    //     return [
    //       { transform: CSS.Transform.toString(transform.initial) },
    //       {
    //         transform: CSS.Transform.toString({
    //           ...transform.final,
    //           scaleX: 0.95,
    //           scaleY: 0.95,
    //         }),
    //       },
    //     ];
    //   },
    // }}
    >
      {active && <Item className="shadow-dragging" />}
    </DragOverlay>,
    document.body,
  );
}
