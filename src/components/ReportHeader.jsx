import { useNavigate } from 'react-router-dom';

export default function ReportHeader({ step, progress }) {
  const navigate = useNavigate();

  return (
    <header className="w-full top-0 sticky bg-surface dark:bg-[#1a1c1e] z-50">
      <div className="flex items-center justify-between px-4 h-16 w-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-primary dark:text-[#84aefa] hover:bg-surface-container dark:hover:bg-[#44474e] transition-colors active:scale-95 duration-150 rounded-full"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface dark:text-[#e2e2e6]">Report Issue</h1>
        </div>
        <button className="p-2 text-primary dark:text-[#84aefa] hover:bg-surface-container dark:hover:bg-[#44474e] transition-colors active:scale-95 duration-150 rounded-full">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
      {/* Progress Indicator */}
      <div className="w-full h-1 bg-surface-container">
        <div 
          className="h-full bg-primary rounded-r-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </header>
  );
}
