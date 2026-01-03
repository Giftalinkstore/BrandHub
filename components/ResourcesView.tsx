
import React, { useState } from 'react';
import { Brand } from '../types';
import { Server, Globe, Cloud, MoreHorizontal, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { AddResourceModal } from './Modals';

interface ResourcesViewProps {
  brands: Brand[];
  onAddResource: (brandId: string, resourceType: string, data: any) => void;
  onEditResource: (brandId: string, resourceType: string, data: any) => void;
  onDeleteResource: (brandId: string, resourceType: string) => void;
  theme: 'dark' | 'light';
}

const ResourcesView: React.FC<ResourcesViewProps> = ({ brands, onAddResource, onEditResource, onDeleteResource, theme }) => {
  const [filter, setFilter] = useState<'all' | 'hosting' | 'domain' | 'dns'>('all');

  const allResources = brands.flatMap(brand => {
    const list = [];
    if (brand.resources.hosting) {
      list.push({
        id: `${brand.id}-hosting`,
        type: 'hosting',
        brand: brand,
        details: brand.resources.hosting,
        title: 'Hosting'
      });
    }
    if (brand.resources.domain) {
      list.push({
        id: `${brand.id}-domain`,
        type: 'domain',
        brand: brand,
        details: brand.resources.domain,
        title: 'Domain'
      });
    }
    if (brand.resources.dns) {
      list.push({
        id: `${brand.id}-dns`,
        type: 'dns',
        brand: brand,
        details: brand.resources.dns,
        title: 'DNS'
      });
    }
    return list;
  });

  const filteredResources = filter === 'all' 
    ? allResources 
    : allResources.filter(r => r.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'hosting': return <Server size={18} className="text-blue-400" />;
      case 'domain': return <Globe size={18} className="text-purple-400" />;
      case 'dns': return <Cloud size={18} className="text-emerald-400" />;
      default: return <Globe size={18} />;
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="opacity-50 mt-1">Manage infrastructure across all brands.</p>
        </div>
        
        <div className="flex gap-4">
             <div className={`flex p-1 rounded-xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-200 border-slate-300'}`}>
              {['all', 'hosting', 'domain', 'dns'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    filter === f 
                        ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm') 
                        : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <button 
                onClick={() => onAddResource('', '', null)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium shadow-lg shadow-purple-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
                <Plus size={18} />
                <span className="hidden md:inline">Add Resource</span>
            </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredResources.map((resource, idx) => (
          <div 
            key={resource.id} 
            className="glass-panel p-5 rounded-xl flex items-center gap-6 group hover:bg-gray-500/10 transition-colors animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center shrink-0">
              {getIcon(resource.type)}
            </div>

            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div>
                <div className="text-sm opacity-40 mb-1">{resource.type.toUpperCase()}</div>
                <div className="font-semibold truncate">{resource.details.provider}</div>
              </div>

              <div>
                <div className="text-sm opacity-40 mb-1">Brand</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: resource.brand.color }}></span>
                  <span className="truncate">{resource.brand.name}</span>
                </div>
              </div>

              <div>
                 {/* Specific details based on type */}
                 {resource.type === 'hosting' && (
                   <>
                    <div className="text-sm opacity-40 mb-1">Plan</div>
                    <div className="opacity-80 text-sm truncate">{resource.details.plan}</div>
                   </>
                 )}
                 {resource.type === 'domain' && (
                   <>
                    <div className="text-sm opacity-40 mb-1">Expiry</div>
                    <div className="text-amber-400 text-sm font-mono">{resource.details.expiry}</div>
                   </>
                 )}
                 {resource.type === 'dns' && (
                   <>
                    <div className="text-sm opacity-40 mb-1">Status</div>
                    <div className="text-emerald-400 text-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                    </div>
                   </>
                 )}
              </div>

              <div className="flex justify-end gap-2">
                 <button 
                    onClick={() => onEditResource(resource.brand.id, resource.type, resource.details)}
                    className="p-2 rounded-lg bg-gray-500/10 hover:bg-gray-500/20 opacity-50 hover:opacity-100 transition-colors"
                 >
                    <Edit size={18} />
                 </button>
                  <button 
                    onClick={() => onDeleteResource(resource.brand.id, resource.type)}
                    className="p-2 rounded-lg bg-gray-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-500 transition-colors"
                 >
                    <Trash2 size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
            <div className="text-center py-20 opacity-30 italic glass-panel rounded-2xl">
                No resources found for this filter.
            </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesView;
