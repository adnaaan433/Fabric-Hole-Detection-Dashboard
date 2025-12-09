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
    <div className="w-full h-full bg-dashboard-panel border-4 border-pink-500 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(236,72,153,0.3)] relative overflow-hidden">
      {/* Label Tag */}
      <div className="absolute top-0 left-0 bg-pink-500 text-white font-bold text-xs px-3 py-1 rounded-br-lg font-mono">
        MODEL_OUTPUT
      </div>

      <div className="flex-grow flex flex-col gap-5 mt-4">
        
        {/* Output 1: Holes */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-pink-500/30 flex justify-between items-center shadow-inner">
          <div className="text-pink-300 text-sm font-bold uppercase tracking-wider">Holes Detected</div>
          <div className="text-4xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
            {metrics.holes}
          </div>
        </div>

        {/* Output 2: Sewing Lines */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-pink-500/30 flex justify-between items-center shadow-inner">
          <div className="text-pink-300 text-sm font-bold uppercase tracking-wider">Sewing Lines</div>
          <div className="text-4xl font-mono font-bold text-white drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
            {metrics.sewingLines}
          </div>
        </div>

        {/* Output 3: Total Wastage */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-pink-500/30 flex flex-col gap-1 shadow-inner">
          <div className="text-pink-300 text-sm font-bold uppercase tracking-wider">Total Wastage</div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-mono font-bold text-white">
              {metrics.totalWastageKg.toFixed(3)}
            </div>
            <span className="text-gray-400 font-mono">KG</span>
          </div>
        </div>

        {/* Output 4: Wastage Percentage + Chart */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-pink-500/30 flex-grow flex flex-col shadow-inner">
          <div className="flex justify-between items-start mb-4">
             <div className="text-pink-300 text-sm font-bold uppercase tracking-wider">Wastage %</div>
             <div className="text-5xl font-mono font-bold text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
               {metrics.wastagePercentage.toFixed(2)}%
             </div>
          </div>
          
          {/* Mini Chart Area */}
          <div className="flex-grow w-full min-h-[100px] bg-slate-950/50 rounded-lg overflow-hidden border border-pink-500/10">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                     <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Tooltip 
                    cursor={{ stroke: '#ec4899', strokeWidth: 1 }}
                    contentStyle={{ background: '#0f172a', border: '1px solid #ec4899', borderRadius: '4px', fontSize: '12px' }} 
                    itemStyle={{ color: '#ec4899' }} 
                  />
                 <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    fillOpacity={1} 
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