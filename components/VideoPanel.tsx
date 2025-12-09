import React, { useEffect, useState } from 'react';
import { ConnectionStatus } from '../types';

interface VideoPanelProps {
  status: ConnectionStatus;
}

const VideoPanel: React.FC<VideoPanelProps> = ({ status }) => {
  const [frameTimestamp, setFrameTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameTimestamp(Date.now());
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex flex-col">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${status === ConnectionStatus.CONNECTED ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-lg font-mono font-bold tracking-wider text-blue-400 drop-shadow-md">
            LIVE_FEED // CAM_01
          </span>
        </div>
        <div className="text-sm font-mono text-blue-200 opacity-90">
          {new Date(frameTimestamp).toLocaleTimeString()}
        </div>
      </div>

      {/* Video Feed Placeholder */}
      <div className="relative flex-grow flex items-center justify-center bg-slate-900 group">
        {status === ConnectionStatus.CONNECTED ? (
          <>
            {/* Simulated Live Image */}
            <img 
              src="https://picsum.photos/1200/900?grayscale" 
              alt="Live Feed" 
              className="w-full h-full object-cover opacity-60"
            />
            
            {/* Scanning Line Animation */}
            <div className="scan-line"></div>
            
            {/* Simulated AI Detection Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <rect x="30%" y="40%" width="15%" height="15%" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 5" className="animate-pulse">
                <animate attributeName="opacity" values="0;1;0" duration="2s" repeatCount="indefinite" />
              </rect>
              <text x="30%" y="38%" fill="#ef4444" fontSize="14" fontFamily="monospace" fontWeight="bold">DEFECT_HOLE</text>
            </svg>

            <div className="absolute bottom-4 left-4 bg-blue-900/80 border border-blue-500/50 px-3 py-1 rounded text-xs font-mono text-blue-200">
              <span className="text-blue-400 font-bold">RPI-4</span> | 1920x1080 | 30FPS
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <span className="font-mono text-xl">NO SIGNAL</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPanel;