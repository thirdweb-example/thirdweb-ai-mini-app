"use client";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";
import { AIChat } from "./components/AIChat";

export default function App() {
  const { setMiniAppReady, isMiniAppReady } = useMiniKit();

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady();
    }
  }, [setMiniAppReady, isMiniAppReady]);

  return <AIChat />;
}
