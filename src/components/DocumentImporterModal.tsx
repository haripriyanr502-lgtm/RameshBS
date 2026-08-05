'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileUp, Sparkles, Check, RefreshCw, Layers, FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { PortfolioData, CategorizedParagraph, SectionKey } from '../types/portfolio';
import { parseAndCategorizeDocument, applyParsedContentToPortfolio } from '../utils/docParser';
import mammoth from 'mammoth';

interface DocumentImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
  onUpdatePortfolio: (updatedData: PortfolioData) => void;
}

export const DocumentImporterModal: React.FC<DocumentImporterModalProps> = ({
  isOpen,
  onClose,
  portfolioData,
  onUpdatePortfolio,
}) => {
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [categorizedItems, setCategorizedItems] = useState<CategorizedParagraph[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<SectionKey>('about');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    try {
      if (file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setRawText(result.value);
        processText(result.value);
      } else {
        const text = await file.text();
        setRawText(text);
        processText(text);
      }
    } catch (err) {
      console.error('Error reading document:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const processText = (text: string) => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const items = parseAndCategorizeDocument(text);
      setCategorizedItems(items);
      setIsProcessing(false);
    }, 400);
  };

  const handleApplyToPortfolio = () => {
    if (categorizedItems.length === 0) return;
    const updated = applyParsedContentToPortfolio(portfolioData, categorizedItems);
    onUpdatePortfolio(updated);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      onClose();
    }, 1200);
  };

  const sectionCounts: Record<SectionKey, number> = {
    about: categorizedItems.filter((i) => i.suggestedSection === 'about').length,
    lionistic: categorizedItems.filter((i) => i.suggestedSection === 'lionistic').length,
    services: categorizedItems.filter((i) => i.suggestedSection === 'services').length,
    hobbies: categorizedItems.filter((i) => i.suggestedSection === 'hobbies').length,
    career: categorizedItems.filter((i) => i.suggestedSection === 'career').length,
  };

  const sectionLabels: Record<SectionKey, string> = {
    about: 'ABOUT ME',
    lionistic: 'MY LIONISTIC JOURNEY',
    services: 'SERVICES INVOLVED IN',
    hobbies: 'HOBBIES',
    career: 'CAREER',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0A1128] border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <FileUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  DOC / DOCX Content Ingestion Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Upload your document or paste text to automatically categorize into portfolio sections
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="py-6 space-y-6">
            
            {/* File Dropzone & Paste Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Upload DOCX File */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] bg-slate-900/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".docx,.txt,.doc"
                  className="hidden"
                />
                <FileText className="w-10 h-10 text-[#D4AF37] mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold text-white mb-1">
                  {fileName ? fileName : 'Click to Upload .DOCX or .TXT File'}
                </p>
                <p className="text-xs text-slate-400">Supports Word documents and plain text files</p>
              </div>

              {/* Right: Paste Text Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Or Paste Document Text Directly:
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => {
                    setRawText(e.target.value);
                    processText(e.target.value);
                  }}
                  placeholder="Paste your biography, Lionistic journey notes, services, career history, or hobbies content here..."
                  className="w-full h-32 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

            </div>

            {/* Classification Results Section */}
            {categorizedItems.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Categorized {categorizedItems.length} Paragraphs Across 5 Sections:
                  </span>

                  <button
                    onClick={() => processText(rawText)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                    <span>Re-Analyze</span>
                  </button>
                </div>

                {/* Section Preview Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(sectionLabels) as SectionKey[]).map((secKey) => (
                    <button
                      key={secKey}
                      onClick={() => setActivePreviewTab(secKey)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                        activePreviewTab === secKey
                          ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{sectionLabels[secKey]}</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
                        {sectionCounts[secKey]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Classified Items List Preview */}
                <div className="max-h-48 overflow-y-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  {categorizedItems
                    .filter((item) => item.suggestedSection === activePreviewTab)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#D4AF37] font-semibold">
                          <span>Suggested Match: {sectionLabels[item.suggestedSection]}</span>
                          <span>Confidence: {item.confidence}%</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{item.text}</p>
                      </div>
                    ))}

                  {sectionCounts[activePreviewTab] === 0 && (
                    <div className="text-center py-6 text-xs text-slate-500 italic">
                      No paragraphs classified under {sectionLabels[activePreviewTab]} yet.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold uppercase hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              onClick={handleApplyToPortfolio}
              disabled={categorizedItems.length === 0 || isProcessing}
              className="btn-gold px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
            >
              {appliedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Applied to Portfolio!</span>
                </>
              ) : (
                <>
                  <span>Populate Live Website</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
