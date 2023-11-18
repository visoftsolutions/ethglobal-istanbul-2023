import Image from "next/image";
import Link from "next/link";
import { BiDrink, BiHistory } from "react-icons/bi";
import { MdLeaderboard } from "react-icons/md";

export const SideNav = () => {
  const items = [
    {name: "Card", href: "/card", icon: <BiDrink size={16} />},
    { name: "Leaderboard", href: "/leaderboard", icon: <MdLeaderboard size={16} /> },
    { name: "Order History", href: "/", icon: <BiHistory size={16} /> },
  ];

  return (
    <div className="w-[400px] bg-gray-900 h-screen flex flex-col py-16 px-4 gap-8 z-30">
      <div className="flex flex-col gap-4 items-center">
        <Image src={'/logo.jpg'} alt="logo" height={128} width={128} className="rounded-full" />
        <h3 className="text-2xl font-bold">Degen Drink</h3>
      </div>
      

      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase text-gray-600 font-bold">MENU</span>
        {items.map((item, index) => (
          <Link key={index} href={item.href} className="text-lg flex gap-1 items-center p-2 hover:bg-gray-800 text-gray-300">
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
