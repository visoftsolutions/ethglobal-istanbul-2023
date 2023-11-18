const DrinksDefinitions = {
  0: { 0: 1000, 1: 0, 2: 0 },
  1: { 0: 0, 1: 1000, 2: 0 },
  2: { 0: 0, 1: 0, 2: 1000 },
  3: { 0: 1000, 1: 1000, 2: 1000 },
  4: { 0: 500, 1: 1500, 2: 1500 },
  5: { 0: 0, 1: 500, 2: 1500 },
  6: { 0: 500, 1: 500, 2: 1500 },
};

export const makeDrink = async (transistors, drinkId) => {
  console.log(`makeDrink ${drinkId}`);

  const definition = DrinksDefinitions[drinkId];
  for (let x = 0; x < 3; x++) {
    if (definition[x] !== 0) {
      transistors[x].turnOn();
      setTimeout(async () => {
        transistors[x].turnOff();
      }, definition[x]);
    }
  }
};
