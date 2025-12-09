import React, { useState, useEffect } from 'react';
import VideoPanel from './components/VideoPanel';
import InputPanel from './components/InputPanel';
import MetricsPanel from './components/MetricsPanel';
import Controls from './components/Controls';
import { ConnectionStatus, MetricData } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState(ConnectionStatus.CONNECTED);
  const [gsm, setGsm] = useState(180);
  const [width, setWidth] = useState(60);
  const [isRunning, setIsRunning] = useState(true);
  
  // State for metrics with dummy initial data
  const [metrics, setMetrics] = useState<MetricData>({
    holes: 8,
    sewingLines: 2,
    totalWastageKg: 0.125,
    wastagePercentage: 0.85,
    timestamp: new Date().toISOString()
  });

  const [history, setHistory] = useState<MetricData[]>([]);

  // Simulate live incoming data from Raspberry Pi
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setMetrics(prev => {
        // Randomly increment defects occasionally to simulate detection
        const hasHole = Math.random() > 0.9;
        const hasLine = Math.random() > 0.95;
        
        const newHoles = prev.holes + (hasHole ? 1 : 0);
        const newLines = prev.sewingLines + (hasLine ? 1 : 0);
        
        // Accumulate wastage (simulated)
        const newWastage = prev.totalWastageKg + 0.0005; 
        // Wastage % fluctuates slightly based on defects vs total length
        const newPercentage = Math.min(100, (newWastage / (newWastage + 10)) * 100 * (1 + (newHoles * 0.01)));

        const newData = {
          holes: newHoles,
          sewingLines: newLines,
          totalWastageKg: newWastage,
          wastagePercentage: newPercentage,
          timestamp: new Date().toISOString()
        };
        
        setHistory(h => [...h, newData].slice(-50)); // Keep last 50 points
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="w-full h-screen bg-dashboard-bg p-6 font-sans text-white overflow-hidden flex gap-6">
      
      {/* Left Column: Video & Inputs */}
      <div className="flex-1 flex flex-col gap-6 h-full">
        
        {/* Blue Rectangle: Live Video */}
        <div className="flex-grow min-h-0 relative">
          <VideoPanel status={status} />
        </div>

        {/* Green Box: Inputs (GSM & Width) - Bottom Left */}
        <div className="h-36 shrink-0">
           <InputPanel 
              gsm={gsm} 
              setGsm={setGsm} 
              width={width} 
              setWidth={setWidth} 
              isProcessing={!isRunning} 
            />
        </div>

      </div>

      {/* Right Column: Metrics & Actions */}
      <div className="w-1/3 min-w-[350px] max-w-[450px] flex flex-col gap-6 h-full">
        
        {/* Pink Box: Metrics Output - Top Right */}
        <div className="flex-grow min-h-0 relative">
          <MetricsPanel metrics={metrics} history={history} />
        </div>

        {/* Brown Box: Controls (Download Report) - Bottom Right */}
        <div className="h-36 shrink-0">
          <Controls 
            metrics={metrics} 
            gsm={gsm} 
            width={width} 
            isRunning={isRunning}
            onToggle={() => setIsRunning(!isRunning)}
          />
        </div>

      </div>

    </div>
  );
};

export default App;