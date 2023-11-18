import DeepShotAbi from "@/abi/DeepShot.json";
import { UnsignedTransaction, ethers } from "ethers";

export interface Order {
  id: string;
  created_at: string;
  drink_id: number;
  network_id: number;
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
  1: { id: 1, name: "Gnosis" },
  2: { id: 2, name: "Arbitrum" },
  3: { id: 3, name: "Linea" },
  4: { id: 4, name: "zkSync" },
  5: { id: 5, name: "Scroll" },
  6: { id: 6, name: "Mantle" },
  7: { id: 7, name: "Celo" },
  8: { id: 8, name: "Base" },
  9: { id: 9, name: "Cartesi" },
});

export const Drinks = Object.freeze({
  1: { id: 1, name: "ZkShot", description: "ZkShot – a harmony of flavors! A refreshing blend of vodka, lemon juice, and agave syrup, symbolizing the speed and efficiency of zkSync. Perfect for those seeking harmony and modernity."},
  2: { id: 2, name: "BrainZero", description: "BrainZero - lots of alcohol"},
  3: { id: 3, name: "MantlTaste", description: "MantlTaste – a union of forces! A surprising mix of rum, coconut, and lime, reflecting the complexity and strength of Mantle Network. A magical journey through the world of modern technologies."},
  4: { id: 4, name: "API3zzy", description: "API3zzy – taste new possibilities! A sophisticated composition of Aperol, soda, and orange peel, representing the versatility and adaptability of API3. Perfect for starting an evening full of discoveries."},
  5: { id: 5, name: "ArxTwist", description: "ArxTwist – journey into the unknown! A unique mix of whisky, blackberry juice, and mint, symbolizing the courage and exploration of Arx. A cocktail for the bold who are not afraid of new challenges."},
  6: { id: 6, name: "Celozzle", description: "Celozzle – celebrate every moment! A cheerful combination of prosecco, peach juice, and raspberries, symbolizing the joy and openness of Celo. The perfect drink for any occasion when you want to celebrate with class."},
});
