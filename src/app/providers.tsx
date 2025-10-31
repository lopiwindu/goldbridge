"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashPackProvider, useHashPack } from "@/contexts/HashPackContext";
import { DevModeDialog } from "@/components/DevModeDialog";
import { WalletNotFoundDialog } from "@/components/WalletNotFoundDialog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5_000,
    },
  },
});

function DialogManager() {
  const {
    showWalletNotFoundDialog,
    setShowWalletNotFoundDialog,
    useDummyWallet,
  } = useHashPack();

  return (
    <>
      <DevModeDialog />
      <WalletNotFoundDialog
        isOpen={showWalletNotFoundDialog}
        onClose={() => setShowWalletNotFoundDialog(false)}
        onUseDummy={useDummyWallet}
      />
    </>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HashPackProvider>
        <DialogManager />
        {children}
      </HashPackProvider>
    </QueryClientProvider>
  );
}
