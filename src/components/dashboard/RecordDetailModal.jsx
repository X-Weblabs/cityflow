import React from 'react';
import { X, FileText, Calendar, MapPin, User, CheckCircle, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fields to always hide from the detail view
const HIDDEN_FIELDS = ['id', 'createdAt', 'updatedAt', '_coll'];

// Human-readable label from camelCase key
const formatKey = (key) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();

// Format value — arrays join, timestamps convert, booleans display
const formatValue = (val) => {
  if (val === null || val === undefined || val === '') return '—';
  if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : '—';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'number' && val > 1_000_000_000_000) {
    return new Date(val).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return String(val);
};

export const RecordDetailModal = ({ record, onClose, title = 'Record Details' }) => {
  if (!record) return null;

  const fields = Object.entries(record).filter(([k]) => !HIDDEN_FIELDS.includes(k));
  const status = record.status;
  const isResolved = status === 'Resolved';

  return (
    <AnimatePresence>
      {record && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
          />

          {/* Modal panel — slides up from bottom on mobile, centered on desktop */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-[210] bg-surface-container-lowest rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Record Details</p>
                  <h2 className="font-headline font-black text-[15px] text-on-surface leading-tight">{title}</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container rounded-xl text-on-surface-variant hover:text-error transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status banner */}
            {status && (
              <div className={`px-6 py-2.5 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest shrink-0 ${
                isResolved
                  ? 'bg-secondary/10 text-secondary border-b border-secondary/10'
                  : 'bg-primary/5 text-primary border-b border-primary/10'
              }`}>
                {isResolved ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {status}
              </div>
            )}

            {/* Ref ID */}
            <div className="px-6 py-3 border-b border-outline-variant/5 bg-surface-container/10 shrink-0">
              <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">Reference ID</p>
              <p className="text-[12px] font-bold font-mono text-on-surface/50 mt-0.5">{record.id}</p>
            </div>

            {/* Fields grid — scrollable */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {fields.map(([key, val]) => (
                  <div key={key} className={key === 'actionTaken' || key === 'findings' || key === 'natureOfComplaint' ? 'col-span-full' : ''}>
                    <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-1 flex items-center gap-1.5">
                      {key === 'date' || key === 'dateReceived' || key === 'dateActioned' ? <Calendar className="w-2.5 h-2.5" /> :
                       key.toLowerCase().includes('location') || key === 'address' ? <MapPin className="w-2.5 h-2.5" /> :
                       key.toLowerCase().includes('name') || key.toLowerCase().includes('supervisor') ? <User className="w-2.5 h-2.5" /> :
                       key.toLowerCase().includes('type') || key.toLowerCase().includes('category') || key.toLowerCase().includes('waste') ? <Tag className="w-2.5 h-2.5" /> :
                       null}
                      {formatKey(key)}
                    </p>
                    <p className={`font-bold text-on-surface ${
                      key === 'actionTaken' || key === 'findings' || key === 'natureOfComplaint'
                        ? 'text-[12px] leading-relaxed bg-surface-container/50 rounded-xl p-3 border border-outline-variant/5'
                        : 'text-[13px]'
                    }`}>
                      {formatValue(val)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container/20 shrink-0">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-surface-container border border-outline-variant/10 text-[12px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-transparent transition-all active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RecordDetailModal;
