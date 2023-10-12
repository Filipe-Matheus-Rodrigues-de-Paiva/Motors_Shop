"use client";

import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function formatarTelefone(input: HTMLInputElement) {
  // Remove qualquer caracter que não seja número
  input.value = input.value.replace(/\D/g, "");

  // Adiciona a formatação do telefone
  input.value = input.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

const InputPhone = forwardRef(
  (
    { className, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="body-2-500 text-gray-200">Telefone</label>
        <input
          type="text"
          name="phone_number"
          placeholder="DDD 00000-0000"
          className={`h-12 w-full border-[1.5px] border-gray-800 px-4 ${className}`}
          ref={ref}
          {...rest}
          onInput={(e) => formatarTelefone(e.target as HTMLInputElement)}
        />
      </div>
    );
  }
);

InputPhone.displayName = "InputPhone";

export default InputPhone;
