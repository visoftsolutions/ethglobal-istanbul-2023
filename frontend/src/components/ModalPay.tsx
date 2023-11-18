"use client";
import Image from "next/image";
import { ModalTemplate } from "./ModalTemplate";

import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { haloConvertSignature } from "@arx-research/libhalo/api/common.js";
import { useEffect, useState } from "react";
import { UnsignedTransaction, ethers } from "ethers";
import { NetworkId, Networks, Order, getUnsignedTx } from "@/utils/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  drinkId?: number;
  setIsFlowOngoing: any;
  orders: Order[];
  setOrders: any;
  networkId: NetworkId;
}

export const ModalPay = ({
  isOpen,
  setIsOpen,
  drinkId,
  setIsFlowOngoing,
  orders,
  setOrders,
  networkId
}: Props) => {
  const [statusText, setStatusText] = useState("");
  const [txHash, setTxHash] = useState("");

  async function handleChip(command: any) {
    try {
      // --- request NFC command execution ---
      const res = await execHaloCmdWeb(command, {
        statusCallback: (cause: string) => {
          if (cause === "init") {
            setStatusText(
              "Please tap the tag to the back of your smartphone and hold it...",
            );
          } else if (cause === "retry") {
            setStatusText(
              "Something went wrong, please try to tap the tag again...",
            );
          } else if (cause === "scanned") {
            setStatusText(
              "Tag scanned successfully, post-processing the result...",
            );
          } else {
            setStatusText(cause);
          }
        },
      });
      // the command has succeeded, display the result to the user
      console.log("res", res);
      return res;
    } catch (e) {
      // the command has failed, display error to the user
      setStatusText(
        "Scanning failed, click on the button again to retry. Details: " +
          String(e),
      );
    }
  }

  const signTx = async (tx: UnsignedTransaction) => {
    const rawTx = ethers.utils.serializeTransaction(tx);
    let command = {
      name: "sign",
      keyNo: 1,
      digest: ethers.utils.keccak256(rawTx).substring(2),
    };
    const chip = await handleChip(command);
    const { r, s, v } = chip.signature.raw;
    return ethers.utils.serializeTransaction(tx, {
      r: `0x${r}`,
      s: `0x${s}`,
      v,
    });
  };

  const buyDrink = async (drinkId: number, networkId: NetworkId) => {
    const provider = new ethers.providers.JsonRpcProvider(
      Networks[networkId].rpc
    );
    const rawTx = await getUnsignedTx(
      provider,
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
      drinkId,
      10, // TODO: Change with drink_price
    );
    // TODO: Add for DRINK_PRICE based on DRINK_ID -> SMART CONTRACT
    const signedTx = await signTx(rawTx);
    let response = await provider.sendTransaction(signedTx);
    setTxHash(response.hash);
    setTimeout(() => {
      setIsFlowOngoing(false);
      removeOrder();
    }, 3000);
  };

  const removeOrder = () => {
    // Removes first [handled] element from the array
    orders.shift();
    // Replaces array content
    setOrders((orders: Order[]) => [...orders]);
  };

  useEffect(() => {
    if (drinkId !== undefined) {
      (async () => {
        await buyDrink(drinkId, networkId);
      })();
    }
  }, [drinkId]);

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Drink Payment"
      description={statusText}
    >
      <div className={"text-sm text-gray-300"}>{txHash}</div>
      <Image
        src="/touch.png"
        alt="touch bracelet img"
        width={336}
        height={186}
        className="w-full"
      />
      <button
        onClick={() => {
          removeOrder();
          setIsOpen(false);
          setIsFlowOngoing(false);
        }}
        className="px-4 py-2 border border-gray-700 text-gray-500 font-bold"
      >
        Cancel
      </button>
    </ModalTemplate>
  );
};
