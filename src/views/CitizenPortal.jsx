import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const QuickActionCard = ({ icon, title, desc, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#adb1c3]/10 hover:shadow-lg transition-all cursor-pointer group"
  >
    <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <span className="material-icons text-xl">{icon}</span>
    </div>
    <h3 className="font-headline font-black text-sm text-[#2d3240] dark:text-white mb-1 tracking-tight">{title}</h3>
    <p className="text-[11px] font-medium text-[#5a5f6e] dark:text-slate-400 leading-snug">{desc}</p>
  </div>
);


export default function CitizenPortal({ updateFormData }) {
  const navigate = useNavigate();

  const handleQuickAction = (categoryId, categoryLabel) => {
    updateFormData({ categoryId, categoryLabel });
    navigate('/report/step-1');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-slate-950 font-body pb-32">
      <header className="flex justify-between items-center px-6 py-3 w-full bg-[#faf8ff] dark:bg-slate-950 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <img src="/BCCLogo.png" alt="Bulawayo City Council" className="w-7 h-7 object-contain" />
          <h1 className="text-base font-black text-[#2d3240] dark:text-[#ebedfc] tracking-tight font-headline">Bulawayo Civic Sentinel</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6">
        <section className="my-4 md:my-6 p-6 md:p-8 bg-[#305ea5] rounded-2xl text-white relative overflow-hidden shadow-xl shadow-blue-900/10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative z-10 max-w-lg flex-1">
            <h2 className="text-2xl md:text-3xl font-black font-headline leading-[1.1] mb-3">Help keep Bulawayo clean</h2>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-5 opacity-70 max-w-sm">
              Your eyes on the street help our teams respond faster. Report waste issues in seconds and help keep your city clean.
            </p>
            <button
              onClick={() => navigate('/report/step-1')}
              className="bg-white text-[#305ea5] font-black py-3 px-7 rounded-xl flex items-center gap-2.5 hover:bg-blue-50 transition-all active:scale-95 shadow-lg shadow-black/5 w-full md:w-auto justify-center text-xs uppercase tracking-widest"
            >
              <span className="material-icons text-lg">add_circle</span>
              New Report
            </button>
          </div>

          {/* Hero Illustration */}
          <div className="hidden md:flex flex-1 justify-end items-center relative h-full select-none">
            <div className="relative z-10 p-1.5 bg-white rounded-xl border-[8px] border-[#4a72b2] shadow-2xl rotate-[3deg] w-[240px] lg:w-[320px] aspect-[16/10] overflow-hidden transform hover:rotate-0 transition-transform duration-500">
              <img
                src="/binicon.png"
                alt="Cleanup Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 rounded-full blur-[80px] -z-10" />
          </div>

          <div className="absolute right-[-40px] bottom-[-40px] w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-30" />
        </section>

        <div className="px-1 md:px-0 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="material-icons text-[#305ea5] dark:text-[#84aefa] text-xl">bolt</span>
            <h2 className="text-lg font-black text-[#2d3240] dark:text-white font-headline uppercase tracking-widest opacity-60 text-xs">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <QuickActionCard
              icon="delete_sweep"
              title="Missed Collection"
              desc="Bin wasn't picked up on schedule."
              color="bg-blue-50 text-[#305ea5]"
              onClick={() => handleQuickAction('missed', 'Missed Collection')}
            />
            <QuickActionCard
              icon="warning"
              title="Illegal Dumping"
              desc="Report unauthorized waste disposal site."
              color="bg-red-50 text-red-600"
              onClick={() => handleQuickAction('dumping', 'Illegal Dumping')}
            />
            <QuickActionCard
              icon="delete_outline"
              title="Full Public Bin"
              desc="Street bin overflowing in your area."
              color="bg-teal-50 text-teal-600"
              onClick={() => handleQuickAction('bin', 'Full Public Bin')}
            />
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
