"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface HashPackContextType {
  accountId: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  pairingString: string | null;
  isHashPackInstalled: boolean;
  showDevModeDialog: boolean;
  setShowDevModeDialog: (show: boolean) => void;
  testAccount: string | null;
  confirmTestAccount: () => void;
}

const HashPackContext = createContext<HashPackContextType>({
  accountId: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  pairingString: null,
  isHashPackInstalled: false,
  showDevModeDialog: false,
  setShowDevModeDialog: () => {},
  testAccount: null,
  confirmTestAccount: () => {},
});

export const useHashPack = () => useContext(HashPackContext);

export function HashPackProvider({ children }: { children: ReactNode }) {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [pairingString, setPairingString] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isHashPackInstalled, setIsHashPackInstalled] = useState(false);
  const [showDevModeDialog, setShowDevModeDialog] = useState(false);
  const [testAccount, setTestAccount] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAccountId = localStorage.getItem("hashpack_account_id");
    if (savedAccountId) {
      setAccountId(savedAccountId);
      setIsConnected(true);
    }

    // Check for HashPack extension availability
    if (typeof window !== "undefined") {
      // Give extension time to load
      const checkExtension = () => {
        const hasExtension = !!(window as any).hashpack;
        setIsHashPackInstalled(hasExtension);
        console.log("HashPack extension detected:", hasExtension);
      };

      setTimeout(checkExtension, 500);
      setTimeout(checkExtension, 1500);
    }
  }, []);

  const connectWallet = async () => {
    try {
      console.log("Attempting to connect to HashPack...");

      // DEVELOPMENT MODE: Use test account
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        console.warn("🚧 DEVELOPMENT MODE: Using test account");
        console.warn(
          "📝 For production, implement proper HashConnect integration"
        );

        // Generate test account
        const generatedTestAccount =
          "0.0." + Math.floor(Math.random() * 900000 + 100000);

        setTestAccount(generatedTestAccount);
        setShowDevModeDialog(true);

        return;
      }

      // PRODUCTION MODE: Actual HashPack integration
      if (typeof window === "undefined") {
        throw new Error("Window object not available");
      }

      const hashpack = (window as any).hashpack;

      if (!hashpack) {
        throw new Error(
          "HashPack extension not found. Please install from https://www.hashpack.app/"
        );
      }

      // Request pairing
      const pairingData = await hashpack.requestPairing();

      if (pairingData?.accountIds && pairingData.accountIds.length > 0) {
        const account = pairingData.accountIds[0];
        setAccountId(account);
        setIsConnected(true);
        localStorage.setItem("hashpack_account_id", account);
        console.log("✅ Connected to HashPack:", account);
      }
    } catch (error: any) {
      console.error("❌ Failed to connect HashPack:", error);
    }
  };

  const disconnectWallet = () => {
    setAccountId(null);
    setIsConnected(false);
    setPairingString(null);
    localStorage.removeItem("hashpack_account_id");
    console.log("🔌 Wallet disconnected");
  };

  const confirmTestAccount = () => {
    if (testAccount) {
      setAccountId(testAccount);
      setIsConnected(true);
      localStorage.setItem("hashpack_account_id", testAccount);
      console.log("✅ Connected to test account:", testAccount);
    }
    setShowDevModeDialog(false);
  };

  return (
    <HashPackContext.Provider
      value={{
        accountId,
        isConnected,
        connectWallet,
        disconnectWallet,
        pairingString,
        isHashPackInstalled,
        showDevModeDialog,
        setShowDevModeDialog,
        testAccount,
        confirmTestAccount,
      }}
    >
      {children}
    </HashPackContext.Provider>
  );
}
