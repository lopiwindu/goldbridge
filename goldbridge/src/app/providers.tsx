'use client';

import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { base } from 'wagmi/chains';
import { ONCHAINKIT_API_KEY, ONCHAINKIT_PROJECT_ID } from './config/onchainkit';

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'GoldBridge RWA Platform',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5_000,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={ONCHAINKIT_API_KEY}
          projectId={ONCHAINKIT_PROJECT_ID}
          chain={base}
          config={{
            appearance: {
              name: 'GoldBridge',
              logo: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=100&h=100&fit=crop',
              mode: 'light',
              theme: 'default',
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
