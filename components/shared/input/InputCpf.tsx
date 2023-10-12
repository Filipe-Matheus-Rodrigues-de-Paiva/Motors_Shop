"use client";

import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function formatarCPF(input: HTMLInputElement) {
  // Remove qualquer caracter que não seja número
  input.value = input.value.replace(/\D/g, "");

  // Adiciona a formatação do CPF
  input.value = input.value.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}

const InputCPF = forwardRef(
  (
    { className, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="body-2-500 text-gray-200">CPF</label>
        <input
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          className={`h-12 w-full border-[1.5px] border-gray-400 px-4 ${className}`}
          ref={ref}
          {...rest}
          onInput={(e) => formatarCPF(e.target as HTMLInputElement)}
        />
      </div>
    );
  }
);

InputCPF.displayName = "Input";

export default InputCPF;
