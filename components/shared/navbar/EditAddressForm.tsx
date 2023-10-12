"use client";

import React from "react";
import Input from "../input/Input";
import { toast } from "react-toastify";
import { DialogTrigger } from "@/components/ui/dialog";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ILoggedUser } from "./NavBar";
import { updateAddressSchema } from "@/lib/types";
import { updateAddress } from "@/app/actions";

interface props {
  user: ILoggedUser;
}

export default function EditAddressForm({ user }: props) {
  const { pending } = useFormStatus();
  const clientAction = async (formData: FormData) => {
    const addressData = {
      cep: formData.get("cep") || undefined,
      state: formData.get("state") || undefined,
      city: formData.get("city") || undefined,
      street: formData.get("street") || undefined,
      number: formData.get("number") || undefined,
      complement: formData.get("complement") || undefined,
    };

    const filteredAddressData = Object.fromEntries(
      Object.entries(addressData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredAddressData).length === 0) {
      toast.error("Preencha pelo menos um campo para atualizar", {
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: true,
        position: "top-center",
      });
    }

    /* Client-side validation ZOD */
    const result = updateAddressSchema.safeParse(addressData);
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: true,
      });
      return;
    }

    /* Server-side validation */
    const response = await updateAddress(result.data, user.address.id);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    } else {
      toast.success("Endereço atualizado com sucesso", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <form action={clientAction} className="flex w-[95%] flex-col gap-5">
      <Input type="text" placeholder="00000-000" label="CEP" name="cep" />
      <div className="flex w-full justify-between gap-3">
        <Input type="text" placeholder="Estado" label="Estado" name="state" />
        <Input type="text" placeholder="Cidade" label="Cidade" name="city" />
      </div>
      <Input
        type="text"
        placeholder="Digite sua rua"
        label="Rua"
        name="street"
      />
      <div className="flex w-full justify-between gap-3">
        <Input type="text" label="Número" placeholder="1029" name="number" />
        <Input
          type="text"
          placeholder="Complemento"
          label="Complemento"
          name="complement"
        />
      </div>
      <DialogTrigger className="w-fit pl-2">
        <button
          type="submit"
          disabled={pending}
          className={`absolute bottom-5 right-5 h-10 w-[150px] rounded border ${
            pending ? "bg-brand-300" : "bg-brand-100"
          } text-white`}
        >
          Salvar alterações
        </button>
      </DialogTrigger>
    </form>
  );
}
