import React, { useState } from 'react';
import { generateEfficiencyReport } from '../services/geminiService';
import { MetricData } from '../types';

interface ControlsProps {
  metrics: MetricData;
  gsm: number;
  width: number;
}

const Controls: React.FC<ControlsProps> = ({ metrics, gsm, width }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

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

  const handleAnalyze = async () => {
    setIsGenerating(true);
    setAiInsight(null);
    try {
      const insight = await generateEfficiencyReport(metrics, gsm, width);
      setAiInsight(insight);
    } catch (e) {
      setAiInsight("Could not generate insight.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="bg-dashboard-panel border-4 border-amber-700 rounded-xl p-3 shadow-[0_0_15px_rgba(180,83,9,0.3)] flex flex-row items-center justify-between gap-4 relative overflow-hidden h-full">
         
         {/* Decorative Label */}
         <div className="absolute top-0 left-0 bg-amber-700 text-white font-bold text-[10px] px-2 py-0.5 rounded-br-lg font-mono z-10">
           ACTIONS
         </div>

         {/* Download Button (Primary Action) */}
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
          
          {/* AI Analysis (Secondary Action) */}
          <button
            onClick={handleAnalyze}
            disabled={isGenerating}
            className="w-1/3 h-full bg-slate-900/50 border-2 border-slate-700 hover:border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-slate-900 transition-all rounded-lg flex flex-col justify-center items-center gap-1 p-2"
          >
             {isGenerating ? (
               <span className="animate-pulse text-xs text-center font-mono">Thinking...</span>
             ) : (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
                 <span className="text-[10px] font-bold text-center leading-tight">ASK GEMINI</span>
               </>
             )}
          </button>
      </div>

      {aiInsight && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setAiInsight(null)}>
          <div className="bg-slate-800 border-2 border-blue-500 rounded-xl p-6 max-w-lg w-full shadow-[0_0_50px_rgba(59,130,246,0.5)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2 font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 110 2h-1a7 7 0 01-7 7h-1v1.27c.6.34 1 .99 1 1.73a2 2 0 11-4 0c0-.74.4-1.39 1-1.73V19h-1a7 7 0 01-7-7H3a1 1 0 110-2h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
              </svg>
              GEMINI INSIGHT
            </h3>
            <div className="text-gray-200 leading-relaxed font-sans text-lg">
              {aiInsight}
            </div>
            <button 
              onClick={() => setAiInsight(null)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;