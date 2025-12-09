import React, { useMemo } from 'react';
import { MetricData } from '../types';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface MetricsPanelProps {
  metrics: MetricData;
  history: MetricData[];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, history }) => {
  const chartData = useMemo(() => {
    return history.slice(-30).map((h, i) => ({
      name: i,
      value: h.wastagePercentage
    }));
  }, [history]);

  return (
    <div className="w-full h-full bg-dashboard-panel border-4 border-pink-500 rounded-xl p-4 flex flex-col shadow-[0_0_20px_rgba(236,72,153,0.3)] relative overflow-hidden">
      {/* Label Tag */}
      <div className="absolute top-0 left-0 bg-pink-500 text-white font-bold text-xs px-3 py-1 rounded-br-lg font-mono z-10">
        MODEL_OUTPUT
      </div>

      <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-4 mt-6">
        
        {/* Output 1: Holes */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-pink-500/30 flex flex-col justify-center items-center shadow-inner relative group hover:bg-slate-900/80 transition-colors">
          <div className="text-pink-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Holes Detected</div>
          <div className="text-3xl md:text-5xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
            {metrics.holes}
          </div>
        </div>

        {/* Output 2: Sewing Lines */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-pink-500/30 flex flex-col justify-center items-center shadow-inner relative group hover:bg-slate-900/80 transition-colors">
          <div className="text-pink-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Sewing Lines</div>
          <div className="text-3xl md:text-5xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
            {metrics.sewingLines}
          </div>
        </div>

        {/* Output 3: Total Wastage */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-pink-500/30 flex flex-col justify-center items-center shadow-inner relative group hover:bg-slate-900/80 transition-colors">
          <div className="text-pink-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Total Wastage</div>
          <div className="flex items-baseline gap-1">
            <div className="text-2xl md:text-4xl font-mono font-bold text-white">
              {metrics.totalWastageKg.toFixed(3)}
            </div>
            <span className="text-gray-400 font-mono text-xs">KG</span>
          </div>
        </div>

        {/* Output 4: Wastage Percentage + Chart */}
        <div className="bg-slate-900/60 p-0 rounded-xl border border-pink-500/30 flex flex-col shadow-inner relative overflow-hidden group">
          <div className="absolute top-3 left-0 w-full text-center z-10">
             <div className="text-pink-300 text-[10px] md:text-xs font-bold uppercase tracking-wider">Wastage %</div>
             <div className="text-3xl md:text-4xl font-mono font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
               {metrics.wastagePercentage.toFixed(2)}%
             </div>
          </div>
          
          {/* Background Chart */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-30 group-hover:opacity-50 transition-opacity">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                   </linearGradient>
                 </defs>
                 <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    fill="url(#colorVal)" 
                    isAnimationActive={false}
                  />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MetricsPanel;