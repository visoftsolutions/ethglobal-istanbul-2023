"use client";
import { Drinks, Networks, Order } from "@/utils/utils";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Home = () => {
  const supabase = createClient(
    "https://jshhojuqmzdfjaxvwqiw.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_APIKEY ?? "",
  );
  const [orders, setOrders] = useState<Order[]>([]);

  // Query data on start
  useEffect(() => {
    const getOrdersData = async () => {
      const { data, error } = await supabase.from("orders").select();

      if (error) console.log("getOrdersData", data, error);

      setOrders(data as Order[]);
    };

    getOrdersData();
  }, [supabase]);

  useEffect(() => {
    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload: any) => {
          setOrders((orders) => [...orders, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="flex flex-col gap-4 h-screen">
      <Link href={"/onboard"}>Onboard</Link>
      <h1 className="text-2xl font-bold">ORDER HISTORY</h1>

      {orders.length === 0 && <h3>There are no orders.</h3>}

      {orders.length > 0 && (
        <table className="table-auto w-[600px] text-left">
          <thead>
            <tr>
              <th className="bg-gray-900 p-2">Name</th>
              <th className="bg-gray-900 p-2">Network</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="p-2">
                  {Drinks[order.drink_id as keyof typeof Drinks].name}
                </td>
                <td className="p-2">
                  {Networks[order.drink_id as keyof typeof Networks].name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
