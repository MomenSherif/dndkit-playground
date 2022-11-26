import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';

import Draggable from './components/Draggable';
import Droppable from './components/Droppable';

export default function App() {
  const [isDropped, setIsDropped] = useState(false);

  const draggableMarkup = <Draggable>Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === 'droppable') {
      setIsDropped(true);
    } else {
      setIsDropped(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 text-white min-h-screen">
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped && draggableMarkup}
        <Droppable>{isDropped ? draggableMarkup : 'Drop here'}</Droppable>
      </DndContext>
    </div>
  );
}
