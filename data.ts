import { Brand } from './types';

export const brandsData: Brand[] = [
  {
    id: 'giftalink',
    name: 'Gift a Link',
    color: '#ff4fb1',
    logo: '🎁',
    industry: 'Technology',
    description: 'Digital gifting platform for modern teams.',
    status: 'active',
    website: 'https://giftalink.com',
    resources: {
      hosting: {
        provider: 'Hostinger',
        plan: 'Business Shared',
        loginUrl: 'https://hpanel.hostinger.com',
        username: 'admin@giftalink',
        password: '••••••••',
        expiry: '2024-12-15'
      },
      dns: {
        provider: 'Cloudflare',
        nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
        status: 'active'
      },
      domain: {
        provider: 'GoDaddy',
        registrar: 'GoDaddy',
        expiry: '2024-11-20',
        autoRenew: true
      },
      analytics: {
        provider: 'Google Analytics',
        googleId: 'UA-12345678-1',
        status: 'active'
      }
    }
  },
  {
    id: 'nextech',
    name: 'NexTech',
    color: '#4facfe',
    logo: '🤖',
    industry: 'AI Solutions',
    description: 'Advanced AI solutions for enterprise automation.',
    status: 'active',
    website: 'https://nextech.ai',
    resources: {
      hosting: {
        provider: 'AWS',
        plan: 'EC2 t3.large',
        loginUrl: 'https://aws.amazon.com',
        username: 'admin@nextech',
        password: '••••••••',
        expiry: '2024-10-30'
      },
      domain: {
        provider: 'Namecheap',
        registrar: 'Namecheap',
        expiry: '2024-09-15',
        autoRenew: true
      }
    }
  },
  {
    id: 'bloom',
    name: 'Bloom',
    color: '#9d4edd',
    logo: '🌸',
    industry: 'Wellness',
    description: 'Mindfulness & wellness application.',
    status: 'active',
    website: 'https://bloomapp.com',
    resources: {
      hosting: {
        provider: 'Vercel',
        plan: 'Pro',
        loginUrl: 'https://vercel.com',
        username: 'team@bloom',
        password: '••••••••'
      },
      dns: {
        provider: 'GoDaddy DNS',
        nameservers: ['ns1.domaincontrol.com', 'ns2.domaincontrol.com'],
        status: 'active'
      }
    }
  },
  {
    id: 'fusion',
    name: 'Fusion Agency',
    color: '#ff6b35',
    logo: '🎨',
    industry: 'Design',
    description: 'Creative digital agency portfolio.',
    status: 'warning',
    website: 'https://fusionagency.design',
    resources: {
      hosting: {
        provider: 'SiteGround',
        plan: 'GrowBig',
        loginUrl: 'https://siteground.com',
        username: 'fusion@agency',
        password: '••••••••',
        expiry: '2024-08-25'
      }
    }
  }
];