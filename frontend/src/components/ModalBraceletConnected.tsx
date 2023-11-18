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
  }, 3000);

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Configuration finished"
      description={"Bracelet configured successfully."}
    >
      <FaCheck size={64} className="mx-auto" />
    </ModalTemplate>
  );
};
