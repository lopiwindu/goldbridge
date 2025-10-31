'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const pathname = usePathname();
  const { address, status } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isConnected = status === 'connected' && address;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">GB</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GoldBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === '/dashboard' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Investor Dashboard
            </Link>
            <Link
              href="/miner"
              className={`text-sm font-medium transition-colors ${
                pathname === '/miner' ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Miner Dashboard
            </Link>

            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </div>
              </div>
            ) : (
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                Connect Wallet
              </Button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
            <Link
              href="/"
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Investor Dashboard
            </Link>
            <Link
              href="/miner"
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Miner Dashboard
            </Link>
            {isConnected ? (
              <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium inline-block">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </div>
            ) : (
              <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700">
                Connect Wallet
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
