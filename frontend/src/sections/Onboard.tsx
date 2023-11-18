"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ModalBraceletConnect } from "@/components/ModalBraceletConnect";
import { ModalBraceletConnected } from "@/components/ModalBraceletConnected";
import { ModalInfoForm } from "@/components/ModalInfoForm";
import { ModalThankYou } from "@/components/ModalThankYou";

export const Onboard = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [braceletWalletAddress, setBraceletWalletAddress] = useState("");
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (address) {
      setIsOpen(true);
      setStep(1);
    }
  }, [address]);

  return (
    <div className="flex flex-col h-[80vh] gap-8 items-center justify-center px-4 z-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Configure Your Bracelet!</h1>

        <div>
          <p className="text-md">
            Follow these simple steps to enjoy your beverage in no time:
          </p>
          <ul className="text-md list-disc list-inside ml-5 gap-1">
            <li>Connect Your Wallet - Secure and easy.</li>
            <li>Tap Your Bracelet - Quick synchronization.</li>
            <li>Transfer Funds - Hassle-free transaction.</li>
            <li>Enjoy Your Drink! 🥳 - Cheers to convenience!</li>
          </ul>
        </div>
      </div>

      <button
        onClick={async () => await open({ view: "Networks" })}
        className="w-full px-4 py-2 bg-green-500 text-white font-bold h-12"
      >
        Start Configuration
      </button>

      {step === 1 && (
        <ModalBraceletConnect
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setBraceletWalletAddress={setBraceletWalletAddress}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <ModalBraceletConnected
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setStep={setStep}
        />
      )}
      {address && step === 3 && (
        <ModalInfoForm
          address={address}
          braceletAddress={braceletWalletAddress}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {step === 4 && <ModalThankYou isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
