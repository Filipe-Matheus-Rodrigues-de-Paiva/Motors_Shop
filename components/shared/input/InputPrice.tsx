"use client";

import { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function formatValue(input: HTMLInputElement) {
  let valor = input.value.replace(/\D/g, "");

  if (valor) {
    valor = String(parseFloat(valor) / 100);
    input.value = `R$ ${Number(valor).toFixed(2).toString()}`;
  } else {
    input.value = "";
  }
}

const InputCurrency = forwardRef(
  (
    { className, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="body-2-500 text-gray-200">Valor</label>
        <input
          type="text"
          name="fipe_price"
          placeholder="R$ 0,00"
          className={`h-12 w-full border-[1.5px] border-gray-800 px-4 outline-none focus:border-brand-100 ${className}`}
          ref={ref}
          {...rest}
          onInput={(e) => formatValue(e.target as HTMLInputElement)}
        />
      </div>
    );
  }
);

InputCurrency.displayName = "InputCurrency";

export default InputCurrency;
