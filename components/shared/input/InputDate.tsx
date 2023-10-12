"use client";

import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function formatarData(input: HTMLInputElement) {
  // Remove qualquer caracter que não seja número
  input.value = input.value.replace(/\D/g, "");

  // Adiciona a formatação da data
  if (input.value.length <= 2) {
    // Insere o dia
    input.value = input.value.replace(/(\d{2})/, "$1");
  } else if (input.value.length <= 4) {
    // Insere o dia e o mês
    input.value = input.value.replace(/(\d{2})(\d{2})/, "$1/$2");
  } else {
    // Insere o dia, o mês e o ano
    input.value = input.value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
}

const InputData = forwardRef(
  (
    { className, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="body-2-500 text-gray-200">Data</label>
        <input
          type="text"
          name="date_birth"
          placeholder="DD/MM/YYYY"
          className={`h-12 w-full border-[1.5px] border-gray-400 px-4 ${className}`}
          ref={ref}
          {...rest}
          onInput={(e) => formatarData(e.target as HTMLInputElement)}
        />
      </div>
    );
  }
);

InputData.displayName = "InputData";

export default InputData;
