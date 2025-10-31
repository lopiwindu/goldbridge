"use client";

import { Loader, FullPageLoader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LoaderDemo() {
  const [showFullPage, setShowFullPage] = useState(false);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Loader Showcase</h1>

      {/* Size Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Loader Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-8">
            <div className="text-center">
              <Loader size="sm" />
              <p className="mt-2 text-sm text-gray-600">Small (64px)</p>
            </div>
            <div className="text-center">
              <Loader size="md" />
              <p className="mt-2 text-sm text-gray-600">Medium (96px)</p>
            </div>
            <div className="text-center">
              <Loader size="lg" />
              <p className="mt-2 text-sm text-gray-600">Large (128px)</p>
            </div>
            <div className="text-center">
              <Loader size="xl" />
              <p className="mt-2 text-sm text-gray-600">Extra Large (192px)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In Card */}
      <Card>
        <CardHeader>
          <CardTitle>Loader in Card</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <Loader size="lg" />
          <p className="text-gray-600">Loading your data...</p>
        </CardContent>
      </Card>

      {/* Full Page Loader Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Full Page Loader</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowFullPage(true)}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Show Full Page Loader
          </Button>
          {showFullPage && (
            <FullPageLoader message="Processing your request..." />
          )}
          {showFullPage && (
            <div className="fixed bottom-4 right-4 z-[60]">
              <Button onClick={() => setShowFullPage(false)} variant="outline">
                Close
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Styling */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
              <Loader size="md" className="opacity-50" />
            </div>
            <div className="bg-yellow-100 rounded-lg p-6 flex items-center justify-center">
              <Loader size="md" />
            </div>
            <div className="bg-blue-100 rounded-lg p-6 flex items-center justify-center">
              <Loader size="md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
