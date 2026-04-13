import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addTicket } from '../services/db';

export default function ActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [reporter, setReporter] = useState('Current User');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    
    setIsSubmitting(true);
    try {
      await addTicket({
        title,
        status,
        meta: `Reported by ${reporter}`,
        icon: status === 'urgent' ? 'warning' : status === 'resolved' ? 'check_circle' : 'pending_actions',
        iconColor: status === 'urgent' ? 'text-tertiary' : status === 'resolved' ? 'text-secondary' : 'text-on-surface-variant',
        iconBg: status === 'urgent' ? 'bg-tertiary-container/30' : status === 'resolved' ? 'bg-secondary-container/30' : 'bg-surface-container-highest',
      });
      setIsOpen(false);
      setTitle('');
    } catch (error) {
      console.error("Failed to add ticket", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
        <motion.button 
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl flex flex-col items-center justify-center shadow-ambient glass-panel border border-white/20"
        >
          <span className="material-symbols-outlined text-[24px]">add</span>
          <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5 hidden md:block">Issue</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="layer-card w-full max-w-md bg-surface p-6 z-10 relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-headline font-extrabold text-on-surface">Report New Issue</h3>
                <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:bg-surface-container rounded-full p-1">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Issue Description</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Broken Bin at 5th Ave"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 block">Priority Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="pending">Pending (Standard)</option>
                    <option value="urgent">Urgent (Hazard)</option>
                    <option value="resolved">Already Resolved</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      Submit Ticket
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
