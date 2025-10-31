"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Loader({ size = "md", className = "" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <DotLottieReact src="/coin-loader.lottie" loop autoplay />
    </div>
  );
}

interface FullPageLoaderProps {
  message?: string;
}

export function FullPageLoader({
  message = "Loading...",
}: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader size="xl" />
        {message && (
          <p className="text-white text-lg font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
