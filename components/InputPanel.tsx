import React from 'react';

interface InputPanelProps {
  gsm: number;
  setGsm: (val: number) => void;
  width: number;
  setWidth: (val: number) => void;
  isProcessing: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ gsm, setGsm, width, setWidth, isProcessing }) => {
  return (
    <div className="w-full h-full bg-dashboard-panel border-4 border-green-500 rounded-xl p-6 flex flex-col justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)] relative overflow-hidden">
      {/* Label Tag */}
      <div className="absolute top-0 right-0 bg-green-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg font-mono">
        INPUT_CONFIG
      </div>

      <div className="flex flex-row gap-8 w-full h-full items-center px-4">
        {/* Input 1: GSM */}
        <div className="flex-1 flex flex-col justify-center group h-full max-h-24">
          <label className="block text-green-400/80 text-xs font-mono mb-2 uppercase group-focus-within:text-green-400 transition-colors font-bold">
            Fabric GSM
          </label>
          <div className="relative h-full">
            <input
              type="number"
              value={gsm}
              onChange={(e) => setGsm(Number(e.target.value))}
              className="w-full h-full bg-slate-900/80 border-2 border-slate-600 text-white p-4 rounded-lg focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] font-mono text-xl transition-all"
              placeholder="180"
              disabled={isProcessing}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">g/m²</span>
          </div>
        </div>

        {/* Input 2: Width */}
        <div className="flex-1 flex flex-col justify-center group h-full max-h-24">
          <label className="block text-green-400/80 text-xs font-mono mb-2 uppercase group-focus-within:text-green-400 transition-colors font-bold">
            Fabric Width
          </label>
          <div className="relative h-full">
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-full bg-slate-900/80 border-2 border-slate-600 text-white p-4 rounded-lg focus:outline-none focus:border-green-500 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] font-mono text-xl transition-all"
              placeholder="60"
              disabled={isProcessing}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">INCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;