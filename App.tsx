import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import BrandDetail from './components/BrandDetail';
import ResourcesView from './components/ResourcesView';
import SettingsView from './components/SettingsView';
import ReportsView from './components/ReportsView';
import { AddBrandModal, CredentialsModal, BrandSelectorModal } from './components/Modals';
import { brandsData as initialBrands } from './data';
import { ViewState, Brand } from './types';
import { Check } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  
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
  
  // Selection States
  const [activeBrandForCreds, setActiveBrandForCreds] = useState<Brand | null>(null);
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null);

  const activeBrand = brands.find(b => b.id === selectedBrandId);

  // Persistence Effect: Save to LocalStorage whenever brands change
  useEffect(() => {
    localStorage.setItem('brandHub_brands', JSON.stringify(brands));
  }, [brands]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
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
                <h1 className="text-3xl font-bold text-white mb-6">All Brands</h1>
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
          />
        ) : <div>Brand not found</div>;
      case 'resources':
        return <ResourcesView brands={brands} />;
      case 'settings':
        return <SettingsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white font-sans selection:bg-purple-500/30">
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
      />
      
      <main className="pl-72">
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
    </div>
  );
};

export default App;