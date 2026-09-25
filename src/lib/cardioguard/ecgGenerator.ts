import { RhythmType, LeadType, Vitals } from './types';

export interface ECGGeneratorState {
  rhythm: RhythmType;
  lead: LeadType;
  lastBeatTime: number;
  currentInterval: number;
  beatIndex: number;
  peakTriggered: boolean;
  baselineWanderPhase: number;
}

export function createInitialState(rhythm: RhythmType = 'NSR'): ECGGeneratorState {
  return {
    rhythm,
    lead: 'Lead II',
    lastBeatTime: 0,
    currentInterval: getBaseInterval(rhythm),
    beatIndex: 0,
    peakTriggered: false,
    baselineWanderPhase: 0,
  };
}

export function getBaseInterval(rhythm: RhythmType): number {
  switch (rhythm) {
    case 'NSR':
      return 60 / 72; // ~0.833s (72 bpm)
    case 'AFIB':
      return 60 / 125; // ~0.48s (variable 110-140 bpm)
    case 'VTACH':
      return 60 / 168; // ~0.357s (168 bpm)
    case 'STEMI':
      return 60 / 84; // ~0.714s (84 bpm)
    case 'BRADYCARDIA':
      return 60 / 42; // ~1.428s (42 bpm)
    case 'PVC_BIGEMINY':
      return 60 / 76; // ~0.789s (alternates)
  }
}

export function getVitalsForRhythm(rhythm: RhythmType): Vitals {
  switch (rhythm) {
    case 'NSR':
      return {
        heartRate: 72,
        spO2: 98,
        bloodPressureSys: 118,
        bloodPressureDia: 76,
        respiratoryRate: 15,
        temperature: 98.6,
        hrv: 48,
      };
    case 'AFIB':
      return {
        heartRate: 128,
        spO2: 95,
        bloodPressureSys: 134,
        bloodPressureDia: 88,
        respiratoryRate: 20,
        temperature: 98.8,
        hrv: 18,
      };
    case 'VTACH':
      return {
        heartRate: 168,
        spO2: 89,
        bloodPressureSys: 84,
        bloodPressureDia: 52,
        respiratoryRate: 28,
        temperature: 99.1,
        hrv: 6,
      };
    case 'STEMI':
      return {
        heartRate: 88,
        spO2: 93,
        bloodPressureSys: 158,
        bloodPressureDia: 96,
        respiratoryRate: 22,
        temperature: 98.9,
        hrv: 24,
      };
    case 'BRADYCARDIA':
      return {
        heartRate: 42,
        spO2: 97,
        bloodPressureSys: 104,
        bloodPressureDia: 64,
        respiratoryRate: 12,
        temperature: 97.9,
        hrv: 62,
      };
    case 'PVC_BIGEMINY':
      return {
        heartRate: 76,
        spO2: 96,
        bloodPressureSys: 128,
        bloodPressureDia: 82,
        respiratoryRate: 17,
        temperature: 98.4,
        hrv: 31,
      };
  }
}

/**
 * Returns lead morphology multiplier and inversion factor
 */
export function getLeadMultiplier(lead: LeadType): number {
  switch (lead) {
    case 'Lead I':
      return 0.85;
    case 'Lead II':
      return 1.15; // standard rhythm monitor lead
    case 'Lead III':
      return 0.75;
    case 'aVR':
      return -0.95; // normally inverted
    case 'aVL':
      return 0.65;
    case 'aVF':
      return 0.95;
    case 'V1':
      return 0.55;
    case 'V2':
      return 0.8;
    case 'V3':
      return 1.05;
    case 'V4':
      return 1.25;
    case 'V5':
      return 1.2;
    case 'V6':
      return 0.95;
    default:
      return 1.0;
  }
}

/**
 * Gaussian bell curve helper
 */
function gaussian(x: number, peakTime: number, width: number, height: number): number {
  const diff = x - peakTime;
  return height * Math.exp(-(diff * diff) / (2 * width * width));
}

/**
 * Generates continuous voltage value (in mV) at time `t`
 */
export function computeECGVoltage(
  t: number,
  state: ECGGeneratorState,
  onRPeak?: () => void
): number {
  const { rhythm, lead } = state;
  const leadMult = getLeadMultiplier(lead);

  // Time elapsed in current cardiac cycle
  let cycleT = t - state.lastBeatTime;

  // Cycle completion and RR interval calculation
  if (cycleT >= state.currentInterval) {
    state.lastBeatTime = t;
    state.beatIndex += 1;
    state.peakTriggered = false;
    cycleT = 0;

    // Arrhythmia cycle time adjustments
    if (rhythm === 'AFIB') {
      // Irregularly irregular RR intervals (0.36s to 0.62s)
      const jitter = (Math.random() - 0.5) * 0.22;
      state.currentInterval = Math.max(0.35, Math.min(0.68, getBaseInterval(rhythm) + jitter));
    } else if (rhythm === 'PVC_BIGEMINY') {
      // Bigeminy: Alternates between premature beat (short RR) and compensatory pause (long RR)
      if (state.beatIndex % 2 === 1) {
        state.currentInterval = getBaseInterval(rhythm) * 0.68; // early premature beat
      } else {
        state.currentInterval = getBaseInterval(rhythm) * 1.32; // compensatory pause
      }
    } else {
      // Subtle physiologic heart rate variability (respiratory sinus arrhythmia)
      const rsa = Math.sin(t * 0.35) * 0.03;
      state.currentInterval = getBaseInterval(rhythm) + rsa;
    }
  }

  // Detect R-peak for audio/visual heartbeat synchrony
  const isPremature = rhythm === 'PVC_BIGEMINY' && state.beatIndex % 2 === 1;
  const rPeakTime = isPremature ? 0.16 : 0.24;

  if (!state.peakTriggered && cycleT >= rPeakTime && cycleT < rPeakTime + 0.04) {
    state.peakTriggered = true;
    if (onRPeak) {
      onRPeak();
    }
  }

  // Base physiologic respiratory wander (~0.05 mV)
  const respWander = Math.sin(t * 0.8) * 0.04;
  const microNoise = (Math.random() - 0.5) * 0.015;

  let signal = 0;

  switch (rhythm) {
    case 'NSR':
    case 'BRADYCARDIA': {
      // Normalized P-QRS-T complex
      // P wave (at 0.10s, width 0.035s, height 0.18mV)
      const p = gaussian(cycleT, 0.1, 0.03, 0.18);

      // Q wave (at 0.21s, width 0.012s, height -0.15mV)
      const q = gaussian(cycleT, 0.21, 0.012, -0.16);

      // R wave (at 0.24s, width 0.014s, height +1.65mV)
      const r = gaussian(cycleT, 0.24, 0.014, 1.65);

      // S wave (at 0.27s, width 0.015s, height -0.38mV)
      const s = gaussian(cycleT, 0.27, 0.015, -0.38);

      // T wave (at 0.46s, width 0.065s, height 0.36mV)
      const tWave = gaussian(cycleT, 0.46, 0.065, 0.36);

      // U wave (subtle, at 0.62s)
      const u = gaussian(cycleT, 0.62, 0.04, 0.03);

      signal = p + q + r + s + tWave + u;
      break;
    }

    case 'AFIB': {
      // Chaotic fibrillatory f-waves (no distinct P wave)
      const fWaves =
        0.07 * Math.sin(t * 36) +
        0.05 * Math.sin(t * 48 + 1.2) +
        0.04 * Math.sin(t * 22 + 2.5);

      // Normal QRS
      const q = gaussian(cycleT, 0.14, 0.01, -0.12);
      const r = gaussian(cycleT, 0.16, 0.012, 1.45);
      const s = gaussian(cycleT, 0.19, 0.014, -0.32);

      // Shallow deformed T wave
      const tWave = gaussian(cycleT, 0.32, 0.055, 0.22);

      signal = fWaves + q + r + s + tWave;
      break;
    }

    case 'VTACH': {
      // Monomorphic rapid wide bizarre ventricular complexes (sawtooth/sinusoidal)
      // Duration of cycle ~ 0.36s
      const period = state.currentInterval;
      const phase = (cycleT / period) * Math.PI * 2;

      // Asymmetric sine with notched peak
      const wideV =
        Math.sin(phase - 0.5) * 1.35 +
        Math.sin(2 * (phase - 0.5)) * 0.45 +
        Math.cos(3 * (phase - 0.5)) * 0.15;

      signal = wideV;
      break;
    }

    case 'STEMI': {
      // Acute ST-Elevation Myocardial Infarction: "Tombstone" ST elevation
      const p = gaussian(cycleT, 0.1, 0.03, 0.16);
      const q = gaussian(cycleT, 0.21, 0.012, -0.2);
      const r = gaussian(cycleT, 0.24, 0.014, 1.55);
      const s = gaussian(cycleT, 0.27, 0.015, -0.2);

      // Marked ST segment elevation + Hyperacute T wave merged into single massive arched plateau
      let stElevation = 0;
      if (cycleT >= 0.28 && cycleT <= 0.58) {
        // Dome shaped elevated plateau up to +0.8 mV
        const domeX = (cycleT - 0.28) / 0.3;
        stElevation = Math.sin(domeX * Math.PI) * 0.85 + 0.35;
      }

      signal = p + q + r + s + stElevation;
      break;
    }

    case 'PVC_BIGEMINY': {
      if (isPremature) {
        // Wide bizarre ectopic PVC: No P-wave, huge broad notched R wave with deep inverted T wave
        const ectopicQ = gaussian(cycleT, 0.12, 0.02, -0.35);
        const ectopicR = gaussian(cycleT, 0.16, 0.032, 1.85); // very wide
        const ectopicS = gaussian(cycleT, 0.22, 0.025, -0.75);
        const invertedT = gaussian(cycleT, 0.38, 0.07, -0.55); // discordant inverted T

        signal = ectopicQ + ectopicR + ectopicS + invertedT;
      } else {
        // Normal Sinus beat
        const p = gaussian(cycleT, 0.1, 0.03, 0.17);
        const q = gaussian(cycleT, 0.21, 0.012, -0.15);
        const r = gaussian(cycleT, 0.24, 0.014, 1.6);
        const s = gaussian(cycleT, 0.27, 0.015, -0.35);
        const tWave = gaussian(cycleT, 0.46, 0.065, 0.34);

        signal = p + q + r + s + tWave;
      }
      break;
    }
  }

  return (signal * leadMult) + respWander + microNoise;
}
