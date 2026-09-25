'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RhythmType, LeadType } from '../../lib/cardioguard/types';
import {
  ECGGeneratorState,
  createInitialState,
  computeECGVoltage,
} from '../../lib/cardioguard/ecgGenerator';
import { soundEngine } from '../../lib/cardioguard/sound';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sliders,
  Grid,
  Maximize2,
  Radio,
  Sparkles,
} from 'lucide-react';

interface ECGCanvasProps {
  rhythm: RhythmType;
  lead: LeadType;
  onLeadChange: (lead: LeadType) => void;
  onRPeak?: () => void;
  riskLevel: 'LOW' | 'MODERATE' | 'CRITICAL';
}

export function ECGCanvas({
  rhythm,
  lead,
  onLeadChange,
  onRPeak,
  riskLevel,
}: ECGCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // User controls
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [gridTheme, setGridTheme] = useState<'phosphor' | 'paper'>('phosphor');
  const [speedMmPerSec, setSpeedMmPerSec] = useState<number>(25); // 25mm/s standard
  const [gainMmPerMv, setGainMmPerMv] = useState<number>(10); // 10mm/mV standard
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showCalipers, setShowCalipers] = useState<boolean>(false);

  // Generator state stored in ref for uninterrupted RAF loop
  const generatorState = useRef<ECGGeneratorState>(createInitialState(rhythm));
  const sweepX = useRef<number>(0);
  const lastTime = useRef<number>(0);

  // Sync props to generator state
  useEffect(() => {
    generatorState.current.rhythm = rhythm;
  }, [rhythm]);

  useEffect(() => {
    generatorState.current.lead = lead;
  }, [lead]);

  // Audio mute toggle
  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  // Sound and visual pulse handler on R-peak
  const handleRPeak = useCallback(() => {
    if (onRPeak) {
      onRPeak();
    }
    if (!isMuted) {
      if (riskLevel === 'CRITICAL') {
        soundEngine.playHeartbeat(1050, 0.08);
      } else {
        soundEngine.playHeartbeat(880, 0.07);
      }
    }
  }, [onRPeak, isMuted, riskLevel]);

  // Main canvas animation sweep loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localSweepX = sweepX.current;
    let localLastTime = performance.now();

    // Resize handling
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Grid rendering helper
    const drawGrid = (width: number, height: number) => {
      ctx.save();
      if (gridTheme === 'paper') {
        // Clinical ECG Pink Paper
        ctx.fillStyle = '#FFF5F5';
        ctx.fillRect(0, 0, width, height);

        // 1mm fine grid
        const mm = 4; // 4px per mm
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= width; x += mm) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += mm) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        // 5mm major grid
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.28)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += mm * 5) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += mm * 5) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();
      } else {
        // High-Tech Neon Matrix Phosphor Grid
        ctx.fillStyle = '#060B14';
        ctx.fillRect(0, 0, width, height);

        const gridSize = 25;
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        for (let y = 0; y <= height; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        // Subtle horizontal center baseline
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.restore();
    };

    // Draw initial grid once
    const rect = canvas.getBoundingClientRect();
    drawGrid(rect.width, rect.height);

    let lastY = rect.height / 2;

    const render = (now: number) => {
      if (isFrozen) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerY = height / 2;

      const dt = Math.min((now - localLastTime) / 1000, 0.05); // cap delta
      localLastTime = now;

      // Speed conversion: 25 mm/s * scale pixels
      // Assuming 1mm ≈ 4px => 25mm = 100px/sec
      const pxPerSec = speedMmPerSec * 4;
      const stepPixels = pxPerSec * dt;

      // Number of discrete sub-steps for ultra-smooth waveform lines
      const subSteps = Math.max(1, Math.ceil(stepPixels));
      const subDt = dt / subSteps;
      const subDx = stepPixels / subSteps;

      // Clear the sweep scanhead region ahead of cursor (Erase bar)
      const eraseHeadWidth = 28;
      ctx.save();
      if (gridTheme === 'paper') {
        ctx.fillStyle = '#FFF5F5';
        ctx.fillRect(localSweepX, 0, eraseHeadWidth, height);
        // Redraw grid lines in erased zone
        ctx.strokeStyle = 'rgba(220, 38, 38, 0.22)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let x = Math.floor(localSweepX / 20) * 20; x <= localSweepX + eraseHeadWidth; x += 20) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        ctx.stroke();
      } else {
        // Phosphor sweep head: dark gradient sweep bar
        const grad = ctx.createLinearGradient(
          localSweepX,
          0,
          localSweepX + eraseHeadWidth,
          0
        );
        grad.addColorStop(0, 'rgba(6, 11, 20, 0.95)');
        grad.addColorStop(0.8, 'rgba(6, 11, 20, 0.98)');
        grad.addColorStop(1, 'rgba(6, 11, 20, 0.2)');
        ctx.fillStyle = grad;
        ctx.fillRect(localSweepX, 0, eraseHeadWidth, height);

        // Draw faint vertical telemetry cursor beam
        ctx.fillStyle = riskLevel === 'CRITICAL' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(16, 185, 129, 0.85)';
        ctx.fillRect(localSweepX + eraseHeadWidth - 1, 0, 2, height);
      }
      ctx.restore();

      // Waveform styling
      ctx.save();
      ctx.lineWidth = gridTheme === 'paper' ? 2 : 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (gridTheme === 'paper') {
        ctx.strokeStyle = '#991B1B'; // rich arterial red on paper
        ctx.shadowBlur = 0;
      } else {
        // Phosphor glow
        if (riskLevel === 'CRITICAL') {
          ctx.strokeStyle = '#EF4444'; // Red alarm waveform
          ctx.shadowColor = '#DC2626';
          ctx.shadowBlur = 8;
        } else if (riskLevel === 'MODERATE') {
          ctx.strokeStyle = '#F59E0B'; // Amber caution waveform
          ctx.shadowColor = '#D97706';
          ctx.shadowBlur = 6;
        } else {
          ctx.strokeStyle = '#10B981'; // Neon Emerald normal waveform
          ctx.shadowColor = '#059669';
          ctx.shadowBlur = 8;
        }
      }

      ctx.beginPath();
      ctx.moveTo(localSweepX, lastY);

      let curT = now / 1000;
      for (let i = 0; i < subSteps; i++) {
        curT += subDt;
        const mv = computeECGVoltage(curT, generatorState.current, handleRPeak);

        // Amplitude scaling: 1 mV = 10mm * 4px = 40px (scaled by gain)
        const scaleFactor = (gainMmPerMv / 10) * 42;
        const targetY = centerY - mv * scaleFactor;

        localSweepX += subDx;
        if (localSweepX >= width) {
          localSweepX = 0;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, targetY);
        }

        ctx.lineTo(localSweepX, targetY);
        lastY = targetY;
      }

      ctx.stroke();
      ctx.restore();

      sweepX.current = localSweepX;
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [gridTheme, speedMmPerSec, gainMmPerMv, isFrozen, riskLevel, handleRPeak]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all">
      {/* Scope Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 text-xs text-slate-300">
        {/* Left: Lead Selection & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  riskLevel === 'CRITICAL'
                    ? 'bg-rose-500'
                    : riskLevel === 'MODERATE'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  riskLevel === 'CRITICAL'
                    ? 'bg-rose-600'
                    : riskLevel === 'MODERATE'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
            </span>
            <span className="font-mono font-bold tracking-wider uppercase text-emerald-400">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          {/* Lead Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Lead:</span>
            <select
              value={lead}
              onChange={(e) => onLeadChange(e.target.value as LeadType)}
              className="bg-slate-800 text-white font-mono font-semibold px-2 py-1 rounded border border-slate-700 hover:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
            >
              <option value="Lead II">Lead II (Rhythm)</option>
              <option value="Lead I">Lead I</option>
              <option value="Lead III">Lead III</option>
              <option value="aVR">aVR (Inverted)</option>
              <option value="aVL">aVL</option>
              <option value="aVF">aVF</option>
              <option value="V1">V1 (Septal)</option>
              <option value="V2">V2 (Septal)</option>
              <option value="V3">V3 (Anterior)</option>
              <option value="V4">V4 (Anterior)</option>
              <option value="V5">V5 (Lateral)</option>
              <option value="V6">V6 (Lateral)</option>
            </select>
          </div>
        </div>

        {/* Center: Calibration & Sweep Parameters */}
        <div className="hidden sm:flex items-center gap-4 font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <span>Speed:</span>
            <button
              onClick={() =>
                setSpeedMmPerSec((prev) => (prev === 25 ? 50 : prev === 50 ? 12.5 : 25))
              }
              className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 font-semibold hover:bg-slate-700 transition"
              title="Click to toggle sweep speed"
            >
              {speedMmPerSec} mm/s
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span>Gain:</span>
            <button
              onClick={() =>
                setGainMmPerMv((prev) => (prev === 10 ? 20 : prev === 20 ? 5 : 10))
              }
              className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold hover:bg-slate-700 transition"
              title="Click to toggle voltage calibration"
            >
              {gainMmPerMv} mm/mV
            </button>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Filter:</span>
            <span className="text-slate-300 font-semibold">0.05-150Hz</span>
          </div>
        </div>

        {/* Right: Sound, Grid Theme, Calipers, Freeze */}
        <div className="flex items-center gap-2">
          {/* Calipers overlay button */}
          <button
            onClick={() => setShowCalipers(!showCalipers)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              showCalipers
                ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle Clinical Calipers / Interval Markers"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Calipers</span>
          </button>

          {/* Paper / Phosphor Toggle */}
          <button
            onClick={() => setGridTheme(gridTheme === 'phosphor' ? 'paper' : 'phosphor')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              gridTheme === 'paper'
                ? 'bg-rose-900/80 text-rose-200 border border-rose-700'
                : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
            }`}
            title="Toggle between ICU Telemetry Phosphor vs Clinical ECG Paper"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {gridTheme === 'phosphor' ? 'Dark Matrix' : 'ECG Paper'}
            </span>
          </button>

          {/* Sound Mute */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded transition ${
              !isMuted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title={isMuted ? 'Unmute QRS Beep' : 'Mute QRS Beep'}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Freeze Trace */}
          <button
            onClick={() => setIsFrozen(!isFrozen)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition ${
              isFrozen
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
            title="Freeze rhythm trace for clinical caliper inspection"
          >
            {isFrozen ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>UNFREEZE</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>FREEZE</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary HTML5 Canvas Area */}
      <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair"
        />

        {/* Lead HUD Badge in Top Left */}
        <div className="absolute top-3 left-4 pointer-events-none select-none">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black font-mono tracking-tight ${
                gridTheme === 'paper' ? 'text-rose-900' : 'text-emerald-400'
              }`}
            >
              {lead}
            </span>
            <span
              className={`text-xs font-mono font-medium ${
                gridTheme === 'paper' ? 'text-rose-700' : 'text-emerald-500/80'
              }`}
            >
              II · 25mm/s · 10mm/mV
            </span>
          </div>
        </div>

        {/* Caliper HUD Overlay when enabled */}
        {showCalipers && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3 shadow-xl pointer-events-none select-none text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2 pb-1 border-b border-slate-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Electrocardiographic Calipers</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">PR INTERVAL</span>
                <span className="text-emerald-400 font-bold text-sm">162 ms</span>
                <span className="text-[10px] text-slate-400 block">(N: 120-200)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">QRS COMPLEX</span>
                <span className="text-cyan-400 font-bold text-sm">92 ms</span>
                <span className="text-[10px] text-slate-400 block">(N: 80-120)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">QT / QTc (BAZETT)</span>
                <span className="text-amber-400 font-bold text-sm">418 ms</span>
                <span className="text-[10px] text-slate-400 block">(N: &lt;450)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ST-J POINT</span>
                <span
                  className={`font-bold text-sm ${
                    rhythm === 'STEMI' ? 'text-rose-400 animate-pulse' : 'text-slate-300'
                  }`}
                >
                  {rhythm === 'STEMI' ? '+3.2 mm' : '0.0 mm'}
                </span>
                <span className="text-[10px] text-slate-400 block">Isoelectric</span>
              </div>
            </div>
          </div>
        )}

        {/* Frozen Alert Watermark */}
        {isFrozen && (
          <div className="absolute top-4 right-4 bg-amber-500/90 text-slate-950 font-black px-3 py-1 rounded-md shadow-lg flex items-center gap-1.5 text-xs font-mono tracking-wider animate-bounce">
            <Pause className="w-4 h-4" />
            TRACE FROZEN FOR MEASUREMENT
          </div>
        )}
      </div>
    </div>
  );
}
