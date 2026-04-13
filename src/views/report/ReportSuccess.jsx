import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ReportSuccess({ resetForm }) {
  const navigate = useNavigate();

  const handleFinish = () => {
    resetForm();
    navigate('/');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-secondary/5"
      >
        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-black text-on-surface mb-2 tracking-tight"
      >
        Report Logged
      </motion.h1>
      
      <motion.p 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-on-surface-variant text-xs font-bold opacity-60 leading-relaxed max-w-[280px] mb-10"
      >
        Your environmental report has been successfully submitted to the Waste Management team for priority processing.
      </motion.p>
      
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <button 
          onClick={handleFinish}
          className="bg-primary text-on-primary py-3.5 px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Return Home
        </button>
        <button 
          onClick={() => navigate('/')}
          className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 py-2.5 px-6 rounded-lg hover:bg-surface-container transition-colors"
        >
          View Dashboard
        </button>
      </motion.div>
    </div>
  );
}
