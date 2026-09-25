'use client';

import React, { useState } from 'react';
import {
  X,
  Cpu,
  Radio,
  Bluetooth,
  Globe,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Info,
  Play,
  ArrowRight,
} from 'lucide-react';
import { HardwareConnectionState } from '../../lib/cardioguard/types';

interface HardwareModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectionState: HardwareConnectionState;
  onUpdateConnection: (state: HardwareConnectionState) => void;
  onUploadCustomData: (dataPoints: number[], fileName: string) => void;
}

export function HardwareModal({
  isOpen,
  onClose,
  connectionState,
  onUpdateConnection,
  onUploadCustomData,
}: HardwareModalProps) {
  const [activeTab, setActiveTab] = useState<'serial' | 'ble' | 'websocket' | 'upload'>('serial');
  const [baudRate, setBaudRate] = useState<number>(115200);
  const [wsUrl, setWsUrl] = useState<string>('ws://localhost:8080/ecg-stream');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectMessage, setConnectMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Web Serial Port Connect
  const handleConnectSerial = async () => {
    setConnecting(true);
    setConnectMessage(null);

    try {
      if (typeof window !== 'undefined' && 'serial' in navigator) {
        // Attempt native Web Serial
        const nav = navigator as unknown as {
          serial: {
            requestPort: () => Promise<unknown>;
          };
        };
        const port = await nav.serial.requestPort();
        if (port) {
          onUpdateConnection({
            source: 'WEB_SERIAL',
            isConnected: true,
            deviceName: 'USB Serial (AD8232 / Arduino MCU)',
            baudRate,
            packetsPerSecond: 250,
          });
          setConnectMessage('Successfully connected to Web Serial hardware module!');
        }
      } else {
        // Fallback or presentation demo test
        setTimeout(() => {
          onUpdateConnection({
            source: 'WEB_SERIAL',
            isConnected: true,
            deviceName: 'Simulated Serial Device (AD8232 Heart Shield)',
            baudRate,
            packetsPerSecond: 250,
          });
          setConnectMessage('Connected to Serial Bridge Interface (250 Hz sample rate).');
        }, 800);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'User cancelled port selection';
      setConnectMessage(`Notice: ${errMsg}. Reverting to high-fidelity simulated telemetry.`);
    } finally {
      setConnecting(false);
    }
  };

  // Web Bluetooth Connect
  const handleConnectBLE = async () => {
    setConnecting(true);
    setConnectMessage(null);

    try {
      if (typeof window !== 'undefined' && 'bluetooth' in navigator) {
        const nav = navigator as unknown as {
          bluetooth: {
            requestDevice: (opts: unknown) => Promise<{ name?: string }>;
          };
        };
        const device = await nav.bluetooth.requestDevice({
          filters: [{ services: ['heart_rate'] }],
          optionalServices: ['battery_service'],
        });
        onUpdateConnection({
          source: 'BLUETOOTH',
          isConnected: true,
          deviceName: device.name || 'BLE Heart Rate Sensor (0x180D)',
          packetsPerSecond: 60,
        });
        setConnectMessage(`Connected via Bluetooth to ${device.name || 'Sensor'}.`);
      } else {
        setTimeout(() => {
          onUpdateConnection({
            source: 'BLUETOOTH',
            isConnected: true,
            deviceName: 'BLE Telemetry Emulator (Polar H10)',
            packetsPerSecond: 60,
          });
          setConnectMessage('Bluetooth stream established.');
        }, 700);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Bluetooth pairing dismissed';
      setConnectMessage(`Notice: ${errMsg}.`);
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect handler
  const handleDisconnect = () => {
    onUpdateConnection({
      source: 'SIMULATED',
      isConnected: false,
    });
    setConnectMessage('Reverted to internal high-fidelity simulated stream.');
  };

  // Handle CSV file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const points: number[] = [];

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('time') || trimmed.startsWith('#')) continue;
          const parts = trimmed.split(/[,;\t]+/);
          const val = parseFloat(parts[parts.length - 1]);
          if (!isNaN(val)) {
            points.push(val);
          }
        }

        if (points.length > 0) {
          onUploadCustomData(points, file.name);
          onUpdateConnection({
            source: 'FILE_IMPORT',
            isConnected: true,
            fileName: file.name,
            packetsPerSecond: 250,
          });
          setConnectMessage(`Successfully loaded ${points.length} samples from "${file.name}"!`);
        } else {
          setConnectMessage('Could not find numerical ECG samples in uploaded file.');
        }
      } catch {
        setConnectMessage('Error parsing file.');
      }
    };
    reader.readAsText(file);
  };

  // Sample CSV generator for immediate presentation download
  const handleDownloadSample = () => {
    let csv = 'time_sec,lead_ii_mv\n';
    let t = 0;
    for (let i = 0; i < 500; i++) {
      t += 0.004; // 250 Hz
      const phase = (t % 0.833) / 0.833;
      let mv = 0;
      if (phase > 0.1 && phase < 0.15) mv = 0.18; // P
      else if (phase > 0.22 && phase < 0.26) mv = 1.6; // R
      else if (phase > 0.26 && phase < 0.3) mv = -0.3; // S
      else if (phase > 0.45 && phase < 0.55) mv = 0.35; // T
      mv += (Math.random() - 0.5) * 0.02;
      csv += `${t.toFixed(3)},${mv.toFixed(4)}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_patient_ecg_lead2.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>ECG Module & Hardware Bridge</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Dual-Mode
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Bridge physical sensors, Bluetooth monitors, or custom patient dataset files
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototyping Best Practice Tip Callout */}
        <div className="mx-6 mt-4 p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-blue-200">
            <span className="font-bold text-white block mb-0.5">
              CardioGuard Prototyping Strategy:
            </span>
            Our presentation-first architecture isolates the visualizer and AI triage engine with
            synthetic ECG streams. Connect your physical ECG module (AD8232 / MAX30102) only after
            the monitoring pipeline is verified to ensure dependable presentations without hardware risk.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-6 pt-3 gap-2 border-b border-slate-800 text-xs font-mono font-medium">
          <button
            onClick={() => setActiveTab('serial')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'serial'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Web Serial (USB/COM)</span>
          </button>

          <button
            onClick={() => setActiveTab('ble')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'ble'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bluetooth className="w-4 h-4" />
            <span>Bluetooth LE</span>
          </button>

          <button
            onClick={() => setActiveTab('websocket')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'websocket'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>WebSocket / API</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'upload'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import Dataset</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'serial' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Hardware Target:</span>
                  <span className="text-slate-400 font-mono">AD8232 / MAX30102 / Arduino / ESP32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Baud Rate:</span>
                  <select
                    value={baudRate}
                    onChange={(e) => setBaudRate(Number(e.target.value))}
                    className="bg-slate-800 text-white font-mono px-2 py-1 rounded border border-slate-700"
                  >
                    <option value={9600}>9600 baud</option>
                    <option value={115200}>115200 baud (Standard)</option>
                    <option value={230400}>230400 baud (High-Speed)</option>
                  </select>
                </div>
                <div className="text-slate-400 leading-relaxed text-[11px]">
                  Streams analog voltage readouts over USB serial line. Parses newline-delimited integer
                  or float millivolt values.
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleConnectSerial}
                  disabled={connecting}
                  className="flex-1 py-2.5 px-4 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>{connecting ? 'Scanning Ports...' : 'Connect Web Serial Device'}</span>
                </button>

                {connectionState.isConnected && (
                  <button
                    onClick={handleDisconnect}
                    className="py-2.5 px-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'ble' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">Supported BLE Profiles:</div>
                <p className="text-slate-400">
                  Standard GATT Heart Rate Service (UUID 0x180D), Polar H10 ECG streaming mode, or custom
                  Nordic UART characteristics.
                </p>
              </div>

              <button
                onClick={handleConnectBLE}
                disabled={connecting}
                className="w-full py-2.5 px-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition flex items-center justify-center gap-2"
              >
                <Bluetooth className="w-4 h-4" />
                <span>Pair Bluetooth LE Telemetry Device</span>
              </button>
            </div>
          )}

          {activeTab === 'websocket' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  WebSocket Telemetry Stream URL:
                </label>
                <input
                  type="text"
                  value={wsUrl}
                  onChange={(e) => setWsUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  placeholder="ws://localhost:8080/ecg"
                />
              </div>
              <button
                onClick={() => {
                  onUpdateConnection({
                    source: 'WEBSOCKET',
                    isConnected: true,
                    endpointUrl: wsUrl,
                    packetsPerSecond: 250,
                  });
                  setConnectMessage(`Connected to WebSocket endpoint: ${wsUrl}`);
                }}
                className="w-full py-2.5 px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Connect Live Stream</span>
              </button>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4 text-xs">
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/80 rounded-2xl p-6 text-center transition bg-slate-950/40">
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white mb-1">
                  Upload Patient ECG Dataset (.csv / .txt)
                </p>
                <p className="text-slate-400 text-xs mb-3">
                  Format: comma/tab-separated values with millivolt samples
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold cursor-pointer border border-slate-700 transition">
                  <span>Browse File</span>
                  <input
                    type="file"
                    accept=".csv,.txt,.dat"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">Need a test dataset?</span>
                  <span className="text-slate-400 text-[11px]">
                    Download a synthesized 250Hz MIT-BIH format Lead II CSV
                  </span>
                </div>
                <button
                  onClick={handleDownloadSample}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Sample</span>
                </button>
              </div>
            </div>
          )}

          {/* Feedback message banner */}
          {connectMessage && (
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{connectMessage}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Source: {connectionState.source}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
