"use client";

import { useEffect, useState } from "react";
import { Order } from "@/utils/utils";
import { createClient } from "@supabase/supabase-js";
import { ModalPay } from "@/components/ModalPay";
import { ModalPaySuccessful } from "@/components/ModalPaySuccessful";

const supabase = createClient(
  "https://jshhojuqmzdfjaxvwqiw.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_APIKEY ?? "",
);

export const Pay = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isFlowOngoing, setIsFlowOngoing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | undefined>();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Handle upcoming orders
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
  }, []);

  console.log(orders, !isFlowOngoing, currentOrder, step);

  useEffect(() => {
    console.log('orders.length', orders.length);
    if (orders.length > 0 && !isFlowOngoing) {
      setIsOpen(true);
      setIsFlowOngoing(true);
      setCurrentOrder(orders[0]);
      setStep(1);
    }
  }, [orders, isFlowOngoing]);

  return (
    <div className="flex flex-col h-[80vh] gap-8 items-center justify-center px-4 z-10 text-gray-300">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Waiting for orders...</h1>

        {/* <div>
          <p className="text-md">
            Logs: {statusText}
            TxHash: {stateResp}
          </p>
        </div> */}
      </div>

      <button
        onClick={() => {
          setIsOpen(true);
          setIsFlowOngoing(true);
          setCurrentOrder({
            drink_id: 3,
            network_id: 4,
            id: "123",
            created_at: "123",
          });
          setStep(1);
        }}
        className="px-4 py-2 border border-gray-800 text-gray-600 font-bold w-52"
      >
        Emergency Order
      </button>

      {step === 1 && isFlowOngoing && currentOrder && (
        <ModalPay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          drinkId={currentOrder?.drink_id}
          setIsFlowOngoing={setIsFlowOngoing}
          orders={orders}
          setOrders={setOrders}
          networkId={currentOrder.network_id}
          setStep={setStep}
        />
      )}
      {step === 2 && (<ModalPaySuccessful isOpen={isOpen} setIsOpen={setIsOpen} setStep={setStep} />)}
    </div>
  );
};
