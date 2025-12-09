export interface MetricData {
  holes: number;
  sewingLines: number;
  totalWastageKg: number;
  wastagePercentage: number;
  timestamp: string;
}

export interface DefectLog {
  id: string;
  type: 'HOLE' | 'SEWING_LINE';
  timestamp: string;
  size: string;
}

export enum ConnectionStatus {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  ERROR = 'Error'
}
