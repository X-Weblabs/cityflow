import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReportHeader from '../../components/ReportHeader';
import { addTicket } from '../../services/db';

export default function ReportReview({ formData, updateFormData, resetForm }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addTicket({
        title: formData.categoryLabel + ': ' + (formData.description.substring(0, 30) || 'No description'),
        categoryId: formData.categoryId,
        description: formData.description,
        status: formData.status,
        meta: 'Reported by Citizen',
        location: formData.location,
        photos: formData.photos,
        icon: formData.categoryId === 'dumping' ? 'delete_forever' : 
              formData.categoryId === 'missed' ? 'event_busy' :
              formData.categoryId === 'bin' ? 'delete' :
              formData.categoryId === 'hazard' ? 'warning' : 'more_horiz',
        iconBg: formData.categoryId === 'dumping' ? 'bg-tertiary-container/30' : 
                formData.categoryId === 'missed' ? 'bg-secondary-container/30' :
                formData.categoryId === 'bin' ? 'bg-primary-container/30' :
                formData.categoryId === 'hazard' ? 'bg-error-container/30' : 'bg-surface-container-highest',
        iconColor: formData.categoryId === 'dumping' ? 'text-tertiary' : 
                   formData.categoryId === 'missed' ? 'text-secondary' :
                   formData.categoryId === 'bin' ? 'text-primary' :
                   formData.categoryId === 'hazard' ? 'text-error' : 'text-on-surface-variant'
      });
      navigate('/report/success');
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24">
      <ReportHeader step={3} progress={100} />
      
      <main className="max-w-5xl mx-auto px-6 py-4 md:py-8 pb-32">
        {/* Progress Indicator Text */}
        <div className="mb-8 md:mb-10 max-w-xl mx-auto px-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">Final Review</span>
            <span className="text-primary font-black text-[10px] uppercase tracking-widest">Step 3 of 3</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden flex gap-0.5">
            <div className="h-full bg-primary/20 w-1/3 rounded-full"></div>
            <div className="h-full bg-primary/20 w-1/3 rounded-full"></div>
            <div className="h-full bg-primary w-1/3 rounded-full"></div>
          </div>
        </div>

        {/* Asymmetric Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
          {/* Left Column: Details */}
          <div className="md:col-span-7 space-y-5">
            {/* Category Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/5">
              <div className="flex justify-between items-start mb-4 px-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>delete_sweep</span>
                  </div>
                  <div>
                    <h2 className="text-on-surface font-black text-base leading-none mb-1">{formData.categoryLabel || 'Waste Issue'}</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Classification</p>
                  </div>
                </div>
                <button onClick={() => navigate('/report/step-1')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg active:scale-95 transition-all">Change</button>
              </div>
              <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/5">
                <p className="text-on-surface leading-normal text-xs font-bold italic opacity-70">
                  "{formData.description || 'No description provided.'}"
                </p>
              </div>
            </section>

            {/* Media Section */}
            <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-5 shadow-sm border border-outline-variant/5">
              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Evidence Files ({formData.photos.length})</h3>
                <button onClick={() => navigate('/report/step-2')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg active:scale-95 transition-all">Manage</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {formData.photos.length > 0 ? (
                  formData.photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-surface-variant relative group border border-outline-variant/10">
                      <img className="w-full h-full object-cover" alt={`Evidence ${index + 1}`} src={photo} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-6 flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/10 rounded-xl bg-surface-container-low/20">
                    <span className="material-symbols-outlined text-on-surface-variant/20 text-3xl mb-1">image_not_supported</span>
                    <p className="text-[9px] text-on-surface-variant/40 font-black uppercase">Missing Photos</p>
                  </div>
                )}
                {formData.photos.length > 0 && formData.photos.length < 6 && (
                  <div 
                    onClick={() => navigate('/report/step-2')}
                    className="aspect-square rounded-lg overflow-hidden bg-surface-variant/10 border-2 border-dashed border-outline-variant/10 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-outline-variant text-lg">add_a_photo</span>
                    <span className="text-[8px] font-black text-outline-variant uppercase mt-1">Add</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Location & Summary */}
          <div className="md:col-span-5 space-y-5">
            {/* Map Card */}
            <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/5">
              <div className="h-40 w-full bg-surface-variant relative">
                <img className="w-full h-full object-cover grayscale opacity-40 brightness-[0.8]" alt="Map View" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOukovRj-fzNfq-jHJWwNKD_6jFLEp0NQpVsnnETNBRwkrBOARp65otveUFWAxopfOoMgqiwbOr5RJY60NkEsMzpnwUbuZdHjkLchZCHg7hiMqg6IpLWViI8rsxEfxVzahwwWBKWv6mulHEkq7pU1yhbpx-otOf7CbeQ8ZxfCftEzIjK_PvLJ2UonIfh6IOefG6NFcDIoPhe5gqHPuXFMeQqQGZxraFptVTbww_GL12iUZDp7DB3YGZEf4WdDGc289ogRo1t6REuc"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[8px] font-black text-primary uppercase tracking-widest shadow-sm">
                  Service Site Location
                </div>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[12px] font-bold text-on-surface truncate leading-tight mb-1">{formData.location.address}</p>
                  <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-tighter">Lat: {formData.location.lat.toFixed(4)}, Lng: {formData.location.lng.toFixed(4)}</p>
                </div>
              </div>
            </section>

            {/* Status Badge Preview */}
            <section className="bg-surface-container/30 border border-outline-variant/10 rounded-2xl p-5 flex flex-col items-center text-center">
              <span className={`px-4 py-1 rounded-lg text-[9px] font-black tracking-widest mb-3 uppercase ${
                formData.status === 'urgent' ? 'bg-tertiary/20 text-tertiary' : 'bg-primary/20 text-primary'
              }`}>
                {formData.status} Priority Level
              </span>
              <p className="text-[11px] font-bold text-on-surface-variant/60 leading-snug">
                {formData.status === 'urgent' 
                  ? 'Your report is prioritized for immediate technician dispatch.' 
                  : 'System assigned standard priority based on report details.'}
              </p>
            </section>
          </div>
        </div>

        {/* Submit Action */}
        <div className="mt-10 flex flex-col items-center gap-4 max-w-md mx-auto">
          <p className="text-on-surface-variant text-[10px] font-bold opacity-40 text-center px-4 leading-relaxed">
            By submitting this report, you confirm that the evidence and location provided are accurate for audit purposes.
          </p>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary text-on-primary py-3.5 px-8 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {isSubmitting ? 'Finalizing...' : 'Submit Dispatch Ticket'}
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 py-2 px-6 rounded-lg hover:bg-surface-container-high transition-colors">
            Discard & Exit
          </button>
        </div>
      </main>


    </div>
  );
}
