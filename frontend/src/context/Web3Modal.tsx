"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import {
  goerli,
  zkSyncTestnet,
  gnosisChiado,
  arbitrumGoerli,
} from "viem/chains";

const projectId = "f211fb976e1d3c00908cc3e7f86501d5";

const metadata = {
  name: "DEEP SHOT",
  description: "Shot your deep.",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [goerli, zkSyncTestnet, gnosisChiado, arbitrumGoerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: any) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
