import React from 'react';
import { Brand } from '../types';
import { ArrowLeft, ExternalLink, Key, Server, Globe, Shield, Download, Edit } from 'lucide-react';

interface BrandDetailProps {
  brand: Brand;
  onBack: () => void;
  onShowCredentials: () => void;
  onEdit: () => void;
}

const BrandDetail: React.FC<BrandDetailProps> = ({ brand, onBack, onShowCredentials, onEdit }) => {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-105 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-black/30 overflow-hidden"
              style={{ backgroundColor: brand.color }}
            >
              {brand.logo.startsWith('http') ? (
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
              ) : (
                brand.logo
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{brand.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-white/50">
                <span>{brand.industry}</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <a href={brand.website} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                  {brand.website.replace('https://', '')} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onShowCredentials}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all hover:scale-105 flex items-center gap-2"
          >
            <Key size={18} /> Credentials
          </button>
          <button 
            onClick={onEdit}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all hover:scale-105 shadow-lg shadow-purple-500/20 flex items-center gap-2"
          >
            <Edit size={18} /> Edit Brand
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            <p className="text-white/70 leading-relaxed">{brand.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Hosting Card */}
             {brand.resources.hosting && (
              <div className="glass-panel p-6 rounded-2xl glass-card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Server size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                      <Server size={20} />
                    </div>
                    <h4 className="font-semibold text-white">Hosting</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Provider</span>
                      <span className="text-white font-medium">{brand.resources.hosting.provider}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Plan</span>
                      <span className="text-white font-medium">{brand.resources.hosting.plan}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Expires</span>
                      <span className="text-emerald-400 font-medium">{brand.resources.hosting.expiry || 'Active'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Domain Card */}
            {brand.resources.domain && (
              <div className="glass-panel p-6 rounded-2xl glass-card-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Globe size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                      <Globe size={20} />
                    </div>
                    <h4 className="font-semibold text-white">Domain</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Registrar</span>
                      <span className="text-white font-medium">{brand.resources.domain.registrar}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Currently Managed On</span>
                      <span className="text-white font-medium">{brand.resources.dns?.provider || 'Cloudflare'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Auto Renew</span>
                      <span className="text-white font-medium">{brand.resources.domain.autoRenew ? 'On' : 'Off'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Expires</span>
                      <span className="text-amber-400 font-medium">{brand.resources.domain.expiry}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Download size={20} className="text-purple-400" /> Assets
            </h3>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-left text-sm text-white/80 hover:text-white transition-all flex items-center justify-between group">
                <span>Brand Guidelines.pdf</span>
                <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </button>
              <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-left text-sm text-white/80 hover:text-white transition-all flex items-center justify-between group">
                <span>Logo Pack.zip</span>
                <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </button>
              <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-left text-sm text-white/80 hover:text-white transition-all flex items-center justify-between group">
                <span>Font Family.zip</span>
                <Download size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield size={20} className="text-emerald-400" /> Health
            </h3>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <span className="text-sm text-white/60">SSL Status</span>
              <span className="px-2 py-1 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Uptime (30d)</span>
              <span className="text-sm font-mono text-white">99.98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;