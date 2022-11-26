import { forwardRef, type ComponentProps } from 'react';

export type ItemProps = {} & ComponentProps<'div'>;

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex items-center space-x-3 bg-gray-900 text-white text-3xl px-6 py-4 rounded-md ${className}`}
      {...props}
    >
      {children}
    </div>
  ),
);

export default Item;
