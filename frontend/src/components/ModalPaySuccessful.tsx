"use client";

import { ModalTemplate } from "./ModalTemplate";
import { FaCheck } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  setStep: any;
}

export const ModalPaySuccessful = ({
  isOpen,
  setIsOpen,
  setStep
}: Props) => {
  setTimeout(() => {
    setStep(1);
    setIsOpen(false);
  }, 3000);

  
  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Payment Complete"
      description={"Your payment was completed successfully."}
    >
      <FaCheck size={64} className="mx-auto" />
    </ModalTemplate>
  );
};
