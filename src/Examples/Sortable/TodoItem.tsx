import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { UniqueIdentifier, type DraggableAttributes } from '@dnd-kit/core';

import { DragHandleIcon } from '../useDraggable/Icons';

export type TodoItemProps = {
  id: UniqueIdentifier;
  title?: string;
  onDelete?(id: TodoItemProps['id']): void;
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  attributes?: DraggableAttributes;
  listeners?: Record<string, Function> | undefined;
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'>;

const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  (
    {
      id,
      title = 'title',
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
        {...listeners}
        {...attributes}
      >
        <h3 className="py-2 text-xl font-medium tracking-wide">
          {title} {id}
        </h3>

        {/* <div className="flex self-stretch space-x-1">
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
        </div> */}
      </div>
    );
  },
);

export default TodoItem;
