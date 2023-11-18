import { ModalTemplate } from "./ModalTemplate";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
}

export const ModalThankYou = ({ isOpen, setIsOpen }: Props) => {
  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Thank you!"
      description={
        "Thank you for your invaluable support and dedication; your contribution has been instrumental in our success."
      }
    >
      <>
        <span className="text-5xl mx-auto">🥳</span>
        <button onClick={() => setIsOpen(false)} className='w-full px-4 py-2 bg-green-500 text-white font-bold h-12'>Finish!</button>
      </>
    </ModalTemplate>
  );
};
