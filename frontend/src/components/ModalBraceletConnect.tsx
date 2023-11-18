"use client";
import Image from "next/image";
import { ModalTemplate } from "./ModalTemplate";

import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { haloConvertSignature } from "@arx-research/libhalo/api/common.js";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  setBraceletWalletAddress: any;
  setStep: any;
}

export const ModalBraceletConnect = ({
  isOpen,
  setIsOpen,
  setBraceletWalletAddress,
  setStep,
}: Props) => {
  const [braceletStatus, setBraceletStatus] = useState("Touch the bracelet...");

  async function handleChip() {
    const KEY_NO = 1;

    const pkeysRes = await execHaloCmdWeb({ name: "get_pkeys" });
    const braceletAddress = pkeysRes.etherAddresses[KEY_NO];

    setBraceletWalletAddress(braceletAddress);
    setStep(2);
  }

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Bracelet configuration"
      description={braceletStatus}
    >
      <>
        <Image src="/touch-bracelet.png" alt="touch bracelet img" width={336} height={186} className='w-full' />
        <button onClick={async () => await handleChip()} className='w-full px-4 py-2 bg-green-500 text-white font-bold h-12'>Initiate bracelet connection</button>
      </>
    </ModalTemplate>
  );
};
