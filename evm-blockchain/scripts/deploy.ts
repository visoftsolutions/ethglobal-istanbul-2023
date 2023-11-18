import hre from "hardhat";

async function main() {
  const deepShot = await hre.viem.deployContract("DeepShot");

  console.log(`DeepShot deployed to ${deepShot.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
