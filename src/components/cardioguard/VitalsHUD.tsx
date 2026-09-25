'use client';

import React from 'react';
import { Vitals, RiskLevel } from '../../lib/cardioguard/types';
import { Heart, Activity, Wind, Thermometer, ShieldAlert, Waves } from 'lucide-react';

interface VitalsHUDProps {
  vitals: Vitals;
  isBeating: boolean;
  riskLevel: RiskLevel;
}

export function VitalsHUD({ vitals, isBeating, riskLevel }: VitalsHUDProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Heart Rate (HR) */}
      <div
        className={`relative overflow-hidden rounded-2xl p-4 border transition-all duration-300 ${
          riskLevel === 'CRITICAL'
            ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/50'
            : riskLevel === 'MODERATE'
            ? 'bg-amber-950/30 border-amber-500/50'
            : 'bg-slate-900/90 border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider">
            <Heart
              className={`w-4 h-4 transition-transform duration-100 ${
                isBeating
                  ? 'text-rose-500 scale-125'
                  : riskLevel === 'CRITICAL'
                  ? 'text-rose-400'
                  : 'text-emerald-400'
              }`}
              fill={isBeating ? 'currentColor' : 'none'}
            />
            HR (BPM)
          </span>
          <span className="text-[10px] text-slate-400">50-120</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
              riskLevel === 'CRITICAL'
                ? 'text-rose-500 animate-pulse'
                : riskLevel === 'MODERATE'
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {vitals.heartRate}
          </span>
          <span className="text-xs text-slate-400 font-mono">bpm</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Pulse: {isBeating ? 'SYNC' : 'OK'}</span>
          <span
            className={`font-semibold ${
              riskLevel === 'CRITICAL' ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {vitals.heartRate > 100 ? 'TACHY' : vitals.heartRate < 50 ? 'BRADY' : 'NORMAL'}
          </span>
        </div>
      </div>

      {/* 2. SpO2 Oxygen Saturation */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-cyan-400">
            <Activity className="w-4 h-4 text-cyan-400" />
            SpO₂ (%)
          </span>
          <span className="text-[10px] text-slate-400">&gt;92%</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl sm:text-5xl font-black font-mono tracking-tight ${
              vitals.spO2 < 90 ? 'text-rose-400' : vitals.spO2 < 94 ? 'text-amber-400' : 'text-cyan-400'
            }`}
          >
            {vitals.spO2}
          </span>
          <span className="text-xs text-slate-400 font-mono">%</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Pleth: Norm</span>
          <span className="text-cyan-300 font-semibold">Pulse Ox</span>
        </div>
      </div>

      {/* 3. Non-Invasive Blood Pressure (NIBP) */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-amber-400">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            NIBP
          </span>
          <span className="text-[10px] text-slate-400">Auto (15m)</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-300">
            {vitals.bloodPressureSys}/{vitals.bloodPressureDia}
          </span>
          <span className="text-xs text-slate-400 font-mono">mmHg</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>
            MAP:{' '}
            {Math.round(
              (vitals.bloodPressureSys + 2 * vitals.bloodPressureDia) / 3
            )}
          </span>
          <span className="text-amber-400/90">Sys/Dia</span>
        </div>
      </div>

      {/* 4. Respiratory Rate (RR) */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-indigo-400">
            <Wind className="w-4 h-4 text-indigo-400" />
            RR (RPM)
          </span>
          <span className="text-[10px] text-slate-400">12-20</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-indigo-300">
            {vitals.respiratoryRate}
          </span>
          <span className="text-xs text-slate-400 font-mono">rpm</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Thoracic Imp.</span>
          <span className="text-indigo-400">Spontaneous</span>
        </div>
      </div>

      {/* 5. Heart Rate Variability (HRV) */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-purple-400">
            <Waves className="w-4 h-4 text-purple-400" />
            HRV (RMSSD)
          </span>
          <span className="text-[10px] text-slate-400">&gt;30ms</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-purple-300">
            {vitals.hrv}
          </span>
          <span className="text-xs text-slate-400 font-mono">ms</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Autonomic</span>
          <span className={vitals.hrv < 20 ? 'text-amber-400 font-bold' : 'text-purple-300'}>
            {vitals.hrv < 20 ? 'Suppressed' : 'Healthy'}
          </span>
        </div>
      </div>

      {/* 6. Core Body Temperature */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
          <span className="flex items-center gap-1.5 font-bold tracking-wider text-teal-400">
            <Thermometer className="w-4 h-4 text-teal-400" />
            TEMP (°F)
          </span>
          <span className="text-[10px] text-slate-400">T1 Axillary</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-teal-300">
            {vitals.temperature}°
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({((vitals.temperature - 32) * (5 / 9)).toFixed(1)}°C)
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Continuous</span>
          <span className="text-teal-400">Normothermic</span>
        </div>
      </div>
    </div>
  );
}
