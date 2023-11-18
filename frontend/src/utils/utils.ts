
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
  drink_price: number
) => {
  const contract = new ethers.Contract(
    contractAddress,
    DeepShotAbi,
    provider,
  );
  const data = contract.interface.encodeFunctionData("buy", [
    BigInt(drink_id),
  ]);
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


