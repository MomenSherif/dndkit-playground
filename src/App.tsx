import { useState } from 'react';

import { DndContext } from '@dnd-kit/core';
import BasicSetup from './Examples/useDraggable/1-BasicSetup';

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      <BasicSetup />
    </div>
  );
}
