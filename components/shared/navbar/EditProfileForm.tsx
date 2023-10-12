"use client";

import React from "react";
import Input from "../input/Input";
import InputCPF from "../input/InputCpf";
import InputData from "../input/InputDate";
import InputPhone from "../input/InputPhone";
import { toast } from "react-toastify";
import { updateUserSchema } from "@/lib/types";
import { updateUser } from "@/app/actions";
import { DialogTrigger } from "@/components/ui/dialog";
import { ILoggedUser } from "./NavBar";
import Button from "../button/Button";

interface props {
  user: ILoggedUser;
}

export default function EditProfileForm({ user }: props) {
  const clientAction = async (formData: FormData) => {
    const registerData = {
      name: formData.get("name") || undefined,
      email: formData.get("email") || undefined,
      cpf: formData.get("cpf") || undefined,
      phone_number: formData.get("phone_number") || undefined,
      date_birth: formData.get("date_birth") || undefined,
      description: formData.get("description") || undefined,
      password: formData.get("password") || undefined,
    };

    const filteredRegisterData = Object.fromEntries(
      Object.entries(registerData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredRegisterData).length === 0) {
      toast.warn("Preencha pelo menos um campo para atualizar", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    /* Client-side validation */
    const result = updateUserSchema.safeParse(registerData);
    if (!result.success) {
      let errorMessage = "";

      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.warn(errorMessage, {
        position: "top-center",
      });
      return;
    }

    /* Server-side validation */
    const response = await updateUser(result.data, user.id);

    if (response?.error) {
      toast.error(response.error, {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    /* Success */
    toast.success("Conta atualizada com sucesso!", {
      autoClose: 2000,
      hideProgressBar: true,
      position: "top-center",
    });
  };

  return (
    <form action={clientAction} className="flex w-full flex-col gap-5">
      <Input type="text" placeholder="Name" label="Nome" name="name" />
      <Input type="text" placeholder="Email" label="Email" name="email" />
      <InputCPF />
      <InputData />
      <InputPhone />
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="body-2-500 text-gray-200">
          Descrição
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Digitar descrição"
          className="resize-none border-[1.5px] border-gray-400 px-3 py-2 text-black"
        />
      </div>
      <Input
        type="password"
        placeholder="password"
        label="Senha"
        name="password"
      />
      <DialogTrigger className="w-fit">
        <Button
          type="submit"
          className="body-1-600 w-[150px] border bg-brand-100 text-white"
        >
          Salvar alterações
        </Button>
      </DialogTrigger>
    </form>
  );
}
