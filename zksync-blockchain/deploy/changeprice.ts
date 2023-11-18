import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import dotenv from "dotenv";

// Load env file
dotenv.config();

export default async function () {
  // Address of the contract to interact with
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  if (!CONTRACT_ADDRESS) {
    throw "⛔️ Provide address of the contract to interact with, item id and price!";
  }

  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("DeepShot");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  for (let i = 0; i <= 17; i += 1) {
    // Set new drink price
    let response = await contract.setDrinkPrice(i, 10n ** 16n);
    await response.wait();
    response = await contract.menu(i);
    console.log(`Updated price for item ${i} is: ${response}`);
  }
}
