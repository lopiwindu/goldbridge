"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ExternalLink, Wallet } from "lucide-react";

interface WalletNotFoundDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUseDummy: () => void;
}

export function WalletNotFoundDialog({
  isOpen,
  onClose,
  onUseDummy,
}: WalletNotFoundDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-red-500/20">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <DialogTitle className="text-red-500">
              HashPack Wallet Not Detected
            </DialogTitle>
          </div>
          <DialogDescription className="text-zinc-300 text-left space-y-4 pt-2">
            <p>
              The HashPack wallet extension is not installed or not detected in
              your browser.
            </p>

            <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Wallet className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-2">
                    Install HashPack:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-zinc-400">
                    <li>Visit hashpack.app to download the extension</li>
                    <li>Install it in your browser (Chrome/Brave/Firefox)</li>
                    <li>Refresh this page</li>
                    <li>Click "Connect HashPack" again</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <p className="font-semibold text-blue-400 mb-2">
                Or Continue Testing:
              </p>
              <p className="text-sm text-zinc-300">
                You can use a <strong>dummy wallet</strong> to explore the UI
                and features. This wallet is simulated and cannot make real
                transactions.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 hover:bg-zinc-800 text-white w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={() => window.open("https://www.hashpack.app/", "_blank")}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            Install HashPack
            <ExternalLink className="ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={onUseDummy}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold w-full sm:w-auto"
          >
            <Wallet className="mr-2 w-4 h-4" />
            Continue with Dummy Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
