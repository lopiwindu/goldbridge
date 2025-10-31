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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Coins,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useHashPack } from "@/contexts/HashPackContext";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";

const minerBatches = [
  {
    id: "GB-2024-1247",
    metal: "Gold",
    weight: "10kg",
    purity: "99.9%",
    status: "verified",
    uploaded: "2024-06-15",
    revenue: 10000,
    tokens: 160,
  },
  {
    id: "GB-2024-1186",
    metal: "Platinum",
    weight: "5kg",
    purity: "99.5%",
    status: "pending",
    uploaded: "2024-06-14",
    revenue: 0,
    tokens: 0,
  },
  {
    id: "GB-2024-1052",
    metal: "Copper",
    weight: "100kg",
    purity: "99.8%",
    status: "verified",
    uploaded: "2024-06-10",
    revenue: 3000,
    tokens: 200,
  },
];

export default function MinerDashboard() {
  const { accountId, isConnected, connectWallet } = useHashPack();
  const [uploading, setUploading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("Batch submitted for verification!");
    }, 2000);
  };

  const totalRevenue = minerBatches.reduce(
    (sum, batch) => sum + batch.revenue,
    0
  );
  const totalBatches = minerBatches.length;
  const verifiedBatches = minerBatches.filter(
    (b) => b.status === "verified"
  ).length;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Miner Dashboard
            </h1>
            <p className="text-gray-600">
              Upload and tokenize your verified mineral batches
            </p>
          </div>

          {!isConnected ? (
            <Card className="border-2 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-black">
                  Connect Your Wallet
                </CardTitle>
                <CardDescription>
                  Connect your HashPack wallet to register as a miner and start
                  tokenizing your mineral batches
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
                    <CardDescription>Total Revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">
                      ${totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      From {verifiedBatches} batches
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Total Batches</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">
                      {totalBatches}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {verifiedBatches} verified
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tokens Minted</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">360</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Across all batches
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Pending Verification</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-black">1</div>
                    <div className="text-sm text-gray-600 mt-1">
                      In audit process
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="upload" className="mb-8">
                <TabsList className="bg-yellow-100 border-2 border-yellow-600">
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                  >
                    Upload Batch
                  </TabsTrigger>
                  <TabsTrigger
                    value="batches"
                    className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                  >
                    My Batches
                  </TabsTrigger>
                  <TabsTrigger
                    value="earnings"
                    className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white"
                  >
                    Earnings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black">
                        Submit New Batch
                      </CardTitle>
                      <CardDescription>
                        Upload your metal batch data and documentation for
                        verification
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="metal-type" className="text-black">
                              Metal Type
                            </Label>
                            <Select required>
                              <SelectTrigger id="metal-type">
                                <SelectValue placeholder="Select metal type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gold">Gold</SelectItem>
                                <SelectItem value="platinum">
                                  Platinum
                                </SelectItem>
                                <SelectItem value="copper">Copper</SelectItem>
                                <SelectItem value="silver">Silver</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="weight" className="text-black">
                              Weight (kg)
                            </Label>
                            <Input
                              id="weight"
                              type="number"
                              placeholder="10.5"
                              step="0.1"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="purity" className="text-black">
                              Purity (%)
                            </Label>
                            <Input
                              id="purity"
                              type="number"
                              placeholder="99.9"
                              step="0.1"
                              max="100"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="origin" className="text-black">
                              Origin Country
                            </Label>
                            <Select required>
                              <SelectTrigger id="origin">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ghana">Ghana</SelectItem>
                                <SelectItem value="nigeria">Nigeria</SelectItem>
                                <SelectItem value="south-africa">
                                  South Africa
                                </SelectItem>
                                <SelectItem value="zambia">Zambia</SelectItem>
                                <SelectItem value="zimbabwe">
                                  Zimbabwe
                                </SelectItem>
                                <SelectItem value="tanzania">
                                  Tanzania
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mine-location" className="text-black">
                            Mine Location
                          </Label>
                          <Input
                            id="mine-location"
                            placeholder="Exact location or coordinates"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-black">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Additional details about the batch, extraction method, etc."
                            rows={4}
                          />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-black">Documentation</Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-600 transition-colors cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm font-medium text-black mb-1">
                                Mining Certificate
                              </div>
                              <div className="text-xs text-gray-600">
                                PDF, Max 10MB
                              </div>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-600 transition-colors cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm font-medium text-black mb-1">
                                Purity Report
                              </div>
                              <div className="text-xs text-gray-600">
                                PDF, Max 10MB
                              </div>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-600 transition-colors cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm font-medium text-black mb-1">
                                Batch Photos
                              </div>
                              <div className="text-xs text-gray-600">
                                JPG/PNG, Max 5MB each
                              </div>
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-600 transition-colors cursor-pointer">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <div className="text-sm font-medium text-black mb-1">
                                Export License
                              </div>
                              <div className="text-xs text-gray-600">
                                PDF, Max 10MB
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-700">
                            <strong className="text-black">
                              Verification Process:
                            </strong>{" "}
                            Your batch will be reviewed by SGS International or
                            another certified auditor. This typically takes 3-5
                            business days. Once verified, your batch will be
                            tokenized and made available to investors.
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                          disabled={uploading}
                        >
                          {uploading ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            "Submit for Verification"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="batches" className="mt-6">
                  <div className="grid gap-4">
                    {minerBatches.map((batch) => (
                      <Card
                        key={batch.id}
                        className="border-2 hover:border-yellow-600 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className="bg-yellow-600 text-white">
                                  {batch.metal}
                                </Badge>
                                <span className="font-mono text-sm text-gray-600">
                                  #{batch.id}
                                </span>
                                {batch.status === "verified" ? (
                                  <Badge
                                    variant="outline"
                                    className="text-green-600 border-green-600"
                                  >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-yellow-600 border-yellow-600"
                                  >
                                    <Clock className="w-3 h-3 mr-1" />
                                    Pending
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Weight</div>
                                  <div className="font-semibold text-black">
                                    {batch.weight}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Purity</div>
                                  <div className="font-semibold text-black">
                                    {batch.purity}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Uploaded</div>
                                  <div className="font-semibold text-black">
                                    {batch.uploaded}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Tokens</div>
                                  <div className="font-semibold text-black">
                                    {batch.tokens || "-"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              {batch.status === "verified" && (
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-black">
                                    ${batch.revenue.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Revenue
                                  </div>
                                </div>
                              )}
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="earnings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-black">
                        Earnings Overview
                      </CardTitle>
                      <CardDescription>
                        Track your revenue from verified batches
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                              <Coins className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">
                                Total Earnings
                              </div>
                              <div className="text-2xl font-bold text-black">
                                ${totalRevenue.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                            Withdraw
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-black">
                            Earnings by Batch
                          </h4>
                          {minerBatches
                            .filter((b) => b.status === "verified")
                            .map((batch) => (
                              <div
                                key={batch.id}
                                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg"
                              >
                                <div>
                                  <div className="font-semibold text-black">
                                    {batch.metal} - #{batch.id}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {batch.tokens} tokens sold
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-black">
                                    ${batch.revenue.toLocaleString()}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {batch.uploaded}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
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
