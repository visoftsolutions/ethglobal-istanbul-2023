"use client";
import Image from "next/image";
import { ModalTemplate } from "./ModalTemplate";

import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { haloConvertSignature } from "@arx-research/libhalo/api/common.js";
import { useEffect, useState } from "react";
import { UnsignedTransaction, ethers } from "ethers";
import { Order, getUnsignedTx } from "@/utils/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  drinkId?: number;
  setIsFlowOngoing: any;
  orders: Order[];
  setOrders: any;
  setTxHash: any;
}

export const ModalPay = ({
  isOpen,
  setIsOpen,
  drinkId,
  setIsFlowOngoing,
  orders,
  setOrders,
  setTxHash
}: Props) => {
  
  const [statusText, setStatusText] = useState("Tap the bracelet...");
  
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

  const buyDrink = async (drinkId: number) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://testnet.era.zksync.dev",
    );
    const rawTx = await getUnsignedTx(
      provider,
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
      drinkId,
      10 // TODO: Change with drink_price
    );
    const signedTx = await signTx(rawTx);
    let response = await provider.sendTransaction(signedTx);
    setTxHash(response.hash);
    setIsFlowOngoing(false);

    // Removes first [handled] element from the array
    orders.shift();
    // Replaces array content
    setOrders((orders: Order[]) => [...orders]);
  };

  useEffect(() => {
    if(drinkId) {
      ;(async () => {
        await buyDrink(drinkId);
      });
    }
  }, [drinkId]);

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Drink Payment"
      description={statusText}
    >
      <Image src="/touch-bracelet.png" alt="touch bracelet img" width={336} height={186} className='w-full' />
    </ModalTemplate>
  );
};