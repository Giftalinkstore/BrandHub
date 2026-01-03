import React, { useState } from 'react';
import { Brand } from '../types';
import { Server, Globe, Cloud, MoreHorizontal, ExternalLink } from 'lucide-react';

interface ResourcesViewProps {
  brands: Brand[];
}

const ResourcesView: React.FC<ResourcesViewProps> = ({ brands }) => {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Resources</h1>
          <p className="text-white/50 mt-1">Manage infrastructure across all brands.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
          {['all', 'hosting', 'domain', 'dns'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filter === f ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredResources.map((resource, idx) => (
          <div 
            key={resource.id} 
            className="glass-panel p-5 rounded-xl flex items-center gap-6 group hover:bg-white/10 transition-colors animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {getIcon(resource.type)}
            </div>

            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div>
                <div className="text-sm text-white/40 mb-1">{resource.type.toUpperCase()}</div>
                <div className="font-semibold text-white truncate">{resource.details.provider}</div>
              </div>

              <div>
                <div className="text-sm text-white/40 mb-1">Brand</div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: resource.brand.color }}></span>
                  <span className="text-white truncate">{resource.brand.name}</span>
                </div>
              </div>

              <div>
                 {/* Specific details based on type */}
                 {resource.type === 'hosting' && (
                   <>
                    <div className="text-sm text-white/40 mb-1">Plan</div>
                    <div className="text-white/80 text-sm truncate">{resource.details.plan}</div>
                   </>
                 )}
                 {resource.type === 'domain' && (
                   <>
                    <div className="text-sm text-white/40 mb-1">Expiry</div>
                    <div className="text-amber-400 text-sm font-mono">{resource.details.expiry}</div>
                   </>
                 )}
                 {resource.type === 'dns' && (
                   <>
                    <div className="text-sm text-white/40 mb-1">Status</div>
                    <div className="text-emerald-400 text-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Active
                    </div>
                   </>
                 )}
              </div>

              <div className="flex justify-end gap-2">
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                 </button>
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {filteredResources.length === 0 && (
            <div className="text-center py-20 text-white/30 italic glass-panel rounded-2xl">
                No resources found for this filter.
            </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesView;