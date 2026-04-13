import React, { useState, useEffect } from 'react';
import { 
  subscribeToFleet, 
  addVehicle, 
  deleteVehicle, 
  subscribeToTeam, 
  addTeamMember, 
  deleteTeamMember 
} from '../../services/db';
import { 
  Plus, 
  Truck, 
  Users, 
  Trash2, 
  MoreVertical, 
  X,
  ShieldCheck,
  UserCircle2,
  AlertCircle,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FleetMaintenance = () => {
  const [fleet, setFleet] = useState([]);
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' or 'team'
  const [showAddModal, setShowAddModal] = useState(false);

  // Form States
  const [newVehicle, setNewVehicle] = useState({ id: '', type: 'Refuse Truck', status: 'In Service', health: 100 });
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', position: 'Driver', department: 'Public Health', vehicleId: '' });

  useEffect(() => {
    const unsubFleet = subscribeToFleet((data) => {
      setFleet(data);
      setIsLoading(false);
    });
    const unsubTeam = subscribeToTeam((data) => {
      setTeam(data);
    });
    return () => {
      unsubFleet();
      unsubTeam();
    };
  }, []);

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    await addVehicle({ ...newVehicle, createdAt: Date.now() });
    setShowAddModal(false);
    setNewVehicle({ id: '', type: 'Refuse Truck', status: 'In Service', health: 100 });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    await addTeamMember(newMember);
    setShowAddModal(false);
    setNewMember({ firstName: '', lastName: '', position: 'Driver', department: 'Public Health', vehicleId: '' });
  };

  return (
    <div className="space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-headline font-black">Fleet Operations</h3>
          <p className="text-[10px] text-on-surface-variant font-bold opacity-30 uppercase tracking-widest">Mobile Response Infrastructure</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
          <div className="bg-surface-container p-1 rounded-xl border border-outline-variant/10 flex">
            <button 
              onClick={() => setActiveTab('vehicles')}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'vehicles' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant/40'}`}
            >
              <Truck className="w-3.5 h-3.5" />
              Vehicles
            </button>
            <button 
              onClick={() => setActiveTab('team')}
              className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'team' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-on-surface-variant/40'}`}
            >
              <Users className="w-3.5 h-3.5" />
              Field Teams
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-primary text-on-primary font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] border border-primary/20"
          >
            <Plus className="w-3.5 h-3.5" />
            New {activeTab === 'vehicles' ? 'Unit' : 'Personnel'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 animate-pulse opacity-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[8px] font-black text-on-surface-variant tracking-[0.3em] uppercase">Syncing Grid</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'vehicles' ? (
            <motion.div 
              key="fleet"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-outline-variant/5 bg-surface-container/20">
                    <tr>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Unit Reference</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Classification</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Operational Status</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Efficiency</th>
                      <th className="px-5 py-3 text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 text-right">Registry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {fleet.map((vehicle) => (
                      <tr key={vehicle.id} className="group hover:bg-surface-container/20 transition-colors">
                        <td className="px-5 py-3 font-mono font-black text-[11px] text-primary">{vehicle.id}</td>
                        <td className="px-5 py-3 font-black text-[11px] text-on-surface/80">{vehicle.type}</td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                            vehicle.status === 'In Service' ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                           <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden p-0 shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all duration-1000 ${vehicle.health > 80 ? 'bg-secondary' : vehicle.health > 50 ? 'bg-primary' : 'bg-tertiary'}`}
                                  style={{ width: `${vehicle.health}%` }}
                                />
                              </div>
                              <span className="text-[9px] font-black opacity-30">{vehicle.health}%</span>
                           </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button 
                            onClick={() => deleteVehicle(vehicle.id)}
                            className="p-1.5 hover:bg-tertiary/10 text-on-surface-variant/30 hover:text-tertiary rounded-lg transition-all active:scale-90"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="team"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              {team.map((member) => (
                <div key={member.id} className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/10 shadow-sm relative group overflow-hidden hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <UserCircle2 className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-headline font-black text-xs leading-tight group-hover:text-primary transition-colors truncate">{member.firstName} {member.lastName}</h4>
                        <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter truncate">{member.position}</p>
                      </div>
                    </div>
                    <button 
                       onClick={() => deleteTeamMember(member.id)}
                       className="p-1 opacity-0 group-hover:opacity-100 bg-tertiary/5 text-tertiary hover:bg-tertiary/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-outline-variant/5">
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] font-black text-on-surface-variant/30 uppercase tracking-widest">Department</span>
                       <span className="text-[9px] font-black text-on-surface/60">{member.department}</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] font-black text-on-surface-variant/30 uppercase tracking-widest">Assigned Unit</span>
                       <span className={`text-[9px] font-black ${member.vehicleId ? 'text-primary' : 'text-on-surface-variant/20 italic'}`}>
                         {member.vehicleId || 'Unassigned'}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="bg-surface-container-lowest w-full max-w-sm rounded-2xl shadow-2xl relative z-10 overflow-hidden border border-outline-variant/10"
            >
              <form onSubmit={activeTab === 'vehicles' ? handleAddVehicle : handleAddMember} className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5 px-1">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                       {activeTab === 'vehicles' ? <Truck className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    </div>
                    <h3 className="text-base font-headline font-black">
                      {activeTab === 'vehicles' ? 'Add Unit' : 'Add Personnel'}
                    </h3>
                  </div>
                  <button type="button" onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant/40 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {activeTab === 'vehicles' ? (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">Registration ID</label>
                        <input 
                          required
                          value={newVehicle.id}
                          onChange={e => setNewVehicle({...newVehicle, id: e.target.value.toUpperCase()})}
                          placeholder="e.g. BYO-FLT-000"
                          className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:opacity-20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">Unit Classification</label>
                        <select 
                          value={newVehicle.type}
                          onChange={e => setNewVehicle({...newVehicle, type: e.target.value})}
                          className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option>Refuse Truck</option>
                          <option>Compactor</option>
                          <option>Support Van</option>
                          <option>Waste Tanker</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">First Name</label>
                          <input 
                            required
                            value={newMember.firstName}
                            onChange={e => setNewMember({...newMember, firstName: e.target.value})}
                            placeholder="Tendai"
                            className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">Last Name</label>
                          <input 
                            required
                            value={newMember.lastName}
                            onChange={e => setNewMember({...newMember, lastName: e.target.value})}
                            placeholder="Moyo"
                            className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">Functional Position</label>
                        <input 
                          required
                          value={newMember.position}
                          onChange={e => setNewMember({...newMember, position: e.target.value})}
                          placeholder="e.g. Lead Driver"
                          className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 ml-1">Operational Assignee (Truck)</label>
                        <select 
                          value={newMember.vehicleId}
                          onChange={e => setNewMember({...newMember, vehicleId: e.target.value})}
                          className="w-full px-4 py-2.5 bg-surface-container rounded-xl border border-outline-variant/10 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option value="">Unassigned / Global</option>
                          {fleet.map(v => (
                            <option key={v.id} value={v.id}>{v.id} ({v.type})</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full mt-8 py-3 bg-primary text-on-primary font-black rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all text-[11px] uppercase tracking-widest"
                >
                  Verify & Register
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetMaintenance;
