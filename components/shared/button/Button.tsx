"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const { pending } = useFormStatus();

  return (
    <button
      ref={ref}
      type="submit"
      disabled={pending}
      className={`h-12 w-full border-2 border-gray-800 px-4 outline-none focus:border-brand-100 ${className}`}
      {...rest}
    >
      {pending ? "Carregando..." : children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
