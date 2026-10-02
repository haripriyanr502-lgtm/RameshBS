'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export default function ApiDocsPage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Inject Swagger UI stylesheet
    const cssId = 'swagger-ui-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css';
      document.head.appendChild(link);
    }

    // 2. Load Swagger UI script
    const scriptId = 'swagger-ui-bundle';
    const initSwagger = () => {
      try {
        // @ts-expect-error SwaggerUIBundle is loaded via CDN script
        if (typeof window !== 'undefined' && window.SwaggerUIBundle) {
          // @ts-expect-error SwaggerUIBundle constructor
          window.SwaggerUIBundle({
            url: '/api/openapi.json',
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              // @ts-expect-error SwaggerUIBundle presets
              window.SwaggerUIBundle.presets.apis,
              // @ts-expect-error SwaggerUIStandalonePreset
              window.SwaggerUIStandalonePreset,
            ],
            layout: 'BaseLayout',
            docExpansion: 'list',
            defaultModelsExpandDepth: 1,
            persistAuthorization: true,
          });
          setLoaded(true);
        }
      } catch (err) {
        console.error('Failed to initialize Swagger UI:', err);
        setError('Failed to initialize Swagger UI engine');
      }
    };

    if (document.getElementById(scriptId)) {
      initSwagger();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // Also load standalone preset
      const presetScript = document.createElement('script');
      presetScript.src = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js';
      presetScript.crossOrigin = 'anonymous';
      presetScript.onload = () => initSwagger();
      document.body.appendChild(presetScript);
    };
    script.onerror = () => {
      setError('Could not load Swagger UI from CDN. Please check your network connection.');
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>
            <div className="h-5 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h1 className="font-serif font-bold text-base text-white">
                RameshBS OpenAPI / Swagger UI
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v1.0.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Raw JSON Spec</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <div className="h-5 w-px bg-slate-700" />
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
            <p className="font-bold">Error loading Swagger UI</p>
            <p>{error}</p>
          </div>
        )}

        {!loaded && !error && (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold">Loading interactive API documentation...</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 overflow-hidden">
          <div id="swagger-ui" />
        </div>
      </main>
    </div>
  );
}
