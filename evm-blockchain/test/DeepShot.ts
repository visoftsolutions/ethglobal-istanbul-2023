import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("DeepShot Contract Tests", function () {
  // Fixture to deploy the DeepShot contract
  async function deployDeepShotFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const deepShot = await hre.viem.deployContract("DeepShot");
    return { owner, deepShot, otherAccount };
  }

  describe("Deployment", function () {
    it("should set drink prices correctly", async function () {
      const { deepShot } = await loadFixture(deployDeepShotFixture);

      // Set drink price
      await deepShot.write.setDrinkPrice([12n, 134320n]);

      // Check if the drink price is set correctly
      expect(await deepShot.read.menu([12n])).to.equal(134320n);

      // Verify the DrinkPriceUpdated event
      const priceUpdateEvents = await deepShot.getEvents.DrinkPriceUpdated();
      expect(priceUpdateEvents).to.have.lengthOf(1);
      expect(priceUpdateEvents[0].args.drinkId).to.equal(12n);
      expect(priceUpdateEvents[0].args.newPrice).to.equal(134320n);
    });
  });

  describe("Purchase Functionality", function () {
    it("should emit a DrinkPurchased event when a drink is bought", async function () {
      const { deepShot, owner } = await loadFixture(deployDeepShotFixture);

      // Set drink price and buy the drink
      await deepShot.write.setDrinkPrice([1n, 1000n]);
      await deepShot.write.buy([1n], { value: 1000n });

      // Verify the DrinkPurchased event
      const purchaseEvents = await deepShot.getEvents.DrinkPurchased();
      expect(purchaseEvents).to.have.lengthOf(1);
      expect(purchaseEvents[0].args.owner?.toLowerCase()).to.equal(owner.account.address.toLowerCase());
      expect(purchaseEvents[0].args.drinkId).to.equal(1n);
    });
  });
});
