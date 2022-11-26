import BasicSetup from './Examples/useDraggable/1-BasicSetup';
import DragHandle from './Examples/useDraggable/2-DragHandle';

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      {/* <BasicSetup /> */}
      <DragHandle />
    </div>
  );
}
