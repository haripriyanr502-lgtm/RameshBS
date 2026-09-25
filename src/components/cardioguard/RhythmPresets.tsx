'use client';

import React from 'react';
import { RhythmType } from '../../lib/cardioguard/types';
import { Activity, Zap, AlertTriangle, ShieldCheck, Flame, HeartCrack } from 'lucide-react';

interface RhythmPresetsProps {
  currentRhythm: RhythmType;
  onSelectRhythm: (rhythm: RhythmType) => void;
  onInjectEmergency: (rhythm: RhythmType) => void;
}

export function RhythmPresets({
  currentRhythm,
  onSelectRhythm,
  onInjectEmergency,
}: RhythmPresetsProps) {
  const presets: {
    type: RhythmType;
    label: string;
    sub: string;
    badge: string;
    color: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: 'NSR',
      label: 'Normal Sinus',
      sub: '72 BPM • Regular',
      badge: 'NORMAL',
      color: 'border-emerald-500/40 text-emerald-400 hover:border-emerald-500',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    {
      type: 'STEMI',
      label: 'Acute STEMI',
      sub: '88 BPM • Tombstone ST',
      badge: 'CRITICAL',
      color: 'border-rose-500/50 text-rose-400 hover:border-rose-500',
      icon: <Flame className="w-4 h-4 text-rose-400" />,
    },
    {
      type: 'VTACH',
      label: 'Ventricular Tach',
      sub: '168 BPM • Wide Complex',
      badge: 'LETHAL',
      color: 'border-rose-600/50 text-rose-300 hover:border-rose-500',
      icon: <HeartCrack className="w-4 h-4 text-rose-400" />,
    },
    {
      type: 'AFIB',
      label: 'Atrial Fibrillation',
      sub: '128 BPM • Irregular RR',
      badge: 'MODERATE',
      color: 'border-amber-500/40 text-amber-400 hover:border-amber-500',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
    },
    {
      type: 'BRADYCARDIA',
      label: 'Sinus Bradycardia',
      sub: '42 BPM • Slow Conduction',
      badge: 'MODERATE',
      color: 'border-blue-500/40 text-blue-400 hover:border-blue-500',
      icon: <Zap className="w-4 h-4 text-blue-400" />,
    },
    {
      type: 'PVC_BIGEMINY',
      label: 'Vent. Bigeminy',
      sub: '76 BPM • Paired PVCs',
      badge: 'ECTOPIC',
      color: 'border-purple-500/40 text-purple-400 hover:border-purple-500',
      icon: <AlertTriangle className="w-4 h-4 text-purple-400" />,
    },
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
            Simulated Cardiac Arrhythmia Presets
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Click any preset to stream synthetic rhythm instantly
        </span>
      </div>

      {/* Preset Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {presets.map((p) => {
          const isSelected = currentRhythm === p.type;
          return (
            <button
              key={p.type}
              onClick={() => onSelectRhythm(p.type)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-white/40 ring-2 ring-emerald-500/60 shadow-lg'
                  : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                {p.icon}
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {p.badge}
                </span>
              </div>
              <div>
                <div
                  className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-white' : 'text-slate-200'
                  }`}
                >
                  {p.label}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {p.sub}
                </div>
              </div>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Emergency Event Injection Banner for Live Demonstrations */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
            Live Demo Emergency Injections:
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            Test AI reaction & telemetry alarm triggering on demand
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onInjectEmergency('STEMI')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700/80 shadow-sm transition flex items-center gap-1.5"
          >
            <span>🚨 Trigger Acute STEMI</span>
          </button>
          <button
            onClick={() => onInjectEmergency('VTACH')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700/80 shadow-sm transition flex items-center gap-1.5"
          >
            <span>⚡ Trigger V-Tach Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
}
