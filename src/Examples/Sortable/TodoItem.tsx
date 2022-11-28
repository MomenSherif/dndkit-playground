import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type TodoItemProps = {
  id: string;
  title: string;
} & ComponentPropsWithoutRef<'div'>;

const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  ({ id, title, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-gray-900 text-white p-4 rounded-md min-w-[300px] ${className}`}
        {...props}
      >
        <h3 className="text-xl font-medium tracking-wide">{title}</h3>
      </div>
    );
  },
);

export default TodoItem;
