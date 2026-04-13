import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BottomNav from '../components/BottomNav';

// Custom Marker Icon
const hubIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const hubs = [
  {
    id: 1,
    name: 'City Hall Recycling Hub',
    address: '8th Ave & Fife St, Bulawayo Central',
    lat: -20.1500,
    lng: 28.5833,
    status: 'OPEN',
    materials: ['PLASTIC', 'E-WASTE', 'GLASS']
  },
  {
    id: 2,
    name: 'Hillside Green Station',
    address: 'Hillside Rd, Opp. Hillside Dams',
    lat: -20.1833,
    lng: 28.5833,
    status: 'OPEN',
    materials: ['COMPOST', 'PAPER']
  },
  {
    id: 3,
    name: 'Suburbs Recovery Center',
    address: 'George Ave, Suburbs',
    lat: -20.1450,
    lng: 28.6050,
    status: 'CLOSED',
    materials: ['E-WASTE', 'METAL']
  }
];

export default function RecycleMap() {
  const [selectedHub, setSelectedHub] = useState(hubs[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Hubs');

  const filteredHubs = activeFilter === 'All Hubs' 
    ? hubs 
    : hubs.filter(hub => hub.materials.includes(activeFilter.toUpperCase()));

  const handleGetDirections = () => {
    if (!selectedHub) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedHub.lat},${selectedHub.lng}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (!selectedHub) return;
    const shareData = {
      title: selectedHub.name,
      text: `Check out this recycling hub: ${selectedHub.address}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${selectedHub.name} - ${selectedHub.address}`);
        alert('Copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Component to handle map interactions
  function MapEvents() {
    useMapEvents({
      dragstart: () => setShowDetails(false),
      zoomstart: () => setShowDetails(false),
      click: () => setShowDetails(false),
    });
    return null;
  }

  return (
    <div className="bg-surface text-on-surface h-screen flex flex-col relative overflow-hidden">
      <header className="flex justify-between items-center px-6 h-14 w-full fixed top-0 z-[1000] bg-[#faf8ff] dark:bg-slate-900 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#305ea5] dark:text-[#84aefa] text-xl">search</span>
          <h1 className="font-headline font-black text-lg tracking-tight text-[#2d3240] dark:text-slate-100">RecycleMap</h1>
        </div>
      </header>

      <main className="flex-1 relative flex flex-col pt-14 h-full overflow-hidden">
        {/* Interactive Map */}
        <div className="flex-1 z-0">
          <MapContainer 
            center={[-20.15, 28.58]} 
            zoom={13} 
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapEvents />
            {filteredHubs.map(hub => (
              <Marker 
                key={hub.id} 
                position={[hub.lat, hub.lng]} 
                icon={hubIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedHub(hub);
                    setShowDetails(true);
                  },
                }}
              >
                <Popup>
                  <div className="font-headline font-bold text-xs">{hub.name}</div>
                  <div className="text-[10px] text-on-surface-variant">{hub.address}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="absolute top-16 left-0 w-full z-[1000] px-6 flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          <button 
            onClick={() => setActiveFilter('All Hubs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black shadow-lg shrink-0 transition-all ${
              activeFilter === 'All Hubs' ? 'bg-primary text-on-primary' : 'bg-white/90 backdrop-blur text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">filter_list</span>
            All
          </button>
          {['Plastic', 'Glass', 'E-waste', 'Paper'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`flex items-center gap-2 backdrop-blur px-4 py-2 rounded-full text-xs font-black shadow-md shrink-0 border border-outline-variant/10 transition-all ${
                activeFilter === cat ? 'bg-primary text-on-primary' : 'bg-white/90 text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bottom Sheet Details */}
        <section 
          className={`absolute bottom-0 left-0 w-full z-[1000] bg-white dark:bg-slate-900 rounded-t-2xl shadow-ambient px-6 pt-3 pb-32 border-t border-outline-variant/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            showDetails ? 'translate-y-0 opacity-100' : 'translate-y-[80%] opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-10 h-1 bg-outline-variant/20 rounded-full mx-auto mb-6"></div>
          
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-xl font-black text-on-surface tracking-tight mb-1">{selectedHub.name}</h2>
              <p className="text-on-surface-variant text-xs flex items-center gap-1.5 font-bold opacity-60">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {selectedHub.address}
              </p>
            </div>
            <span className={`text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase ${
              selectedHub.status === 'OPEN' ? 'bg-secondary-container/20 text-secondary' : 'bg-surface-variant text-on-surface-variant'
            }`}>
              {selectedHub.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {selectedHub.materials.map(mat => (
              <div key={mat} className="flex items-center gap-2.5 p-3 bg-surface-container/30 rounded-xl border border-outline-variant/5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">Inventory_2</span>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-tighter opacity-50">{mat}</p>
                  <p className="text-xs font-bold">Accepted</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleGetDirections}
              className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-lg shadow-primary/10"
            >
              <span className="material-symbols-outlined text-lg">directions</span>
              Directions
            </button>
            <button 
              onClick={handleShare}
              className="w-12 h-12 border border-outline-variant/20 rounded-xl flex items-center justify-center hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
