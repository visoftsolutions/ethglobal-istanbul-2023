import { ErrorMessage, Field } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  label: string;
  name: string;
  helperText?: string;
  value: string | number;
  isDisabled?: boolean;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  error: any;
  inputmode?: string;
}

export const Input = ({
  label,
  name,
  isDisabled,
  helperText,
  maxLength,
  error,
  inputmode,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={label.toLowerCase().split(" ").join("-")}
        className="text-xs text-gray-300"
      >
        {label}
      </label>
      <Field
        inputmode={inputmode}
        name={name}
        maxLength={maxLength}
        disabled={isDisabled}
        id={label.toLowerCase().split(" ").join("-")}
        className={`text-sm bg-black border border-gray-800 p-2 outline-none focus:border-gray-500 focus:ring-0 ${
          error && error !== "Required"
            ? "focus:border-red-500 border-red-500"
            : ""
        }`}
      />

      {!error && helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {error && (
        <span className="text-xs text-red-500">
          <ErrorMessage name={name} />
        </span>
      )}
    </div>
  );
};
