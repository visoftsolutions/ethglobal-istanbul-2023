import { Gpio } from "onoff";
import Lcd from "lcd";
import { LCD, Switch, Transistor, sleep } from "./utils.js";
import { DeepShot, LcdContexts } from "./deepShot.js";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { getAllNewEvents, getNewEvents } from "./subscriptions.js";
import { makeDrink } from "./makeDrink.js";
config();

const supabase = createClient(
  "https://jshhojuqmzdfjaxvwqiw.supabase.co",
  process.env.SUPABASE_APIKEY ?? "",
);

const transistors = [
  new Transistor(new Gpio(16, "out")),
  new Transistor(new Gpio(20, "out")),
  new Transistor(new Gpio(21, "out")),
];

const switch1 = new Switch(new Gpio(14, "in", "both"));
const switch2 = new Switch(new Gpio(15, "in", "both"));
const switch3 = new Switch(new Gpio(18, "in", "both"));
const screen = new LCD(
  new Lcd({ rs: 26, e: 19, data: [13, 6, 5, 11], cols: 16, rows: 2 }),
);
await screen.init();

const deepshot = new DeepShot(screen);
await deepshot.updateScreen();

switch1.on("click", () => {
  if (deepshot.context === LcdContexts.Network) {
    deepshot.switchContext(LcdContexts.Drink);
  } else if (deepshot.context === LcdContexts.Drink) {
    deepshot.switchContext(LcdContexts.Network);
  }
});

switch2.on("click", () => {
  deepshot.switchSelection();
});

switch3.on("click", async () => {
  deepshot.switchContext(LcdContexts.PlacingOrder);
  console.log(
    `Ordered Drink: ${deepshot.drink.name} on network: ${deepshot.network.name}`,
  );
  const { error } = await supabase
    .from("orders")
    .insert({ drink_id: deepshot.drink.id, network_id: deepshot.network.id });
  if (error) console.log(error);
  deepshot.switchContext(LcdContexts.Network);
});

// Listen for events
while (true) {
  const events = await getAllNewEvents(supabase);
  console.log(`events: ${events}`);
  if (events.length !== 0) {
    const drinkId = events[0].drink_id;
    deepshot.switchContext(LcdContexts.RealizingOrder);
    await makeDrink(transistors, drinkId);
    deepshot.switchContext(LcdContexts.Network);
  }
  await sleep(2000);
}
