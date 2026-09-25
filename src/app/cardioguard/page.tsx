'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  RhythmType,
  LeadType,
  PatientProfile,
  HardwareConnectionState,
} from '../../lib/cardioguard/types';
import { DEMO_PATIENTS, RHYTHM_DIAGNOSES } from '../../lib/cardioguard/patients';
import { getVitalsForRhythm } from '../../lib/cardioguard/ecgGenerator';
import { soundEngine } from '../../lib/cardioguard/sound';
import { ECGCanvas } from '../../components/cardioguard/ECGCanvas';
import { VitalsHUD } from '../../components/cardioguard/VitalsHUD';
import { AIDiagnosticCard } from '../../components/cardioguard/AIDiagnosticCard';
import { RhythmPresets } from '../../components/cardioguard/RhythmPresets';
import { HardwareModal } from '../../components/cardioguard/HardwareModal';
import { ClinicalReportModal } from '../../components/cardioguard/ClinicalReportModal';
import {
  Heart,
  Cpu,
  ArrowLeft,
  BellRing,
  Volume2,
  VolumeX,
  FileText,
  User,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

export default function CardioGuardPage() {
  // Active Patient Profile
  const [selectedPatientId, setSelectedPatientId] = useState<string>(DEMO_PATIENTS[0].id);
  const currentPatient =
    DEMO_PATIENTS.find((p) => p.id === selectedPatientId) || DEMO_PATIENTS[0];

  // Active Rhythm & Lead
  const [currentRhythm, setCurrentRhythm] = useState<RhythmType>(currentPatient.initialRhythm);
  const [currentLead, setCurrentLead] = useState<LeadType>('Lead II');

  // Live Vitals & Beating pulse state
  const [vitals, setVitals] = useState(getVitalsForRhythm(currentRhythm));
  const [isBeating, setIsBeating] = useState<boolean>(false);

  // Modals
  const [isHardwareOpen, setIsHardwareOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Hardware State
  const [hardwareState, setHardwareState] = useState<HardwareConnectionState>({
    source: 'SIMULATED',
    isConnected: false,
  });

  // Emergency Alarm Simulation
  const [alarmActive, setAlarmActive] = useState<boolean>(false);
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(false);

  // Current Diagnosis lookup
  const currentDiagnosis = RHYTHM_DIAGNOSES[currentRhythm];
  const isCritical = currentDiagnosis.riskLevel === 'CRITICAL';

  // Synchronize vitals when rhythm changes
  useEffect(() => {
    setVitals(getVitalsForRhythm(currentRhythm));

    if (currentDiagnosis.riskLevel === 'CRITICAL') {
      setAlarmActive(true);
      soundEngine.playAlarmBeep();
    } else {
      setAlarmActive(false);
    }
  }, [currentRhythm, currentDiagnosis.riskLevel]);

  // Sync patient initial rhythm when patient changes
  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    const p = DEMO_PATIENTS.find((pt) => pt.id === patientId);
    if (p) {
      setCurrentRhythm(p.initialRhythm);
    }
  };

  // R-Peak callback from canvas
  const handleRPeak = useCallback(() => {
    setIsBeating(true);
    setTimeout(() => {
      setIsBeating(false);
    }, 120);
  }, []);

  // Emergency Event Injection
  const handleInjectEmergency = (rhythm: RhythmType) => {
    setCurrentRhythm(rhythm);
    setAlarmActive(true);
    soundEngine.playAlarmBeep();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Top Telemetry Hospital Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & System Identity */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
              title="Return to Main Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="relative p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Heart
                  className={`w-5 h-5 transition-transform duration-100 ${
                    isBeating ? 'scale-125 fill-current text-rose-500' : 'text-emerald-400'
                  }`}
                />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1">
                    <span>CardioGuard</span>
                    <span className="text-emerald-400">AI</span>
                  </h1>
                  <span className="hidden md:inline text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                    PRESENTATION DEMO v3.4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  Autonomous 12-Lead Cardiac Telemetry & Triage Engine
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Patient Selector */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedPatientId}
                onChange={(e) => handleSelectPatient(e.target.value)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer text-xs"
              >
                {DEMO_PATIENTS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {p.name} ({p.age}y - {p.initialRhythm})
                  </option>
                ))}
              </select>
            </div>

            {/* Hardware Bridge Button */}
            <button
              onClick={() => setIsHardwareOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                hardwareState.isConnected
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Connect physical AD8232 / MAX30102 / BLE or upload dataset"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">
                {hardwareState.isConnected ? 'Hardware Active' : 'Connect ECG Module'}
              </span>
              <span className="md:hidden">Hardware</span>
            </button>

            {/* Clinical Report Button */}
            <button
              onClick={() => setIsReportOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition"
              title="Open Printable Clinical Telemetry Report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Critical Alarm Strobe Banner */}
      {alarmActive && isCritical && (
        <div className="bg-rose-600 text-white px-4 py-2 flex items-center justify-between text-xs font-mono animate-pulse shadow-xl">
          <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1">
            <Flame className="w-4 h-4 fill-current animate-bounce" />
            <span className="font-black uppercase tracking-wider">
              CRITICAL ARRHYTHMIA ALERT:
            </span>
            <span className="font-bold">{currentDiagnosis.title}</span>
            <span className="hidden md:inline text-rose-200">
              — Immediate intervention protocol active.
            </span>
          </div>
          <button
            onClick={() => setAlarmActive(false)}
            className="px-2.5 py-0.5 rounded bg-black/40 hover:bg-black/60 text-white font-bold text-[11px] transition"
          >
            Acknowledge / Silence
          </button>
        </div>
      )}

      {/* Presentation Architecture Tip Banner */}
      {!bannerDismissed && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-blue-200">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Presentation Mode Active: </span>
                Currently generating high-fidelity simulated ECG data for dependable demonstrations.
                Once your presentation flow is verified, connect your physical ECG module (AD8232 /
                MAX30102 / BLE) via the{' '}
                <button
                  onClick={() => setIsHardwareOpen(true)}
                  className="text-cyan-300 underline font-bold hover:text-white"
                >
                  Connect ECG Module
                </button>{' '}
                panel.
              </div>
            </div>
            <button
              onClick={() => setBannerDismissed(true)}
              className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Monitoring Cockpit */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* 1. Patient Context Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-slate-400 font-mono text-[10px] block">PATIENT</span>
              <span className="font-bold text-white text-sm">{currentPatient.name}</span>
            </div>
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-slate-400 font-mono text-[10px] block">MRN</span>
              <span className="font-mono text-slate-200 font-bold">{currentPatient.mrn}</span>
            </div>
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div>
              <span className="text-slate-400 font-mono text-[10px] block">LOCATION</span>
              <span className="text-slate-200 font-medium">{currentPatient.room}</span>
            </div>
            <div className="h-6 w-px bg-slate-800 hidden md:block" />
            <div className="hidden md:block max-w-md">
              <span className="text-slate-400 font-mono text-[10px] block">CHIEF COMPLAINT</span>
              <span className="text-slate-300 truncate block text-[11px]">
                {currentPatient.chiefComplaint}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-slate-400">DATA SOURCE:</span>
            <span
              className={`px-2 py-0.5 rounded font-bold ${
                hardwareState.isConnected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {hardwareState.isConnected ? hardwareState.source : 'SYNTHETIC 250Hz'}
            </span>
          </div>
        </div>

        {/* 2. Patient Vitals HUD */}
        <VitalsHUD vitals={vitals} isBeating={isBeating} riskLevel={currentDiagnosis.riskLevel} />

        {/* 3. Real-Time High-Precision 60FPS ECG Oscilloscope */}
        <ECGCanvas
          rhythm={currentRhythm}
          lead={currentLead}
          onLeadChange={setCurrentLead}
          onRPeak={handleRPeak}
          riskLevel={currentDiagnosis.riskLevel}
        />

        {/* 4. AI Diagnostic & Triage Neural Engine */}
        <AIDiagnosticCard
          diagnosis={currentDiagnosis}
          onOpenReport={() => setIsReportOpen(true)}
          onTriggerAlarm={() => handleInjectEmergency('VTACH')}
        />

        {/* 5. Arrhythmia Preset Switcher & Emergency Simulation */}
        <RhythmPresets
          currentRhythm={currentRhythm}
          onSelectRhythm={setCurrentRhythm}
          onInjectEmergency={handleInjectEmergency}
        />
      </main>

      {/* Hardware Connection Modal */}
      <HardwareModal
        isOpen={isHardwareOpen}
        onClose={() => setIsHardwareOpen(false)}
        connectionState={hardwareState}
        onUpdateConnection={setHardwareState}
        onUploadCustomData={(points, fileName) => {
          setHardwareState({
            source: 'FILE_IMPORT',
            isConnected: true,
            fileName,
            packetsPerSecond: 250,
          });
        }}
      />

      {/* Clinical Report Document Modal */}
      <ClinicalReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        patient={currentPatient}
        diagnosis={currentDiagnosis}
        vitals={vitals}
      />
    </div>
  );
}
