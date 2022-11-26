import { DndContext, UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';

import Draggable from './components/Draggable';
import Droppable from './components/Droppable';

const containers = ['A', 'B', 'C'];

export default function App() {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    setParent(event.over ? event.over.id : null);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white min-h-screen">
      <DndContext onDragEnd={handleDragEnd}>
        {!parent && draggableMarkup}

        <div className="flex space-x-4 mt-3">
          {containers.map(id => (
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : 'Drop here'}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
