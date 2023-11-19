"use client";
import { supabase } from "@/utils/supabase";
import { Drinks, Networks, Order } from "@/utils/utils";
import { useEffect, useState } from "react";

export const Home = () => {
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

  function formatDate(d: string) {
    const date = new Date(d);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Formatting hours and minutes with leading zero if less than 10
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    return `${dayOfWeek} ${month} ${year}, ${hours}:${minutes}`;
  }

  return (
    <div className="flex flex-col gap-4 max-h-screen w-full">
      <h1 className="text-2xl font-bold">ORDER HISTORY</h1>

      {orders.length === 0 && <h3>There are no orders.</h3>}

      {orders.length > 0 && (
        <div className="w-full max-h-[900px] overflow-y-auto text-left block">
          <div className="flex w-full">
            <span className="flex-1 bg-gray-900 p-2">Name</span>
            <span className="flex-1 bg-gray-900 p-2">Network</span>
            <span className="flex-1 bg-gray-900 p-2">Date</span>
          </div>

          <div className="overflow-y-auto max-h-[500px] w-full flex flex-col">
            {orders.map((order, index) => (
              <div key={index} className="flex hover:bg-gray-800">
                <span className="p-2 flex-1">
                  {Drinks[order.drink_id as keyof typeof Drinks].name}
                </span>
                <span className="p-2 flex-1">
                  {Networks[order.network_id as keyof typeof Networks].name}
                </span>
                <span className="p-2 flex-1">
                  {formatDate(order.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
