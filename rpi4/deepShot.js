import { Networks, Drinks } from "./makeDrink.js"

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
