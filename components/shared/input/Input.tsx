import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}

const Input = forwardRef(
  (
    { type, label, name, placeholder, className, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="body-2-500 text-gray-200">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`h-12 w-full border-2 border-gray-800 px-4 outline-none focus:border-brand-100 ${className}`}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
