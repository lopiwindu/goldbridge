"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashPackProvider } from "@/contexts/HashPackContext";
import { DevModeDialog } from "@/components/DevModeDialog";

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
    <QueryClientProvider client={queryClient}>
      <HashPackProvider>
        <DevModeDialog />
        {children}
      </HashPackProvider>
    </QueryClientProvider>
  );
}
