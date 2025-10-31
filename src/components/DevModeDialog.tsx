"use client";

import { useHashPack } from "@/contexts/HashPackContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Loader } from "@/components/ui/loader";

export function DevModeDialog() {
  const {
    showDevModeDialog,
    setShowDevModeDialog,
    testAccount,
    confirmTestAccount,
  } = useHashPack();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));
    confirmTestAccount();
    setIsConnecting(false);
  };

  return (
    <Dialog open={showDevModeDialog} onOpenChange={setShowDevModeDialog}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-yellow-500/20">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <DialogTitle className="text-yellow-500">
              Development Mode
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-300 text-left space-y-3 pt-2">
            <p>
              <strong>HashPack wallet cannot connect on localhost</strong> due
              to browser security restrictions.
            </p>

            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-white">Why this happens:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                <li>Browser extensions don't inject into HTTP localhost</li>
                <li>HashPack requires HTTPS for security</li>
                <li>This is a browser limitation, not a bug</li>
              </ul>
            </div>

            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Development Solution:
              </p>
              <p className="text-zinc-300">
                We'll generate a <strong>test account</strong> for UI testing:
              </p>
              <p className="font-mono text-yellow-400 bg-zinc-800 px-3 py-2 rounded">
                {testAccount}
              </p>
              <p className="text-xs text-zinc-500">
                This account is simulated and cannot sign real transactions.
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 text-sm">
              <p className="font-semibold text-blue-400 mb-2">
                For Production:
              </p>
              <p className="text-zinc-300">
                Deploy to an HTTPS domain (Vercel, Netlify, etc.) and HashPack
                will work with real wallets.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setShowDevModeDialog(false)}
            className="border-zinc-700 hover:bg-zinc-800 text-white"
            disabled={isConnecting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConnect}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              "Use Test Account"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
