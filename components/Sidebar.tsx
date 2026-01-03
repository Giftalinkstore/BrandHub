import React from 'react';
import { LayoutDashboard, Briefcase, Database, Settings, PlusCircle, Key, FileText, Shield, Clock, ChevronRight } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onAddBrand: () => void;
  onQuickCredentials: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onAddBrand, onQuickCredentials }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'brands', icon: Briefcase, label: 'All Brands' },
    { id: 'resources', icon: Database, label: 'Resources' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-72 h-screen fixed left-0 top-0 flex flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl z-50">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
          🌐
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          Domain Manager
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2 space-y-8 overflow-y-auto">
        <section>
          <div className="px-4 mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
            Menu
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currentView === item.id
                    ? 'bg-white/10 text-white shadow-lg shadow-black/10'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    currentView === item.id ? 'scale-110 text-purple-400' : 'group-hover:scale-110'
                  }`}
                />
                <span className="font-medium">{item.label}</span>
                {currentView === item.id && (
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                )}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="px-4 mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
            Quick Actions
          </div>
          <div className="space-y-1">
            <button 
              onClick={onAddBrand}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <PlusCircle size={20} className="group-hover:text-green-400 transition-colors" />
              <span className="font-medium">Add Brand</span>
            </button>
            <button 
              onClick={onQuickCredentials}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300 group"
            >
              <Key size={20} className="group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium">Credentials</span>
            </button>
            <button 
              onClick={() => onNavigate('reports')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currentView === 'reports'
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
            >
              <FileText size={20} className={`group-hover:text-blue-400 transition-colors ${currentView === 'reports' ? 'text-blue-400' : ''}`} />
              <span className="font-medium">Reports</span>
            </button>
          </div>
        </section>
      </div>

      {/* Footer Stats */}
      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-white/50">
            <Shield size={14} className="text-emerald-500" />
            <span>Security: High</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/50">
            <Clock size={14} className="text-blue-500" />
            <span>Last Backup: 2h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;