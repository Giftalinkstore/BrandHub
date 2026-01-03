import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ChevronRight } from 'lucide-react';
import { Brand } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg glass-panel rounded-2xl shadow-2xl animate-fade-in overflow-hidden border border-white/20">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export const AddBrandModal: React.FC<{ isOpen: boolean; onClose: () => void; brandToEdit?: Brand | null; onSave: (brandData: any) => void }> = ({ isOpen, onClose, brandToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    industry: 'Technology',
    website: '',
    color: '#6366f1',
    logo: '',
    description: ''
  });

  useEffect(() => {
    if (isOpen && brandToEdit) {
      setFormData({
        name: brandToEdit.name,
        industry: brandToEdit.industry,
        website: brandToEdit.website,
        color: brandToEdit.color,
        logo: brandToEdit.logo,
        description: brandToEdit.description
      });
    } else if (isOpen && !brandToEdit) {
      setFormData({
        name: '',
        industry: 'Technology',
        website: '',
        color: '#6366f1',
        logo: '',
        description: ''
      });
    }
  }, [isOpen, brandToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={brandToEdit ? "Edit Brand" : "Add New Brand"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase">Brand Name</label>
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              required
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
              placeholder="Acme Inc." 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase">Industry</label>
            <select 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors appearance-none"
            >
              <option>Technology</option>
              <option>Retail</option>
              <option>SaaS</option>
              <option>Agency</option>
              <option>Wellness</option>
              <option>AI Solutions</option>
              <option>Design</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Website URL</label>
          <input 
            name="website"
            value={formData.website}
            onChange={handleChange}
            type="url" 
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
            placeholder="https://" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase">Primary Color</label>
            <div className="flex items-center gap-2">
              <input 
                name="color"
                value={formData.color}
                onChange={handleChange}
                type="color" 
                className="h-12 w-16 bg-transparent rounded cursor-pointer" 
              />
              <div className="text-xs text-white/40">Pick brand color</div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase">Logo</label>
             <input 
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              type="text" 
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
              placeholder="Emoji (⚡) or Image URL (https://...)" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3} 
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
            placeholder="Brief description..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform">
            {brandToEdit ? 'Save Changes' : 'Create Brand'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const CredentialsModal: React.FC<{ isOpen: boolean; onClose: () => void; brand: Brand | null }> = ({ isOpen, onClose, brand }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!brand) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${brand.name} Credentials`}>
      <div className="space-y-6">
        {brand.resources.hosting && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Hosting ({brand.resources.hosting.provider})</h3>
            
            <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-4">
              <div className="flex items-center justify-between group">
                <div>
                  <div className="text-xs text-white/40 mb-1">Username</div>
                  <div className="font-mono text-sm text-purple-300">{brand.resources.hosting.username}</div>
                </div>
                <button 
                  onClick={() => copyToClipboard(brand.resources.hosting?.username || '', 'user')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  {copied === 'user' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="flex items-center justify-between group">
                <div>
                  <div className="text-xs text-white/40 mb-1">Password</div>
                  <div className="font-mono text-sm text-purple-300 tracking-widest">{brand.resources.hosting.password}</div>
                </div>
                <button 
                  onClick={() => copyToClipboard(brand.resources.hosting?.password || '', 'pass')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                   {copied === 'pass' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

               <div className="flex items-center justify-between group">
                <div>
                  <div className="text-xs text-white/40 mb-1">Login URL</div>
                  <div className="font-mono text-sm text-blue-300 truncate max-w-[200px]">{brand.resources.hosting.loginUrl}</div>
                </div>
                <button 
                   onClick={() => copyToClipboard(brand.resources.hosting?.loginUrl || '', 'url')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                   {copied === 'url' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {!brand.resources.hosting && (
          <div className="text-center py-8 text-white/30 italic">
            No credentials stored for this brand.
          </div>
        )}
      </div>
    </Modal>
  );
};

export const EditProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; currentUser: any; onSave: (data: any) => void }> = ({ isOpen, onClose, currentUser, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role
      });
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Full Name</label>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" 
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Email Address</label>
          <input 
             name="email"
             value={formData.email}
             onChange={handleChange}
             type="email" 
             className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Role</label>
          <select 
             name="role"
             value={formData.role}
             onChange={handleChange}
             className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors appearance-none"
          >
            <option>Administrator</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        <div className="pt-4">
          <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform">
            Save Profile
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const ChangeAvatarModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (url: string) => void }> = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(url);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Avatar">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-white/60 uppercase">Avatar URL</label>
          <input 
            type="url" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
            placeholder="https://..." 
          />
        </div>
        
        <div className="pt-4">
          <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform">
            Update Avatar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export const BrandSelectorModal: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (brand: Brand) => void; brands: Brand[] }> = ({ isOpen, onClose, onSelect, brands }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Brand">
       <div className="grid gap-3">
          {brands.map(brand => (
             <button
               key={brand.id}
               onClick={() => onSelect(brand)}
               className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group text-left"
             >
               <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-lg overflow-hidden" style={{ backgroundColor: brand.color }}>
                 {brand.logo.startsWith('http') ? (
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                 ) : (
                    brand.logo
                 )}
               </div>
               <div className="flex-1">
                 <div className="font-medium text-white">{brand.name}</div>
                 <div className="text-xs text-white/50">{brand.industry}</div>
               </div>
               <ChevronRight size={18} className="text-white/30 group-hover:text-white transition-colors" />
             </button>
          ))}
       </div>
    </Modal>
  );
};