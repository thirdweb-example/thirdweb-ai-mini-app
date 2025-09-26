const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
    payload: "eyJkb21haW4iOiJhcHAuZXhhbXBsZS5jb20ifQ",
    signature: "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj",
  },
  baseBuilder: {
    allowedAddresses: ["0x..."],
  },
  miniapp: {
    version: "1.0.0",
    name: "thirdweb AI Assistant",
    subtitle: "AI-Powered Web3 Helper",
    description: "Chat with AI to get help with Web3, smart contracts, and blockchain development. Powered by thirdweb AI.",
    screenshotUrls: [
      `${ROOT_URL}/screenshot.png`
    ],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "developer",
    tags: ["ai", "web3", "assistant", "thirdweb", "base", "blockchain"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Ask AI anything about Web3",
    ogTitle: "thirdweb AI Assistant - Web3 AI Helper",
    ogDescription: "Chat with AI to get help with Web3, smart contracts, and blockchain development. Powered by thirdweb AI.",
    ogImageUrl: `${ROOT_URL}/hero.png`,
    noindex: false,
  },
} as const;
