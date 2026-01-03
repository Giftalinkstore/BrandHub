import React from 'react';
import { Brand } from '../types';
import { ExternalLink, Key, Server, Globe, ArrowRight } from 'lucide-react';

interface DashboardHomeProps {
  brands: Brand[];
  onSelectBrand: (brandId: string) => void;
  onOpenCredentials: (brand: Brand) => void;
  onViewAll?: () => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ brands, onSelectBrand, onOpenCredentials, onViewAll }) => {
  const totalDomains = brands.reduce((acc, brand) => acc + (brand.website ? 1 : 0), 0);
  const totalResources = brands.reduce((acc, brand) => 
    acc + (brand.resources.hosting ? 1 : 0) + (brand.resources.dns ? 1 : 0) + (brand.resources.domain ? 1 : 0), 0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
            Overview
          </h1>
          <p className="text-white/50 mt-1">Welcome back to your domain command center.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-white/60">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Globe size={20} />
              </div>
              <span className="font-medium">Total Brands</span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{brands.length}</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-white/60">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <Server size={20} />
              </div>
              <span className="font-medium">Managed Resources</span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{totalResources}</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2 text-white/60">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Globe size={20} />
              </div>
              <span className="font-medium">Active Domains</span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{totalDomains}</div>
          </div>
        </div>
      </div>

      {/* Main Apps Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white/90">Your Brands</h2>
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand(brand.id)}
              className={`glass-panel p-6 rounded-2xl cursor-pointer glass-card-hover group relative overflow-hidden animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110 duration-500 overflow-hidden"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.logo.startsWith('http') ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    brand.logo
                  )}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 ${
                  brand.status === 'active' ? 'text-emerald-400 border-emerald-500/20' : 'text-amber-400 border-amber-500/20'
                }`}>
                  {brand.status}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{brand.name}</h3>
              <p className="text-sm text-white/50 mb-4 line-clamp-2 min-h-[40px]">{brand.description}</p>
              
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                <button 
                  onClick={(e) => { e.stopPropagation(); window.open(brand.website, '_blank'); }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-105"
                  title="Visit Website"
                >
                  <ExternalLink size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onOpenCredentials(brand); }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-105"
                  title="View Credentials"
                >
                  <Key size={16} />
                </button>
                <div className="ml-auto text-xs font-medium text-white/30 group-hover:text-white/50 transition-colors uppercase tracking-wider">
                  {brand.industry}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;