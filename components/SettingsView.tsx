import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Lock, Monitor, Smartphone, Globe, ToggleLeft, ToggleRight, ChevronRight, Check } from 'lucide-react';
import { EditProfileModal, ChangeAvatarModal } from './Modals';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const SettingsView: React.FC = () => {
  // Initialize profile from LocalStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('brandHub_profile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Admin User',
      email: 'admin@brandhub.com',
      role: 'Administrator',
      avatar: ''
    };
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Persist profile changes
  useEffect(() => {
    localStorage.setItem('brandHub_profile', JSON.stringify(profile));
  }, [profile]);

  const handleNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleUpdateProfile = (data: { name: string; email: string; role: string }) => {
    setProfile(prev => ({ ...prev, ...data }));
    handleNotification("Profile updated successfully!");
  };

  const handleUpdateAvatar = (url: string) => {
    setProfile(prev => ({ ...prev, avatar: url }));
    handleNotification("Avatar updated successfully!");
  };

  return (
    <div className="animate-fade-in space-y-8 max-w-4xl relative">
       {/* Notification Toast */}
       {showNotification && (
          <div className="fixed top-4 right-4 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
             <Check size={20} />
             <span className="font-medium">{notificationMsg}</span>
          </div>
       )}

      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <User size={20} className="text-purple-400" />
                <h2 className="font-semibold text-white">Profile</h2>
            </div>
            <div className="p-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl shadow-lg overflow-hidden relative">
                    {profile.avatar ? (
                      <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      "👋"
                    )}
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                    <p className="text-white/50">{profile.email}</p>
                    <div className="text-xs text-purple-300 bg-purple-500/10 inline-block px-2 py-1 rounded border border-purple-500/20 mt-1">{profile.role}</div>
                    <div className="mt-2">
                      <button 
                          onClick={() => setIsAvatarModalOpen(true)}
                          className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                      >
                          Change Avatar
                      </button>
                    </div>
                </div>
                <button 
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                >
                    Edit Profile
                </button>
            </div>
        </section>

        {/* General Preferences */}
        <section className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <Monitor size={20} className="text-blue-400" />
                <h2 className="font-semibold text-white">Preferences</h2>
            </div>
            <div className="divide-y divide-white/5">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5 text-white/70"><Bell size={18} /></div>
                        <div>
                            <div className="font-medium text-white">Notifications</div>
                            <div className="text-sm text-white/40">Receive email updates about domain expiry</div>
                        </div>
                    </div>
                    <button className="text-emerald-400 hover:text-emerald-300"><ToggleRight size={32} /></button>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5 text-white/70"><Globe size={18} /></div>
                        <div>
                            <div className="font-medium text-white">Language</div>
                            <div className="text-sm text-white/40">English (US)</div>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-white/30" />
                </div>
            </div>
        </section>

        {/* Security */}
        <section className="glass-panel rounded-2xl overflow-hidden">
             <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <Shield size={20} className="text-emerald-400" />
                <h2 className="font-semibold text-white">Security</h2>
            </div>
            <div className="divide-y divide-white/5">
                 <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5 text-white/70"><Lock size={18} /></div>
                        <div>
                            <div className="font-medium text-white">Two-Factor Authentication</div>
                            <div className="text-sm text-white/40">Secure your account with 2FA</div>
                        </div>
                    </div>
                     <button className="text-white/30 hover:text-white/50"><ToggleLeft size={32} /></button>
                </div>
                 <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-white/5 text-white/70"><Smartphone size={18} /></div>
                        <div>
                            <div className="font-medium text-white">Active Sessions</div>
                            <div className="text-sm text-white/40">2 devices currently logged in</div>
                        </div>
                    </div>
                     <button className="text-sm text-white/50 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg">Manage</button>
                </div>
            </div>
        </section>

        <div className="flex justify-end pt-4">
            <button className="text-red-400 hover:text-red-300 text-sm font-medium px-4 py-2 hover:bg-red-500/10 rounded-lg transition-colors">
                Log Out
            </button>
        </div>

        <EditProfileModal 
            isOpen={isProfileModalOpen} 
            onClose={() => setIsProfileModalOpen(false)} 
            currentUser={profile}
            onSave={handleUpdateProfile}
        />
        
        <ChangeAvatarModal 
            isOpen={isAvatarModalOpen}
            onClose={() => setIsAvatarModalOpen(false)}
            onSave={handleUpdateAvatar}
        />
      </div>
    </div>
  );
};

export default SettingsView;