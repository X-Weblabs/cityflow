import { useNavigate } from 'react-router-dom';
import ReportHeader from '../../components/ReportHeader';

const categories = [
  {
    id: 'dumping',
    label: 'Illegal Dumping',
    description: 'Unauthorized disposal of waste on public or private land.',
    icon: 'delete_forever',
    iconBg: 'bg-tertiary-container',
    iconColor: 'text-on-tertiary-container',
    cols: 'md:col-span-4'
  },
  {
    id: 'missed',
    label: 'Missed Collection',
    description: 'Scheduled waste pickup was not completed.',
    icon: 'event_busy',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    cols: 'md:col-span-2'
  },
  {
    id: 'bin',
    label: 'Full Public Bin',
    description: 'Overarching or overflowing public waste bins.',
    icon: 'delete',
    iconBg: 'bg-primary-container',
    iconColor: 'text-on-primary-container',
    cols: 'md:col-span-2'
  },
  {
    id: 'hazard',
    label: 'Hazardous Waste',
    description: 'Chemicals, batteries, or bio-medical hazards.',
    icon: 'warning',
    iconBg: 'bg-error-container',
    iconColor: 'text-on-error-container',
    cols: 'md:col-span-2'
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Different waste-related service requests.',
    icon: 'more_horiz',
    iconBg: 'bg-surface-variant',
    iconColor: 'text-on-surface-variant',
    cols: 'md:col-span-2'
  }
];

export default function ReportCategory({ formData, updateFormData }) {
  const navigate = useNavigate();

  const handleSelect = (category) => {
    updateFormData({ 
      categoryId: category.id, 
      categoryLabel: category.label,
      status: category.id === 'hazard' || category.id === 'dumping' ? 'urgent' : 'pending'
    });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <ReportHeader step={1} progress={33} />
      
      <main className="max-w-4xl mx-auto px-6 pt-6 pb-24">
        {/* Header Section */}
        <section className="mb-8">
          <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase mb-1.5 block">Step 1 of 3</span>
          <h2 className="text-2xl md:text-3xl font-black text-on-surface mb-3 tracking-tight">What issue would you like to report?</h2>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-xl opacity-70">Select the category that best describes the environmental concern in your area.</p>
        </section>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat)}
              className={`${cat.cols} p-4 md:p-5 rounded-xl flex flex-col items-start text-left group transition-all duration-300 border-2 ${
                formData.categoryId === cat.id 
                  ? 'bg-primary/5 border-primary shadow-sm translate-y-[-1px]' 
                  : 'bg-surface-container-lowest border-outline-variant/5 hover:bg-surface-container-high hover:translate-y-[-1px]'
              }`}
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${cat.iconBg} flex items-center justify-center mb-4 ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {cat.icon}
                </span>
              </div>
              <h3 className="text-sm font-black text-on-surface mb-1 group-hover:text-primary transition-colors">{cat.label}</h3>
              <p className="text-on-surface-variant text-[11px] font-bold leading-snug opacity-60 line-clamp-2">{cat.description}</p>
              
              <div className={`mt-3 flex items-center text-primary font-black text-[10px] uppercase tracking-widest transition-opacity ${
                formData.categoryId === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {formData.categoryId === cat.id ? 'Selected' : 'Select'} 
                <span className="material-symbols-outlined ml-1 text-xs">chevron_right</span>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-8 p-4 bg-surface-container-low rounded-xl flex items-center gap-4 border border-outline-variant/10">
          <div className="hidden sm:block w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              className="w-full h-full object-cover grayscale opacity-50" 
              alt="Recycling"
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"
            />
          </div>
          <div>
            <p className="text-on-surface font-black text-[10px] uppercase tracking-widest opacity-40 mb-1">Why report?</p>
            <p className="text-on-surface-variant text-xs font-bold leading-relaxed opacity-70">Your reports help our fleet optimize routes and ensure Bulawayo remains clean and sustainable.</p>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full p-4 flex flex-col items-center pointer-events-none z-50">
        <div className="w-full max-w-screen-md flex justify-end pointer-events-auto">
          <button 
            onClick={() => formData.categoryId && navigate('/report/step-2')}
            disabled={!formData.categoryId}
            className="group relative flex items-center justify-center gap-3 bg-primary text-on-primary px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next Step</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
