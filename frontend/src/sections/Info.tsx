import { Drinks } from "@/utils/utils";
import { CgScrollV } from "react-icons/cg";


export const Info = () => {
  return (
    <main className="z-30 w-[800px] flex flex-col gap-8 items-center">
      <div className="p-4 bg-gray-900/70">

        <h1 className="text-4xl font-bold text-center my-4">Card</h1>
      
        <ul className="flex flex-col gap-8 h-[600px] overflow-y-auto p-16">
          {Object.values(Drinks).map((drink, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{drink.name}</h3>
                <span className="uppercase px-2 py-1 bg-green-800/75 text-gray-300 text-sm">{drink.price}</span>
              </div>
            
              <p className="text-md text-gray-300 italic">{drink.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto animate-bounce">
        <CgScrollV size={64} />
      </div>
      
    </main>
  );
};
