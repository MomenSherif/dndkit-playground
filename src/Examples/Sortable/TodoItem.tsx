import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { type DraggableAttributes } from '@dnd-kit/core';

import { DragHandleIcon } from '../useDraggable/Icons';

export type TodoItemProps = {
  id: string;
  title: string;
  onDelete?(id: TodoItemProps['id']): void;
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
      onDelete,
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
        className={`group flex items-center justify-between bg-gray-900 text-white px-4 py-2 rounded-md min-w-[300px] ${className}`}
        {...props}
      >
        <h3 className="py-2 text-xl font-medium tracking-wide">{title}</h3>

        <div className="flex self-stretch space-x-1">
          <button
            className="hidden touch-none self-stretch px-2 rounded-md group-hover:inline-block hover:bg-gray-200/20 focus:bg-gray-200/20 focus:outline-none"
            onClick={() => onDelete?.(id)}
          >
            <span className="text-sm align-middle">X</span>
          </button>
          <button
            className="touch-none self-stretch px-1 rounded-md hover:bg-gray-200/20 focus:bg-gray-200/20 focus:outline-none"
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
          >
            <DragHandleIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  },
);

export default TodoItem;
