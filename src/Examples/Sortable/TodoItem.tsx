import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { type DraggableAttributes } from '@dnd-kit/core';

import { DragHandleIcon } from '../useDraggable/Icons';

export type TodoItemProps = {
  id: string;
  title: string;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  attributes?: DraggableAttributes;
  listeners?: Record<string, Function> | undefined;
} & ComponentPropsWithoutRef<'div'>;

const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  (
    {
      id,
      title,
      className,
      setActivatorNodeRef,
      listeners,
      attributes,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-md min-w-[300px] ${className}`}
        {...props}
      >
        <h3 className="py-2 text-xl font-medium tracking-wide">{title}</h3>
        <button
          className="touch-none self-stretch px-1 rounded-md hover:bg-gray-200/20 focus:bg-gray-200/20 focus:outline-none"
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <DragHandleIcon className="w-4 h-4" />
        </button>
      </div>
    );
  },
);

export default TodoItem;
