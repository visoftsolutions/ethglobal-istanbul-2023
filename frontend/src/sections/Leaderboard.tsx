"use client";
import { supabase } from "@/utils/supabase";
import { Drinks, Networks, Order } from "@/utils/utils";
import { useEffect, useState } from "react";

export const Leaderboard = () => {  
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


  function groupById(array: Order[]): Record<number, number> {
    return array.reduce((acc, obj) => {
      const key = obj.drink_id;

      // If the key doesn't exist yet, create an array for it
      // @ts-ignore
      if (!acc[key]) {
        // @ts-ignore
        acc[key] = 0;
      }
      
      // @ts-ignore
      acc[key] += 1;

      return acc;
    }, {});
  }


  return (
    <div className="flex flex-col gap-4 max-h-screen w-full">
      <h1 className="text-2xl font-bold">LEADERBOARD</h1>

      {orders.length === 0 && <h3>There are no orders.</h3>}

      {orders.length > 0 && (
        <div className="w-full max-h-[900px] overflow-y-auto text-left block">
          <div className="flex w-full">
            <span className="flex-1 bg-gray-900 p-2">Name</span>
            <span className="flex-1 bg-gray-900 p-2">Amount ordered so far</span>
          </div>

          <div className="overflow-y-auto max-h-[500px] w-full flex flex-col">
            {Object.keys(groupById(orders)).map((drinkId, index) => (
              <div key={index} className="flex hover:bg-gray-800">
                <span className="p-2 flex-1">
                  {Drinks[drinkId as unknown as keyof typeof Drinks].name}
                </span>
                <span className="p-2 flex-1">
                  {groupById(orders)[drinkId as any]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
