import DeepShotAbi from "@/abi/DeepShot.json";
import { UnsignedTransaction, ethers } from "ethers";

export interface Order {
  id: string;
  created_at: string;
  drink_id: number;
  network_id: NetworkId;
}

export const getUnsignedTx = async (
  provider: ethers.providers.JsonRpcProvider,
  contractAddress: string,
  drink_id: number,
  drink_price: number,
) => {
  const contract = new ethers.Contract(contractAddress, DeepShotAbi, provider);
  const data = contract.interface.encodeFunctionData("buy", [BigInt(drink_id)]);
  const nonce = await provider.getTransactionCount(
    process.env.NEXT_PUBLIC_WALLET_ADDRESS ?? "",
  );
  const tx: UnsignedTransaction = {
    gasPrice: ethers.utils.hexlify(10000000000),
    gasLimit: ethers.utils.hexlify(1000000),
    to: contractAddress,
    value: drink_price,
    data,
    nonce,
    chainId: 280,
  };
  return tx;
};

export const getDrinkPrice = async (
  contract: ethers.Contract,
  drinkId: number,
) => {
  const value = await contract.menu([drinkId]);
  return ethers.utils.formatEther(value);
};

export type NetworkId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const Networks = Object.freeze({
  1: { id: 1, name: "Gnosis", rpc: "https://1rpc.io/gnosis", address: '' },
  2: { id: 2, name: "Arbitrum", rpc: "https://rpc.goerli.arbitrum.gateway.fm", address: '' },
  3: { id: 3, name: "Linea", rpc: `https://linea-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`, address: '' },
  4: { id: 4, name: "zkSync", rpc: "https://testnet.era.zksync.dev", address: '0xb2A1363901Df55409f901B47A30b31Bd2A63E5F7' },
  5: { id: 5, name: "Scroll", rpc: "http://scroll-sepolia-rpc.01no.de:8545", address: '' },
  6: { id: 6, name: "Mantle", rpc: "https://rpc.testnet.mantle.xyz", address: '' },
  7: { id: 7, name: "Celo", rpc: "https://alfajores-forno.celo-testnet.org", address: '' },
  8: { id: 8, name: "Base", rpc: "wss://base-goerli.publicnode.com", address: '' }
});

export const Drinks = {
  0: {
    name: "ArxTwist",
    description:
      "Journey into the unknown! A unique mix of whisky, blackberry juice, and mint, symbolizing the courage and exploration of Arx. A cocktail for the bold who are not afraid of new challenges",
    id: 0,
    image: "/drinks/arx.jpg",
  },
  1: {
    name: "ArbBuzz",
    description:
      "Taste the future! An exciting combination of dark rum, blackcurrant juice, and lime, reflecting the dynamism and power of Arbitrum. Feel the energy of the future with every sip of this intense cocktail",
    id: 1,
    image: "/drinks/arbitrum.jpg",
  },
  2: {
    name: "MetaMix",
    description:
      "The magic in your hands! A surprising mix of tequila, blue curaçao, and lime juice, expressing the mystery and power of Metamask. This is more than a drink, it's an experience that changes the game",
    id: 2,
    image: "/drinks/metamask.jpg",
  },
  3: {
    name: "zkShot",
    description:
      "A harmony of flavors! A refreshing blend of vodka, lemon juice, and agave syrup, symbolizing the speed and efficiency of zkSync. Perfect for those seeking harmony and modernity",
    id: 3,
    image: "/drinks/zksync.jpg",
  },
  4: {
    name: "WalletTini",
    description:
      "Connect with the taste! An innovative mix of gin, tonic, and cucumber, representing the simplicity and functionality of WalletConnect. Feel the waves of freshness and modernity with each sip",
    id: 4,
    image: "/drinks/wallet-connect.jpg",
  },
  5: {
    name: "ChronGulp",
    description:
      "History in a glass! An aromatic mix of whiskey, apple juice, and cinnamon, reflecting the depth and multi-dimensionality of Chronicle Protocol. More than a drink, it's a story in liquid form.",
    id: 5,
    image: "/drinks/chronicle.jpg",
  },
  6: {
    name: "ScrollSwirl",
    description:
      "calm and harmony! A delicate combination of sake, lychee, and lime juice, symbolizing the elegance and tranquility of Scroll. The perfect choice for those seeking balance and subtlety.",
    id: 6,
    image: "/drinks/scroll.jpg",
  },
  7: {
    name: "FileZest",
    description:
      "Innovation in a glass! A dynamic mix of mezcal, pineapple juice, and chili, representing the strength and adaptability of Filecoin. This cocktail is for the brave who are not afraid of new challenges",
    id: 7,
    image: "/drinks/filecoin.jpg",
  },
  8: {
    name: "MantlTaste",
    description:
      "A union of forces! A surprising mix of rum, coconut, and lime, reflecting the complexity and strength of Mantle Network. A magical journey through the world of modern technologies.",
    id: 8,
    image: "/drinks/mantle.jpg",
  },
  9: {
    name: "Celozzle",
    description:
      "Celebrate every moment! A cheerful combination of prosecco, peach juice, and raspberries, symbolizing the joy and openness of Celo. The perfect drink for any occasion when you want to celebrate with class",
    id: 9,
    image: "/drinks/celo.jpg",
  },
  10: {
    name: "ChainSip",
    description:
      "discover the power of connections! A refreshing mix of gin, elderflower, and lime juice, reflecting the innovation and strength of Chainlink. This is not just a drink, it's an experience that connects worlds",
    id: 10,
    image: "/drinks/chainlink.jpg",
  },
  11: {
    name: "APIzzy",
    description:
      "Taste new possibilities! A sophisticated composition of Aperol, soda, and orange peel, representing the versatility and adaptability of API3. Perfect for starting an evening full of discoveries",
    id: 11,
    image: "/drinks/api3.jpg",
  },
  12: {
    name: "BasQuench",
    description:
      "The foundation of joy! A tempting mix of rum, mango juice, and lime, symbolizing the stability and innovation of Base. This drink reminds you that foundations are key to success",
    id: 12,
    image: "/drinks/base.jpg",
  },
  13: {
    name: "UnliToast",
    description:
      "Limitless imagination! An exciting mix of tequila, pomegranate juice, and ginger, representing the boundless possibilities of UNLIMIT. Taste the flavor of freedom and innovation",
    id: 13,
    image: "/drinks/unlimited.jpg",
  },
  14: {
    name: "CarSavor",
    description:
      "Transcend boundaries! An aromatic combination of bourbon, maple syrup, and bitters, reflecting the depth and sophistication of Cartesi. A drink for those who dare to explore new territories",
    id: 14,
    image: "/drinks/cartesi.jpg",
  },
  15: {
    name: "AleoSplash",
    description:
      "The mystery of the future! A unique mix of vodka, chokeberry juice, and rosemary, symbolizing the innovation and mystery of Aleo. Perfect for seekers of new experiences",
    id: 15,
    image: "/drinks/aleo.jpg",
  },
  16: {
    name: "GraFizz",
    description:
      "A spark of genius! A dazzling combination of champagne, lychee juice, and pink pepper, representing the elegance and intelligence of The Graph. A drink that shines as bright as your ideas",
    id: 16,
    image: "/drinks/the-graph.jpg",
  },
  17: {
    name: "GnoSip",
    description:
      "Discover the secrets of flavor! This inspiring blend of rum, grapefruit juice, and mint syrup symbolizes the innovation and transparency of Gnosis Chain. Perfect for those who value modernity in every sip.",
    id: 17,
    image: "/drinks/gnosis-safe.jpg",
  },
};
