import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DndContext,
  DragOverlay,
  UniqueIdentifier,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import Draggable from './components/Draggable';
import Droppable from './components/Droppable';
import Item from './components/Item';

const containers = ['A', 'B', 'C'];

export default function App() {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const draggableMarkup = (
    <Draggable id="draggable">
      <Item>Drag me</Item>
    </Draggable>
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setParent(event.over ? event.over.id : null);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white min-h-screen">
      <DndContext
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={handleDragEnd}
      >
        {!parent && draggableMarkup}

        <div className="flex space-x-4 mt-3">
          {containers.map(id => (
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : 'Drop here'}
            </Droppable>
          ))}
        </div>
        {createPortal(
          <DragOverlay modifiers={[restrictToWindowEdges]}>
            {isDragging && <Item>Drag me</Item>}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
