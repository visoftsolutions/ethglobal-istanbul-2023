import { Drinks, Networks, getDrinkPrice } from "@/utils/utils";
import { ethers } from "ethers";
import Image from "next/image";
import { CgScrollV } from "react-icons/cg";
import DeepShotAbi from "@/abi/DeepShot.json";
import { useEffect, useState } from "react";

export const Info = () => {
  const NETWORK_ID = 4;

  const provider = new ethers.providers.JsonRpcProvider(
    Networks[NETWORK_ID].rpc
  );
  const contract = new ethers.Contract(
    Networks[NETWORK_ID].address ?? "",
    DeepShotAbi,
    provider,
  );

  const [prices, setPrices] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      for (let [_, value] of Object.entries(Drinks)) {
        const price = (await getDrinkPrice(contract, value.id)) + " ETH";
        console.log(price);
        setPrices((prev) => [...prev, price]);
      }
    })();
  }, [contract, Drinks]);

  return (
    <main className="z-30 w-[800px] flex flex-col gap-8 items-center">
      <div className="p-4 bg-gray-900/70 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center my-4">Card</h1>

        <ul className="flex flex-col gap-8 h-[600px] overflow-y-auto p-16">
          {Object.values(Drinks).map((drink, index) => (
            <li key={index} className="flex gap-4">
              <Image
                src={drink.image}
                alt="drink img"
                width={128}
                height={128}
                className="aspect-square m-auto"
              />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold text-green-300">
                    {drink.name}
                  </h3>
                  <span className="uppercase px-2 py-1 bg-green-800/75 text-gray-300 text-sm">
                    {prices[index]}
                  </span>
                </div>

                <p className="text-md text-gray-300 italic">
                  {drink.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto animate-bounce mt-12">
          <CgScrollV size={64} />
        </div>
      </div>
    </main>
  );
};
