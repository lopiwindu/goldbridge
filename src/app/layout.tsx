import type { Metadata } from "next";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import { Providers } from "./providers";
import FarcasterWrapper from "@/components/FarcasterWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FarcasterWrapper>{children}</FarcasterWrapper>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "GoldBridge Tokenization",
  description:
    "Digitize African minerals with GoldBridge, a blockchain platform offering real-world asset tokens for verified gold and other metals. Invest transparently and track portfolios seamlessly.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl:
        "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_2531ae3d-3029-4bc5-ba5f-836c0c336132-AOEsYRKNX72OvSyytYEXkJXEHZkbth",
      button: {
        title: "Open Website",
        action: {
          type: "launch_frame",
          name: "GoldBridge Tokenization",
          url: "https://goldbridge.vercel.app",
          splashImageUrl:
            "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg",
          splashBackgroundColor: "rgb(255 255 255)",
        },
      },
    }),
  },
};
