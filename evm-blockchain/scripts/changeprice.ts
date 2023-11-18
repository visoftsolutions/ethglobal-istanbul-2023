import * as hre from "hardhat";
import dotenv from "dotenv";

// Load env file
dotenv.config();

async function main() {
  const NETWORK_NAME = process.env.NETWORK_NAME;
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

  console.log(`NETWORK NAME ${NETWORK_NAME}`);

  const contract = await hre.viem.getContractAt(
    "DeepShot",
    CONTRACT_ADDRESS as `0x${string}`
  );

  for (let i = 0n; i <= 17n; i += 1n) {
    // Set new drink price
    let tx = await contract.write.setDrinkPrice([i, 10n ** 16n]);
    await (
      await hre.viem.getPublicClient()
    ).waitForTransactionReceipt({ hash: tx });
    console.log(
      `Updated price for item ${i} is: ${await contract.read.menu([i])}`
    );
  }
}

main();
