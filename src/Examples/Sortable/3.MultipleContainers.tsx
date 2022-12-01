import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  useDndContext,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
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
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal, unstable_batchedUpdates } from 'react-dom';
import { coordinateGetter as multipleContainersCoordinateGetter } from './coordinateGetter';

import TodoItem, { TodoItemProps } from './TodoItem';

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

const todos = Array.from({ length: 10 }, (_, idx) => ({
  id: `${idx + 1}`,
  title: `Todo ${idx + 1}`,
}));

export default function MultipleContainersExample() {
  const [items, setItems] = useState<Items>(() => ({
    One: todos.slice(0, 5).map(t => t.id),
    Two: todos.slice(5, 10).map(t => t.id),
    Three: [],
  }));
  const [containers, setContainers] = useState(() => Object.keys(items));
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);

  const [clonedItems, setClonedItems] = useState<Items | null>(null);

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    args => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            container => container.id in items,
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                container =>
                  container.id !== overId &&
                  containerItems.includes(container.id), // exclude all sortable items inside other container
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items],
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find(key => items[key].includes(id));
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: multipleContainersCoordinateGetter,
    }),
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (overId == null || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems(items => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                item => item !== active.id,
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length,
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers(containers => {
            const activeIndex = containers.indexOf(active.id as string);
            const overIndex = containers.indexOf(over.id as string);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems(items => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex,
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={onDragCancel}
    >
      <div className="grid grid-flow-col gap-10">
        {containers.map(container => (
          <DroppableContainer
            key={container}
            id={container}
            heading={`Container ${container}`}
            items={items[container]}
          >
            {items[container].map(todo => (
              <SortableTodoItem key={todo} id={todo} />
            ))}
          </DroppableContainer>
        ))}
      </div>
      <DraggableOverlay />
    </DndContext>
  );
}

function SortableTodoItem(props: TodoItemProps) {
  // For removable items
  const animateLayoutChanges: AnimateLayoutChanges = args =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  const {
    setNodeRef,
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
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      className={`focus:outline-none focus:ring ${
        isDragging ? 'opacity-50' : ''
      }`}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
}

function DraggableOverlay(props: any) {
  const { active } = useDndContext();

  return createPortal(
    <DragOverlay>
      {active && (
        <TodoItem id={active.id} {...props} className=" z-20 shadow-2xl" />
      )}
    </DragOverlay>,
    document.body,
  );
}

function DroppableContainer({
  children,
  id,
  heading,
  items,
}: PropsWithChildren<{
  heading: string;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
}>) {
  const { setNodeRef, isOver, over } = useDroppable({
    id,
    data: {
      type: 'container',
      children: items,
    },
  });

  const hover = isOver || (over && items.includes(over?.id));

  return (
    <SortableContext strategy={verticalListSortingStrategy} items={items}>
      <div
        className={`min-w-[350px] border rounded-lg ${
          hover ? 'bg-gray-200' : 'bg-gray-100'
        }`}
      >
        <div className="bg-white p-4 font-medium">{heading}</div>
        <div
          ref={setNodeRef}
          className={`p-4 min-h-[250px] max-h-96 overflow-y-auto space-y-4 `}
        >
          {children}
        </div>
      </div>
    </SortableContext>
  );
}
