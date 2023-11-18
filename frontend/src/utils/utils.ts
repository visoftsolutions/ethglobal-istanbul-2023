import DeepShotAbi from "@/abi/DeepShot.json";
import { UnsignedTransaction, ethers } from "ethers";

export interface Order {
  id: string;
  created_at: string;
  drink_id: number;
  network: string;
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

export const Networks = Object.freeze({
  1: { id: 1, name: "Ethereum" },
  2: { id: 2, name: "Arbitrum" },
  3: { id: 3, name: "ZkSync" },
  4: { id: 4, name: "Celo" },
  5: { id: 5, name: "Cartesi" },
  6: { id: 6, name: "Gnosis" },
});

export const Drinks = Object.freeze({
  1: { id: 1, name: "RedSun" },
  2: { id: 2, name: "SkyHigh" },
  3: { id: 3, name: "GoldRush" },
  4: { id: 4, name: "Frostbite" },
  5: { id: 5, name: "OakSour" },
  6: { id: 6, name: "ZenMix" },
});
