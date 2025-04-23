function InstructionCard({
  keys,
  description,
}: {
  keys: string;
  description: string;
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center shadow-md">
      <div className="text-sm font-mono text-cyan-800 bg-white border border-cyan-300 px-2 py-1 rounded mb-2">
        {keys}
      </div>
      <div className="text-gray-800 text-center text-sm">{description}</div>
    </div>
  );
}

// Modal.jsx
interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function InstructionModal({
  isOpen,
  onClose,
}: InstructionModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 shadow-2xl max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-700">Instructions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold text-xl"
          >
            &times;
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          These are the controls for interacting with the Gaussian Splat Viewer:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InstructionCard keys="W A S D" description="Move camera" />
          <InstructionCard keys="Mouse" description="View 360°" />
          <InstructionCard keys="I" description="Display debug info panel" />
          <InstructionCard keys="C" description="Toggle mesh cursor" />
          <InstructionCard
            keys="U"
            description="Toggle controls orientation marker"
          />
          <InstructionCard
            keys="←"
            description="Rotate camera-up counter-clockwise"
          />
          <InstructionCard keys="→" description="Rotate camera-up clockwise" />
          <InstructionCard keys="P" description="Toggle point-cloud mode" />
          <InstructionCard keys="O" description="Toggle orthographic mode" />
          <InstructionCard keys="=" description="Increase splat scale" />
          <InstructionCard keys="-" description="Decrease splat scale" />
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
