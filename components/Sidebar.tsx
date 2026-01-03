
import React from 'react';
import { LayoutDashboard, Briefcase, Database, Settings, PlusCircle, Key, FileText, Shield, Clock, ChevronRight, Sun, Moon } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onAddBrand: () => void;
  onQuickCredentials: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeBrandColor?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onAddBrand, onQuickCredentials, theme, toggleTheme, activeBrandColor }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'brands', icon: Briefcase, label: 'All Brands' },
    { id: 'resources', icon: Database, label: 'Resources' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Dynamic style for active items
  const activeStyle = activeBrandColor 
    ? { backgroundColor: `${activeBrandColor}20`, color: activeBrandColor }
    : {}; // Fallback managed by classes

  return (
    <div className={`w-72 h-screen fixed left-0 top-0 flex flex-col border-r backdrop-blur-xl z-50 transition-colors duration-300 ${
        theme === 'dark' 
        ? 'border-white/10 bg-black/20' 
        : 'border-slate-200 bg-white/60'
    }`}>
      {/* Logo Area */}
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
            🌐
            </div>
            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-white to-white/70' : 'from-slate-800 to-slate-500'}`}>
            Domain Manager
            </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2 space-y-8 overflow-y-auto">
        <section>
          <div className="px-4 mb-3 text-xs font-semibold opacity-40 uppercase tracking-wider">
            Menu
          </div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                style={isActive ? activeStyle : {}}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? (activeBrandColor ? '' : (theme === 'dark' ? 'bg-white/10 text-white shadow-lg shadow-black/10' : 'bg-slate-200 text-slate-900'))
                    : 'opacity-60 hover:bg-gray-500/10 hover:opacity-100'
                }`}
              >
                <item.icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    isActive ? (activeBrandColor ? '' : 'text-purple-400') : 'group-hover:scale-110'
                  }`}
                  style={isActive && activeBrandColor ? { color: activeBrandColor } : {}}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                )}
              </button>
            )})}
          </div>
        </section>

        <section>
          <div className="px-4 mb-3 text-xs font-semibold opacity-40 uppercase tracking-wider">
            Quick Actions
          </div>
          <div className="space-y-1">
            <button 
              onClick={onAddBrand}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl opacity-60 hover:bg-gray-500/10 hover:opacity-100 transition-all duration-300 group"
            >
              <PlusCircle size={20} className="group-hover:text-green-400 transition-colors" />
              <span className="font-medium">Add Brand</span>
            </button>
            <button 
              onClick={onQuickCredentials}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl opacity-60 hover:bg-gray-500/10 hover:opacity-100 transition-all duration-300 group"
            >
              <Key size={20} className="group-hover:text-yellow-400 transition-colors" />
              <span className="font-medium">Credentials</span>
            </button>
            <button 
              onClick={() => onNavigate('reports')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  currentView === 'reports'
                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-900')
                    : 'opacity-60 hover:bg-gray-500/10 hover:opacity-100'
                }`}
            >
              <FileText size={20} className={`group-hover:text-blue-400 transition-colors ${currentView === 'reports' ? 'text-blue-400' : ''}`} />
              <span className="font-medium">Reports</span>
            </button>
          </div>
        </section>
      </div>

      {/* Footer Stats & Theme Toggle */}
      <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/50'}`}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs opacity-50">
            <Shield size={14} className="text-emerald-500" />
            <span>Security: High</span>
          </div>
          <div className="flex items-center gap-3 text-xs opacity-50">
            <Clock size={14} className="text-blue-500" />
            <span>Last Backup: 2h ago</span>
          </div>
          
          <button 
            onClick={toggleTheme}
            className={`mt-2 w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
              theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
