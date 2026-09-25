'use client';

import React from 'react';
import { AIDiagnosis, RhythmType } from '../../lib/cardioguard/types';
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRight,
  Zap,
  Activity,
  Cpu,
  FileText,
  BellRing,
} from 'lucide-react';

interface AIDiagnosticCardProps {
  diagnosis: AIDiagnosis;
  onOpenReport: () => void;
  onTriggerAlarm: () => void;
}

export function AIDiagnosticCard({
  diagnosis,
  onOpenReport,
  onTriggerAlarm,
}: AIDiagnosticCardProps) {
  const isCritical = diagnosis.riskLevel === 'CRITICAL';
  const isModerate = diagnosis.riskLevel === 'MODERATE';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border p-5 transition-all duration-300 ${
        isCritical
          ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border-rose-500/80 shadow-2xl shadow-rose-950/60 ring-2 ring-rose-500/40'
          : isModerate
          ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-amber-500/60 shadow-xl'
          : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800'
      }`}
    >
      {/* Top Header: Model Badge & Triage Tier */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-200">
                CardioGuard Neural Engine
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v3.4-PTBXL
              </span>
            </div>
            <span className="text-[10px] text-slate-400">
              Real-time In-Memory 12-Lead Inference • 14ms Latency
            </span>
          </div>
        </div>

        {/* Triage Risk Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 font-mono ${
              isCritical
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 animate-pulse'
                : isModerate
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {isCritical ? (
              <Flame className="w-3.5 h-3.5 fill-current" />
            ) : isModerate ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {diagnosis.riskLevel} PRIORITY
          </span>
        </div>
      </div>

      {/* Main Diagnosis Block */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Title & Confidence Gauge */}
        <div className="lg:col-span-7 space-y-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Primary AI Classification
            </span>
            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight mt-0.5 ${
                isCritical
                  ? 'text-rose-400'
                  : isModerate
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {diagnosis.title}
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              {diagnosis.category}
            </p>
          </div>

          {/* Morphological Feature Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {diagnosis.arrhythmias.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/80"
              >
                • {tag}
              </span>
            ))}
          </div>

          {/* Clinical Action Recommendation */}
          <div
            className={`p-3.5 rounded-xl border text-xs ${
              isCritical
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-100'
                : isModerate
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-100'
                : 'bg-slate-800/60 border-slate-700/80 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1 font-mono uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Action Protocol:</span>
            </div>
            <p className="leading-relaxed font-sans font-medium">
              {diagnosis.clinicalAction}
            </p>
            <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <span className="font-bold text-slate-300">PROTOCOL:</span>{' '}
              {diagnosis.urgencyProtocol}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Class Softmax Probabilities & Actions */}
        <div className="lg:col-span-5 bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider">
                Softmax Confidence
              </span>
              <span className="text-emerald-400 font-black text-sm">
                {diagnosis.confidence.toFixed(1)}%
              </span>
            </div>

            {/* Probability Bars */}
            <div className="space-y-1.5 font-mono text-[11px]">
              {(
                [
                  ['NSR', 'Normal Sinus', diagnosis.confidenceBreakdown.NSR],
                  ['STEMI', 'STEMI / ACS', diagnosis.confidenceBreakdown.STEMI],
                  ['VTACH', 'V-Tach', diagnosis.confidenceBreakdown.VTACH],
                  ['AFIB', 'Atrial Fib', diagnosis.confidenceBreakdown.AFIB],
                  ['BRADYCARDIA', 'Bradycardia', diagnosis.confidenceBreakdown.BRADYCARDIA],
                  ['PVC_BIGEMINY', 'Vent. Bigeminy', diagnosis.confidenceBreakdown.PVC_BIGEMINY],
                ] as [RhythmType, string, number][]
              ).map(([type, label, prob]) => {
                const isActive = diagnosis.rhythm === type;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <span
                      className={`w-24 truncate text-left ${
                        isActive ? 'text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      {label}
                    </span>
                    <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isActive
                            ? isCritical
                              ? 'bg-rose-500'
                              : isModerate
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${Math.max(2, prob)}%` }}
                      />
                    </div>
                    <span
                      className={`w-11 text-right ${
                        isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {prob.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={onOpenReport}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs transition border border-slate-700 hover:border-slate-500"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Report</span>
            </button>

            <button
              onClick={onTriggerAlarm}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition ${
                isCritical
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/40 animate-pulse'
                  : 'bg-amber-600/80 hover:bg-amber-600 text-white'
              }`}
            >
              <BellRing className="w-3.5 h-3.5" />
              <span>Alert Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
