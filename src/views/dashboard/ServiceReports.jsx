import React, { useState, useEffect } from 'react';
import { subscribeToTickets, updateTicket, subscribeToFleet, subscribeToTeam } from '../../services/db';
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Timer,
  Image as LucideImage,
  X,
  ShieldCheck,
  Truck,
  ArrowRight,
  Maximize2,
  ChevronLeft,
  Users,
  Search
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceReports = () => {
  const [tickets, setTickets] = useState([]);
  const [fleet, setFleet] = useState([]);
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  // Assignment State
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubTickets = subscribeToTickets(setTickets);
    const unsubFleet = subscribeToFleet(setFleet);
    const unsubTeam = subscribeToTeam((data) => {
      setTeam(data);
      setIsLoading(false);
    });

    return () => {
      unsubTickets();
      unsubFleet();
      unsubTeam();
    };
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'urgent': return 'tertiary';
      case 'resolved': return 'secondary';
      case 'pending': return 'primary';
      case 'dispatching': return 'secondary';
      default: return 'primary';
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateTicket(id, { status: newStatus });
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAssignTeam = async (vehicle) => {
    const vehicleTeam = team.filter(m => m.vehicleId === vehicle.id);
    
    const assignmentData = {
      status: 'dispatching',
      assignedVehicle: {
        id: vehicle.id,
        type: vehicle.type
      },
      assignedTeam: vehicleTeam.map(m => ({
        id: m.id,
        name: `${m.firstName} ${m.lastName}`,
        position: m.position
      }))
    };

    await updateTicket(selectedTicket.id, assignmentData);
    setSelectedTicket(prev => ({ ...prev, ...assignmentData }));
    setIsAssigning(false);
  };

  const openGoogleMaps = (e, ticket) => {
    e.stopPropagation();
    if (ticket.location?.lat && ticket.location?.lng) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${ticket.location.lat},${ticket.location.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
        <div>
          <h3 className="text-lg font-headline font-black">Tickets Registry</h3>
          <p className="text-[10px] text-on-surface-variant font-bold opacity-30 uppercase tracking-widest">Incident Monitoring & Command</p>
        </div>
        <div className="flex items-center bg-surface-container p-1 rounded-xl border border-outline-variant/10">
          {['all', 'pending', 'dispatching', 'resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-[10px] font-black capitalize transition-all ${
                filter === f ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant/40 hover:text-on-surface'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-xs text-on-surface-variant tracking-widest uppercase">Fetching Registry...</p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="bg-surface-container-lowest/50 border-2 border-dashed border-outline-variant/10 rounded-2xl p-16 text-center">
          <CheckCircle2 className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
          <h4 className="text-lg font-headline font-bold mb-1">No Reports</h4>
          <p className="text-xs text-on-surface-variant max-w-xs mx-auto">This category is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              onClick={() => setSelectedTicket(ticket)}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group flex flex-col cursor-pointer overflow-hidden p-5 relative"
            >
              <div className="flex justify-between items-start mb-4">
                 <div className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 bg-${getStatusColor(ticket.status)}-container/10 text-${getStatusColor(ticket.status)} border border-${getStatusColor(ticket.status)}-container/20`}>
                    <div className={`w-1.5 h-1.5 rounded-full bg-${getStatusColor(ticket.status)}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{ticket.status}</span>
                  </div>
                  <button 
                    onClick={(e) => openGoogleMaps(e, ticket)}
                    className="p-1.5 hover:bg-primary-container/20 text-on-surface-variant hover:text-primary rounded-lg transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
              </div>

              <div className="space-y-1 mb-4">
                <h4 className="font-headline font-black text-base leading-tight group-hover:text-primary transition-colors">
                  {ticket.categoryLabel}
                </h4>
                <p className="text-[11px] font-bold text-on-surface-variant opacity-50 flex items-center gap-1.5">
                   <Clock className="w-3.5 h-3.5" />
                   {formatDistanceToNow(ticket.createdAt)} ago
                </p>
              </div>

              <p className="text-[13px] font-medium text-on-surface-variant line-clamp-2 mb-6 italic opacity-80">
                "{ticket.description}"
              </p>

              <div className="mt-auto flex items-center justify-between pt-3 border-t border-outline-variant/5">
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">
                   <LucideImage className="w-3.5 h-3.5" />
                   {ticket.photos?.length || 0} Media
                </div>
                {ticket.assignedVehicle && (
                  <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-secondary">
                    <Truck className="w-3.5 h-3.5" />
                    {ticket.assignedVehicle.id}
                  </div>
                )}
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center">
                   <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTicket(null)}
              className="absolute inset-0 bg-on-surface/50 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-surface-container-lowest w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col lg:flex-row border border-outline-variant/10"
            >
              <button 
                onClick={() => setSelectedTicket(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-on-surface/5 hover:bg-on-surface/10 rounded-lg flex items-center justify-center transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Section */}
              <div className="lg:w-2/5 bg-surface-container p-5 overflow-y-auto max-h-[30vh] lg:max-h-full">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 mb-4 px-1">Evidence Files ({selectedTicket.photos?.length || 0})</h4>
                 {selectedTicket.photos && selectedTicket.photos.length > 0 ? (
                   <div className="grid grid-cols-2 gap-2">
                      {selectedTicket.photos.map((photo, i) => (
                        <div 
                          key={i} 
                          onClick={() => setZoomedImage(photo)}
                          className="aspect-square rounded-xl overflow-hidden relative group cursor-zoom-in border border-outline-variant/5"
                        >
                          <img src={photo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Evidence" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Maximize2 className="text-white w-5 h-5" />
                          </div>
                        </div>
                      ))}
                   </div>
                 ) : (
                   <div className="h-40 flex flex-col items-center justify-center text-on-surface-variant/10 gap-2 border-2 border-dashed border-outline-variant/10 rounded-xl">
                      <LucideImage className="w-10 h-10" />
                      <p className="font-black text-[9px] uppercase tracking-widest">No Media Attached</p>
                   </div>
                 )}
              </div>

              {/* Info Section */}
              <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto flex flex-col">
                <div className="mb-6">
                   <div className={`inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3 bg-${getStatusColor(selectedTicket.status)}-container/20 text-${getStatusColor(selectedTicket.status)} border border-${getStatusColor(selectedTicket.status)}-container/10`}>
                     Registry Status: {selectedTicket.status}
                   </div>
                   <h2 className="text-xl font-headline font-black mb-3 leading-tight">{selectedTicket.categoryLabel}</h2>
                   
                   <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-3 p-3 bg-surface-container/20 rounded-xl border border-outline-variant/5 text-[12px] font-bold">
                         <MapPin className="w-4 h-4 text-primary mt-0.5" />
                         <div className="overflow-hidden">
                            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-0.5">Location</p>
                            <p className="text-on-surface leading-tight truncate">{selectedTicket.location?.address}</p>
                            <button onClick={(e) => openGoogleMaps(e, selectedTicket)} className="text-primary text-[10px] font-black mt-1 hover:underline active:scale-95 transition-all">Satellite View</button>
                         </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-surface-container/20 rounded-xl border border-outline-variant/5">
                         <AlertCircle className="w-4 h-4 text-on-surface-variant/30 mt-0.5" />
                         <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant/40 mb-0.5">Details</p>
                            <p className="text-xs font-bold text-on-surface/70 leading-relaxed italic">"{selectedTicket.description}"</p>
                         </div>
                      </div>

                      {/* Assignment Information */}
                      {selectedTicket.assignedVehicle && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-xl border border-secondary/10 animate-in fade-in slide-in-from-left-2 duration-500">
                           <Truck className="w-4 h-4 text-secondary mt-0.5" />
                           <div>
                              <p className="text-[8px] font-black uppercase tracking-widest text-secondary/40 mb-0.5">Active Dispatch</p>
                              <p className="text-xs font-black text-secondary leading-tight">{selectedTicket.assignedVehicle.type} • {selectedTicket.assignedVehicle.id}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {selectedTicket.assignedTeam?.map((m, i) => (
                                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-secondary/5 text-[9px] font-black text-on-surface">
                                    <Users className="w-2.5 h-2.5 text-secondary/30" />
                                    {m.name}
                                  </div>
                                ))}
                              </div>
                           </div>
                        </div>
                      )}
                   </div>

                   <div className="space-y-3">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/30 px-1">Command Control</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                         <button 
                           onClick={() => handleUpdateStatus(selectedTicket.id, 'resolved')}
                           className="flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary text-on-secondary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                         >
                           <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                         </button>

                         <button 
                           onClick={() => setIsAssigning(true)}
                           className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-on-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
                         >
                           <Truck className="w-3.5 h-3.5" /> {selectedTicket.assignedVehicle ? 'Override' : 'Dispatch'}
                         </button>
                      </div>
                   </div>
                </div>

                <div className="mt-auto pt-4 border-t border-outline-variant/5 text-center">
                   <p className="text-[8px] font-black text-on-surface-variant/20 uppercase tracking-[0.3em]">Log Ref: {selectedTicket.id.slice(0, 12).toUpperCase()}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Assignment Selection Modal */}
      <AnimatePresence>
        {isAssigning && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsAssigning(false)}
               className="absolute inset-0 bg-on-surface/60 backdrop-blur-xl"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden border border-outline-variant/10 flex flex-col max-h-[70vh]"
             >
                <div className="p-5 border-b border-outline-variant/5 bg-surface-container/20">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 px-1">
                         <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Truck className="w-4 h-4" />
                         </div>
                         <h3 className="text-lg font-headline font-black">Dispatch Unit</h3>
                      </div>
                      <button onClick={() => setIsAssigning(false)} className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                   </div>
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant opacity-30" />
                      <input 
                        type="text" 
                        placeholder="Filter units..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-surface-container rounded-xl border border-outline-variant/5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="p-5 overflow-y-auto space-y-2 custom-scrollbar">
                   {fleet
                    .filter(v => v.status === 'In Service')
                    .filter(v => 
                      v.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      v.type.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((vehicle) => {
                      const vehicleTeam = team.filter(m => m.vehicleId === vehicle.id);
                      
                      return (
                        <div 
                          key={vehicle.id} 
                          onClick={() => handleAssignTeam(vehicle)}
                          className="p-3.5 bg-surface-container/20 rounded-xl border border-outline-variant/5 hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]"
                        >
                           <div className="flex items-start justify-between mb-2.5">
                              <div className="flex items-center gap-2.5">
                                 <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-on-surface-variant/40 group-hover:text-primary transition-colors">
                                    <Truck className="w-3.5 h-3.5" />
                                 </div>
                                 <div className="overflow-hidden">
                                    <h4 className="font-black text-[12px] leading-tight group-hover:text-on-surface transition-colors">{vehicle.type}</h4>
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest">{vehicle.id}</p>
                                 </div>
                              </div>
                              <span className="text-[9px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-1.5 py-0.5 rounded-md">{vehicle.health}% Health</span>
                           </div>

                           <div className="flex flex-wrap gap-2 pt-3 border-t border-outline-variant/5">
                              {vehicleTeam.length > 0 ? (
                                vehicleTeam.map((m, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-[9px] font-black text-on-surface-variant/40 leading-none">
                                     <div className="w-1 h-1 rounded-full bg-secondary/40" />
                                     {m.firstName} {m.lastName}
                                  </div>
                                ))
                              ) : (
                                <p className="text-[9px] font-black text-tertiary/60 uppercase tracking-widest">Unmanned Unit</p>
                              )}
                           </div>
                        </div>
                      );
                    })}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Lightbox/Zoom */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setZoomedImage(null)}
               className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               className="relative z-10 max-w-7xl max-h-[90vh] rounded-[32px] overflow-hidden"
            >
               <img src={zoomedImage} className="w-full h-full object-contain" alt="Zoomed Evidence" />
               <button 
                 onClick={() => setZoomedImage(null)}
                 className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md"
               >
                 <X className="w-5 h-5" />
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceReports;
