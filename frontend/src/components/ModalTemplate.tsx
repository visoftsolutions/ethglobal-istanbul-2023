"use client";
import { Dialog } from "@headlessui/react";
import { BsX } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  title: string;
  description: string;
  children: any;
}

export const ModalTemplate = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="w-96 z-1">
      <div className="fixed inset-0 bg-black/50 z-20" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 z-30">
        <Dialog.Panel className={"absolute bg-black p-4 w-full h-full items-center justify-center flex flex-col"}>
          <div className="w-full h-[400px]">
            <Dialog.Title className="flex justify-between text-xl font-semibold">
              {title}
              <BsX
                size={32}
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </Dialog.Title>

            <div className="flex flex-col gap-4">
              <Dialog.Description className={"text-md text-gray-300"}>
                {description}
              </Dialog.Description>

              {children}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
