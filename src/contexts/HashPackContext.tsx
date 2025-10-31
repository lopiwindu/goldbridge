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
  connectionMethod: "hashpack" | "test" | null;
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
  connectionMethod: null,
});

export const useHashPack = () => useContext(HashPackContext);

export function HashPackProvider({ children }: { children: ReactNode }) {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [pairingString, setPairingString] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isHashPackInstalled, setIsHashPackInstalled] = useState(false);
  const [showDevModeDialog, setShowDevModeDialog] = useState(false);
  const [testAccount, setTestAccount] = useState<string | null>(null);
  const [connectionMethod, setConnectionMethod] = useState<
    "hashpack" | "test" | null
  >(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAccountId = localStorage.getItem("hashpack_account_id");
    const savedMethod = localStorage.getItem("connection_method") as
      | "hashpack"
      | "test"
      | null;

    if (savedAccountId && savedMethod) {
      setAccountId(savedAccountId);
      setIsConnected(true);
      setConnectionMethod(savedMethod);
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
      setTimeout(checkExtension, 3000); // Extra check for slower connections
    }
  }, []);

  const connectWallet = async () => {
    try {
      console.log("Attempting to connect wallet...");

      // DEVELOPMENT MODE: Use test account
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        console.warn("🚧 DEVELOPMENT MODE: Using test account");
        console.warn(
          "📝 For production, deploy to HTTPS and install HashPack extension"
        );

        // Generate test account
        const generatedTestAccount =
          "0.0." + Math.floor(Math.random() * 900000 + 100000);

        setTestAccount(generatedTestAccount);
        setShowDevModeDialog(true);
        return;
      }

      // PRODUCTION MODE: HashPack extension
      if (typeof window !== "undefined") {
        const hashpack = (window as any).hashpack;

        if (!hashpack) {
          // Extension not found - show helpful message
          alert(
            "HashPack wallet extension not detected.\n\n" +
              "Please install HashPack from:\n" +
              "https://www.hashpack.app/\n\n" +
              "Or use HashPack mobile app to scan QR code (coming soon)"
          );
          return;
        }

        console.log("Using HashPack extension...");

        // Request pairing
        const pairingData = await hashpack.requestPairing();

        if (pairingData?.accountIds && pairingData.accountIds.length > 0) {
          const account = pairingData.accountIds[0];
          setAccountId(account);
          setIsConnected(true);
          setConnectionMethod("hashpack");
          localStorage.setItem("hashpack_account_id", account);
          localStorage.setItem("connection_method", "hashpack");
          console.log("✅ Connected via HashPack extension:", account);
          return;
        }
      }
    } catch (error: any) {
      console.error("❌ Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    setAccountId(null);
    setIsConnected(false);
    setPairingString(null);
    setConnectionMethod(null);
    localStorage.removeItem("hashpack_account_id");
    localStorage.removeItem("connection_method");
    console.log("🔌 Wallet disconnected");
  };

  const confirmTestAccount = () => {
    if (testAccount) {
      setAccountId(testAccount);
      setIsConnected(true);
      setConnectionMethod("test");
      localStorage.setItem("hashpack_account_id", testAccount);
      localStorage.setItem("connection_method", "test");
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
        connectionMethod,
      }}
    >
      {children}
    </HashPackContext.Provider>
  );
}
