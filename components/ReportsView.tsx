import React from 'react';
import { BarChart, PieChart, Activity, TrendingUp, Download, Calendar, Shield, Globe, Server } from 'lucide-react';

interface ReportsViewProps {
  theme: 'dark' | 'light';
}

const ReportsView: React.FC<ReportsViewProps> = ({ theme }) => {
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-white/50' : 'text-slate-500';
  const textMuted = theme === 'dark' ? 'text-white/60' : 'text-slate-600';
  const textSubtle = theme === 'dark' ? 'text-white/40' : 'text-slate-400';
  const textVerySubtle = theme === 'dark' ? 'text-white/30' : 'text-slate-300';
  const btnClass = theme === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
  const chartBarBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-200';

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>System Reports</h1>
          <p className={`${textSecondary} mt-1`}>Analytics and performance metrics for your ecosystem.</p>
        </div>
        <button className={`px-4 py-2 border rounded-xl flex items-center gap-2 transition-colors ${btnClass}`}>
          <Calendar size={18} />
          <span>Last 30 Days</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <div className={`flex items-center gap-3 mb-2 ${textMuted}`}>
            <Activity size={20} className="text-blue-400" />
            <span className="font-medium">Uptime</span>
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>99.98%</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +0.02% from last month
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
           <div className={`flex items-center gap-3 mb-2 ${textMuted}`}>
            <Shield size={20} className="text-emerald-400" />
            <span className="font-medium">SSL Valid</span>
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>100%</div>
           <div className={`text-xs ${textSubtle} mt-2`}>All certificates active</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
           <div className={`flex items-center gap-3 mb-2 ${textMuted}`}>
            <Globe size={20} className="text-purple-400" />
            <span className="font-medium">Domains</span>
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>12</div>
           <div className="text-xs text-amber-400 mt-2">1 expiring soon</div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
           <div className={`flex items-center gap-3 mb-2 ${textMuted}`}>
            <Server size={20} className="text-pink-400" />
            <span className="font-medium">Hosting Cost</span>
          </div>
          <div className={`text-3xl font-bold ${textPrimary}`}>$245.00</div>
           <div className={`text-xs ${textSubtle} mt-2`}>Monthly estimate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
            <BarChart size={20} className={textSubtle} /> Traffic Overview
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className={`w-full ${chartBarBg} rounded-t-lg hover:bg-purple-500/50 transition-colors relative group`} style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                   {h * 100} hits
                 </div>
              </div>
            ))}
          </div>
          <div className={`flex justify-between mt-4 text-xs ${textVerySubtle}`}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className={`text-lg font-semibold ${textPrimary} mb-6 flex items-center gap-2`}>
             <PieChart size={20} className={textSubtle} /> Resource Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-white/70' : 'text-slate-600'}>Hosting (AWS)</span>
                <span className={textPrimary}>45%</span>
              </div>
              <div className={`h-2 ${chartBarBg} rounded-full overflow-hidden`}>
                <div className="h-full bg-blue-500 w-[45%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-white/70' : 'text-slate-600'}>Domains (GoDaddy)</span>
                <span className={textPrimary}>30%</span>
              </div>
              <div className={`h-2 ${chartBarBg} rounded-full overflow-hidden`}>
                <div className="h-full bg-purple-500 w-[30%]"></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={theme === 'dark' ? 'text-white/70' : 'text-slate-600'}>DNS (Cloudflare)</span>
                <span className={textPrimary}>25%</span>
              </div>
              <div className={`h-2 ${chartBarBg} rounded-full overflow-hidden`}>
                <div className="h-full bg-emerald-500 w-[25%]"></div>
              </div>
            </div>
          </div>
          
           <button className={`w-full mt-8 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${btnClass}`}>
            <Download size={16} /> Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;