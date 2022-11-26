import { forwardRef, type PropsWithChildren } from 'react';

export interface ItemProps {}

const Item = forwardRef<HTMLDivElement, PropsWithChildren<ItemProps>>(
  ({ children }, ref) => (
    <div
      ref={ref}
      className="inline-flex items-center space-x-2 bg-white shadow-sm rounded px-2 py-1 text-gray-900"
    >
      {children}
    </div>
  ),
);

export default Item;
