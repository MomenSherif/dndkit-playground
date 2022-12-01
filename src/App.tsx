import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import FormBuilder from './Examples/FormBuilder/FormBuilder';
import SortableExample from './Examples/Sortable/1.Sortable';
import VerticalSortableExample from './Examples/Sortable/2.VerticalSortable';
import MultipleContainersExample from './Examples/Sortable/3.MultipleContainers';
import BasicSetup from './Examples/useDraggable/1-BasicSetup';
import DragHandle from './Examples/useDraggable/2-DragHandle';
import ActivationConstraint from './Examples/useDraggable/3-ActivationConstraint';
import Modifiers from './Examples/useDraggable/4-Modifiers';
import DragOverlayExample from './Examples/useDraggable/5-DragOverlay';
import DroppableExample from './Examples/useDroppable/Droppable';

const snapToGrid = createSnapModifier(30);

export default function App() {
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen overflow-hidden h-full">
      {/* <BasicSetup /> */}
      {/* <DragHandle /> */}

      {/* distance & tolerance can be specified in x & y */}
      {/* <ActivationConstraint activationConstraint={{ distance: 15 }} />
      <ActivationConstraint
        activationConstraint={{ delay: 300, tolerance: 30 }} // activate dragging after 300ms and abort if moved 30px before start
      /> */}

      {/* <Modifiers
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        axis="vertical"
      />
      <div className="bg-red-300 w-8/12">
        <Modifiers
          modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
          axis="horizontal"
        />
      </div>
      <Modifiers modifiers={[restrictToWindowEdges, snapToGrid]} /> */}

      {/* <DragOverlayExample /> */}

      {/* <DroppableExample /> */}

      {/* <SortableExample /> */}
      {/* <VerticalSortableExample /> */}
      {/* <MultipleContainersExample /> */}

      <FormBuilder />
    </div>
  );
}
