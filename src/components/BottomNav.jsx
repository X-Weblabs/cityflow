import { useNavigate, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 group transition-all px-4 lg:px-8 ${active ? 'text-[#305ea5] dark:text-[#84aefa]' : 'text-[#5a5f6e] dark:text-slate-500'}`}
  >
    <div className={`p-2 rounded-xl transition-colors ${active ? 'bg-[#84aefa]/20' : 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800'}`}>
      <span className="material-icons">{icon}</span>
    </div>
    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isMap = location.pathname === '/map';
  const isReport = location.pathname.startsWith('/report');

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-[#adb1c3]/15 px-6 pb-6 pt-3 flex justify-around items-center z-[2000]">
      <NavItem 
        icon="home" 
        label="Home" 
        active={isHome} 
        onClick={() => navigate('/')} 
      />
      
      {/* Central Report FAB */}
      <div className="relative -top-8">
         <button 
          onClick={() => navigate('/report/step-1')}
          className="w-14 h-14 bg-[#305ea5] rounded-xl shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center text-white active:scale-90 transition-transform"
         >
            <span className="material-icons text-2xl">add</span>
            <span className="text-[8px] font-black uppercase mt-0.5 tracking-widest">Report</span>
         </button>
      </div>

      <NavItem 
        icon="map" 
        label="Map" 
        active={isMap} 
        onClick={() => navigate('/map')} 
      />
    </nav>
  );
}
