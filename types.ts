export interface ResourceData {
  provider: string;
  plan?: string;
  loginUrl?: string;
  username?: string;
  password?: string;
  expiry?: string;
  nameservers?: string[];
  status?: string;
  registrar?: string;
  autoRenew?: boolean;
  googleId?: string;
}

export interface BrandResources {
  hosting?: ResourceData;
  dns?: ResourceData;
  domain?: ResourceData;
  analytics?: ResourceData;
}

export interface Brand {
  id: string;
  name: string;
  color: string;
  logo: string;
  industry: string;
  description: string;
  status: 'active' | 'warning' | 'inactive';
  website: string;
  resources: BrandResources;
}

export type ViewState = 'dashboard' | 'brands' | 'resources' | 'settings' | 'brand-detail' | 'reports';