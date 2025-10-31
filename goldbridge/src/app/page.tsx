'use client';

import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Globe, CheckCircle, ArrowRight, Coins } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";

export default function Home() {
    const { addMiniApp } = useAddMiniApp();
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (document.readyState !== 'complete') {
            await new Promise(resolve => {
              if (document.readyState === 'complete') {
                resolve(void 0);
              } else {
                window.addEventListener('load', () => resolve(void 0), { once: true });
              }

            });
          }

          await sdk.actions.ready();
          console.log("Farcaster SDK initialized successfully - app fully loaded");
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error);
          setTimeout(async () => {
            try {
              await sdk.actions.ready();
              console.log('Farcaster SDK initialized on retry');
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError);
            }

          }, 1000);
        }

      };
      initializeFarcaster();
    }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                Built on Base Blockchain
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Invest in Real African Gold
                <br />
                <span className="text-yellow-600">Fully Verified on Chain</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                GoldBridge tokenizes verified African mineral assets as Real-World Asset (RWA) tokens. 
                Each batch is audited, minted as an NFT, and backed by physical gold, platinum, or copper.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    Explore Investment Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/miner">
                  <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                    Register as Miner
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$2.4M</div>
                  <div className="text-sm text-gray-600">Total Value Locked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1,247</div>
                  <div className="text-sm text-gray-600">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Verification Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose GoldBridge?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We bring transparency, security, and fair pricing to African mineral trading through blockchain technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-yellow-600 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl text-black">Verified & Audited</CardTitle>
                  <CardDescription>
                    Every metal batch undergoes rigorous third-party auditing before tokenization
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-yellow-600 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-black">Real-Time Pricing</CardTitle>
                  <CardDescription>
                    Oracle-powered price feeds ensure fair market value for all RWA tokens
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-yellow-600 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-black">Global Access</CardTitle>
                  <CardDescription>
                    Trade African minerals globally with instant settlement and low fees
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From mine to market, every step is transparent and verifiable
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">Extraction</h3>
                <p className="text-gray-600 text-sm">
                  African miners extract precious metals from certified mines
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">Verification</h3>
                <p className="text-gray-600 text-sm">
                  Independent auditors verify quality, weight, and authenticity
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">Tokenization</h3>
                <p className="text-gray-600 text-sm">
                  Each batch is minted as a unique NFT with metadata on IPFS
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <div className="w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mb-4">
                  4
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">Trading</h3>
                <p className="text-gray-600 text-sm">
                  Investors buy, sell, or hold tokens with instant settlement
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-yellow-600 bg-gradient-to-br from-yellow-50 to-amber-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-6 h-6 text-yellow-600" />
                    <Badge className="bg-yellow-600 text-white">New</Badge>
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-black">
                    Latest Gold Batch Available
                  </CardTitle>
                  <CardDescription className="text-base text-black">
                    Batch #GB-2024-1247 | 99.9% Pure Gold | 10kg
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-gray-600">Origin</div>
                      <div className="font-semibold text-black">Ghana, West Africa</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Verified By</div>
                      <div className="font-semibold text-black">SGS International</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Price per Token</div>
                      <div className="font-semibold text-black">$62.50 USDC</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-700 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Fully Verified & Audited</span>
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                      View in Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GB</span>
                  </div>
                  <span className="font-bold text-lg">GoldBridge</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Bridging African Gold to the World — Transparently and Fairly
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/dashboard" className="hover:text-white">Investor Dashboard</Link></li>
                  <li><Link href="/miner" className="hover:text-white">Miner Portal</Link></li>
                  <li><Link href="/" className="hover:text-white">Marketplace</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-white">Audit Reports</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">Support</a></li>
                  <li><a href="#" className="hover:text-white">Partnerships</a></li>
                  <li><a href="#" className="hover:text-white">Media Kit</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>© 2024 GoldBridge. Built on Base. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
