import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ReportHeader from '../../components/ReportHeader';

// Marker icon fix
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
    </Marker>
  );
}

export default function ReportDetails({ formData, updateFormData }) {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleDescChange = (e) => {
    updateFormData({ description: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let loadedCount = 0;
    const newPhotos = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPhotos.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          updateFormData({ photos: [...formData.photos, ...newPhotos] });
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset file input so the same file can be selected again if removed
    e.target.value = '';
  };

  const removePhoto = (index) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
  };

  const setMapPos = async (pos) => {
    setIsLocating(true);
    // Optimistic UI update for coordinates
    const coordsAddress = `Near ${pos[0].toFixed(4)}, ${pos[1].toFixed(4)}`;
    updateFormData({
      location: {
        ...formData.location,
        lat: pos[0],
        lng: pos[1],
        address: coordsAddress
      }
    });

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos[0]}&lon=${pos[1]}`);
      const data = await response.json();
      
      if (data && data.display_name) {
        // Clean up display name or use address components
        const address = data.display_name;
        updateFormData({
          location: {
            ...formData.location,
            lat: pos[0],
            lng: pos[1],
            address: address
          }
        });
      }
    } catch (error) {
      console.error("Geocoding failed", error);
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen">
      <ReportHeader step={2} progress={66} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 pb-64">
        {/* Progress Section */}
        <div className="mb-6 md:mb-10 max-w-2xl mx-auto md:text-center flex flex-col md:items-center px-2">
          <div className="flex justify-between md:justify-center items-end mb-2 w-full">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1 block">Step 2 of 3</span>
              <h2 className="font-headline font-black text-2xl md:text-3xl text-on-surface">Details & Location</h2>
            </div>
          </div>
          <p className="text-on-surface-variant text-xs md:text-sm font-bold opacity-60 max-w-xl">
            Provide a detailed description and the precise location to help our team respond to the issue efficiently.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid mb-8 grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
          {/* Description & Photo Section */}
          <div className="md:col-span-7 flex flex-col gap-5">
            {/* Description Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-outline-variant/5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-3 ml-1" htmlFor="description">Situation Report</label>
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-4 text-[13px] font-bold text-on-surface focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-on-surface-variant/30 min-h-[120px]"
                id="description"
                placeholder="Explain what is happening in detail..."
                value={formData.description}
                onChange={handleDescChange}
              ></textarea>
              <p className="mt-3 text-[9px] font-black text-on-surface-variant uppercase tracking-widest flex items-center gap-1.5 opacity-40">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Specific details help us prioritize response
              </p>
            </section>

            <section className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-outline-variant/5 flex-grow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 ml-1">Evidence Photos ({formData.photos.length})</h3>
                <span className="text-[9px] font-black text-primary uppercase">MAX 6</span>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-outline-variant/10">
                    <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                      className="absolute top-1 right-1 w-5 h-5 bg-error text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}

                {/* Add Photo Button (Trigger) */}
                {formData.photos.length < 6 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors text-center p-2 group"
                  >
                    <span className="material-symbols-outlined text-primary text-xl active:scale-90 transition-transform">add_a_photo</span>
                    <span className="text-[8px] font-black text-on-surface-variant uppercase mt-1 opacity-40">Add</span>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />

              {formData.photos.length === 0 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer border-2 border-dashed border-outline-variant/20 rounded-xl bg-surface-container-low/20 hover:bg-surface-container-low/50 transition-all h-24 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
                >
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Click to Capture</p>
                  <p className="text-[9px] font-bold text-on-surface-variant opacity-40">Upload up to 6 clear photos</p>
                </div>
              )}
            </section>
          </div>

          {/* Map Section */}
          <div className="md:col-span-5">
            <section className="bg-surface-container-lowest rounded-2xl p-2 shadow-sm border border-outline-variant/5 h-full min-h-[350px] flex flex-col">
              <div className="p-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-40">Pin Exact Location</h3>
              </div>

              <div className="relative flex-grow rounded-xl overflow-hidden bg-surface-variant z-0 min-h-[250px]">
                <MapContainer
                  center={[formData.location.lat, formData.location.lng]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  />
                  <LocationMarker
                    position={[formData.location.lat, formData.location.lng]}
                    setPosition={setMapPos}
                  />
                </MapContainer>

                {/* Map Controls Shadow */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-[1000]">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-base">my_location</span>
                  </button>
                </div>

                {/* Location Result Toast */}
                <div className="absolute bottom-3 inset-x-3 z-[1000]">
                  <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-outline-variant/10 flex items-center gap-2.5">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <span className="material-symbols-outlined text-primary text-sm font-black">explore</span>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[8px] uppercase font-black text-primary tracking-[0.15em] mb-0.5 opacity-60">
                        {isLocating ? 'Locating...' : 'Selected Site'}
                      </p>
                      <p className="text-[11px] font-bold text-on-surface truncate pr-2">
                        {isLocating ? 'Fetching address details...' : formData.location.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sticky Navigation Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-xl z-50 border-t border-outline-variant/10 py-5 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/report/step-1')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest text-on-surface-variant hover:bg-surface-container opacity-60 hover:opacity-100 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-0.5">Final Review</p>
              <p className="text-xs font-bold text-on-surface-variant">Step 3 of 3</p>
            </div>
            <button
              onClick={() => navigate('/report/step-3')}
              className="bg-primary text-on-primary flex items-center gap-3 px-8 py-3 rounded-lg font-black text-xs uppercase tracking-[0.1em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Continue</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
