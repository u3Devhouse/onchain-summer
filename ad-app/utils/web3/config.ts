import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { base, baseSepolia } from "wagmi/chains";

import { cookieStorage, createStorage } from "wagmi";

// Your WalletConnect Cloud project ID
export const projectId = "09b4e33e9cfcee90ec94b3450efa77c0";

// Create a metadata object
const metadata = {
  name: "onchain summer",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [base, baseSepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
