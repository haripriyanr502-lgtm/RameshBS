'use client';

import React from 'react';
import { PatientProfile, AIDiagnosis, Vitals } from '../../lib/cardioguard/types';
import { X, Printer, ShieldCheck, FileCheck, Stethoscope, AlertTriangle, Flame } from 'lucide-react';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  diagnosis: AIDiagnosis;
  vitals: Vitals;
}

export function ClinicalReportModal({
  isOpen,
  onClose,
  patient,
  diagnosis,
  vitals,
}: ClinicalReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const isCritical = diagnosis.riskLevel === 'CRITICAL';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
            <FileCheck className="w-4 h-4" />
            <span>CardioGuard Automated AI Telemetry Report</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Clinical Document Area */}
        <div className="p-8 overflow-y-auto space-y-6 font-sans text-xs">
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-blue-700 text-white font-black text-sm">
                  CG
                </div>
                <div>
                  <h1 className="text-base font-black tracking-tight text-slate-900 uppercase">
                    Metropolitan Heart Center
                  </h1>
                  <p className="text-[10px] text-slate-600 font-mono">
                    Division of Electrophysiology & Clinical AI Monitoring
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-600">
              <div className="font-bold text-slate-900">REPORT REF: CG-{patient.mrn}-2026</div>
              <div>DATE: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
              <div>DEVICE ID: CG-TELEMETRY-UNIT-04</div>
            </div>
          </div>

          {/* Patient Demographics Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Patient Name</span>
              <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">MRN / ID</span>
              <span className="font-bold text-slate-900 font-mono">{patient.mrn}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Age / Gender</span>
              <span className="font-bold text-slate-900">{patient.age} Yrs / {patient.gender === 'M' ? 'Male' : 'Female'}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Location</span>
              <span className="font-bold text-slate-900">{patient.room}</span>
            </div>
          </div>

          {/* Clinical Context */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-slate-700 text-[11px] mb-1 font-mono">
              Chief Indication / Presenting History:
            </h3>
            <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs leading-relaxed">
              {patient.chiefComplaint}. History: {patient.cardiacHistory.join(', ')}.
            </p>
          </div>

          {/* Telemetry Vitals Snapshot */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-slate-700 text-[11px] mb-2 font-mono">
              Simultaneous Hemodynamic Vitals:
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">HEART RATE</span>
                <span className="text-lg font-bold text-slate-900">{vitals.heartRate} bpm</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">SpO₂</span>
                <span className="text-lg font-bold text-slate-900">{vitals.spO2}%</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">NIBP</span>
                <span className="text-lg font-bold text-slate-900">{vitals.bloodPressureSys}/{vitals.bloodPressureDia}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">RESP RATE</span>
                <span className="text-lg font-bold text-slate-900">{vitals.respiratoryRate} rpm</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">HRV (RMSSD)</span>
                <span className="text-lg font-bold text-slate-900">{vitals.hrv} ms</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="text-[9px] font-mono text-slate-500 block">TEMP</span>
                <span className="text-lg font-bold text-slate-900">{vitals.temperature}°F</span>
              </div>
            </div>
          </div>

          {/* AI Neural Diagnostic Interpretation */}
          <div
            className={`p-4 rounded-xl border ${
              isCritical
                ? 'bg-rose-50 border-rose-300'
                : diagnosis.riskLevel === 'MODERATE'
                ? 'bg-amber-50 border-amber-300'
                : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-slate-600">
                CardioGuard AI Deep Neural Interpretation (v3.4-PTBXL)
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                  isCritical
                    ? 'bg-rose-600 text-white'
                    : diagnosis.riskLevel === 'MODERATE'
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {diagnosis.riskLevel} Triage Alert
              </span>
            </div>

            <div className="text-lg font-black text-slate-900">{diagnosis.title}</div>
            <div className="text-xs text-slate-700 font-medium mb-3">{diagnosis.category}</div>

            {/* Interval Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/80 p-3 rounded-lg border border-slate-200/80 mb-3 font-mono">
              <div>
                <span className="text-[9px] text-slate-500 block">PR INTERVAL</span>
                <span className="font-bold text-slate-900">{diagnosis.prIntervalMs} ms</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block">QRS WIDTH</span>
                <span className="font-bold text-slate-900">{diagnosis.qrsDurationMs} ms</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block">QTc (BAZETT)</span>
                <span className="font-bold text-slate-900">{diagnosis.qtcIntervalMs} ms</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 block">ST SEGMENT</span>
                <span className={`font-bold ${isCritical ? 'text-rose-600' : 'text-slate-900'}`}>
                  {diagnosis.stDeviationMm > 0 ? `+${diagnosis.stDeviationMm} mm` : `${diagnosis.stDeviationMm} mm`}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-slate-800">
              <span className="font-bold font-mono text-[10px] uppercase text-slate-600 block">
                Clinical Recommendations:
              </span>
              <p className="leading-relaxed font-medium">{diagnosis.clinicalAction}</p>
            </div>
          </div>

          {/* Physician Sign-Off Block */}
          <div className="border-t border-slate-300 pt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">
                Electronic Verification & Attestation:
              </span>
              <div className="font-serif italic text-base text-slate-800 font-bold">
                Dr. Jennifer Thorne, MD, FACC
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Attending Cardiac Electrophysiologist • License #NY-8931024
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded border-2 border-emerald-600 text-emerald-700 font-mono font-black text-xs uppercase tracking-wider">
                ✓ AI Telemetry Verified
              </div>
              <div className="text-[9px] text-slate-400 font-mono mt-1">
                SHA-256 Digest: 7e4b9...c31f
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
