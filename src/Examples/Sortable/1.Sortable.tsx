import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import TodoItem, { TodoItemProps } from './TodoItem';

const todos = Array.from({ length: 10 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `Todo ${idx + 1}`,
}));

export default function SortableExample() {
  const [items, setItems] = useState(todos);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={event => {
        const { active, over } = event;
        if (active.id === over?.id) return;

        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over?.data.current?.sortable.index;

        setItems(prevItems => arrayMove(prevItems, activeIndex, overIndex));
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {items.map(item => (
            <SortableTodoItem key={item.id} {...item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableTodoItem(props: TodoItemProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: props.id,
    });

  return (
    <TodoItem
      ref={setNodeRef}
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className="focus:outline-none focus:ring"
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}
