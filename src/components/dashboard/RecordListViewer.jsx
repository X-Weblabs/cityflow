import React, { useState } from 'react';
import { Search, Filter, Download, ChevronRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export const RecordListViewer = ({ 
  title, 
  subtitle, 
  records, 
  columns, 
  onRowClick 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter(record => {
    const query = searchQuery.toLowerCase();
    return Object.values(record).some(val => 
      String(val).toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
        <div>
          <h2 className="text-xl font-headline font-black text-on-surface uppercase tracking-tight">{title}</h2>
          <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/30" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container border border-outline-variant/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-on-surface w-full md:w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-high transition-all">
            <Filter className="w-4 h-4" />
          </button>
          <button className="hidden sm:block p-2.5 rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {filteredRecords.map((record, ridx) => (
          <motion.div
            key={record.id || ridx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onRowClick && onRowClick(record)}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm active:bg-primary/5 active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-tighter opacity-30 leading-none mb-1">Ref ID</p>
                   <p className="text-[11px] font-bold font-mono opacity-60">#{record.id?.slice(0, 8)}</p>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-surface-container">
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-outline-variant/5">
              {columns.map((col, cidx) => (
                <div key={cidx} className={cidx === 0 ? "col-span-2 mb-1" : ""}>
                   <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1">{col.label}</p>
                   <p className={cn("font-bold text-on-surface truncate", cidx === 0 ? "text-[15px]" : "text-[12px]")}>
                      {col.render ? col.render(record[col.key], record) : record[col.key]}
                   </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/5">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">
                    {col.label}
                  </th>
                ))}
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <AnimatePresence>
                {filteredRecords.map((record, ridx) => (
                  <motion.tr 
                    key={record.id || ridx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onRowClick && onRowClick(record)}
                    className="hover:bg-primary/5 cursor-pointer transition-colors group"
                  >
                    {columns.map((col, cidx) => (
                      <td key={cidx} className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-on-surface group-hover:text-primary transition-colors">
                            {col.render ? col.render(record[col.key], record) : record[col.key]}
                          </span>
                          {col.subKey && (
                            <span className="text-[10px] text-on-surface-variant/40 font-medium">
                              {record[col.subKey]}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary inline-block" />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {filteredRecords.length === 0 && (
        <div className="p-20 text-center opacity-20">
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xs font-black uppercase tracking-[0.3em]">No records found</p>
        </div>
      )}
    </div>
  );
};
