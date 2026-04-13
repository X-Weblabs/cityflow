import BottomNav from '../components/BottomNav';

export default function RecyclingGuide() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen pb-32">
      <header className="w-full top-0 sticky z-50 bg-[#faf8ff] dark:bg-slate-950 shadow-sm border-b border-outline-variant/5">
        <div className="flex justify-between items-center px-6 py-3 w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <button className="active:scale-95 duration-150 ease-in-out text-[#305ea5] dark:text-[#84aefa] hover:bg-[#ebedfc] p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <h1 className="font-headline font-black text-lg tracking-tight text-[#305ea5] dark:text-[#84aefa]">Recycling Guide</h1>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
              <img alt="City Logo" src="/BCCLogo.png" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 space-y-6 mt-4">
        {/* Search Section */}
        <section className="relative">
          <div className="flex items-center bg-surface-container-lowest shadow-sm rounded-xl px-4 py-2.5 ring-1 ring-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant mr-3 text-lg opacity-40">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 w-full font-body text-sm font-bold" 
              placeholder="Search items (e.g., batteries, pizza boxes)" 
              type="text"
            />
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary rounded-2xl p-6 md:p-8 text-on-primary shadow-lg shadow-primary/20">
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Sustainability Tip</span>
            </div>
            <h2 className="font-headline font-black text-xl md:text-2xl leading-tight mb-2 max-w-xl">Bulawayo residents can reduce waste by 40% through simple composting.</h2>
            <p className="font-body text-xs md:text-sm text-on-primary/70 mb-6 leading-relaxed max-w-md">Organic waste from your kitchen can become rich soil for your garden instead of filling up the landfill.</p>
            <button className="bg-white text-primary font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-lg active:scale-95 transition-all shadow-md">
              Try Composting
            </button>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="font-headline font-black text-xs uppercase tracking-widest opacity-40">Browse Categories</h3>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest cursor-pointer hover:underline">View All</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CategoryCard icon="delete" title="Waste Sorting" desc="Which bin?" color="bg-secondary-container/20 text-secondary" />
            <CategoryCard icon="eco" title="Composting" desc="Organic guide" color="bg-[#8ff4e3]/20 text-[#005c53]" />
            <CategoryCard icon="devices" title="E-Waste" desc="Electronics" color="bg-primary-container/20 text-primary" />
            <CategoryCard icon="warning" title="Hazardous" desc="Chemicals" color="bg-tertiary-container/20 text-tertiary" />
          </div>
        </section>

        {/* Featured Articles */}
        <section className="space-y-4">
          <h3 className="font-headline font-black text-xs uppercase tracking-widest opacity-40 px-1">Educational Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ArticleCard 
              image="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800"
              tag="Lifestyle"
              tagColor="bg-secondary-container text-on-secondary-container"
              title="5 Ways to Reduce Waste"
              desc="Practical steps to lower your household footprint in Bulawayo today."
            />
            <ArticleCard 
              image="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"
              tag="Local Insight"
              tagColor="bg-primary-container text-on-primary-container"
              title="Bottle Journey"
              desc="Follow the lifecycle of plastics from our streets to local recycling centers."
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

const CategoryCard = ({ icon, title, desc, color }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-outline-variant/10 hover:shadow-lg transition-all cursor-pointer group">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <h4 className="font-headline font-black text-[13px] text-on-surface tracking-tight group-hover:text-primary transition-colors">{title}</h4>
    <p className="text-[9px] text-on-surface-variant font-bold mt-0.5 uppercase tracking-wider opacity-60">{desc}</p>
  </div>
);

const ArticleCard = ({ image, tag, tagColor, title, desc }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-outline-variant/10 group cursor-pointer transition-all hover:shadow-lg">
    <div className="h-40 w-full relative">
      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={image} alt={title} />
      <div className={`absolute top-3 left-3 ${tagColor} px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg`}>
        {tag}
      </div>
    </div>
    <div className="p-4">
      <h4 className="font-headline font-black text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-xs text-on-surface-variant font-bold opacity-60 mb-4 leading-relaxed">{desc}</p>
      <div className="flex items-center text-primary font-black text-[10px] uppercase tracking-widest group-hover:gap-1.5 transition-all">
        Read More <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
      </div>
    </div>
  </div>
);
