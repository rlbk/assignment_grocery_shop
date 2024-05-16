import React from "react";
import Form from "./Form";
import { generateRequiredMessage } from "../../utils/message";

interface CustomInputProps {
  max?: string;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register: any;
  rounded?: string;
  padding?: string;
  width?: string;
  value?: string;
  ref?: any;
  extraClassName?: string;
  step?: string;
  className?: string;
  onChange?: () => void;
}

const Input: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  type,
  label,
  error,
  className,
  rounded = "rounded",
  padding = "py-3 px-6",
  step,
  width,
  register,
  required = false,
  extraClassName,
  ...rest
}) => {
  const style =
    "w-full px-0  py-2 text-xl font-normal leading-4xl rounded-none  border-b border-primary-gray-500 ";

  return (
    <Form.FormGroup otherStyles={`${width} mb-1 ${extraClassName} `}>
      {label && (
        <Form.Label>
          {label} {required ? <span className="text-red-600">*</span> : null}
        </Form.Label>
      )}

      <input
        type={type || "text"}
        className={`
            shadow-none outline-none focus-visible:ring-0 
            ${style} ${rounded} ${padding}  ${className} 
          `}
        placeholder={placeholder}
        step={step}
        {...register(name, generateRequiredMessage(name, required))}
        {...rest}
      />
      {!!error && <Form.HelperText>{error}</Form.HelperText>}
    </Form.FormGroup>
  );
};

export default Input;
