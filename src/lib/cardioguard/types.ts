export type RhythmType =
  | 'NSR'
  | 'AFIB'
  | 'VTACH'
  | 'STEMI'
  | 'BRADYCARDIA'
  | 'PVC_BIGEMINY';

export type LeadType =
  | 'Lead I'
  | 'Lead II'
  | 'Lead III'
  | 'aVR'
  | 'aVL'
  | 'aVF'
  | 'V1'
  | 'V2'
  | 'V3'
  | 'V4'
  | 'V5'
  | 'V6';

export type RiskLevel = 'LOW' | 'MODERATE' | 'CRITICAL';

export interface Vitals {
  heartRate: number;
  spO2: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  respiratoryRate: number;
  temperature: number;
  hrv: number;
}

export interface AIDiagnosis {
  rhythm: RhythmType;
  title: string;
  category: string;
  riskLevel: RiskLevel;
  confidence: number;
  arrhythmias: string[];
  stDeviationMm: number;
  prIntervalMs: number;
  qrsDurationMs: number;
  qtcIntervalMs: number;
  clinicalAction: string;
  urgencyProtocol: string;
  confidenceBreakdown: Record<RhythmType, number>;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  mrn: string;
  room: string;
  chiefComplaint: string;
  cardiacHistory: string[];
  medications: string[];
  initialRhythm: RhythmType;
}

export type HardwareSource = 'SIMULATED' | 'WEB_SERIAL' | 'BLUETOOTH' | 'WEBSOCKET' | 'FILE_IMPORT';

export interface HardwareConnectionState {
  source: HardwareSource;
  isConnected: boolean;
  deviceName?: string;
  baudRate?: number;
  packetsPerSecond?: number;
  endpointUrl?: string;
  fileName?: string;
  error?: string;
}
