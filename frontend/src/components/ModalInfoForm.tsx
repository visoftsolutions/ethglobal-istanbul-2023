import { ModalTemplate } from "./ModalTemplate";
import { Input } from "./Input";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";

interface Props {
  isOpen: boolean;
  setIsOpen: any;
  address: string;
  braceletAddress: string;
}

export const ModalInfoForm = ({
  isOpen,
  setIsOpen,
  address,
  braceletAddress,
}: Props) => {
  const [info, setInfo] = useState({
    name: "",
    amount: "",
  });

  const { data, sendTransactionAsync } = useSendTransaction();

  const { isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async (values: any) => {
    await sendTransactionAsync?.({
      to: braceletAddress,
      value: parseEther(values.amount),
    });

    // Save user only if filling bracelet went successfully
    if (isSuccess) {
      await supabase.from("users").insert({
        wallet_address: address,
        bracelet_address: braceletAddress,
        name: values.name,
      });
    }
  };

  const RequestSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    amount: Yup.number().min(0.0000000001).max(100000000).required("Required"),
  });

  return (
    <ModalTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Top-up funds"
      description={"Top-up the tokens to start the journey!"}
    >
      <Formik
        initialValues={info}
        onSubmit={async (values: any) => await handleSubmit(values)}
        validationSchema={RequestSchema}
        validate={(values: any) => {
          console.log("validate", values);
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form className="flex flex-col gap-8">
            <Input
              name="name"
              value={info.name}
              label="Name"
              error={errors.name}
            />
            <Input
              name="amount"
              value={info.amount}
              type={"number"}
              inputmode="decimal"
              label="Amount"
              error={errors.amount}
            />

            <div className="flex">
              {isSubmitting ? (
                <button className="w-full px-4 py-2 bg-green-500 text-white font-bold flex items-center justify-center h-12">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </button>
              ) : (
                <button className="w-full px-4 py-2 bg-green-500 text-white font-bold h-12 disabled:bg-gray-500 disabled:text-black">
                  Confirm
                </button>
              )}
            </div>
            {error && <p>{error.message}</p>}
          </Form>
        )}
      </Formik>
    </ModalTemplate>
  );
};
