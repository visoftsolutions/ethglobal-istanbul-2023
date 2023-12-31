import { FaCheck } from "react-icons/fa";
import { ModalTemplate } from "./ModalTemplate";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  setStep: any;
}

export const ModalBraceletConnected = ({
  isOpen,
  setIsOpen,
  setStep,
}: Props) => {
  setTimeout(() => {
    setStep(3);
  }, 5000);

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Configuration Complete"
      description={"Your bracelet has been successfully configured."}
    >
      <FaCheck size={64} className="mx-auto" />
    </ModalTemplate>
  );
};
