
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import BrandDetail from './components/BrandDetail';
import ResourcesView from './components/ResourcesView';
import SettingsView from './components/SettingsView';
import ReportsView from './components/ReportsView';
import { AddBrandModal, CredentialsModal, BrandSelectorModal, AddResourceModal } from './components/Modals';
import { brandsData as initialBrands } from './data';
import { ViewState, Brand } from './types';
import { Check, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('brandHub_theme') as 'dark' | 'light') || 'dark';
  });
  
  // Initialize brands from LocalStorage if available, otherwise use default data
  const [brands, setBrands] = useState<Brand[]>(() => {
    const savedBrands = localStorage.getItem('brandHub_brands');
    return savedBrands ? JSON.parse(savedBrands) : initialBrands;
  });

  const [notification, setNotification] = useState<string | null>(null);
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCredModalOpen, setIsCredModalOpen] = useState(false);
  const [isBrandSelectorOpen, setIsBrandSelectorOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  
  // Selection States
  const [activeBrandForCreds, setActiveBrandForCreds] = useState<Brand | null>(null);
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null);
  
  // Resource Editing State
  const [editingResource, setEditingResource] = useState<{
    brandId: string;
    type: string;
    data: any;
  } | null>(null);

  const activeBrand = brands.find(b => b.id === selectedBrandId);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('brandHub_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('brandHub_theme', theme);
  }, [theme]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'brand-detail') {
      setSelectedBrandId(null);
    }
  };

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    setCurrentView('brand-detail');
  };

  const handleOpenCredentials = (brand: Brand) => {
    setActiveBrandForCreds(brand);
    setIsCredModalOpen(true);
  };
  
  const handleEditBrand = (brand: Brand) => {
    setBrandToEdit(brand);
    setIsAddModalOpen(true);
  };

  const handleAddBrand = () => {
    setBrandToEdit(null); // Ensure clean state for adding
    setIsAddModalOpen(true);
  };

  const handleQuickCredentials = () => {
    setIsBrandSelectorOpen(true);
  };

  const handleBrandSelectionForCreds = (brand: Brand) => {
    setIsBrandSelectorOpen(false);
    handleOpenCredentials(brand);
  };

  const handleSaveBrand = (brandData: any) => {
    if (brandToEdit) {
      // Edit Mode
      setBrands(prev => prev.map(b => b.id === brandToEdit.id ? { ...b, ...brandData } : b));
      showNotification("Brand updated successfully!");
    } else {
      // Add Mode
      const newBrand: Brand = {
        id: brandData.name.toLowerCase().replace(/\s+/g, '-'),
        status: 'active',
        resources: {}, // Initialize empty resources for new brand
        ...brandData
      };
      setBrands(prev => [...prev, newBrand]);
      showNotification("New brand created successfully!");
    }
    setIsAddModalOpen(false);
  };

  // --- Resource Management (Add, Edit, Delete) ---

  const handleOpenAddResource = () => {
    setEditingResource(null);
    setIsResourceModalOpen(true);
  };

  const handleOpenEditResource = (brandId: string, resourceType: string, data: any) => {
    setEditingResource({ brandId, type: resourceType, data });
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = (brandId: string, resourceType: string, data: any) => {
    setBrands(prev => prev.map(b => {
        if (b.id === brandId) {
            return {
                ...b,
                resources: {
                    ...b.resources,
                    [resourceType]: data
                }
            };
        }
        return b;
    }));
    
    if (editingResource) {
      showNotification(`${resourceType} details updated!`);
    } else {
      showNotification(`${resourceType} added to brand!`);
    }
    setEditingResource(null);
    setIsResourceModalOpen(false);
  };

  const handleDeleteResource = (brandId: string, resourceType: string) => {
    if (window.confirm(`Are you sure you want to delete the ${resourceType} resource? This cannot be undone.`)) {
      setBrands(prev => prev.map(b => {
        if (b.id === brandId) {
          const newResources = { ...b.resources };
          // @ts-ignore
          delete newResources[resourceType];
          return { ...b, resources: newResources };
        }
        return b;
      }));
      showNotification(`${resourceType} deleted.`);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardHome 
            brands={brands} 
            onSelectBrand={handleSelectBrand}
            onOpenCredentials={handleOpenCredentials}
            onViewAll={() => handleNavigate('brands')}
          />
        );
      case 'brands':
        return (
             <div className="animate-fade-in">
                <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>All Brands</h1>
                <DashboardHome 
                    brands={brands} 
                    onSelectBrand={handleSelectBrand}
                    onOpenCredentials={handleOpenCredentials}
                />
            </div>
        );
      case 'brand-detail':
        return activeBrand ? (
          <BrandDetail 
            brand={activeBrand} 
            onBack={() => handleNavigate('dashboard')}
            onShowCredentials={() => handleOpenCredentials(activeBrand)}
            onEdit={() => handleEditBrand(activeBrand)}
            onEditResource={handleOpenEditResource}
            onDeleteResource={handleDeleteResource}
            theme={theme}
          />
        ) : <div>Brand not found</div>;
      case 'resources':
        return (
          <ResourcesView 
            brands={brands} 
            onAddResource={handleOpenAddResource} 
            onEditResource={handleOpenEditResource}
            onDeleteResource={handleDeleteResource}
            theme={theme}
          />
        );
      case 'settings':
        return <SettingsView theme={theme} />;
      case 'reports':
        return <ReportsView theme={theme} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'dark-mode bg-slate-950 text-white' : 'light-mode bg-slate-50 text-slate-900'}`}
      style={{ 
        '--brand-color': activeBrand?.color || '#6366f1',
        backgroundImage: theme === 'dark' 
          ? 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))'
          : 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(99,102,241,0.15), rgba(255,255,255,0))'
      } as React.CSSProperties}
    >
       {/* Global Notification */}
       {notification && (
          <div className="fixed top-4 right-4 z-[200] bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
             <Check size={20} />
             <span className="font-medium">{notification}</span>
          </div>
       )}

      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onAddBrand={handleAddBrand}
        onQuickCredentials={handleQuickCredentials}
        theme={theme}
        toggleTheme={toggleTheme}
        activeBrandColor={activeBrand?.color}
      />
      
      <main className="pl-72 transition-colors duration-300">
        <div className="max-w-7xl mx-auto p-8 md:p-12 min-h-screen">
          {renderContent()}
        </div>
      </main>

      {/* Modals */}
      <AddBrandModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        brandToEdit={brandToEdit}
        onSave={handleSaveBrand}
      />
      
      <CredentialsModal 
        isOpen={isCredModalOpen} 
        onClose={() => setIsCredModalOpen(false)} 
        brand={activeBrandForCreds}
      />

      <BrandSelectorModal 
        isOpen={isBrandSelectorOpen}
        onClose={() => setIsBrandSelectorOpen(false)}
        onSelect={handleBrandSelectionForCreds}
        brands={brands}
      />

      <AddResourceModal 
        isOpen={isResourceModalOpen}
        onClose={() => {
          setIsResourceModalOpen(false);
          setEditingResource(null);
        }}
        brands={brands}
        onSave={handleSaveResource}
        initialData={editingResource}
      />
    </div>
  );
};

export default App;
