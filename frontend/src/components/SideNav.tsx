import Link from "next/link";

export const SideNav = () => {
  const items = [
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Order History", href: "/order-history" },
    { name: "Statistics", href: "/statistics" },
  ];

  return (
    <div className="w-[300px] bg-gray-900 h-screen flex flex-col py-16 px-4 gap-8 z-30">
      <h3 className="text-2xl font-bold">DEEP SHOT</h3>

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <Link key={index} href={item.href} className="text-lg">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
