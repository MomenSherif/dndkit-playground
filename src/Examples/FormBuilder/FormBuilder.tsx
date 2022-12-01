import {
  CSSProperties,
  forwardRef,
  ReactNode,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { nanoid } from 'nanoid';
import {
  applyModifiers,
  closestCenter,
  DndContext,
  DraggableAttributes,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  rectIntersection,
  TouchSensor,
  UniqueIdentifier,
  useDndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  defaultAnimateLayoutChanges,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Field = {
  type: string;
  text: string;
};

type WithUniqueIdentifier<T> = { id: UniqueIdentifier } & Field;

const fields: Field[] = [
  {
    type: 'input',
    text: 'Text Input',
  },
  {
    type: 'select',
    text: 'Select',
  },
  {
    type: 'button',
    text: 'Button',
  },
  {
    type: 'textarea',
    text: 'Text Area',
  },
];

export default function FormBuilder() {
  const [formFields, setFormFields] = useState<WithUniqueIdentifier<Field>[]>(
    () => [
      {
        id: nanoid(),
        text: 'Text Area',
        type: 'textarea',
      },
      {
        id: nanoid(),
        text: 'Text Input',
        type: 'textInput',
      },
    ],
  );
  const formFieldsCloneRef = useRef(formFields);
  const isClonedRef = useRef(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates, // Create custom to handel adding from sidebar
      keyboardCodes: {
        start: ['Space'],
        cancel: ['Escape'],
        end: ['Space'],
      },
    }),
  );

  useEffect(() => {
    if (!isClonedRef.current) formFieldsCloneRef.current = formFields;
  }, [formFields]);

  return (
    <DndContext
      collisionDetection={props => {
        if (props.active.data.current?.sidebar) return rectIntersection(props);
        return closestCenter(props);
      }}
      sensors={sensors}
      modifiers={[
        props => {
          return props.active?.data.current?.sidebar
            ? restrictToWindowEdges(props)
            : applyModifiers(
                [restrictToVerticalAxis, restrictToWindowEdges],
                props,
              );
        },
      ]}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={() => {
        formFieldsCloneRef.current = formFields;
      }}
      onDragCancel={() => {
        if (formFieldsCloneRef.current)
          setFormFields(formFieldsCloneRef.current);

        formFieldsCloneRef.current = [];
        isClonedRef.current = false;
      }}
      onDragOver={event => {
        const { active, over } = event;

        if (!active.data.current?.sidebar) return;

        if (!over || over.id === 'temp-id') return;

        isClonedRef.current = true;

        if (over?.id === 'canvas') {
          return setFormFields(() =>
            formFieldsCloneRef.current.concat({
              id: 'temp-id',
              text: active.data?.current?.field.text,
              type: active.data?.current?.field.type,
            }),
          );
        }

        const overIndex = over.data.current?.sortable.index;

        setFormFields(() => [
          ...formFieldsCloneRef.current.slice(0, overIndex),
          {
            id: 'temp-id',
            text: active.data?.current?.field.text,
            type: active.data?.current?.field.type,
          },
          ...formFieldsCloneRef.current.slice(
            overIndex,
            formFieldsCloneRef.current.length,
          ),
        ]);
      }}
      onDragEnd={event => {
        const { active, over } = event;
        if (!over) return;
        if (active.id === over.id) return;

        if (isClonedRef.current) {
          isClonedRef.current = false;
          setFormFields(prevFormFields =>
            prevFormFields.map(f =>
              f.id === 'temp-id' ? { ...f, id: nanoid() } : f,
            ),
          );
          return;
        }

        if (active.data.current?.sidebar) return;

        const activeIndex = active.data.current?.sortable.index;
        const overIndex = over?.data.current?.sortable.index;

        if (activeIndex === undefined || overIndex === undefined) return;

        setFormFields(prevFields =>
          arrayMove(prevFields, activeIndex, overIndex),
        );
      }}
    >
      <div className="w-full p-4 flex space-x-10 h-full">
        <Sidebar />
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={formFields}
        >
          <DroppableCanvas>
            {formFields.map(f => (
              <SortableField
                key={f.id}
                onDelete={id =>
                  setFormFields(fields => fields.filter(f => f.id !== id))
                }
                {...f}
              />
            ))}
          </DroppableCanvas>
        </SortableContext>
      </div>
      <DraggableOverlay />
    </DndContext>
  );
}

function Sidebar() {
  return (
    <aside className="flex flex-col w-full max-w-xs bg-white py-4 rounded-md shadow-lg h-full">
      <h2 className="text-3xl font-medium px-4 ">Fields</h2>
      <div className="flex-1 px-4 pt-5 overflow-y-auto">
        <div className="divide-y rounded-md border">
          {fields.map(field => (
            <DraggableSideBarField key={field.type} {...field} />
          ))}
        </div>
      </div>
    </aside>
  );
}

const SideBarField = forwardRef<
  HTMLDivElement,
  Field & {
    className?: string;
    attributes?: DraggableAttributes;
    listeners?: Record<string, Function> | undefined;
  }
>(({ text, listeners, attributes, className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex justify-center px-4 py-4 bg-white rounded  ${className}`}
      {...listeners}
      {...attributes}
    >
      {text}
    </div>
  );
});

function DraggableSideBarField(props: Field) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: props.type,
    data: {
      field: props,
      sidebar: true,
    },
  });

  return (
    <SideBarField
      ref={setNodeRef}
      listeners={listeners}
      attributes={attributes}
      className={`relative focus:outline-none focus:ring focus:z-10 ${
        isDragging ? 'opacity-60' : ''
      }`}
      {...props}
    />
  );
}

function DraggableOverlay() {
  const { active } = useDndContext();

  return createPortal(
    <DragOverlay>
      {active?.data.current?.sidebar && (
        <SideBarField
          {...(active.data.current?.field as WithUniqueIdentifier<Field>)}
          className="bg-gray-900 text-white border shadow-lg"
        />
      )}
      {active &&
        active.data.current?.sidebar === false && ( // Fix same active element removable by keyboard
          <FormField
            {...(active.data.current?.field as WithUniqueIdentifier<Field>)}
            className="ring"
          />
        )}
    </DragOverlay>,
    document.body,
  );
}

function DroppableCanvas({ children }: { children: ReactNode }) {
  const { setNodeRef, isOver, over } = useDroppable({
    id: 'canvas',
  });

  const isOverCanvas = isOver || over?.data.current?.sidebar === false;

  return (
    <div
      className={`flex-1 p-4 rounded-md shadow-lg h-full overflow-y-auto ${
        isOverCanvas ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div ref={setNodeRef} className="h-full space-y-5">
        {children}
      </div>
    </div>
  );
}

const FormField = forwardRef<
  HTMLHeadingElement,
  WithUniqueIdentifier<Field> & {
    style?: CSSProperties;
    className?: string;
    attributes?: DraggableAttributes;
    listeners?: Record<string, Function> | undefined;
    onDelete?: (id: UniqueIdentifier) => void;
  }
>(
  (
    { text, attributes, listeners, className = '', style, id, onDelete },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex justify-between items-center px-4 py-2 bg-gray-200 focus:outline-none focus:ring rounded-sm ${className}`}
        style={style}
        {...listeners}
        {...attributes}
      >
        <h2>{text}</h2>
        <button
          className="p-2 rounded-md hover:bg-gray-500/20 relative z-20"
          onClick={() => onDelete?.(id)}
        >
          <ClearIcon className="w-6 h-6" />
        </button>
      </div>
    );
  },
);

function SortableField(
  props: WithUniqueIdentifier<Field> & { onDelete(id: UniqueIdentifier): void },
) {
  const {
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transition,
    transform,
  } = useSortable({
    id: props.id,
    data: {
      sidebar: false,
      field: props,
    },
    animateLayoutChanges: args =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });

  return (
    <FormField
      ref={setNodeRef}
      listeners={listeners}
      attributes={attributes}
      className={`${isDragging ? 'relative z-20 opacity-0' : ''}`}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      {...props}
    />
  );
}

export function ClearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
      ></path>
    </svg>
  );
}
