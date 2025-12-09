import React from 'react';
import { MetricData } from '../types';

interface ControlsProps {
  metrics: MetricData;
  gsm: number;
  width: number;
  isRunning: boolean;
  onToggle: () => void;
}

const Controls: React.FC<ControlsProps> = ({ metrics, isRunning, onToggle }) => {

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Timestamp,Holes,Lines,WastageKG,WastagePercent\n"
      + `${new Date().toISOString()},${metrics.holes},${metrics.sewingLines},${metrics.totalWastageKg},${metrics.wastagePercentage}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fabric_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full">
      <div className="bg-dashboard-panel border-4 border-amber-700 rounded-xl p-3 shadow-[0_0_15px_rgba(180,83,9,0.3)] flex flex-row items-center justify-between gap-4 relative overflow-hidden h-full">
         
         {/* Decorative Label */}
         <div className="absolute top-0 right-0 bg-amber-700 text-white font-bold text-[10px] px-2 py-0.5 rounded-bl-lg font-mono z-10">
           ACTIONS
         </div>

         {/* Start/Stop Button (Left) */}
         <button
            onClick={onToggle}
            className={`w-1/3 h-full border-2 transition-all rounded-lg flex flex-col justify-center items-center gap-1 p-2 group shadow-lg ${
              isRunning 
                ? 'bg-red-900/20 border-red-500/50 hover:bg-red-900/40 hover:border-red-500 text-red-400' 
                : 'bg-green-900/20 border-green-500/50 hover:bg-green-900/40 hover:border-green-500 text-green-400'
            }`}
          >
             {isRunning ? (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                   <rect x="6" y="6" width="12" height="12" rx="2" />
                 </svg>
                 <span className="text-xs font-bold tracking-wider font-mono">STOP</span>
               </>
             ) : (
                <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M8 5v14l11-7z" />
                 </svg>
                 <span className="text-xs font-bold tracking-wider font-mono">START</span>
               </>
             )}
          </button>

         {/* Download Button (Right) */}
         <button
            onClick={handleDownload}
            className="flex-1 h-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-lg border-2 border-amber-600/50 transition-all duration-300 transform active:scale-95 shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-lg tracking-wider text-amber-100">DOWNLOAD REPORT</span>
          </button>
          
      </div>
    </div>
  );
};

export default Controls;