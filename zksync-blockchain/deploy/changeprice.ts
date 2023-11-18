import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import dotenv from "dotenv";

// Load env file
dotenv.config();

export default async function () {
  // Address of the contract to interact with
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  const ITEM_ID = process.env.ITEM_ID;
  const PRICE = process.env.PRICE;
  if (!CONTRACT_ADDRESS || !ITEM_ID || !PRICE) {
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

  let response: any;

  // Run contract read function to display current price
  response = await contract.menu(ITEM_ID);
  console.log(`Current price for item ${ITEM_ID} is: ${response}`);

  // Set new drink price
  response = await contract.setDrinkPrice(ITEM_ID, PRICE);

  // Run contract read function to display updated price
  response = await contract.menu(ITEM_ID);
  console.log(`Updated price for item ${ITEM_ID} is: ${response}`);
}
