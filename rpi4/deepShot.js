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

export const LcdContexts = Object.freeze({
  Network: "network",
  Drink: "drink",
  PlacingOrder: "placingOrder",
  RealizingOrder: "realizingOrder",
});

// Helper function to cycle through enum values
function getNextEnumValue(enumObject, currentValue) {
  const values = Object.values(enumObject);
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}

export class DeepShot {
  constructor(screen) {
    this.screen = screen;
    this.context = LcdContexts.Network;
    this.network = Networks[1];
    this.drink = Drinks[1];
    this.realizingOrderDescription = "";

    // Proxy to handle property updates and screen refresh
    return new Proxy(this, {
      set: async (obj, prop, value) => {
        if (["context", "network", "drink"].includes(prop)) {
          obj[prop] = value;
          try {
            await this.updateScreen(); // Update screen on property change
          } catch (error) {
            console.error("Error updating screen:", error);
          }
        }
        return true;
      },
    });
  }

  switchContext(newContext) {
    if (Object.values(LcdContexts).includes(newContext)) {
      this.context = newContext;
    }
  }

  async switchSelection() {
    if (this.context === LcdContexts.Network) {
      this.network = getNextEnumValue(Networks, this.network);
    } else if (this.context === LcdContexts.Drink) {
      this.drink = getNextEnumValue(Drinks, this.drink);
    }
  }

  async updateScreen() {
    try {
      await this.screen.clear();
      switch (this.context) {
        case LcdContexts.Network:
        case LcdContexts.Drink:
          await this.screen.print(`Net: ${this.network.name}`, 0);
          await this.screen.print(`Drink: ${this.drink.name}`, 1);
          this.screen.lcd.setCursor(
            0,
            this.context === LcdContexts.Network ? 0 : 1,
          );
          this.screen.lcd.blink();
          break;
        case LcdContexts.PlacingOrder:
          await this.screen.print(`Placing Order...`, 0);
          this.screen.lcd.noBlink();
          break;
        case LcdContexts.RealizingOrder:
          await this.screen.print(`Realizing Order...`, 0);
          await this.screen.print(
            this.realizingOrderDescription.substring(0, 16),
            1,
          );
          this.screen.lcd.noBlink();
          break;
        default:
          throw new Error("Unknown context");
      }
    } catch (error) {
      console.error("Failed to update screen:", error);
    }
  }
}
