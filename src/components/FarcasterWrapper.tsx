"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function FarcasterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initFarcaster = async () => {
      try {
        // Wait for the SDK to be ready
        await sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
        // Still render children even if SDK fails to initialize
        setIsReady(true);
      }
    };

    initFarcaster();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg mx-auto mb-4 animate-pulse flex items-center justify-center">
            <span className="text-white font-bold text-2xl">GB</span>
          </div>
          <p className="text-gray-600">Loading GoldBridge...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
