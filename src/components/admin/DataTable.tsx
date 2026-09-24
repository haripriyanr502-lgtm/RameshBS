'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle2, Clock } from 'lucide-react';
import { ContentStatus } from '../../lib/cms/types';

export interface Column<T> {
  header: string;
  accessor?: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T extends { id: string; status?: ContentStatus }> {
  title: string;
  subtitle?: string;
  items: T[];
  columns: Column<T>[];
  addButtonLabel: string;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onToggleStatus?: (item: T) => void;
  searchPlaceholder?: string;
  filterCategories?: string[];
  getCategory?: (item: T) => string;
  renderThumbnail?: (item: T) => React.ReactNode;
}

export function DataTable<T extends { id: string; status?: ContentStatus }>({
  title,
  subtitle,
  items,
  columns,
  addButtonLabel,
  onAdd,
  onEdit,
  onDelete,
  onToggleStatus,
  searchPlaceholder = 'Search entries...',
  filterCategories,
  getCategory,
  renderThumbnail,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'published' | 'draft'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredItems = items.filter((item) => {
    // Status filter
    if (statusFilter !== 'ALL' && item.status && item.status !== statusFilter) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'ALL' && getCategory) {
      if (getCategory(item) !== categoryFilter) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const stringified = JSON.stringify(item).toLowerCase();
      return stringified.includes(q);
    }

    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Table Header & Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'published'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'draft'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              Drafts
            </button>
          </div>

          {/* Category Filter if available */}
          {filterCategories && filterCategories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="ALL">All Categories</option>
              {filterCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* + Add New Button */}
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{addButtonLabel}</span>
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {renderThumbnail && <th className="py-3 px-4 w-16">Preview</th>}
              {columns.map((col, idx) => (
                <th key={idx} className={`py-3 px-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
              <th className="py-3 px-4 w-28">Status</th>
              <th className="py-3 px-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderThumbnail ? 1 : 0) + 2}
                  className="py-12 text-center text-slate-500"
                >
                  <p className="font-medium text-slate-400">No records found matching criteria</p>
                  <button
                    onClick={onAdd}
                    className="mt-3 text-xs text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{addButtonLabel}</span>
                  </button>
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-850/60 transition-colors group"
                >
                  {renderThumbnail && (
                    <td className="py-3 px-4">{renderThumbnail(item)}</td>
                  )}

                  {columns.map((col, idx) => {
                    let val: React.ReactNode = null;
                    if (typeof col.accessor === 'function') {
                      val = col.accessor(item);
                    } else if (col.accessor) {
                      val = (item[col.accessor] as unknown) as React.ReactNode;
                    }
                    return (
                      <td key={idx} className={`py-3 px-4 text-slate-200 ${col.className || ''}`}>
                        {val}
                      </td>
                    );
                  })}

                  {/* Status Pill */}
                  <td className="py-3 px-4">
                    {item.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800/60">
                        <Clock className="w-3 h-3" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {onToggleStatus && (
                        <button
                          onClick={() => onToggleStatus(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                          title={item.status === 'published' ? 'Switch to Draft' : 'Publish to Live'}
                        >
                          {item.status === 'published' ? (
                            <EyeOff className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-emerald-400" />
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit entry"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/30 text-xs text-slate-500 flex items-center justify-between">
        <span>Showing {filteredItems.length} of {items.length} total entries</span>
        <span className="text-[11px] text-slate-600">All changes auto-prepared for publish</span>
      </div>
    </div>
  );
}
