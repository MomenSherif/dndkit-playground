import BasicSetup from './Examples/useDraggable/1-BasicSetup';
import DragHandle from './Examples/useDraggable/2-DragHandle';
import ActivationConstraint from './Examples/useDraggable/3-ActivationConstraint';

export default function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
      {/* <BasicSetup /> */}
      {/* <DragHandle /> */}

      {/* distance & tolerance can be specified in x & y */}
      <ActivationConstraint activationConstraint={{ distance: 15 }} />
      <ActivationConstraint
        activationConstraint={{ delay: 300, tolerance: 30 }} // activate dragging after 300ms and abort if moved 30px before start
      />
    </div>
  );
}
