"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Coins,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";

const availableGoldBatches = [
  {
    id: "GB-2024-1247",
    metal: "Gold",
    purity: "99.9%",
    weight: "10kg",
    origin: "Ghana, West Africa",
    verifiedBy: "SGS International",
    pricePerToken: 62.5,
    totalTokens: 160,
    availableTokens: 45,
    image: "🏆",
    date: "Dec 15, 2024",
  },
  {
    id: "GB-2024-1186",
    metal: "Platinum",
    purity: "99.5%",
    weight: "5kg",
    origin: "South Africa",
    verifiedBy: "Bureau Veritas",
    pricePerToken: 85.0,
    totalTokens: 100,
    availableTokens: 78,
    image: "💎",
    date: "Dec 14, 2024",
  },
  {
    id: "GB-2024-1205",
    metal: "Gold",
    purity: "99.8%",
    weight: "8.5kg",
    origin: "Tanzania",
    verifiedBy: "SGS International",
    pricePerToken: 58.0,
    totalTokens: 136,
    availableTokens: 92,
    image: "🥇",
    date: "Dec 12, 2024",
  },
  {
    id: "GB-2024-1198",
    metal: "Gold",
    purity: "99.9%",
    weight: "12kg",
    origin: "Nigeria",
    verifiedBy: "Intertek",
    pricePerToken: 65.0,
    totalTokens: 192,
    availableTokens: 120,
    image: "🏅",
    date: "Dec 10, 2024",
  },
];

export default function Home() {
  const { addMiniApp } = useAddMiniApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % availableGoldBatches.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + availableGoldBatches.length) % availableGoldBatches.length
    );
  };

  useEffect(() => {
    const tryAddMiniApp = async () => {
      try {
        await addMiniApp();
      } catch (error) {
        console.error("Failed to add mini app:", error);
      }
    };

    tryAddMiniApp();
  }, [addMiniApp]);
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (document.readyState !== "complete") {
          await new Promise((resolve) => {
            if (document.readyState === "complete") {
              resolve(void 0);
            } else {
              window.addEventListener("load", () => resolve(void 0), {
                once: true,
              });
            }
          });
        }

        await sdk.actions.ready();
        console.log(
          "Farcaster SDK initialized successfully - app fully loaded"
        );
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
        setTimeout(async () => {
          try {
            await sdk.actions.ready();
            console.log("Farcaster SDK initialized on retry");
          } catch (retryError) {
            console.error("Farcaster SDK retry failed:", retryError);
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
        {/* Hero Section - Enhanced */}
        <section className="relative overflow-hidden bg-linear-to-br from-yellow-50 via-orange-50 to-amber-50 py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg">
                Built on Blockchain
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in Real African Gold
                <br />
                <span className="text-yellow-600">Fully Verified on Chain</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                GoldBridge tokenizes verified African mineral assets as
                Real-World Asset (RWA) tokens. Each batch is audited, minted as
                an NFT, and backed by physical gold, platinum, or copper.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Explore Investment Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/miner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 shadow-md"
                  >
                    Register as Miner
                  </Button>
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">
                    $2.4M
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Total Value Locked
                  </div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">
                    1,247
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Active Investors
                  </div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Verification Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Gold Available Section - NEW WITH SLIDER */}
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-600 text-white shadow-lg">
                Live Marketplace
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Latest Gold Available
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Freshly verified batches ready for investment. All assets are
                audited by certified third parties.
              </p>
            </div>

            <div className="max-w-5xl mx-auto relative">
              {/* Slider */}
              <div className="relative overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {availableGoldBatches.map((batch, index) => (
                    <div key={batch.id} className="w-full flex-shrink-0 px-4">
                      <Card className="border-2 border-yellow-600 bg-linear-to-br from-yellow-50 to-amber-50 shadow-2xl">
                        <CardContent className="p-8">
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Left Side - Image & Badge */}
                            <div className="flex flex-col justify-center items-center bg-white/50 backdrop-blur-sm rounded-xl p-8">
                              <div className="text-8xl mb-4">{batch.image}</div>
                              <Badge className="bg-yellow-600 text-white mb-2">
                                {batch.metal}
                              </Badge>
                              <div className="text-4xl font-bold text-gray-900 mb-2">
                                {batch.weight}
                              </div>
                              <div className="text-lg text-gray-600">
                                Purity: {batch.purity}
                              </div>
                            </div>

                            {/* Right Side - Details */}
                            <div className="flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <span className="font-mono text-sm text-gray-600">
                                    #{batch.id}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="border-green-600 text-green-600 bg-green-50"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                  {batch.metal} Batch -{" "}
                                  {batch.origin.split(",")[0]}
                                </h3>

                                <div className="space-y-4 mb-6">
                                  <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-600">
                                        Origin
                                      </div>
                                      <div className="font-semibold text-black">
                                        {batch.origin}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-600">
                                        Verified By
                                      </div>
                                      <div className="font-semibold text-black">
                                        {batch.verifiedBy}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <Coins className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div>
                                      <div className="text-sm text-gray-600">
                                        Available Tokens
                                      </div>
                                      <div className="font-semibold text-black">
                                        {batch.availableTokens} of{" "}
                                        {batch.totalTokens}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 mb-6">
                                  <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-bold text-gray-900">
                                      ${batch.pricePerToken}
                                    </span>
                                    <span className="text-gray-600">
                                      USDC per token
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Listed {batch.date}
                                  </div>
                                </div>
                              </div>

                              <Link href="/dashboard" className="block">
                                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transition-all">
                                  Invest Now
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
                aria-label="Previous batch"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-10"
                aria-label="Next batch"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {availableGoldBatches.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index
                        ? "bg-yellow-600 w-8"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section - Enhanced */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose GoldBridge?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We bring transparency, security, and fair pricing to African
                mineral trading through blockchain technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 hover:border-yellow-600 transition-all hover:shadow-xl group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl text-black mb-3">
                    Verified & Audited
                  </CardTitle>
                  <CardDescription className="text-base">
                    Every metal batch undergoes rigorous third-party auditing
                    before tokenization
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-yellow-600 transition-all hover:shadow-xl group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-black mb-3">
                    Real-Time Pricing
                  </CardTitle>
                  <CardDescription className="text-base">
                    Oracle-powered price feeds ensure fair market value for all
                    RWA tokens
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-yellow-600 transition-all hover:shadow-xl group">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-black mb-3">
                    Global Access
                  </CardTitle>
                  <CardDescription className="text-base">
                    Trade African minerals globally with instant settlement and
                    low fees
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section - Enhanced */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-yellow-600 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-yellow-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  Extraction
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  African miners extract precious metals from certified mines
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-yellow-600 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-yellow-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  Verification
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Independent auditors verify quality, weight, and authenticity
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-yellow-600 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-yellow-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  Tokenization
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each batch is minted as a unique NFT with metadata on IPFS
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-yellow-600 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-yellow-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  Trading
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Investors buy, sell, or hold tokens with instant settlement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
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
                  <li>
                    <Link href="/dashboard" className="hover:text-white">
                      Investor Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/miner" className="hover:text-white">
                      Miner Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white">
                      Marketplace
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Whitepaper
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Audit Reports
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Partnerships
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Media Kit
                    </a>
                  </li>
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
