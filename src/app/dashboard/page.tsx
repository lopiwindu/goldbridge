"use client";

import { Navigation } from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Coins,
  History,
  CheckCircle,
} from "lucide-react";
import { useHashPack } from "@/contexts/HashPackContext";
import { Loader } from "@/components/ui/loader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const portfolioData = [
  { date: "Jan", value: 2400 },
  { date: "Feb", value: 2800 },
  { date: "Mar", value: 3200 },
  { date: "Apr", value: 3600 },
  { date: "May", value: 4200 },
  { date: "Jun", value: 4800 },
];

const holdings = [
  {
    id: "GB-2024-1247",
    metal: "Gold",
    purity: "99.9%",
    weight: "10kg",
    tokens: 160,
    pricePerToken: 62.5,
    currentValue: 10000,
    change: 12.5,
    origin: "Ghana",
  },
  {
    id: "GB-2024-1186",
    metal: "Platinum",
    purity: "99.5%",
    weight: "5kg",
    tokens: 50,
    pricePerToken: 85,
    currentValue: 4250,
    change: -3.2,
    origin: "South Africa",
  },
  {
    id: "GB-2024-1052",
    metal: "Copper",
    purity: "99.8%",
    weight: "100kg",
    tokens: 200,
    pricePerToken: 15,
    currentValue: 3000,
    change: 8.7,
    origin: "Zambia",
  },
];

const recentTransactions = [
  {
    id: "0x7f3a...b2c4",
    type: "buy",
    metal: "Gold",
    tokens: 50,
    amount: 3125,
    date: "2024-06-15",
    status: "completed",
  },
  {
    id: "0x9a2f...d8e1",
    type: "sell",
    metal: "Platinum",
    tokens: 10,
    amount: 850,
    date: "2024-06-12",
    status: "completed",
  },
  {
    id: "0x4c8b...f7a3",
    type: "buy",
    metal: "Copper",
    tokens: 100,
    amount: 1500,
    date: "2024-06-08",
    status: "completed",
  },
];

export default function InvestorDashboard() {
  const { accountId, isConnected, connectWallet } = useHashPack();

  const totalValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalROI = ((totalValue - 15000) / 15000) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Investor Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your gold portfolio and track performance
            </p>
          </div>

          {!isConnected ? (
            <Card className="border-2 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-black">
                  Connect Your Wallet
                </CardTitle>
                <CardDescription>
                  Connect your HashPack wallet to view your portfolio and start
                  investing in African gold
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <Loader size="lg" />
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={connectWallet}
                >
                  <Wallet className="mr-2 w-4 h-4" />
                  Connect HashPack
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Portfolio Value</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">
                      ${totalValue.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>{totalROI.toFixed(2)}% ROI</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">410</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Across 3 batches
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Gold Price</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">$62.50</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>+2.4% today</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Available Balance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">$5,420</div>
                    <div className="text-sm text-gray-600 mt-1">USDC</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-black">
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>
                    Your investment value over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="rgb(202 138 4)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Tabs defaultValue="holdings" className="mb-8">
                <TabsList>
                  <TabsTrigger value="holdings">My Holdings</TabsTrigger>
                  <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>

                <TabsContent value="holdings" className="mt-6">
                  <div className="grid gap-4">
                    {holdings.map((holding) => (
                      <Card
                        key={holding.id}
                        className="border-2 hover:border-yellow-600 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className="bg-yellow-600 text-white">
                                  {holding.metal}
                                </Badge>
                                <span className="font-mono text-sm text-gray-600">
                                  #{holding.id}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-green-600 border-green-600"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Purity</div>
                                  <div className="font-semibold text-black">
                                    {holding.purity}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Weight</div>
                                  <div className="font-semibold text-black">
                                    {holding.weight}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Tokens</div>
                                  <div className="font-semibold text-black">
                                    {holding.tokens}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Origin</div>
                                  <div className="font-semibold text-black">
                                    {holding.origin}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div className="text-2xl font-bold text-black">
                                  ${holding.currentValue.toLocaleString()}
                                </div>
                                <div
                                  className={`flex items-center gap-1 text-sm ${
                                    holding.change >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {holding.change >= 0 ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                  ) : (
                                    <ArrowDownRight className="w-4 h-4" />
                                  )}
                                  <span>{Math.abs(holding.change)}%</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-yellow-600 hover:bg-yellow-700"
                                >
                                  Sell
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="marketplace" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black">
                        Available Batches
                      </CardTitle>
                      <CardDescription>
                        New verified metal batches available for investment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-600 transition-colors">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-yellow-600 text-white">
                                Gold
                              </Badge>
                              <span className="font-mono text-sm text-gray-600">
                                #GB-2024-1248
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              15kg • 99.9% Pure • Nigeria
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black">
                              $62.50
                            </div>
                            <div className="text-sm text-gray-600">
                              per token
                            </div>
                          </div>
                          <Button className="bg-yellow-600 hover:bg-yellow-700">
                            Buy Now
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-600 transition-colors">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className="bg-gray-600 text-white">
                                Platinum
                              </Badge>
                              <span className="font-mono text-sm text-gray-600">
                                #GB-2024-1249
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              8kg • 99.5% Pure • Zimbabwe
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-black">
                              $85.00
                            </div>
                            <div className="text-sm text-gray-600">
                              per token
                            </div>
                          </div>
                          <Button className="bg-yellow-600 hover:bg-yellow-700">
                            Buy Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black">
                        Recent Transactions
                      </CardTitle>
                      <CardDescription>Your trading history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.map((tx) => (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  tx.type === "buy"
                                    ? "bg-green-100"
                                    : "bg-red-100"
                                }`}
                              >
                                {tx.type === "buy" ? (
                                  <ArrowDownRight
                                    className={`w-5 h-5 text-green-600`}
                                  />
                                ) : (
                                  <ArrowUpRight
                                    className={`w-5 h-5 text-red-600`}
                                  />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-black capitalize">
                                  {tx.type} {tx.metal}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {tx.tokens} tokens • {tx.date}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-black">
                                ${tx.amount.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600 font-mono">
                                {tx.id}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
