import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  AnimateLayoutChanges,
  arrayMove,
  defaultAnimateLayoutChanges,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import TodoItem, { TodoItemProps } from './TodoItem';

const todos = Array.from({ length: 50 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `Todo ${idx + 1}`,
}));

export default function VerticalSortableExample() {
  const [items, setItems] = useState(todos);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDelete = (id: TodoItemProps['id']) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <DndContext
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      onDragStart={event => {
        const { active } = event;
        setActiveIndex(active ? active.data.current?.sortable.index : null);
      }}
      onDragCancel={() => setActiveIndex(null)}
      onDragEnd={event => {
        const { active, over } = event;
        if (active.id === over?.id) return;

        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over?.data.current?.sortable.index;

        setItems(prevItems => arrayMove(prevItems, activeIndex, overIndex));
        setActiveIndex(null);
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 py-5 max-h-[500px] overflow-auto">
          {items.map(item => (
            <SortableTodoItem key={item.id} onDelete={handleDelete} {...item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableTodoItem(props: TodoItemProps) {
  const animateLayoutChanges: AnimateLayoutChanges = args =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.id,
    animateLayoutChanges,
  });

  return (
    <TodoItem
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className={`relative focus:outline-none focus:ring ${
        isDragging ? 'z-50' : ''
      }`}
      {...props}
      attributes={attributes}
      listeners={listeners}
      setActivatorNodeRef={setActivatorNodeRef}
    />
  );
}
