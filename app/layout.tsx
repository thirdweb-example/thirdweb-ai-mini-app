import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SafeArea } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "@/minikit.config";
import { RootProvider } from "./rootProvider";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@coinbase/onchainkit/styles.css";
import "@mantine/core/styles.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: minikitConfig.miniapp.name,
    description: minikitConfig.miniapp.description,
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: minikitConfig.miniapp.heroImageUrl,
        button: {
          title: `Launch ${minikitConfig.miniapp.name}`,
          action: {
            name: `Launch ${minikitConfig.miniapp.name}`,
            type: "launch_miniapp",
          },
        },
      }),
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.variable} style={{ background: "#000000" }}>
          <MantineProvider 
            defaultColorScheme="dark" 
            forceColorScheme="dark"
            theme={{
              primaryColor: 'gray',
              colors: {
                dark: [
                  '#ffffff',
                  '#f5f5f5',
                  '#e5e5e5',
                  '#d4d4d4',
                  '#a3a3a3',
                  '#737373',
                  '#525252',
                  '#404040',
                  '#262626',
                  '#1a1a1a',
                  '#0a0a0a',
                  '#000000'
                ]
              }
            }}
          >
            <SafeArea>{children}</SafeArea>
          </MantineProvider>
        </body>
      </html>
    </RootProvider>
  );
}
