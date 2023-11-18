import { ModalTemplate } from "./ModalTemplate";
import { Select } from "./Select";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  network: string;
  setNetwork: any;
}

export const ModalSelectNetwork = ({
  isOpen,
  setIsOpen,
  network,
  setNetwork,
}: Props) => {
  const networks = ["zkSync", "Arbitrum", "Gnosis Safe", "Scroll"];

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Select Blockchain Network"
      description={"Let's start with network to begin the journey..."}
    >
      <Select
        label="Network"
        options={networks}
        value={network}
        setOption={(e: any) => setNetwork(e.target.value)}
      />
    </ModalTemplate>
  );
};
